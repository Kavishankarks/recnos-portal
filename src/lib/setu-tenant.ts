import "server-only";

/**
 * Server-side client for the recnos-setu public (tenant) API.
 *
 * The tenant dashboard never talks to the API from the browser. Its address comes
 * from `SETU_API_URL` and is only read here; the access token, refresh token and
 * CSRF token live in httpOnly cookies scoped to the proxy path.
 */
export const COOKIE = {
  access: "td_access",
  refresh: "td_refresh",
  csrf: "td_csrf",
  tenant: "td_tenant",
} as const;

export const COOKIE_PATH = "/api/tenant";
export const REFRESH_MAX_AGE = 60 * 60 * 24 * 30;
export const ACCESS_MAX_AGE = 60 * 15;

const UUID = "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}";
export const UUID_RE = new RegExp(`^${UUID}$`);

/** The only API operations the dashboard will forward. Anything else is a 404. */
export function resolveRoute(method: string, path: string[]): { upstream: string; query: boolean } | null {
  const p = path.join("/");
  const allowed: Array<[string, RegExp, boolean]> = [
    ["GET", /^forms$/, true],
    ["POST", /^forms$/, false],
    ["GET", new RegExp(`^forms/${UUID}$`), false],
    ["PUT", new RegExp(`^forms/${UUID}$`), false],
    ["POST", new RegExp(`^forms/${UUID}/archive$`), false],
    ["GET", new RegExp(`^forms/${UUID}/submissions$`), true],
    ["GET", /^enquiries$/, true],
    ["GET", new RegExp(`^enquiries/${UUID}$`), false],
    ["PUT", new RegExp(`^enquiries/${UUID}/status$`), false],
    ["GET", /^public-sites$/, false],
    ["POST", /^public-sites$/, false],
    ["PUT", new RegExp(`^public-sites/${UUID}$`), false],
    ["POST", new RegExp(`^public-sites/${UUID}/(rotate|revoke)$`), false],
  ];
  const hit = allowed.find(([m, re]) => m === method && re.test(p));
  return hit ? { upstream: `/api/v1/${p}`, query: hit[2] } : null;
}

export function apiBaseUrl(): string | null {
  const url = process.env.SETU_API_URL?.trim();
  return url ? url.replace(/\/+$/, "") : null;
}

export type Tokens = { access: string; refresh: string; csrf: string };

/** Reads the refresh token out of the API's Set-Cookie headers. */
export function refreshFromSetCookie(res: Response): string | null {
  for (const c of res.headers.getSetCookie()) {
    if (c.startsWith("refresh_token=")) return c.slice("refresh_token=".length).split(";")[0] || null;
  }
  return null;
}

/** Exchanges the refresh token for a new pair (the API rotates refresh tokens). */
export async function refreshTokens(base: string, tenant: string, refresh: string, csrf: string): Promise<Tokens | null> {
  try {
    const res = await fetch(`${base}/api/v1/auth/refresh`, {
      method: "POST",
      headers: {
        "X-Tenant-ID": tenant,
        "X-CSRF-Token": csrf,
        Cookie: `refresh_token=${refresh}; XSRF-TOKEN=${csrf}`,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { accessToken: string; csrfToken: string };
    const newRefresh = refreshFromSetCookie(res);
    if (!newRefresh) return null;
    return { access: body.accessToken, refresh: newRefresh, csrf: body.csrfToken };
  } catch {
    return null;
  }
}
