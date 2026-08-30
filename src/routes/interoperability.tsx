import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/ui-bits";
import { departments, demoCitizen } from "@/lib/demo-data";
import { toCommonFormat } from "@/lib/mock-api";

export const Route = createFileRoute("/interoperability")({
  head: () => ({
    meta: [
      { title: "Interoperability Hub — LOK SEVAK" },
      {
        name: "description",
        content:
          "How LOK SEVAK bridges fragmented government systems: simulated department APIs, a data transformation layer and a common citizen data format.",
      },
      {
        property: "og:title",
        content: "Interoperability Hub — LOK SEVAK",
      },
      {
        property: "og:description",
        content:
          "An integration gateway that normalises JSON, XML and SOAP department systems into one citizen format.",
      },
    ],
  }),
  component: HubPage,
});

const flow = [
  {
    label: "Different Government Systems",
    detail: "JSON · XML · SOAP · CSV",
  },
  {
    label: "API Integration Gateway",
    detail: "Auth, routing, retries, audit log",
  },
  {
    label: "Data Transformation Layer",
    detail: "Schema mapping & validation",
  },
  {
    label: "Common Citizen Data Format",
    detail: "CCDF v1.0",
  },
  {
    label: "LOK SEVAK",
    detail: "Business logic & AI navigator",
  },
  {
    label: "Unified Citizen Experience",
    detail: "One profile, one journey",
  },
];

function HubPage() {
  const ccdf = toCommonFormat(demoCitizen);

  const connectedDepartments = departments.filter((d) => d.connected).length;

  return (
    <div className="mx-auto max-w-[1320px] px-6 py-14 sm:px-8">
      <SectionHeading
        eyebrow="Integration Layer"
        title="Interoperability Hub"
        right={
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-saffron/12 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-saffron-soft ring-1 ring-inset ring-saffron/30">
            <span className="size-1.5 rounded-full bg-saffron" />
            Simulated Government APIs
          </span>
        }
      />

      <p className="mt-5 max-w-[72ch] text-base leading-relaxed text-paper-dim">
        LOK SEVAK acts as an interoperability layer that enables fragmented government digital
        systems to communicate through standardized APIs and a common data format.
      </p>

      {/* Connected Department Systems */}
      <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="lks-label">Connected Department Systems</div>

          <p className="mt-1 max-w-[70ch] text-sm text-paper-dim">
            Each department uses its own system and data format. The integration gateway converts
            them into a common structure that can be used by the LOK SEVAK platform.
          </p>
        </div>

        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper-dim">
          {connectedDepartments}/{departments.length} Connected
        </span>
      </div>

      {/* Department Cards */}
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {departments.map((d) => (
          <div key={d.id} className="rounded-sm border border-line bg-ink-900 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-display text-lg font-medium text-paper">{d.systemName}</div>

                <div className="mt-1 font-mono text-[10px] text-paper-dim">{d.endpoint}</div>
              </div>

              <span
                className={
                  "inline-flex shrink-0 items-center gap-1.5 rounded-sm px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ring-1 ring-inset " +
                  (d.connected
                    ? "bg-signal/10 text-signal ring-signal/25"
                    : "bg-warn/10 text-warn ring-warn/25")
                }
              >
                <span
                  className={`size-1.5 rounded-full lks-pulse ${
                    d.connected ? "bg-signal" : "bg-warn"
                  }`}
                />

                {d.connected ? "Connected" : "Offline"}
              </span>
            </div>

            <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-3 font-mono text-[11px]">
              <div>
                <dt className="lks-label">API Status</dt>

                <dd className={`mt-1 ${d.apiStatus === "Active" ? "text-signal" : "text-warn"}`}>
                  {d.apiStatus}
                </dd>
              </div>

              <div>
                <dt className="lks-label">Data Format</dt>

                <dd className="mt-1 text-paper">{d.dataFormat}</dd>
              </div>

              <div>
                <dt className="lks-label">Last Sync</dt>

                <dd className="mt-1 text-paper">{d.lastSync}</dd>
              </div>
            </dl>

            {d.dataFormat !== "JSON" && (
              <div className="mt-3 rounded-sm border border-saffron/25 bg-saffron/5 px-3 py-2 font-mono text-[10px] text-saffron-soft">
                {d.dataFormat} → converted through Data Transformation Layer → Common Citizen Data
                Format
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Data Flow + CCDF */}
      <div className="mt-14 grid gap-8 lg:grid-cols-12">
        {/* Animated Data Flow */}
        <div className="lg:col-span-6">
          <div className="lks-label">Animated Data Flow</div>

          <ol className="mt-4 space-y-0">
            {flow.map((f, i) => (
              <li key={f.label}>
                <div
                  className={
                    "rounded-sm border px-4 py-3 " +
                    (i === flow.length - 1
                      ? "border-signal/40 bg-signal/5"
                      : i === 4
                        ? "border-saffron/40 bg-saffron/5"
                        : "border-line bg-ink-900")
                  }
                >
                  <div className="font-display text-base font-medium text-paper">{f.label}</div>

                  <div className="font-mono text-[10px] text-paper-dim">{f.detail}</div>
                </div>

                {i < flow.length - 1 && (
                  <div className="mx-auto h-6 w-px bg-line lks-flow-line" aria-hidden />
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* CCDF Data */}
        <div className="lg:col-span-6">
          <div className="lks-label">Common Citizen Data Format (CCDF v1.0)</div>

          <pre className="mt-4 overflow-x-auto rounded-sm border border-line bg-ink-900 p-4 font-mono text-[11px] leading-relaxed text-paper-dim">
            {JSON.stringify(ccdf, null, 2)}
          </pre>

          {/* Architecture */}
          <div className="mt-4 rounded-sm border border-line bg-ink-900 p-4">
            <div className="lks-label">Architecture</div>

            <div className="mt-2 font-mono text-[11px] leading-relaxed text-paper-dim">
              Frontend → Business Logic → Integration Layer → Government API Connectors
            </div>

            <p className="mt-2 text-sm leading-relaxed text-paper-dim">
              Connectors are mocked for this prototype. Replacing them with real department
              endpoints requires no change to the citizen-facing application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
