import "server-only";

/**
 * Server-side client for the recnos-setu platform-admin API.
 *
 * The admin service lives on a private network and is never reachable from a
 * browser. Its address comes from the `SETU_ADMIN_URL` environment variable and
 * is only ever read here, so it appears in no client bundle, page, or response.
 */
export const SESSION_COOKIE = "sa_session";

export type Route = { method: "GET" | "POST"; upstream: string; auth: boolean };

const UUID = "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}";

/** The only admin operations the site will forward. Anything else is a 404. */
export function resolveRoute(method: string, path: string[]): Route | null {
  const p = path.join("/");
  const key = `${method} ${p}`;
  switch (key) {
    case "POST auth/otp":
    case "POST auth/otp/verify":
      return { method: "POST", upstream: `/admin/v1/${p}`, auth: false };
    case "POST auth/logout":
    case "POST tenants":
    case "GET tenants":
      return { method: method as "GET" | "POST", upstream: `/admin/v1/${p}`, auth: true };
  }
  if (method === "GET" && new RegExp(`^tenants/${UUID}$`).test(p)) {
    return { method: "GET", upstream: `/admin/v1/${p}`, auth: true };
  }
  if (method === "POST" && new RegExp(`^tenants/${UUID}/(suspend|reactivate)$`).test(p)) {
    return { method: "POST", upstream: `/admin/v1/${p}`, auth: true };
  }
  return null;
}

export function adminBaseUrl(): string | null {
  const url = process.env.SETU_ADMIN_URL?.trim();
  return url ? url.replace(/\/+$/, "") : null;
}
