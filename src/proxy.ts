import { NextRequest, NextResponse } from "next/server";
import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";

const { rewrite: rewriteLLM } = rewritePath("/docs{/*path}", "/llms.mdx/docs{/*path}/content.md");

/** A client that asks for markdown (Accept: text/markdown) gets the plain-markdown twin of a docs page. */
export default function proxy(request: NextRequest) {
  if (isMarkdownPreferred(request)) {
    const result = rewriteLLM(request.nextUrl.pathname);
    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl), {
        headers: { Vary: "Accept" },
      });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/docs", "/docs/:path*"],
};
