import { NextResponse, type NextRequest } from "next/server";
import {
  ACCESS_MAX_AGE,
  COOKIE,
  COOKIE_PATH,
  REFRESH_MAX_AGE,
  UUID_RE,
  apiBaseUrl,
  refreshFromSetCookie,
  refreshTokens,
  resolveRoute,
  type Tokens,
} from "@/lib/setu-tenant";

export const dynamic = "force-dynamic";

const json = (body: unknown, status: number) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

const cookieOpts = (maxAge: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: COOKIE_PATH,
  maxAge,
});

function setSession(res: NextResponse, tenant: string, t: Tokens) {
  res.cookies.set(COOKIE.access, t.access, cookieOpts(ACCESS_MAX_AGE));
  res.cookies.set(COOKIE.refresh, t.refresh, cookieOpts(REFRESH_MAX_AGE));
  res.cookies.set(COOKIE.csrf, t.csrf, cookieOpts(REFRESH_MAX_AGE));
  res.cookies.set(COOKIE.tenant, tenant, cookieOpts(REFRESH_MAX_AGE));
}

function clearSession(res: NextResponse) {
  for (const name of Object.values(COOKIE)) res.cookies.set(name, "", { path: COOKIE_PATH, maxAge: 0 });
  return res;
}

async function send(url: string, init: RequestInit): Promise<Response | null> {
  try {
    return await fetch(url, { ...init, cache: "no-store", signal: AbortSignal.timeout(15_000) });
  } catch {
    return null;
  }
}

async function handle(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const p = path.join("/");
  const cookies = req.cookies;
  const tenant = cookies.get(COOKIE.tenant)?.value;
  const refresh = cookies.get(COOKIE.refresh)?.value;
  const csrf = cookies.get(COOKIE.csrf)?.value;

  if (req.method === "GET" && p === "session") {
    return tenant && refresh ? json({ tenant }, 200) : json({ code: "unauthenticated" }, 401);
  }

  // Same-origin only: the cookies are SameSite=Strict, this covers the rest.
  if (req.method !== "GET") {
    const origin = req.headers.get("origin");
    if (!origin || origin !== req.nextUrl.origin) return json({ code: "forbidden" }, 403);
  }

  const base = apiBaseUrl();

  if (req.method === "POST" && p === "auth/login") {
    if (!base) return json({ code: "unavailable" }, 503);
    let body: { tenant?: string; email?: string; password?: string };
    try {
      body = await req.json();
    } catch {
      return json({ code: "bad_request" }, 400);
    }
    const t = body.tenant?.trim() ?? "";
    if (!UUID_RE.test(t) || !body.email || !body.password) return json({ code: "invalid_credentials" }, 401);
    const up = await send(`${base}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Tenant-ID": t },
      body: JSON.stringify({ email: body.email, password: body.password }),
    });
    if (!up) return json({ code: "unavailable" }, 502);
    if (!up.ok) return json({ code: up.status === 429 ? "rate_limited" : "invalid_credentials" }, up.status === 429 ? 429 : 401);
    const data = (await up.json()) as { accessToken: string; csrfToken: string };
    const newRefresh = refreshFromSetCookie(up);
    if (!newRefresh) return json({ code: "bad_response" }, 502);
    const res = json({ tenant: t }, 200);
    setSession(res, t, { access: data.accessToken, refresh: newRefresh, csrf: data.csrfToken });
    return res;
  }

  if (req.method === "POST" && p === "auth/logout") {
    if (base && tenant && refresh && csrf) {
      await send(`${base}/api/v1/auth/logout`, {
        method: "POST",
        headers: { "X-Tenant-ID": tenant, Cookie: `refresh_token=${refresh}; XSRF-TOKEN=${csrf}` },
      });
    }
    return clearSession(new NextResponse(null, { status: 204 }));
  }

  const route = resolveRoute(req.method, path);
  if (!route) return json({ code: "not_found" }, 404);
  if (!base) return json({ code: "unavailable" }, 503);
  if (!tenant || !refresh || !csrf) return json({ code: "unauthenticated" }, 401);

  let query = "";
  if (route.query) {
    const q = new URLSearchParams();
    for (const k of ["cursor", "limit"]) {
      const v = req.nextUrl.searchParams.get(k);
      if (v) q.set(k, v);
    }
    query = q.size ? `?${q}` : "";
  }
  const hasBody = req.method === "POST" || req.method === "PUT";
  const bodyText = hasBody ? await req.text() : undefined;

  const call = (access: string) =>
    send(base + route.upstream + query, {
      method: req.method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access}`,
        ...(hasBody ? { "Content-Type": "application/json" } : {}),
      },
      body: bodyText || undefined,
    });

  let rotated: Tokens | null = null;
  let up = cookies.get(COOKIE.access)?.value ? await call(cookies.get(COOKIE.access)!.value) : null;
  if (!up || up.status === 401) {
    rotated = await refreshTokens(base, tenant, refresh, csrf);
    if (!rotated) return clearSession(json({ code: "unauthenticated" }, 401));
    up = await call(rotated.access);
  }
  if (!up) return json({ code: "unavailable" }, 502);
  if (up.status === 401) return clearSession(json({ code: "unauthenticated" }, 401));

  let res: NextResponse;
  if (up.status === 204) {
    res = new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  } else {
    try {
      res = json(await up.json(), up.status);
    } catch {
      res = json({ code: up.ok ? "bad_response" : "error" }, up.ok ? 502 : up.status);
    }
  }
  if (rotated) setSession(res, tenant, rotated);
  return res;
}

export { handle as GET, handle as POST, handle as PUT };
