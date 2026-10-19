"use client";

import { useState } from "react";
import { Badge, Json, danger, input, secondary } from "@/components/console/ui";

/**
 * Visual form builder. It only emits the JSON Schema subset the API accepts
 * (type, properties, required, enum, length/range limits, pattern, and the built-in
 * `format` values — never `$ref`).
 * Labels and widget kinds ride along in `title` / `x-input`, which the validator ignores,
 * so a saved form can be reopened in the builder.
 */
export type FieldType = "text" | "textarea" | "email" | "phone" | "url" | "number" | "date" | "datetime" | "select" | "checkbox";

export type FieldDef = {
  id: string;
  key: string;
  label: string;
  type: FieldType;
  required: boolean;
  options: string; // select: one per line
  min: string; // number: minimum
  max: string; // number: maximum
};

export const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: "text", label: "Short text" },
  { value: "textarea", label: "Long text" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "url", label: "Website (URL)" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "datetime", label: "Date & time" },
  { value: "select", label: "Dropdown" },
  { value: "checkbox", label: "Checkbox" },
];

const PHONE_PATTERN = "^[0-9+()\\-\\s]{6,20}$";
const MAX_TEXT = 2000;

let counter = 0;
const uid = () => `f${Date.now().toString(36)}${counter++}`;

export const newField = (over: Partial<FieldDef> = {}): FieldDef => ({
  id: uid(),
  key: "",
  label: "",
  type: "text",
  required: false,
  options: "",
  min: "",
  max: "",
  ...over,
});

export const starterFields = (): FieldDef[] => [
  newField({ key: "name", label: "Name", required: true }),
  newField({ key: "email", label: "Email", type: "email", required: true }),
  newField({ key: "message", label: "Message", type: "textarea" }),
];

/** "Full name" -> "fullName" */
export function keyFromLabel(label: string): string {
  const words = label.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(" ").filter(Boolean);
  return words.map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1))).join("");
}

const optionList = (f: FieldDef) => f.options.split("\n").map((o) => o.trim()).filter(Boolean);

export function fieldsToSchema(fields: FieldDef[]): Record<string, unknown> {
  const properties: Record<string, unknown> = {};
  for (const f of fields) {
    const title = f.label.trim() || f.key;
    switch (f.type) {
      case "text":
        properties[f.key] = { type: "string", title, maxLength: 200 };
        break;
      case "textarea":
        properties[f.key] = { type: "string", title, "x-input": "textarea", maxLength: MAX_TEXT };
        break;
      case "email":
        properties[f.key] = { type: "string", title, "x-input": "email", maxLength: 254, format: "email" };
        break;
      case "phone":
        properties[f.key] = { type: "string", title, "x-input": "phone", pattern: PHONE_PATTERN };
        break;
      case "date":
        properties[f.key] = { type: "string", title, "x-input": "date", format: "date" };
        break;
      case "datetime":
        properties[f.key] = { type: "string", title, "x-input": "datetime", format: "date-time" };
        break;
      case "url":
        properties[f.key] = { type: "string", title, "x-input": "url", maxLength: MAX_TEXT, format: "uri" };
        break;
      case "number":
        properties[f.key] = {
          type: "number",
          title,
          ...(f.min !== "" ? { minimum: Number(f.min) } : {}),
          ...(f.max !== "" ? { maximum: Number(f.max) } : {}),
        };
        break;
      case "select":
        properties[f.key] = { type: "string", title, enum: optionList(f) };
        break;
      case "checkbox":
        properties[f.key] = { type: "boolean", title };
        break;
    }
  }
  return {
    type: "object",
    properties,
    required: fields.filter((f) => f.required).map((f) => f.key),
    additionalProperties: false,
  };
}

/** Returns null when the schema uses structure the builder can't represent (nesting, arrays, ...). */
export function schemaToFields(schema: unknown): FieldDef[] | null {
  const s = schema as { type?: string; properties?: Record<string, Record<string, unknown>>; required?: string[] } | null;
  if (!s || s.type !== "object" || !s.properties) return null;
  const required = new Set(s.required ?? []);
  const out: FieldDef[] = [];
  for (const [key, p] of Object.entries(s.properties)) {
    const label = typeof p.title === "string" ? p.title : key;
    const base = { key, label, required: required.has(key) };
    if (p.type === "boolean") out.push(newField({ ...base, type: "checkbox" }));
    else if (p.type === "number" || p.type === "integer")
      out.push(newField({ ...base, type: "number", min: p.minimum != null ? String(p.minimum) : "", max: p.maximum != null ? String(p.maximum) : "" }));
    else if (p.type === "string" && Array.isArray(p.enum)) out.push(newField({ ...base, type: "select", options: (p.enum as string[]).join("\n") }));
    else if (p.type === "string") {
      const kind = p["x-input"];
      const known: FieldType[] = ["textarea", "email", "phone", "url", "date", "datetime"];
      const byFormat: Record<string, FieldType> = { email: "email", date: "date", "date-time": "datetime", uri: "url" };
      const type: FieldType = known.includes(kind as FieldType) ? (kind as FieldType) : (byFormat[String(p.format)] ?? "text");
      out.push(newField({ ...base, type }));
    } else return null;
  }
  return out;
}

/** First problem with the field list, or null when it can be submitted. */
export function validateFields(fields: FieldDef[]): string | null {
  if (fields.length === 0) return "Add at least one field.";
  const seen = new Set<string>();
  for (const f of fields) {
    if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(f.key)) return `"${f.label || "A field"}" needs a key of letters, digits or underscores, starting with a letter.`;
    if (seen.has(f.key)) return `The key "${f.key}" is used twice.`;
    seen.add(f.key);
    if (f.type === "select" && optionList(f).length === 0) return `"${f.label || f.key}" needs at least one option.`;
    if (f.type === "number" && f.min !== "" && f.max !== "" && Number(f.min) > Number(f.max)) return `"${f.label || f.key}" has a minimum above its maximum.`;
  }
  return null;
}

export function FormBuilder({ fields, onChange }: { fields: FieldDef[]; onChange: (f: FieldDef[]) => void }) {
  const update = (id: string, patch: Partial<FieldDef>) => onChange(fields.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= fields.length) return;
    const next = [...fields];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {fields.map((f, i) => (
        <div key={f.id} className="rounded-xl border border-white/10 bg-black/20 p-3">
          <div className="grid gap-2 md:grid-cols-[1.4fr_1fr_1fr_auto]">
            <input
              className={input}
              placeholder="Label (e.g. Full name)"
              value={f.label}
              onChange={(e) => {
                // keep the key following the label until the user edits the key by hand
                const follow = f.key === "" || f.key === keyFromLabel(f.label);
                update(f.id, { label: e.target.value, ...(follow ? { key: keyFromLabel(e.target.value) } : {}) });
              }}
            />
            <input className={`${input} font-mono text-xs`} placeholder="key" value={f.key} onChange={(e) => update(f.id, { key: e.target.value.trim() })} />
            <select className={input} value={f.type} onChange={(e) => update(f.id, { type: e.target.value as FieldType })}>
              {FIELD_TYPES.map((t) => (
                <option key={t.value} value={t.value} className="bg-slate-900">
                  {t.label}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-1.5">
              <button type="button" className={secondary} onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">↑</button>
              <button type="button" className={secondary} onClick={() => move(i, 1)} disabled={i === fields.length - 1} aria-label="Move down">↓</button>
              <button type="button" className={danger} onClick={() => onChange(fields.filter((x) => x.id !== f.id))} aria-label="Remove field">✕</button>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={f.required} onChange={(e) => update(f.id, { required: e.target.checked })} />
              Required
            </label>
            {f.type === "number" && (
              <>
                <input className={`${input} !w-28`} type="number" placeholder="Min" value={f.min} onChange={(e) => update(f.id, { min: e.target.value })} />
                <input className={`${input} !w-28`} type="number" placeholder="Max" value={f.max} onChange={(e) => update(f.id, { max: e.target.value })} />
              </>
            )}
          </div>
          {f.type === "select" && (
            <textarea className={`${input} mt-2 h-20 text-xs`} placeholder="One option per line" value={f.options} onChange={(e) => update(f.id, { options: e.target.value })} />
          )}
        </div>
      ))}
      <button type="button" className={secondary} onClick={() => onChange([...fields, newField()])}>
        + Add field
      </button>
    </div>
  );
}

/** What a visitor would see, rendered read-only. */
export function FormPreview({ fields }: { fields: FieldDef[] }) {
  if (fields.length === 0) return <p className="text-sm text-white/40">No fields yet.</p>;
  return (
    <div className="space-y-3">
      {fields.map((f) => (
        <div key={f.id}>
          {f.type !== "checkbox" && (
            <label className="mb-1 block text-xs font-medium text-white/70">
              {f.label || f.key || "Untitled"}
              {f.required && <span className="text-red-300"> *</span>}
            </label>
          )}
          {f.type === "textarea" ? (
            <textarea disabled className={`${input} h-20`} />
          ) : f.type === "select" ? (
            <select disabled className={input}>
              <option className="bg-slate-900">Select…</option>
              {optionList(f).map((o) => (
                <option key={o} className="bg-slate-900">{o}</option>
              ))}
            </select>
          ) : f.type === "checkbox" ? (
            <label className="flex items-center gap-2 text-sm text-white/80">
              <input type="checkbox" disabled />
              {f.label || f.key || "Untitled"}
              {f.required && <span className="text-red-300"> *</span>}
            </label>
          ) : (
            <input disabled className={input} type={f.type === "number" ? "number" : f.type === "date" ? "date" : f.type === "datetime" ? "datetime-local" : "text"} placeholder={f.type === "email" ? "name@example.com" : f.type === "url" ? "https://" : ""} />
          )}
        </div>
      ))}
    </div>
  );
}

const typeLabel = (t: FieldType) => FIELD_TYPES.find((x) => x.value === t)?.label ?? t;

function constraint(f: FieldDef): string {
  if (f.type === "select") return optionList(f).join(", ");
  if (f.type === "number") return [f.min !== "" && `min ${f.min}`, f.max !== "" && `max ${f.max}`].filter(Boolean).join(", ");
  return "";
}

/** The saved structure of a form: field table, visitor preview and the raw JSON Schema. */
export function FormStructure({ name, version, status, schema }: { name: string; version: number; status: string; schema: unknown }) {
  const fields = schemaToFields(schema);
  const [tab, setTab] = useState<"fields" | "preview" | "json">(fields ? "fields" : "json");
  const tabs = (fields ? ["fields", "preview", "json"] : ["json"]) as ("fields" | "preview" | "json")[];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-base font-semibold text-white">{name}</h3>
        <span className="text-xs text-white/50">v{version}</span>
        <Badge value={status} />
        <div className="ml-auto flex gap-1">
          {tabs.map((t) => (
            <button key={t} type="button" onClick={() => setTab(t)} className={`${secondary} ${tab === t ? "!border-[#5b7bff] !text-white" : ""}`}>
              {t === "fields" ? "Fields" : t === "preview" ? "Preview" : "JSON"}
            </button>
          ))}
        </div>
      </div>
      {!fields && <p className="text-xs text-amber-300">This form uses nested or advanced structure, so it is shown as JSON only.</p>}
      {tab === "fields" && fields && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-white/40">
              <tr>
                <th className="px-3 py-2 font-medium">Label</th>
                <th className="px-3 py-2 font-medium">Key</th>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">Required</th>
                <th className="px-3 py-2 font-medium">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {fields.map((f) => (
                <tr key={f.id}>
                  <td className="px-3 py-2">{f.label}</td>
                  <td className="px-3 py-2 font-mono text-xs text-white/60">{f.key}</td>
                  <td className="px-3 py-2">{typeLabel(f.type)}</td>
                  <td className="px-3 py-2">{f.required ? "Yes" : "No"}</td>
                  <td className="px-3 py-2 text-white/50">{constraint(f) || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === "preview" && fields && <div className="max-w-md"><FormPreview fields={fields} /></div>}
      {tab === "json" && <Json value={schema} />}
    </div>
  );
}
