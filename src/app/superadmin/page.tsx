import { notFound } from "next/navigation";
import SuperadminConsole from "./SuperadminConsole";

// Read per request, not at build time: the console only exists once a backend is configured.
export const dynamic = "force-dynamic";

export default function SuperadminPage() {
  if (!process.env.SETU_ADMIN_URL?.trim()) notFound();
  return <SuperadminConsole />;
}
