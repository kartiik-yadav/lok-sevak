import { createFileRoute } from "@tanstack/react-router";
import { AiNavigator } from "@/components/ai-navigator";
import { DemoJourney } from "@/components/demo-journey";
import { SectionHeading } from "@/components/ui-bits";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Service Navigator — LOK SEVAK" },
      {
        name: "description",
        content:
          "Ask in English, Hindi or Marathi and Lok Sevak identifies the right government service, department, documents and processing time.",
      },
      { property: "og:title", content: "AI Service Navigator — LOK SEVAK" },
      {
        property: "og:description",
        content: "Multilingual AI that routes citizens to the correct department in one step.",
      },
    ],
  }),
  component: AssistantPage,
});

function AssistantPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-6 py-14 sm:px-8">
      <SectionHeading
        eyebrow="AI Department & Service Navigator"
        title="Tell Lok Sevak what you need."
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="rounded-sm border border-line bg-ink p-5">
            <AiNavigator compact />
          </div>
        </div>
        <aside className="space-y-4 lg:col-span-5">
          <div className="rounded-sm border border-line bg-ink-900 p-5">
            <div className="lks-label">How the navigator works</div>
            <ol className="mt-3 space-y-3 text-sm text-paper-dim">
              <li>
                <span className="font-mono text-[11px] text-saffron-soft">01</span> — Intent is
                extracted from the query in English, हिंदी or मराठी.
              </li>
              <li>
                <span className="font-mono text-[11px] text-saffron-soft">02</span> — Intent is
                mapped to a service in the unified catalog.
              </li>
              <li>
                <span className="font-mono text-[11px] text-saffron-soft">03</span> — The owning
                department system is resolved through the integration registry.
              </li>
              <li>
                <span className="font-mono text-[11px] text-saffron-soft">04</span> — Your Citizen
                Profile is matched against the document checklist.
              </li>
            </ol>
          </div>
          <div className="rounded-sm border border-line bg-ink-900 p-5">
            <div className="lks-label">Prototype note</div>
            <p className="mt-2 text-sm leading-relaxed text-paper-dim">
              Responses are pre-configured for the demo. In production this layer calls a language
              model and the live service registry — the interface stays identical.
            </p>
          </div>
        </aside>
      </div>

      <div className="mt-14">
        <DemoJourney />
      </div>
    </div>
  );
}
