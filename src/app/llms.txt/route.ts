import { absolutize, docsLlms } from "@/lib/source";

export const revalidate = false;

export async function GET() {
  return new Response(absolutize(await docsLlms.index()), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
