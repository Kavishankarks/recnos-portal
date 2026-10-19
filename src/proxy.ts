import { NextRequest, NextResponse } from "next/server";
import { isMarkdownPreferred } from "fumadocs-core/negotiation";

/**
 * A client that asks for markdown (`Accept: text/markdown`) is sent to the plain-markdown twin of the docs page.
 *
 * This redirects rather than rewrites on purpose: Next decides whether a rewrite is internal by comparing the
 * target's origin with its own listening address, which differs behind a reverse proxy (nginx terminates TLS and
 * forwards to an internal port), so a rewrite there is treated as an external fetch and fails. A redirect only
 * needs a `Location` the client can follow.
 */
export default function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/+$/, "") || "/docs";

  if (!path.endsWith(".md") && isMarkdownPreferred(request)) {
    const page = path === "/docs" ? "/docs/index" : path;
    // Middleware needs an absolute Location. Use the origin the client actually reached, not the internal one.
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? request.nextUrl.host;
    const proto = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");
    return NextResponse.redirect(new URL(`${page}.md`, `${proto}://${host}`), {
      status: 307,
      headers: { Vary: "Accept" },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/docs", "/docs/:path*"],
};
