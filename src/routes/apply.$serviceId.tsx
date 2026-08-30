import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { DeptTag, PrimaryButton, SectionHeading } from "@/components/ui-bits";
import { departmentById, serviceById, services } from "@/lib/demo-data";
import { gatewaySteps, submitToDepartment } from "@/lib/mock-api";
import {
  allFields,
  getServiceForm,
  isImplemented,
  validateField,
  type FieldDef,
  type SectionDef,
} from "@/lib/form-schemas";
import { downloadApplicationPdf, applicationPdfDataUri } from "@/lib/application-pdf";
import { useAppState, type DocStatus } from "@/state/app-state";

export const Route = createFileRoute("/apply/$serviceId")({
  head: ({ params }) => {
    const service = serviceById(params.serviceId);
    const name = service ? service.name : "Application";
    return {
      meta: [
        { title: `${name} — Online Application | LOK SEVAK` },
        {
          name: "description",
          content: `Complete the online ${name.toLowerCase()} application: profile auto-fill, document checklist, declaration and downloadable application preview.`,
        },
        { property: "og:title", content: `${name} — Online Application | LOK SEVAK` },
        {
          property: "og:description",
          content: "A government-style multi-step application, auto-filled from your citizen profile.",
        },
      ],
    };
  },
  component: ApplyPage,
});

const STEPS = [
  "Applicant Details",
  "Service Details",
  "Documents",
  "Review",
  "Application Preview",
];

function todayStr() {
  return new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function makeReference(dept: string) {
  const p: Record<string, string> = {
    revenue: "REV",
    education: "EDU",
    municipal: "MUN",
    welfare: "SWD",
  };
  return `LS/${p[dept] ?? "GEN"}/${new Date().getFullYear()}/${Math.floor(Math.random() * 900000) + 100000}`;
}

function ApplyPage() {
  const { serviceId } = Route.useParams();
  const service = serviceById(serviceId) ?? services[0]!;
  const dept = departmentById(service.department);
  const form = getServiceForm(service.id);
  const navigate = useNavigate();
  const { profile, addApplication, markRecent, setJourneyStep, drafts, saveDraft, clearDraft } =
    useAppState();

  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [modified, setModified] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [documents, setDocuments] = useState<Record<string, DocStatus>>({});
  const [declared, setDeclared] = useState(false);
  const [reference, setReference] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [phase, setPhase] = useState<"form" | "sending" | "done">("form");
  const [gatewayIndex, setGatewayIndex] = useState(0);
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const gateway = useMemo(() => gatewaySteps(service.department), [service.department]);

  // Initialise from profile + saved draft
  useEffect(() => {
    if (!form) return;
    const base: Record<string, string> = {};
    for (const f of allFields(form)) {
      base[f.key] = f.profileKey ? String(profile[f.profileKey] ?? "") : "";
    }
    const docs: Record<string, DocStatus> = {};
    for (const d of form.documents) {
      const owned = profile.documents.some(
        (pd) => d.toLowerCase().includes(pd.name.toLowerCase().split(" ")[0]!.toLowerCase()),
      );
      docs[d] = owned ? "Available" : "Required";
    }
    const draft = drafts[service.id];
    if (draft) {
      setValues({ ...base, ...draft.values });
      setModified(draft.modified);
      setDocuments({ ...docs, ...draft.documents });
      setDeclared(draft.declared);
      setStep(Math.min(draft.step, 3));
      setReference(draft.reference);
      setToast(`Draft restored — saved ${draft.savedAt}`);
    } else {
      setValues(base);
      setDocuments(docs);
      setReference(makeReference(service.department));
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service.id, profile]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3000);
    return () => window.clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (phase !== "sending") return;
    if (gatewayIndex >= gateway.length) {
      const app = submitToDepartment(
        service,
        reference,
        values,
        documents,
        declared,
      );

      addApplication(app);

      markRecent(service.id);

      // Final journey step = Track Application
      setJourneyStep(5);

      clearDraft(service.id);

      const t = window.setTimeout(
        () => setPhase("done"),
        500,
      );

      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setGatewayIndex((i) => i + 1), 700);
    return () => window.clearTimeout(t);
  }, [phase, gatewayIndex, gateway.length, service, addApplication, markRecent, setJourneyStep, clearDraft]);

  if (!form || !isImplemented(service.id)) {
    return (
      <div className="mx-auto max-w-[900px] px-6 py-20 text-center sm:px-8">
        <div className="lks-label">Service Not Yet Available</div>
        <h1 className="mt-3 font-display text-3xl text-paper">{service.name}</h1>
        <p className="mt-3 text-sm text-paper-dim">
          This service is listed as a future service in the LOK SEVAK prototype. Five services have
          complete online application flows.
        </p>
        <Link
          to="/services"
          className="mt-6 inline-flex rounded-sm border border-line px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.08em] text-paper hover:border-saffron hover:text-saffron-soft"
        >
          Back to Services
        </Link>
      </div>
    );
  }

  const fields = allFields(form);
  const autoKeys = fields.filter((f) => f.profileKey).map((f) => f.key);
  const filled = fields.filter((f) => (values[f.key] ?? "").trim()).length;
  const completion = Math.round((filled / fields.length) * 100);

  const setValue = (f: FieldDef, v: string) => {
    setValues((prev) => ({ ...prev, [f.key]: v }));
    if (f.profileKey) {
      const original = String(profile[f.profileKey] ?? "");
      setModified((prev) =>
        v !== original ? (prev.includes(f.key) ? prev : [...prev, f.key]) : prev.filter((k) => k !== f.key),
      );
    }
    setErrors((prev) => {
      const next = { ...prev };
      delete next[f.key];
      return next;
    });
  };

  const validateSections = (sections: SectionDef[]) => {
    const next: Record<string, string> = {};
    for (const s of sections)
      for (const f of s.fields) {
        const err = validateField(f, values[f.key] ?? "");
        if (err) next[f.key] = err;
      }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const persistDraft = (nextStep = step) => {
    saveDraft({
      serviceId: service.id,
      reference,
      step: nextStep,
      values,
      modified,
      documents,
      declared,
      savedAt: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    });
    setToast("Draft saved to this device");
  };

  const goNext = () => {
    if (step === 0 && !validateSections(form.applicant)) return;
    if (step === 1 && !validateSections(form.serviceDetails)) return;
    if (step === 2) {
      const missing = form.documents.filter(
        (d) => documents[d] !== "Available" && documents[d] !== "Uploaded",
      );
      if (missing.length) {
        setToast(`Upload or mark ${missing.length} pending document(s) to continue`);
        return;
      }
    }
    if (step === 3 && !declared) {
      setToast("Please accept the declaration to continue");
      return;
    }
    const next = step + 1;
    setStep(next);
    if (next === 4) {
      setPreviewUri(
        applicationPdfDataUri({
          service,
          reference,
          date: todayStr(),
          values,
          modified,
          documents,
          declared,
        }),
      );

      // Step 4 = application / preview
      setJourneyStep(3);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderField = (f: FieldDef) => {
    const isAuto = autoKeys.includes(f.key);
    const isMod = modified.includes(f.key);
    const err = errors[f.key];
    const base =
      "mt-1.5 w-full rounded-sm border bg-ink px-3 py-2 text-sm text-paper outline-none placeholder:text-paper-dim/60 focus:border-saffron " +
      (err ? "border-warn/60" : "border-line");
    return (
      <div key={f.key} className={f.half ? "sm:col-span-1" : "sm:col-span-2"}>
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-[13px] text-paper">
            {f.label} {f.required && <span className="text-warn">*</span>}
          </label>
          {isAuto && !isMod && (
            <span className="rounded-sm bg-signal/15 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-signal">
              ✓ Auto-filled
            </span>
          )}
          {isMod && (
            <span className="rounded-sm bg-saffron/15 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-saffron-soft">
              ✎ Modified for this application
            </span>
          )}
        </div>

        {f.type === "textarea" ? (
          <textarea
            rows={2}
            value={values[f.key] ?? ""}
            placeholder={f.placeholder}
            onChange={(e) => setValue(f, e.target.value)}
            className={base}
          />
        ) : f.type === "select" ? (
          <select
            value={values[f.key] ?? ""}
            onChange={(e) => setValue(f, e.target.value)}
            className={base}
          >
            <option value="">— Select —</option>
            {f.options?.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        ) : f.type === "radio" ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {f.options?.map((o) => (
              <label
                key={o}
                className={
                  "cursor-pointer rounded-sm border px-3 py-1.5 text-[12px] transition-colors " +
                  ((values[f.key] ?? "") === o
                    ? "border-saffron bg-saffron/10 text-saffron-soft"
                    : "border-line text-paper-dim hover:text-paper")
                }
              >
                <input
                  type="radio"
                  className="sr-only"
                  name={f.key}
                  checked={(values[f.key] ?? "") === o}
                  onChange={() => setValue(f, o)}
                />
                {o}
              </label>
            ))}
          </div>
        ) : (
          <input
            type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
            inputMode={f.type === "tel" || f.type === "number" ? "numeric" : undefined}
            value={values[f.key] ?? ""}
            placeholder={f.placeholder}
            onChange={(e) => setValue(f, e.target.value)}
            className={base}
          />
        )}

        {err ? (
          <div className="mt-1 font-mono text-[10px] text-warn">⚠ {err}</div>
        ) : f.hint ? (
          <div className="mt-1 font-mono text-[10px] text-paper-dim">{f.hint}</div>
        ) : null}
      </div>
    );
  };

  const renderSections = (sections: SectionDef[]) =>
    sections.map((s) => (
      <section key={s.title} className="rounded-sm border border-line bg-ink-900">
        <header className="border-b border-line bg-ink-700/40 px-4 py-2.5">
          <h3 className="font-display text-base text-paper">{s.title}</h3>
          {s.note && <p className="mt-0.5 font-mono text-[10px] text-paper-dim">{s.note}</p>}
        </header>
        <div className="grid gap-4 p-4 sm:grid-cols-2">{s.fields.map(renderField)}</div>
      </section>
    ));

  const summaryRow = (label: string, value: string, mod: boolean) => (
    <div key={label} className="flex flex-wrap justify-between gap-2 border-b border-line py-1.5 last:border-0">
      <span className="text-[12px] text-paper-dim">{label}</span>
      <span className="text-[13px] text-paper">
        {value || "—"}
        {mod && <span className="ml-2 font-mono text-[9px] text-saffron-soft">modified</span>}
      </span>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1320px] px-4 py-8 sm:px-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="font-mono text-[11px] text-paper-dim">
        <Link to="/" className="hover:text-saffron-soft">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/services" className="hover:text-saffron-soft">
          Services
        </Link>{" "}
        / <span className="text-paper">{service.name}</span> / Online Application
      </nav>

      {/* Government-style header */}
      <header className="mt-3 rounded-sm border border-line bg-ink-900">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line p-5">
          <div>
            <DeptTag id={service.department} />
            <h1 className="mt-2 font-display text-2xl font-medium text-paper sm:text-3xl">
              {service.name} — Online Application
            </h1>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-paper-dim">
              {dept.name} · {dept.systemName} · Government of Maharashtra (simulated)
            </p>
          </div>
          <div className="rounded-sm border border-line bg-ink px-4 py-3 font-mono text-[11px]">
            <div className="text-paper-dim">Application Reference</div>
            <div className="mt-0.5 text-saffron-soft">{reference || "—"}</div>
            <div className="mt-1 text-paper-dim">Date · {todayStr()}</div>
            <div className="text-paper-dim">Status · {phase === "done" ? "Submitted" : "Draft"}</div>
          </div>
        </div>

        {/* Step progress */}
        <ol className="flex flex-wrap gap-2 p-4">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span
                className={
                  "grid size-6 place-items-center rounded-full font-mono text-[10px] " +
                  (i < step
                    ? "bg-signal/15 text-signal"
                    : i === step
                      ? "bg-saffron text-ink"
                      : "bg-ink-700 text-paper-dim")
                }
              >
                {i < step ? "✓" : i + 1}
              </span>
              <span
                className={
                  "font-mono text-[10px] uppercase tracking-[0.1em] " +
                  (i <= step ? "text-paper" : "text-paper-dim")
                }
              >
                {s}
              </span>
              {i < STEPS.length - 1 && <span className="text-paper-dim">›</span>}
            </li>
          ))}
        </ol>
      </header>

      {toast && (
        <div className="lks-rise mt-3 rounded-sm border border-saffron/40 bg-saffron/10 px-4 py-2 font-mono text-[11px] text-saffron-soft">
          {toast}
        </div>
      )}

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8">
          {!hydrated && <div className="h-1 w-full rounded-full lks-shimmer" />}

          {step === 0 && (
            <>
              <div className="rounded-sm border border-signal/30 bg-signal/5 px-4 py-3 text-sm text-signal">
                ✓ Applicant details were mapped automatically from your One Citizen Profile. Any edit
                here applies to this application only.
              </div>
              {renderSections(form.applicant)}
            </>
          )}

          {step === 1 && renderSections(form.serviceDetails)}

          {step === 2 && (
            <section className="rounded-sm border border-line bg-ink-900">
              <header className="border-b border-line bg-ink-700/40 px-4 py-2.5">
                <h3 className="font-display text-base text-paper">Required Documents</h3>
                <p className="mt-0.5 font-mono text-[10px] text-paper-dim">
                  Documents already verified in your Citizen Profile are attached automatically.
                </p>
              </header>
              <ul className="divide-y divide-line">
                {form.documents.map((d) => {
                  const st = documents[d] ?? "Required";
                  const ok = st === "Available" || st === "Uploaded";
                  return (
                    <li key={d} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                      <div>
                        <div className="text-sm text-paper">
                          {ok ? "✓" : "⚠"} {d}
                        </div>
                        <div className="font-mono text-[10px] text-paper-dim">
                          {st === "Available"
                            ? "Available from Citizen Profile"
                            : st === "Uploaded"
                              ? "Uploaded for this application"
                              : "Missing document — simulated upload required"}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={
                            "rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase " +
                            (ok ? "bg-signal/15 text-signal" : "bg-warn/15 text-warn")
                          }
                        >
                          {st}
                        </span>
                        {!ok && (
                          <button
                            onClick={() => setDocuments((p) => ({ ...p, [d]: "Uploaded" }))}
                            className="rounded-sm border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-paper hover:border-saffron hover:text-saffron-soft"
                          >
                            Upload
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {step === 3 && (
            <>
              {[...form.applicant, ...form.serviceDetails].map((s) => (
                <section key={s.title} className="rounded-sm border border-line bg-ink-900">
                  <header className="border-b border-line bg-ink-700/40 px-4 py-2.5">
                    <h3 className="font-display text-base text-paper">{s.title}</h3>
                  </header>
                  <div className="px-4 py-2">
                    {s.fields.map((f) =>
                      summaryRow(f.label, values[f.key] ?? "", modified.includes(f.key)),
                    )}
                  </div>
                </section>
              ))}
              <section className="rounded-sm border border-line bg-ink-900">
                <header className="border-b border-line bg-ink-700/40 px-4 py-2.5">
                  <h3 className="font-display text-base text-paper">Documents</h3>
                </header>
                <div className="px-4 py-2">
                  {form.documents.map((d) => summaryRow(d, documents[d] ?? "Required", false))}
                </div>
              </section>
              <section className="rounded-sm border border-saffron/30 bg-saffron/5 p-4">
                <div className="lks-label">Declaration</div>
                <p className="mt-2 text-sm text-paper/85">{form.declaration}</p>
                <label className="mt-3 flex cursor-pointer items-start gap-3 text-sm text-paper">
                  <input
                    type="checkbox"
                    checked={declared}
                    onChange={(e) => setDeclared(e.target.checked)}
                    className="mt-1 size-4 accent-[oklch(0.78_0.15_75)]"
                  />
                  I confirm that the information provided is correct for this prototype
                  demonstration.
                </label>
              </section>
            </>
          )}

          {step === 4 && (
            <section className="rounded-sm border border-line bg-ink-900 p-5">
              <div className="lks-label">Application Preview</div>
              <h3 className="mt-2 font-display text-xl text-paper">
                {service.name} — Preview {reference}
              </h3>
              <p className="mt-1 text-sm text-paper-dim">
                A printable government-style application preview has been generated from your data.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <PrimaryButton
                  onClick={() =>
                    downloadApplicationPdf({
                      service,
                      reference,
                      date: todayStr(),
                      values,
                      modified,
                      documents,
                      declared,
                    })
                  }
                >
                  ⬇ Download Application Preview PDF
                </PrimaryButton>
                {previewUri && (
                  <a
                    href={previewUri}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-sm border border-line px-5 py-2.5 font-mono text-[13px] uppercase tracking-[0.06em] text-paper hover:border-saffron hover:text-saffron-soft"
                  >
                    View Application Preview
                  </a>
                )}
              </div>

              {previewUri && (
                <object
                  data={previewUri}
                  type="application/pdf"
                  className="mt-4 hidden h-[520px] w-full rounded-sm border border-line sm:block"
                >
                  <p className="p-4 text-sm text-paper-dim">Preview unavailable in this browser.</p>
                </object>
              )}

              {phase === "form" && (
                <PrimaryButton
                  className="mt-5 w-full"
                  onClick={() => {
                    setJourneyStep(4);
                    setGatewayIndex(0);
                    setPhase("sending");
                  }}
                >
                  Submit through Integration Gateway <span aria-hidden>&rarr;</span>
                </PrimaryButton>
              )}

              {phase !== "form" && (
                <div className="mt-5 rounded-sm border border-saffron/30 bg-ink p-4">
                  <div className="lks-label">Simulated Integration Gateway</div>
                  <ol className="mt-3 space-y-2">
                    {gateway.map((s, i) => {
                      const done = i < gatewayIndex || phase === "done";
                      const active = i === gatewayIndex && phase === "sending";
                      return (
                        <li key={s.id} className="flex items-start gap-3">
                          <span
                            className={
                              "mt-1.5 size-1.5 shrink-0 rounded-full " +
                              (done ? "bg-signal" : active ? "bg-saffron lks-pulse" : "bg-ink-600")
                            }
                          />
                          <div>
                            <div className={"text-sm " + (done || active ? "text-paper" : "text-paper-dim")}>
                              {s.label}
                            </div>
                            <div className="font-mono text-[10px] text-paper-dim">{s.detail}</div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                  {phase === "done" && (
                    <div className="lks-rise mt-4 rounded-sm border border-signal/30 bg-signal/5 p-4">
                      <div className="font-display text-lg text-paper">
                        Application submitted to {dept.systemName}
                      </div>
                      <PrimaryButton className="mt-3" onClick={() => navigate({ to: "/applications" })}>
                        Track Application <span aria-hidden>&rarr;</span>
                      </PrimaryButton>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Action bar */}
          {step < 4 && (
            <div className="flex flex-wrap items-center gap-3 rounded-sm border border-line bg-ink-900 p-4">
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="rounded-sm border border-line px-4 py-2 font-mono text-[12px] uppercase tracking-[0.08em] text-paper hover:border-saffron hover:text-saffron-soft"
                >
                  &larr; Back
                </button>
              )}
              <PrimaryButton onClick={goNext}>
                {step === 3 ? "Confirm & Generate Preview" : "Save & Continue"}{" "}
                <span aria-hidden>&rarr;</span>
              </PrimaryButton>
              <button
                onClick={() => persistDraft()}
                className="rounded-sm border border-dashed border-line px-4 py-2 font-mono text-[12px] uppercase tracking-[0.08em] text-paper-dim hover:text-paper"
              >
                Save Draft
              </button>
              {step === 3 && (
                <button
                  onClick={() => setStep(0)}
                  className="font-mono text-[11px] uppercase tracking-[0.08em] text-paper-dim underline hover:text-paper"
                >
                  Back to Edit
                </button>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-3 lg:col-span-4">
          <div className="rounded-sm border border-line bg-ink-900 p-4">
            <div className="lks-label">Form Completion</div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-ink-700">
              <div className="h-full bg-saffron transition-all" style={{ width: `${completion}%` }} />
            </div>
            <div className="mt-2 font-mono text-[11px] text-paper-dim">
              {filled}/{fields.length} fields · {autoKeys.length} auto-filled from profile ·{" "}
              {modified.length} modified
            </div>
          </div>

          <div className="rounded-sm border border-line bg-ink-900 p-4">
            <div className="lks-label">Application Pack</div>
            <ul className="mt-2 space-y-1.5 text-sm text-paper-dim">
              <li>· Service: {service.name}</li>
              <li>· Department: {dept.name}</li>
              <li>· Processing time: {service.processingTime}</li>
              <li>· Documents: {form.documents.length}</li>
            </ul>
            <div className="mt-3 border-t border-line pt-3">
              <div className="lks-label">Eligibility</div>
              <ul className="mt-2 space-y-1 text-sm text-paper-dim">
                {service.eligibility.map((e) => (
                  <li key={e}>· {e}</li>
                ))}
              </ul>
            </div>
            <div className="mt-3 border-t border-line pt-3">
              <div className="lks-label">Departmental Process</div>
              <ol className="mt-2 space-y-1 text-sm text-paper-dim">
                {service.steps.map((s, i) => (
                  <li key={s}>
                    <span className="font-mono text-[11px] text-saffron-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>{" "}
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="rounded-sm border border-line bg-ink-900 p-4">
            <div className="lks-label">Need different data?</div>
            <p className="mt-2 text-sm text-paper-dim">
              Update your One Citizen Profile and every application will auto-fill with the new
              values.
            </p>
            <Link
              to="/profile"
              className="mt-3 inline-flex rounded-sm border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-paper hover:border-saffron hover:text-saffron-soft"
            >
              Edit Citizen Profile
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
