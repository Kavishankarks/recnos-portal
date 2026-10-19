import type { ReactNode } from "react";

/** Shared building blocks for the superadmin and tenant consoles: a clean light surface, no site chrome. */

export const input =
  "w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-white/35 outline-none transition focus:border-[#5b7bff] focus:bg-white/[0.07] focus:ring-2 focus:ring-[#3054ff]/30 disabled:opacity-60";
export const primary =
  "rounded-xl bg-gradient-to-b from-[#4a6bff] to-[#3054ff] px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#3054ff]/25 transition hover:brightness-110 disabled:opacity-50";
export const secondary =
  "rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white disabled:opacity-50";
export const danger =
  "rounded-lg border border-red-400/20 bg-red-500/5 px-3 py-1.5 text-xs font-medium text-red-300 transition hover:bg-red-500/15 disabled:opacity-50";

export function Shell({ title, subtitle, actions, children }: { title: string; subtitle?: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#070a12] font-instrument-sans text-slate-200">
      <div aria-hidden className="pointer-events-none fixed inset-0 bg-[radial-gradient(60rem_30rem_at_85%_-10%,rgba(48,84,255,0.22),transparent),radial-gradient(40rem_25rem_at_-5%_110%,rgba(124,92,255,0.14),transparent)]" />
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#070a12]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#4a6bff] to-[#7c5cff] text-sm font-semibold text-white shadow-lg shadow-[#3054ff]/30">R</span>
            <div>
              <h1 className="text-base font-semibold leading-tight tracking-tight text-white">{title}</h1>
              {subtitle && <p className="text-xs text-white/45">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">{actions}</div>
        </div>
      </header>
      <div className="relative mx-auto max-w-6xl px-6 py-8">{children}</div>
    </div>
  );
}

export function Card({ title, actions, children, className = "" }: { title?: string; actions?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-white/10 bg-white/[0.04] shadow-xl shadow-black/20 backdrop-blur-md ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
          <h2 className="text-sm font-semibold text-white">{title}</h2>
          <div className="flex gap-2">{actions}</div>
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

const BADGE: Record<string, string> = {
  active: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
  new: "bg-blue-400/10 text-blue-300 ring-blue-400/20",
  in_progress: "bg-amber-400/10 text-amber-300 ring-amber-400/20",
  resolved: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
  closed: "bg-white/5 text-white/50 ring-white/10",
  suspended: "bg-red-400/10 text-red-300 ring-red-400/20",
  revoked: "bg-red-400/10 text-red-300 ring-red-400/20",
  archived: "bg-white/5 text-white/50 ring-white/10",
};

export function Badge({ value }: { value: string }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${BADGE[value.toLowerCase()] ?? "bg-white/5 text-white/50 ring-white/10"}`}>
      {value.replace(/_/g, " ")}
    </span>
  );
}

export function ErrorText({ children }: { children?: ReactNode }) {
  return children ? (
    <p role="alert" className="rounded-xl border border-red-400/20 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-200">
      {children}
    </p>
  ) : null;
}

export function Notice({ children, onDismiss }: { children: ReactNode; onDismiss: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-3.5 text-sm text-emerald-100">
      <div className="space-y-1">{children}</div>
      <button className={secondary} onClick={onDismiss}>
        Dismiss
      </button>
    </div>
  );
}

export function Table({ head, children, empty }: { head: string[]; children: ReactNode; empty?: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase tracking-wide text-white/40">
          <tr>
            {head.map((h, i) => (
              <th key={i} className="px-3 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">{children}</tbody>
      </table>
      {empty && <p className="px-3 py-6 text-center text-sm text-white/35">{empty}</p>}
    </div>
  );
}

export function Json({ value }: { value: unknown }) {
  return <pre className="max-h-72 overflow-auto rounded-xl border border-white/10 bg-black/40 p-3 text-xs leading-relaxed text-slate-200">{JSON.stringify(value, null, 2)}</pre>;
}

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  return (
    <button type="button" className={secondary} onClick={() => navigator.clipboard?.writeText(text)}>
      {label}
    </button>
  );
}
