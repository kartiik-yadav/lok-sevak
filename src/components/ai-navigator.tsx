import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { aiExampleQueries, departmentById, matchService, serviceById } from "@/lib/demo-data";
import { PrimaryButton } from "@/components/ui-bits";
import { useAppState } from "@/state/app-state";

const DEFAULT_QUERY = "मला scholarship साठी income certificate पाहिजे.";

export function AiNavigator({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [submitted, setSubmitted] = useState(DEFAULT_QUERY);
  const [thinking, setThinking] = useState(false);

  const navigate = useNavigate();

  const { profile, markRecent, setJourneyStep } = useAppState();

  const match = matchService(submitted);
  const service = serviceById(match.serviceId)!;
  const dept = departmentById(service.department);

  function ask(q: string) {
    const cleanedQuery = q.trim();

    if (!cleanedQuery) return;

    setQuery(cleanedQuery);
    setThinking(true);

    window.setTimeout(() => {
      setSubmitted(cleanedQuery);
      setThinking(false);
    }, 700);
  }

  // Check documents against the CURRENT citizen profile
  const availableDocuments = service.documents.filter((documentName) =>
    profile.documents.some((document) => {
      const profileDoc = document.name.toLowerCase();
      const requiredDoc = documentName.toLowerCase();

      return (
        profileDoc === requiredDoc ||
        profileDoc.includes(requiredDoc) ||
        requiredDoc.includes(profileDoc)
      );
    }),
  );

  const missingDocuments = service.documents.filter(
    (documentName) => !availableDocuments.includes(documentName),
  );

  // Count profile fields that are available
  const profileFields = [
    profile.fullName,
    profile.dateOfBirth,
    profile.gender,
    profile.mobile,
    profile.email,
    profile.address,
    profile.city,
    profile.district,
    profile.state,
    profile.pin,
    profile.aadhaar,
    profile.pan,
  ];

  const filledProfileFields = profileFields.filter(
    (value) => value && String(value).trim().length > 0,
  ).length;

  const totalProfileFields = profileFields.length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper-dim">
          <span className="size-1.5 rounded-full bg-signal lks-pulse" />
          AI Navigator
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-sm bg-ink-700 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-paper-dim ring-1 ring-inset ring-line">
          <span className="size-1.5 rounded-full bg-saffron" />
          Simulated AI
        </div>
      </div>

      {/* Title */}
      {!compact && (
        <h2 className="mt-5 font-display text-3xl font-medium text-paper">
          Tell Lok Sevak what you need.
        </h2>
      )}

      {/* Search */}
      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          ask(query);
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask in English, हिंदी or मराठी…"
          className="min-w-0 flex-1 rounded-sm border border-line bg-ink-900 px-3 py-2.5 text-sm text-paper outline-none placeholder:text-paper-dim focus:border-saffron"
        />

        <PrimaryButton type="submit" className="px-4 py-2">
          Ask
        </PrimaryButton>
      </form>

      {/* Example queries */}
      <div className="mt-3 flex flex-wrap gap-2">
        {aiExampleQueries.map((exampleQuery) => (
          <button
            key={exampleQuery}
            type="button"
            onClick={() => ask(exampleQuery)}
            className="rounded-sm border border-line bg-ink-900 px-2.5 py-1.5 text-left font-mono text-[11px] text-paper-dim transition-colors hover:border-saffron hover:text-paper"
          >
            {exampleQuery}
          </button>
        ))}
      </div>

      {/* Current query */}
      <div className="mt-4 rounded-sm border border-line bg-ink-900 p-4">
        <div className="lks-label">Your Query</div>

        <div className="mt-1.5 font-display text-lg text-paper">{submitted}</div>
      </div>

      {/* Thinking state */}
      {thinking ? (
        <div className="mt-3 rounded-sm border border-line bg-ink-900 p-4">
          <div className="lks-label">Lok Sevak AI is interpreting your request…</div>

          <div className="mt-3 h-1 w-full rounded-full lks-shimmer" />
        </div>
      ) : (
        <div
          key={submitted}
          className="lks-rise mt-3 rounded-sm border border-saffron/30 bg-ink-900 p-4 ring-1 ring-inset ring-saffron/10"
        >
          {/* Recommendation */}
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-saffron-soft">
            <span>●</span>
            Recommended Service
          </div>

          <div className="mt-2 flex items-end justify-between gap-3">
            <div>
              <div className="font-display text-2xl font-medium leading-tight text-paper">
                {service.name}
              </div>

              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-paper-dim">
                {dept.name}
              </div>
            </div>

            <div className="shrink-0 rounded-sm bg-ink-700 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-signal ring-1 ring-inset ring-line">
              Match {match.confidence}%
            </div>
          </div>

          {/* Why */}
          <div className="mt-4 border-t border-line pt-3">
            <div className="lks-label">Why this service</div>

            <p className="mt-1.5 text-sm leading-relaxed text-paper/80">{match.reason}</p>
          </div>

          {/* Documents */}
          <div className="mt-3 border-t border-line pt-3">
            <div className="flex items-center justify-between gap-3">
              <div className="lks-label">Required Documents</div>

              <span className="font-mono text-[10px] text-paper-dim">
                {availableDocuments.length}/{service.documents.length} ready
              </span>
            </div>

            <ul className="mt-2 grid grid-cols-1 gap-y-1.5 font-mono text-[12px] text-paper/85 sm:grid-cols-2">
              {service.documents.map((documentName) => {
                const held = availableDocuments.includes(documentName);

                return (
                  <li key={documentName} className="flex items-center gap-2">
                    <span className={held ? "text-signal" : "text-warn"}>{held ? "✓" : "⚠"}</span>

                    {documentName}
                  </li>
                );
              })}
            </ul>

            {missingDocuments.length > 0 && (
              <div className="mt-3 rounded-sm border border-warn/25 bg-warn/5 px-3 py-2 font-mono text-[10px] text-warn">
                {missingDocuments.length} document
                {missingDocuments.length > 1 ? "s are" : " is"} not currently available in your
                Citizen Profile.
              </div>
            )}
          </div>

          {/* Service information */}
          <div className="mt-3 grid grid-cols-2 gap-3 border-t border-line pt-3">
            <div>
              <div className="lks-label">Processing Time</div>

              <div className="mt-1 font-display text-base text-paper">{service.processingTime}</div>
            </div>

            <div>
              <div className="lks-label">Profile Data</div>

              <div className="mt-1 font-display text-base text-paper">
                {filledProfileFields} of {totalProfileFields} ready
              </div>
            </div>
          </div>

          {/* Next step */}
          <div className="mt-3 border-t border-line pt-3">
            <div className="lks-label">Recommended Next Step</div>

            <p className="mt-1.5 text-sm leading-relaxed text-paper-dim">{match.nextStep}</p>
          </div>

          {/* Start application */}
          <PrimaryButton
            className="mt-4 w-full"
            onClick={() => {
              markRecent(service.id);
              setJourneyStep(3);

              navigate({
                to: "/apply/$serviceId",
                params: {
                  serviceId: service.id,
                },
              });
            }}
          >
            Start Application <span aria-hidden>&rarr;</span>
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
