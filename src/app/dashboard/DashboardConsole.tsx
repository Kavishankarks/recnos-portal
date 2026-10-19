"use client";

import { Fragment, useCallback, useEffect, useState, type FormEvent } from "react";
import { call, errorMessage, type Fail } from "@/lib/console-api";
import { FormBuilder, FormPreview, FormStructure, fieldsToSchema, schemaToFields, starterFields, validateFields, type FieldDef } from "./FormBuilder";
import { Badge, Card, CopyButton, ErrorText, Json, Notice, Shell, Table, danger, input, primary, secondary } from "@/components/console/ui";

type Form = { id: string; name: string; version: number; jsonSchema: unknown; status: string; createdAt: string };
type Submission = { id: string; payload: unknown; createdByUserId: string | null; createdAt: string };
type Enquiry = { id: string; source: string; status: string; payload: unknown; createdAt: string };
type Site = {
  id: string;
  status: string;
  allowedOrigins: string[];
  allowedFormIds: string[];
  quotaPerMinute: number;
  lastUsedAt: string | null;
  createdAt: string;
};
type Paged<T> = { items: T[]; nextCursor: string | null };

const api = <T,>(method: string, path: string, body?: unknown) => call<T>("/api/tenant", method, path, body);

const NEXT_STATUS: Record<string, string[]> = {
  new: ["in_progress", "closed"],
  in_progress: ["resolved", "closed"],
  resolved: ["in_progress", "closed"],
  closed: [],
};

type Tab = "overview" | "enquiries" | "forms" | "sites";

export default function DashboardConsole() {
  const [state, setState] = useState<"checking" | "out" | "in">("checking");
  const [tenant, setTenant] = useState("");
  const [tab, setTab] = useState<Tab>("overview");

  useEffect(() => {
    api<{ tenant: string }>("GET", "session").then((r) => {
      if (r.ok) setTenant(r.data.tenant);
      setState(r.ok ? "in" : "out");
    });
  }, []);

  const expired = useCallback(() => setState("out"), []);

  async function signOut() {
    await api("POST", "auth/logout");
    setState("out");
  }

  const tabs: [Tab, string][] = [["overview", "Overview"], ["enquiries", "Enquiries"], ["forms", "Forms"], ["sites", "Sites & keys"]];

  return (
    <Shell
      title="Dashboard"
      subtitle={state === "in" ? `Tenant ${tenant}` : "Sign in to manage your forms and enquiries"}
      actions={state === "in" && <button className={secondary} onClick={signOut}>Sign out</button>}
    >
      {state === "checking" ? null : state === "out" ? (
        <SignIn onDone={(t) => { setTenant(t); setState("in"); }} />
      ) : (
        <div className="space-y-6">
          <nav className="flex gap-1 border-b border-white/10">
            {tabs.map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium ${tab === id ? "border-[#5b7bff] text-white" : "border-transparent text-white/50 hover:text-white"}`}
              >
                {label}
              </button>
            ))}
          </nav>
          {tab === "overview" && <Overview onExpired={expired} go={setTab} />}
          {tab === "enquiries" && <Enquiries onExpired={expired} />}
          {tab === "forms" && <Forms onExpired={expired} />}
          {tab === "sites" && <Sites onExpired={expired} />}
        </div>
      )}
    </Shell>
  );
}

function useFail(onExpired: () => void) {
  const [error, setError] = useState("");
  const fail = useCallback(
    (r: Fail) => {
      if (r.status === 401) onExpired();
      else setError(errorMessage(r));
    },
    [onExpired],
  );
  return { error, setError, fail };
}

function SignIn({ onDone }: { onDone: (tenant: string) => void }) {
  const [f, setF] = useState({ tenant: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const r = await api<{ tenant: string }>("POST", "auth/login", f);
    if (r.ok) onDone(r.data.tenant);
    else setError(errorMessage(r));
    setBusy(false);
  }

  return (
    <div className="mx-auto max-w-md pt-10">
      <Card title="Sign in">
        <form onSubmit={submit} className="space-y-4">
          <input className={input} required placeholder="Tenant ID" value={f.tenant} onChange={(e) => setF({ ...f, tenant: e.target.value })} />
          <input className={input} required type="email" autoComplete="username" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
          <input className={input} required type="password" autoComplete="current-password" placeholder="Password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
          <ErrorText>{error}</ErrorText>
          <button className={primary} disabled={busy}>Sign in</button>
        </form>
      </Card>
    </div>
  );
}

function Stat({ label, value, onClick }: { label: string; value: string | number; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left shadow-xl shadow-black/20 backdrop-blur-md transition hover:border-[#5b7bff]/50 hover:bg-white/[0.07]">
      <p className="text-xs uppercase tracking-wide text-white/50">{label}</p>
      <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
    </button>
  );
}

function Overview({ onExpired, go }: { onExpired: () => void; go: (t: Tab) => void }) {
  const { error, fail } = useFail(onExpired);
  const [data, setData] = useState<{ forms: Form[]; enquiries: Enquiry[]; moreEnquiries: boolean; sites: Site[] } | null>(null);

  useEffect(() => {
    Promise.all([
      api<Paged<Form>>("GET", "forms?limit=100"),
      api<Paged<Enquiry>>("GET", "enquiries?limit=100"),
      api<Site[]>("GET", "public-sites"),
    ]).then(([f, e, s]) => {
      if (!f.ok) return fail(f);
      if (!e.ok) return fail(e);
      if (!s.ok) return fail(s);
      setData({ forms: f.data.items, enquiries: e.data.items, moreEnquiries: !!e.data.nextCursor, sites: s.data });
    });
  }, [fail]);

  if (error) return <ErrorText>{error}</ErrorText>;
  if (!data) return null;
  const count = (s: string) => data.enquiries.filter((x) => x.status === s).length;
  const plus = data.moreEnquiries ? "+" : "";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="New enquiries" value={`${count("new")}${plus}`} onClick={() => go("enquiries")} />
        <Stat label="In progress" value={`${count("in_progress")}${plus}`} onClick={() => go("enquiries")} />
        <Stat label="Active forms" value={data.forms.filter((f) => f.status === "active").length} onClick={() => go("forms")} />
        <Stat label="Active site keys" value={data.sites.filter((s) => s.status === "active").length} onClick={() => go("sites")} />
      </div>
      <Card title="Latest enquiries">
        <Table head={["Source", "Status", "Received"]} empty={data.enquiries.length === 0 ? "No enquiries yet." : undefined}>
          {data.enquiries.slice(0, 5).map((e) => (
            <tr key={e.id}>
              <td className="px-3 py-2.5">{e.source}</td>
              <td className="px-3 py-2.5"><Badge value={e.status} /></td>
              <td className="px-3 py-2.5 text-white/50">{new Date(e.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}

function Enquiries({ onExpired }: { onExpired: () => void }) {
  const { error, setError, fail } = useFail(onExpired);
  const [items, setItems] = useState<Enquiry[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<string | null>(null);

  const load = useCallback(
    async (cursor?: string) => {
      setLoading(true);
      setError("");
      const r = await api<Paged<Enquiry>>("GET", `enquiries?limit=25${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ""}`);
      if (r.ok) {
        setItems((prev) => (cursor ? [...prev, ...r.data.items] : r.data.items));
        setNext(r.data.nextCursor);
      } else fail(r);
      setLoading(false);
    },
    [fail, setError],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  async function move(e: Enquiry, status: string) {
    const r = await api<Enquiry>("PUT", `enquiries/${e.id}/status`, { status });
    if (r.ok) setItems((prev) => prev.map((x) => (x.id === e.id ? r.data : x)));
    else fail(r);
  }

  return (
    <div className="space-y-4">
      <ErrorText>{error}</ErrorText>
      <Card>
        <Table head={["Source", "Status", "Received", ""]} empty={!loading && items.length === 0 ? "No enquiries yet." : undefined}>
          {items.map((e) => (
            <EnquiryRow key={e.id} e={e} open={open === e.id} toggle={() => setOpen(open === e.id ? null : e.id)} move={move} />
          ))}
        </Table>
        {next && <div className="pt-3"><button className={secondary} disabled={loading} onClick={() => load(next)}>Load more</button></div>}
      </Card>
    </div>
  );
}

function EnquiryRow({ e, open, toggle, move }: { e: Enquiry; open: boolean; toggle: () => void; move: (e: Enquiry, s: string) => void }) {
  return (
    <>
      <tr>
        <td className="px-3 py-2.5">{e.source}</td>
        <td className="px-3 py-2.5"><Badge value={e.status} /></td>
        <td className="px-3 py-2.5 text-white/50">{new Date(e.createdAt).toLocaleString()}</td>
        <td className="space-x-2 px-3 py-2.5 text-right">
          {(NEXT_STATUS[e.status] ?? []).map((s) => (
            <button key={s} className={s === "closed" ? danger : secondary} onClick={() => move(e, s)}>
              {s === "in_progress" ? (e.status === "resolved" ? "Reopen" : "Start") : s === "resolved" ? "Resolve" : "Close"}
            </button>
          ))}
          <button className={secondary} onClick={toggle}>{open ? "Hide" : "View"}</button>
        </td>
      </tr>
      {open && (
        <tr>
          <td colSpan={4} className="px-3 pb-4"><Json value={e.payload} /></td>
        </tr>
      )}
    </>
  );
}

const SAMPLE_SCHEMA = `{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "email": { "type": "string" }
  },
  "required": ["name", "email"]
}`;

function Forms({ onExpired }: { onExpired: () => void }) {
  const { error, setError, fail } = useFail(onExpired);
  const [items, setItems] = useState<Form[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"visual" | "json">("visual");
  const [fields, setFields] = useState<FieldDef[]>(starterFields);
  const [schema, setSchema] = useState(SAMPLE_SCHEMA);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState<Form | null>(null);
  const [structure, setStructure] = useState<string | null>(null);
  const [submissionsFor, setSubmissionsFor] = useState<Form | null>(null);

  const load = useCallback(
    async (cursor?: string) => {
      setLoading(true);
      setError("");
      const r = await api<Paged<Form>>("GET", `forms?limit=25${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ""}`);
      if (r.ok) {
        setItems((prev) => (cursor ? [...prev, ...r.data.items] : r.data.items));
        setNext(r.data.nextCursor);
      } else fail(r);
      setLoading(false);
    },
    [fail, setError],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  function switchMode(m: "visual" | "json") {
    if (m === mode) return;
    setError("");
    if (m === "json") {
      setSchema(JSON.stringify(fieldsToSchema(fields), null, 2));
    } else {
      try {
        const parsed = schemaToFields(JSON.parse(schema));
        if (!parsed) return setError("That schema uses nested or advanced structure the visual builder can't show.");
        setFields(parsed);
      } catch {
        return setError("The schema isn't valid JSON.");
      }
    }
    setMode(m);
  }

  async function create(e: FormEvent) {
    e.preventDefault();
    setError("");
    let jsonSchema: unknown;
    if (mode === "visual") {
      const problem = validateFields(fields);
      if (problem) return setError(problem);
      jsonSchema = fieldsToSchema(fields);
    } else {
      try {
        jsonSchema = JSON.parse(schema);
      } catch {
        return setError("The schema isn't valid JSON.");
      }
    }
    setBusy(true);
    const r = await api<Form>("POST", "forms", { name, jsonSchema });
    if (r.ok) {
      setSaved(r.data);
      setStructure(r.data.id);
      setName("");
      setFields(starterFields());
      void load();
    } else fail(r);
    setBusy(false);
  }

  function newVersion(f: Form) {
    const parsed = schemaToFields(f.jsonSchema);
    setName(f.name);
    setSaved(null);
    setError("");
    if (parsed) {
      setFields(parsed);
      setMode("visual");
    } else {
      setSchema(JSON.stringify(f.jsonSchema, null, 2));
      setMode("json");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function archive(f: Form) {
    if (!window.confirm(`Archive "${f.name}"? It will stop accepting submissions.`)) return;
    const r = await api("POST", `forms/${f.id}/archive`);
    if (r.ok) void load();
    else fail(r);
  }

  return (
    <div className="space-y-6">
      <ErrorText>{error}</ErrorText>
      {saved && (
        <Notice onDismiss={() => setSaved(null)}>
          <p>
            Saved <strong>{saved.name}</strong> as v{saved.version}. Its structure is shown below.
          </p>
        </Notice>
      )}
      <Card
        title="Create form"
        actions={
          <div className="flex gap-1">
            <button type="button" className={`${secondary} ${mode === "visual" ? "!border-[#5b7bff] !text-white" : ""}`} onClick={() => switchMode("visual")}>Visual</button>
            <button type="button" className={`${secondary} ${mode === "json" ? "!border-[#5b7bff] !text-white" : ""}`} onClick={() => switchMode("json")}>JSON</button>
          </div>
        }
      >
        <form onSubmit={create} className="space-y-4">
          <input className={input} required maxLength={200} placeholder="Form name (an existing name adds a new version)" value={name} onChange={(e) => setName(e.target.value)} />
          {mode === "visual" ? (
            <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              <FormBuilder fields={fields} onChange={setFields} />
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/40">Preview</p>
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <FormPreview fields={fields} />
                </div>
              </div>
            </div>
          ) : (
            <textarea className={`${input} h-56 font-mono text-xs`} spellCheck={false} value={schema} onChange={(e) => setSchema(e.target.value)} />
          )}
          <button className={primary} disabled={busy}>Create form</button>
        </form>
      </Card>

      <Card title="Forms">
        <Table head={["Name", "Version", "Status", "Created", ""]} empty={!loading && items.length === 0 ? "No forms yet." : undefined}>
          {items.map((f) => (
            <Fragment key={f.id}>
              <tr>
                <td className="px-3 py-2.5 font-medium">{f.name}</td>
                <td className="px-3 py-2.5">v{f.version}</td>
                <td className="px-3 py-2.5"><Badge value={f.status} /></td>
                <td className="px-3 py-2.5 text-white/50">{new Date(f.createdAt).toLocaleDateString()}</td>
                <td className="space-x-2 px-3 py-2.5 text-right">
                  <button className={secondary} onClick={() => setStructure(structure === f.id ? null : f.id)}>{structure === f.id ? "Hide structure" : "Structure"}</button>
                  <button className={secondary} onClick={() => setSubmissionsFor(submissionsFor?.id === f.id ? null : f)}>Submissions</button>
                  {f.status === "active" && <button className={secondary} onClick={() => newVersion(f)}>New version</button>}
                  <CopyButton text={f.id} label="Copy ID" />
                  {f.status === "active" && <button className={danger} onClick={() => archive(f)}>Archive</button>}
                </td>
              </tr>
              {structure === f.id && (
                <tr>
                  <td colSpan={5} className="px-3 pb-5 pt-2">
                    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <FormStructure name={f.name} version={f.version} status={f.status} schema={f.jsonSchema} />
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </Table>
        {next && <div className="pt-3"><button className={secondary} disabled={loading} onClick={() => load(next)}>Load more</button></div>}
      </Card>

      {submissionsFor && <Submissions form={submissionsFor} onExpired={onExpired} />}
    </div>
  );
}

function Submissions({ form, onExpired }: { form: Form; onExpired: () => void }) {
  const { error, fail } = useFail(onExpired);
  const [items, setItems] = useState<Submission[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<string | null>(null);

  const load = useCallback(
    async (cursor?: string) => {
      setLoading(true);
      const r = await api<Paged<Submission>>("GET", `forms/${form.id}/submissions?limit=25${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ""}`);
      if (r.ok) {
        setItems((prev) => (cursor ? [...prev, ...r.data.items] : r.data.items));
        setNext(r.data.nextCursor);
      } else fail(r);
      setLoading(false);
    },
    [form.id, fail],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  return (
    <Card title={`Submissions — ${form.name}`}>
      <ErrorText>{error}</ErrorText>
      <Table head={["Received", "Source", ""]} empty={!loading && items.length === 0 ? "No submissions yet." : undefined}>
        {items.map((s) => (
          <Fragment key={s.id}>
            <tr>
              <td className="px-3 py-2.5">{new Date(s.createdAt).toLocaleString()}</td>
              <td className="px-3 py-2.5 text-white/50">{s.createdByUserId ? "Staff" : "Website"}</td>
              <td className="px-3 py-2.5 text-right"><button className={secondary} onClick={() => setOpen(open === s.id ? null : s.id)}>{open === s.id ? "Hide" : "View"}</button></td>
            </tr>
            {open === s.id && (
              <tr><td colSpan={3} className="px-3 pb-4"><Json value={s.payload} /></td></tr>
            )}
          </Fragment>
        ))}
      </Table>
      {next && <div className="pt-3"><button className={secondary} disabled={loading} onClick={() => load(next)}>Load more</button></div>}
    </Card>
  );
}

function Sites({ onExpired }: { onExpired: () => void }) {
  const { error, setError, fail } = useFail(onExpired);
  const [sites, setSites] = useState<Site[]>([]);
  const [forms, setForms] = useState<Form[]>([]);
  const [key, setKey] = useState<string | null>(null);
  const [editing, setEditing] = useState<Site | "new" | null>(null);

  const load = useCallback(async () => {
    setError("");
    const [s, f] = await Promise.all([api<Site[]>("GET", "public-sites"), api<Paged<Form>>("GET", "forms?limit=100")]);
    if (!s.ok) return fail(s);
    if (!f.ok) return fail(f);
    setSites(s.data);
    setForms(f.data.items.filter((x) => x.status === "active"));
  }, [fail, setError]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  async function rotate(s: Site) {
    if (!window.confirm("Rotate this key? The new key is shown once.")) return;
    const r = await api<{ rawKey: string }>("POST", `public-sites/${s.id}/rotate`);
    if (r.ok) {
      setKey(r.data.rawKey);
      void load();
    } else fail(r);
  }

  async function revoke(s: Site) {
    if (!window.confirm("Revoke this key? Websites using it stop working immediately.")) return;
    const r = await api("POST", `public-sites/${s.id}/revoke`);
    if (r.ok) void load();
    else fail(r);
  }

  return (
    <div className="space-y-6">
      <ErrorText>{error}</ErrorText>
      {key && (
        <Notice onDismiss={() => setKey(null)}>
          <p>Site key (shown once — copy it now):</p>
          <p className="flex items-center gap-2"><code className="select-all break-all rounded bg-white/10 px-2 py-0.5">{key}</code><CopyButton text={key} /></p>
          <p className="text-xs">Send it as the <code>X-Site-Key</code> header from your website.</p>
        </Notice>
      )}
      <Card title="Site keys" actions={<button className={primary} onClick={() => setEditing("new")}>Issue key</button>}>
        <Table head={["Status", "Allowed origins", "Forms", "Quota / min", "Last used", ""]} empty={sites.length === 0 ? "No site keys yet." : undefined}>
          {sites.map((s) => (
            <tr key={s.id}>
              <td className="px-3 py-2.5"><Badge value={s.status} /></td>
              <td className="px-3 py-2.5">{s.allowedOrigins.join(", ") || "—"}</td>
              <td className="px-3 py-2.5">{s.allowedFormIds.map((id) => forms.find((f) => f.id === id)?.name ?? id.slice(0, 8)).join(", ") || "—"}</td>
              <td className="px-3 py-2.5">{s.quotaPerMinute}</td>
              <td className="px-3 py-2.5 text-white/50">{s.lastUsedAt ? new Date(s.lastUsedAt).toLocaleString() : "Never"}</td>
              <td className="space-x-2 px-3 py-2.5 text-right">
                {s.status === "active" && (
                  <>
                    <button className={secondary} onClick={() => setEditing(s)}>Edit</button>
                    <button className={secondary} onClick={() => rotate(s)}>Rotate</button>
                    <button className={danger} onClick={() => revoke(s)}>Revoke</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </Table>
      </Card>
      {editing && (
        <SiteForm
          site={editing === "new" ? null : editing}
          forms={forms}
          onCancel={() => setEditing(null)}
          onSaved={(raw) => { setEditing(null); if (raw) setKey(raw); void load(); }}
          onError={fail}
        />
      )}
    </div>
  );
}

function SiteForm({ site, forms, onCancel, onSaved, onError }: { site: Site | null; forms: Form[]; onCancel: () => void; onSaved: (rawKey?: string) => void; onError: (r: Fail) => void }) {
  const [origins, setOrigins] = useState(site?.allowedOrigins.join("\n") ?? "");
  const [formIds, setFormIds] = useState<string[]>(site?.allowedFormIds ?? []);
  const [quota, setQuota] = useState(site ? String(site.quotaPerMinute) : "");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    const allowedOrigins = origins.split("\n").map((o) => o.trim()).filter(Boolean);
    const q = quota ? Number(quota) : undefined;
    if (site) {
      const r = await api("PUT", `public-sites/${site.id}`, { allowedOrigins, allowedFormIds: formIds, quotaPerMinute: q ?? site.quotaPerMinute });
      if (r.ok) onSaved();
      else onError(r);
    } else {
      const r = await api<{ rawKey: string }>("POST", "public-sites", { allowedOrigins, allowedFormIds: formIds, ...(q ? { quotaPerMinute: q } : {}) });
      if (r.ok) onSaved(r.data.rawKey);
      else onError(r);
    }
    setBusy(false);
  }

  return (
    <Card title={site ? "Edit site key" : "Issue site key"}>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-white/60">Allowed origins (one per line)</label>
          <textarea className={`${input} h-24 font-mono text-xs`} placeholder="https://www.example.com" value={origins} onChange={(e) => setOrigins(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-white/60">Forms this key may submit to</label>
          <div className="flex flex-wrap gap-3">
            {forms.length === 0 && <p className="text-sm text-white/40">Create a form first.</p>}
            {forms.map((f) => (
              <label key={f.id} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={formIds.includes(f.id)} onChange={(e) => setFormIds(e.target.checked ? [...formIds, f.id] : formIds.filter((x) => x !== f.id))} />
                {f.name}
              </label>
            ))}
          </div>
        </div>
        <div className="max-w-xs">
          <label className="mb-1 block text-xs font-medium text-white/60">Requests per minute (optional)</label>
          <input className={input} type="number" min={1} value={quota} onChange={(e) => setQuota(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <button className={primary} disabled={busy}>{site ? "Save" : "Issue key"}</button>
          <button type="button" className={secondary} onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </Card>
  );
}
