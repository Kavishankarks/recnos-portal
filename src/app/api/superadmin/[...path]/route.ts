import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, adminBaseUrl, resolveRoute } from "@/lib/setu-admin";

export const dynamic = "force-dynamic";

const json = (body: unknown, status: number) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

async function handle(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const route = resolveRoute(req.method, path);
  if (!route) return json({ code: "not_found" }, 404);

  // Same-origin only: the session cookie is SameSite=Strict, this covers the rest.
  if (req.method !== "GET") {
    const origin = req.headers.get("origin");
    if (!origin || origin !== req.nextUrl.origin) return json({ code: "forbidden" }, 403);
  }

  const base = adminBaseUrl();
  if (!base) return json({ code: "unavailable" }, 503);

  const headers: Record<string, string> = { Accept: "application/json" };
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (route.auth) {
    if (!token) return json({ code: "unauthenticated" }, 401);
    headers.Authorization = `Bearer ${token}`;
  }

  let body: string | undefined;
  if (route.method === "POST") {
    headers["Content-Type"] = "application/json";
    body = await req.text();
  }

  let upstream: Response;
  try {
    upstream = await fetch(base + route.upstream + req.nextUrl.search, {
      method: route.method,
      headers,
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
  } catch {
    return json({ code: "unavailable" }, 502);
  }

  const last = path.join("/");
  if (last === "auth/logout" || (route.auth && upstream.status === 401)) {
    const res = last === "auth/logout" ? new NextResponse(null, { status: 204 }) : json({ code: "unauthenticated" }, 401);
    res.cookies.set(SESSION_COOKIE, "", { path: "/api/superadmin", maxAge: 0 });
    return res;
  }

  if (upstream.status === 204 || upstream.status === 202) {
    return new NextResponse(null, { status: upstream.status, headers: { "Cache-Control": "no-store" } });
  }

  let data: unknown;
  try {
    data = await upstream.json();
  } catch {
    return json({ code: upstream.ok ? "bad_response" : "error" }, upstream.ok ? 502 : upstream.status);
  }

  // The access token never reaches page JavaScript: it is moved into an httpOnly cookie.
  if (last === "auth/otp/verify" && upstream.ok) {
    const { accessToken, expiresAt } = data as { accessToken: string; expiresAt: string };
    const maxAge = Math.max(1, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));
    const res = json({ expiresAt }, 200);
    res.cookies.set(SESSION_COOKIE, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/superadmin",
      maxAge,
    });
    return res;
  }

  return json(data, upstream.status);
}

export { handle as GET, handle as POST };
