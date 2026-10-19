import { notFound } from "next/navigation";
import DashboardConsole from "./DashboardConsole";

// Read per request, not at build time: the console only exists once a backend is configured.
export const dynamic = "force-dynamic";

export default function DashboardPage() {
  if (!process.env.SETU_API_URL?.trim()) notFound();
  return <DashboardConsole />;
}
