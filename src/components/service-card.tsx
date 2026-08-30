import { Link } from "@tanstack/react-router";
import type { Service } from "@/lib/demo-data";
import { DeptTag } from "@/components/ui-bits";
import { isImplemented } from "@/lib/form-schemas";

export function ServiceCard({ service, tag }: { service: Service; tag?: string }) {
  const live = isImplemented(service.id);
  return (
    <div
      className={
        "flex flex-col rounded-sm border bg-ink-900 p-5 transition-transform " +
        (live ? "border-line hover:-translate-y-0.5" : "border-line/60 opacity-70")
      }
    >
      <div className="flex items-center justify-between">
        <DeptTag id={service.department} />
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper-dim">
          {tag ?? (live ? (service.popular ? "Popular" : "Live") : "Coming soon")}
        </span>
      </div>
      <h3 className="mt-3 font-display text-xl font-medium text-paper">{service.name}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-paper-dim">{service.description}</p>
      <div className="mt-4 space-y-1.5 border-t border-line pt-3 font-mono text-[11px]">
        <div className="flex items-center justify-between">
          <span className="text-paper-dim">Documents</span>
          <span className="text-paper">{service.documents.length} required</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-paper-dim">Processing</span>
          <span className="text-paper">{service.processingTime}</span>
        </div>
      </div>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {service.documents.slice(0, 4).map((d) => (
          <li
            key={d}
            className="rounded-sm bg-ink-700 px-2 py-0.5 font-mono text-[10px] text-paper-dim"
          >
            {d}
          </li>
        ))}
      </ul>
      <div className="mt-auto" />
      {live ? (
        <Link
          to="/apply/$serviceId"
          params={{ serviceId: service.id }}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-sm border border-line px-3 py-2 font-mono text-[12px] uppercase tracking-[0.08em] text-paper transition-colors hover:border-saffron hover:text-saffron-soft"
        >
          Apply Online <span aria-hidden>&rarr;</span>
        </Link>
      ) : (
        <span className="mt-4 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-sm border border-dashed border-line px-3 py-2 font-mono text-[12px] uppercase tracking-[0.08em] text-paper-dim">
          Coming Soon
        </span>
      )}
    </div>
  );
}
