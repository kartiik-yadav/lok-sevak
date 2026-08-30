export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1320px] px-6 py-8 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-8 place-items-center rounded-sm bg-saffron font-display text-base font-semibold text-ink">
              L
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper-dim">
              LOK SEVAK &middot; A Smart India Hackathon Prototype
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-paper-dim">
            <span className="inline-flex items-center gap-1.5 rounded-sm bg-ink-700 px-2 py-1 ring-1 ring-inset ring-line">
              <span className="size-1.5 rounded-full bg-saffron" /> Prototype Mode
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-sm bg-ink-700 px-2 py-1 ring-1 ring-inset ring-line">
              <span className="size-1.5 rounded-full bg-signal" /> Simulated APIs
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-sm bg-ink-700 px-2 py-1 ring-1 ring-inset ring-line">
              <span className="size-1.5 rounded-full bg-info" /> Demo Data Only
            </span>
          </div>
        </div>
        <p className="mt-6 max-w-[60ch] text-sm leading-relaxed text-paper-dim">
          Exploring LOK SEVAK using simulated citizen data. No real personal data is required. Acts
          as an interoperability layer enabling fragmented government systems to communicate through
          standardized APIs and a common citizen data format.
        </p>
      </div>
    </footer>
  );
}
