import { useNavigate } from "@tanstack/react-router";
import { useAppState } from "@/state/app-state";
import { PrimaryButton } from "@/components/ui-bits";

const steps = [
  {
    n: "01",
    label: "Ask Lok Sevak AI",
    to: "/assistant",
  },

  {
    n: "02",
    label: "Find the Correct Service",
    to: "/services",
  },

  {
    n: "03",
    label: "Use Demo Citizen Profile",
    to: "/profile",
  },

  {
    n: "04",
    label: "Auto-Fill Application",
    to: "/apply/income-certificate",
  },

  {
    n: "05",
    label: "Send Through Gateway",
    to: "/interoperability",
  },

  {
    n: "06",
    label: "Track Application",
    to: "/applications",
  },
] as const;

export function DemoJourney() {
  const navigate = useNavigate();

  const {
    journeyStep,
    setJourneyStep,
    startDemo,
  } = useAppState();

  return (
    <div className="rounded-sm border border-line bg-ink-900">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4">

        <div>
          <div className="lks-label">
            Prototype Mode · Guided Walkthrough
          </div>

          <h2 className="mt-1 font-display text-xl font-medium text-paper">
            Try the 2-Minute Demo Journey
          </h2>
        </div>

        <PrimaryButton
          onClick={() => {
            startDemo();
            setJourneyStep(0);

            navigate({
              to: "/assistant",
            });
          }}
        >
          Start Guided Demo{" "}
          <span aria-hidden>
            →
          </span>
        </PrimaryButton>

      </div>

      {/* Steps */}

      <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3 lg:grid-cols-6">

        {steps.map((step, index) => {
          const done =
            index < journeyStep;

          const active =
            index === journeyStep;

          return (
            <button
              key={step.n}

              onClick={() => {
                setJourneyStep(index);

                navigate({
                  to: step.to,
                });
              }}

              className={
                "rounded-sm border p-4 text-left transition-transform hover:-translate-y-px " +
                (active
                  ? "border-saffron/50 bg-saffron/5 ring-1 ring-inset ring-saffron/20"
                  : "border-line bg-ink")
              }
            >

              <div
                className={
                  "font-mono text-[10px] uppercase tracking-[0.12em] " +
                  (done
                    ? "text-signal"
                    : "text-saffron-soft")
                }
              >
                {done
                  ? "✓ Done"
                  : step.n}
              </div>

              <div className="mt-2 font-display text-base font-medium leading-tight text-paper">
                {step.label}
              </div>

            </button>
          );
        })}

      </div>
    </div>
  );
}