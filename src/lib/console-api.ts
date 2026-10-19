export type Fail = { ok: false; status: number; code: string };
export type Result<T> = { ok: true; data: T } | Fail;

/** Calls one of this site's own proxy endpoints (`/api/superadmin/*`, `/api/tenant/*`). */
export async function call<T>(base: string, method: string, path: string, body?: unknown): Promise<Result<T>> {
  try {
    const res = await fetch(`${base}/${path}`, {
      method,
      credentials: "same-origin",
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const text = await res.text();
    let data: { code?: string } | null = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      /* non-JSON error page */
    }
    if (!res.ok) return { ok: false, status: res.status, code: data?.code ?? "error" };
    return { ok: true, data: data as T };
  } catch {
    return { ok: false, status: 0, code: "unavailable" };
  }
}

const MESSAGES: Record<string, string> = {
  invalid_otp: "That code is invalid or has expired.",
  invalid_credentials: "Tenant ID, email or password is incorrect.",
  rate_limited: "Too many attempts. Wait a moment and try again.",
  tenant_slug_taken: "That slug is already in use.",
  invalid_tenant_status_transition: "The tenant can't move to that status.",
  weak_password: "That password is too weak.",
  unavailable: "The service is unavailable. Try again shortly.",
  unauthenticated: "Your session has expired. Sign in again.",
  forbidden: "You don't have permission to do that.",
  invalid_cursor: "That page link expired. Refresh the list.",
};

export const errorMessage = (r: { status: number; code: string }) =>
  MESSAGES[r.code] ?? (r.status === 400 ? "Check the details and try again." : r.status === 403 ? MESSAGES.forbidden : "Something went wrong.");
