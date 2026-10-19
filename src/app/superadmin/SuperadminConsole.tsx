"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { call, errorMessage, type Fail } from "@/lib/console-api";
import { Badge, Card, CopyButton, ErrorText, Notice, Shell, Table, input, primary, secondary } from "@/components/console/ui";

type Tenant = { id: string; slug: string; name: string; status: string; createdAt: string; updatedAt: string };
type Page = { items: Tenant[]; nextAfterSlug: string | null };
type Provisioned = { tenant: Tenant; ownerEmail: string; generatedOwnerPassword?: string };

const api = <T,>(method: string, path: string, body?: unknown) => call<T>("/api/superadmin", method, path, body);

export default function SuperadminConsole() {
  const [signedIn, setSignedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  // A valid session cookie survives reloads: probe the list once to find out.
  useEffect(() => {
    api("GET", "tenants?limit=1").then((r) => {
      setSignedIn(r.ok);
      setChecking(false);
    });
  }, []);

  async function signOut() {
    await api("POST", "auth/logout");
    setSignedIn(false);
  }

  return (
    <Shell
      title="Superadmin"
      subtitle="Platform tenant management"
      actions={signedIn && <button className={secondary} onClick={signOut}>Sign out</button>}
    >
      {checking ? null : signedIn ? <Tenants onExpired={() => setSignedIn(false)} /> : <SignIn onDone={() => setSignedIn(true)} />}
    </Shell>
  );
}

function SignIn({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    if (!sent) {
      const r = await api("POST", "auth/otp", { email });
      if (r.ok) setSent(true);
      else setError(errorMessage(r));
    } else {
      const r = await api("POST", "auth/otp/verify", { email, code });
      if (r.ok) onDone();
      else setError(errorMessage(r));
    }
    setBusy(false);
  }

  return (
    <div className="mx-auto max-w-md pt-10">
      <Card title="Sign in">
        <form onSubmit={submit} className="space-y-4">
          <p className="text-sm text-white/60">
            {sent ? "If that address belongs to an operator, an 8-digit code is on its way." : "Enter your operator email to receive a one-time code."}
          </p>
          <input className={input} type="email" required placeholder="Email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} disabled={sent} />
          {sent && (
            <input className={input} inputMode="numeric" pattern="\d{8}" maxLength={8} required placeholder="8-digit code" autoComplete="one-time-code" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} />
          )}
          <ErrorText>{error}</ErrorText>
          <div className="flex gap-2">
            <button className={primary} disabled={busy}>{sent ? "Verify" : "Send code"}</button>
            {sent && (
              <button type="button" className={secondary} onClick={() => { setSent(false); setCode(""); setError(""); }}>
                Start over
              </button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}

function Tenants({ onExpired }: { onExpired: () => void }) {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [provisioned, setProvisioned] = useState<Provisioned | null>(null);

  const fail = useCallback(
    (r: Fail) => {
      if (r.status === 401) onExpired();
      else setError(errorMessage(r));
    },
    [onExpired],
  );

  const load = useCallback(
    async (after?: string) => {
      setLoading(true);
      setError("");
      const q = after ? `?afterSlug=${encodeURIComponent(after)}&limit=50` : "?limit=50";
      const r = await api<Page>("GET", `tenants${q}`);
      if (r.ok) {
        setTenants((prev) => (after ? [...prev, ...r.data.items] : r.data.items));
        setNext(r.data.nextAfterSlug);
      } else fail(r);
      setLoading(false);
    },
    [fail],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  async function toggle(t: Tenant) {
    const action = t.status === "active" ? "suspend" : "reactivate";
    const reason = window.prompt(`Reason to ${action} "${t.slug}" (min 5 characters):`);
    if (!reason) return;
    const ticket = window.prompt("Ticket reference:");
    if (!ticket) return;
    const r = await api<Tenant>("POST", `tenants/${t.id}/${action}`, { reason, ticket });
    if (r.ok) setTenants((prev) => prev.map((x) => (x.id === t.id ? r.data : x)));
    else fail(r);
  }

  return (
    <div className="space-y-6">
      {provisioned && (
        <Notice onDismiss={() => setProvisioned(null)}>
          <p>
            Created <strong>{provisioned.tenant.slug}</strong> for {provisioned.ownerEmail}. Tenant ID: <code className="select-all">{provisioned.tenant.id}</code>
          </p>
          {provisioned.generatedOwnerPassword && (
            <p>
              Owner password (shown once): <code className="select-all rounded bg-white/10 px-2 py-0.5">{provisioned.generatedOwnerPassword}</code>
            </p>
          )}
        </Notice>
      )}

      <Card title="Provision tenant">
        <Provision onCreated={(p) => { setProvisioned(p); void load(); }} onError={fail} />
      </Card>

      <ErrorText>{error}</ErrorText>

      <Card title="Tenants">
        <Table head={["Slug", "Name", "Status", "Created", "Tenant ID", ""]} empty={!loading && tenants.length === 0 ? "No tenants yet." : undefined}>
          {tenants.map((t) => (
            <tr key={t.id}>
              <td className="px-3 py-2.5 font-mono">{t.slug}</td>
              <td className="px-3 py-2.5">{t.name}</td>
              <td className="px-3 py-2.5"><Badge value={t.status} /></td>
              <td className="px-3 py-2.5 text-white/50">{new Date(t.createdAt).toLocaleDateString()}</td>
              <td className="px-3 py-2.5"><CopyButton text={t.id} label="Copy ID" /></td>
              <td className="px-3 py-2.5 text-right">
                <button className={secondary} onClick={() => toggle(t)}>{t.status === "active" ? "Suspend" : "Reactivate"}</button>
              </td>
            </tr>
          ))}
        </Table>
        {next && <div className="pt-3"><button className={secondary} disabled={loading} onClick={() => load(next)}>Load more</button></div>}
      </Card>
    </div>
  );
}

function Provision({ onCreated, onError }: { onCreated: (p: Provisioned) => void; onError: (r: Fail) => void }) {
  const empty = { slug: "", name: "", email: "", password: "", reason: "", ticket: "" };
  const [f, setF] = useState(empty);
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    const r = await api<Provisioned>("POST", "tenants", {
      slug: f.slug,
      name: f.name,
      owner: { email: f.email, ...(f.password ? { initialPassword: f.password } : {}) },
      justification: { reason: f.reason, ticket: f.ticket },
    });
    if (r.ok) {
      onCreated(r.data);
      setF(empty);
    } else onError(r);
    setBusy(false);
  }

  return (
    <form onSubmit={submit} className="grid gap-3 md:grid-cols-3">
      <input className={input} required placeholder="Slug (a-z, 0-9, -)" pattern="[a-z0-9]([a-z0-9\-]{0,61}[a-z0-9])?" value={f.slug} onChange={set("slug")} />
      <input className={input} required maxLength={200} placeholder="Tenant name" value={f.name} onChange={set("name")} />
      <input className={input} required type="email" placeholder="Owner email" value={f.email} onChange={set("email")} />
      <input className={input} type="password" autoComplete="new-password" placeholder="Owner password (blank = generate)" value={f.password} onChange={set("password")} />
      <input className={input} required minLength={5} maxLength={500} placeholder="Reason" value={f.reason} onChange={set("reason")} />
      <input className={input} required maxLength={64} pattern="[A-Za-z0-9._#/\-]+" placeholder="Ticket" value={f.ticket} onChange={set("ticket")} />
      <div className="md:col-span-3"><button className={primary} disabled={busy}>Provision tenant</button></div>
    </form>
  );
}
