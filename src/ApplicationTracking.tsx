import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Home,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type ApplicationTrackingProps = {
  applicationId: string;
  onBack: () => void;
  onNavigate: (screen: string) => void;
};

type TimelineStep = {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  current?: boolean;
};

function ApplicationTracking({
  applicationId,
  onBack,
  onNavigate,
}: ApplicationTrackingProps) {
  const isIncomeCertificate =
    applicationId === "LOK-2026-10482";

  const isApproved =
    applicationId === "LOK-2026-10371";

  const service = isIncomeCertificate
    ? "Income Certificate"
    : isApproved
      ? "Residence Certificate"
      : "Scholarship Application";

  const department = isIncomeCertificate
    ? "Revenue Department"
    : isApproved
      ? "Revenue Department"
      : "Education Department";

  const status = isApproved ? "Approved" : "Under Review";

  const timeline: TimelineStep[] = isApproved
    ? [
        {
          title: "Application Submitted",
          description:
            "Your application was successfully submitted.",
          date: "28 Aug 2026",
          completed: true,
        },
        {
          title: "Documents Verified",
          description:
            "Submitted documents were verified successfully.",
          date: "29 Aug 2026",
          completed: true,
        },
        {
          title: "Application Reviewed",
          description:
            "The application was reviewed by the concerned department.",
          date: "30 Aug 2026",
          completed: true,
        },
        {
          title: "Application Approved",
          description:
            "Your certificate has been approved.",
          date: "31 Aug 2026",
          completed: true,
          current: true,
        },
      ]
    : [
        {
          title: "Application Submitted",
          description:
            "Your application was successfully submitted.",
          date: "03 Sep 2026",
          completed: true,
        },
        {
          title: "Documents Verified",
          description:
            "Your submitted documents have been received for verification.",
          date: "03 Sep 2026",
          completed: true,
        },
        {
          title: "Under Review",
          description:
            "The application is currently being reviewed by the concerned department.",
          date: "04 Sep 2026",
          completed: true,
          current: true,
        },
        {
          title: "Approved",
          description:
            "Final approval will be reflected here once the review is completed.",
          date: "Pending",
          completed: false,
        },
      ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <button
            onClick={() => onNavigate("dashboard")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <ShieldCheck size={22} />
            </div>

            <div className="text-left">
              <div className="text-lg font-extrabold tracking-tight text-slate-900">
                LOK <span className="text-blue-600">SEVAK</span>
              </div>
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
                Citizen Services Portal
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate("dashboard")}
            className="hidden items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:flex"
          >
            <Home size={17} />
            Dashboard
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
        {/* Back */}
        <button
          onClick={onBack}
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to My Applications
        </button>

        {/* Page heading */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
            <Search size={14} />
            Application Tracking
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Track your application
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            View the current status and processing timeline of your
            government service application.
          </p>
        </div>

        {/* Application summary */}
        <section className="mb-7 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                  Application ID
                </p>

                <div className="text-2xl font-black tracking-tight sm:text-3xl">
                  {applicationId}
                </div>
              </div>

              <div className="self-start rounded-2xl bg-white/15 px-4 py-3 backdrop-blur sm:self-auto">
                <div className="mb-1 text-[11px] font-bold uppercase tracking-wider text-blue-100">
                  Current Status
                </div>

                <div className="flex items-center gap-2 text-sm font-bold">
                  {status === "Approved" ? (
                    <CheckCircle2 size={17} />
                  ) : (
                    <Clock3 size={17} />
                  )}

                  {status}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-6 sm:grid-cols-3 sm:p-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Service
              </p>
              <p className="mt-1 font-bold text-slate-900">
                {service}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Department
              </p>
              <p className="mt-1 font-bold text-slate-900">
                {department}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Application Type
              </p>
              <p className="mt-1 font-bold text-slate-900">
                Online Application
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FileCheck2 size={22} />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Application Timeline
                </h2>
                <p className="text-sm text-slate-500">
                  Follow the progress of your application.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[21px] top-3 bottom-3 w-px bg-slate-200" />

            <div className="space-y-8">
              {timeline.map((step, index) => (
                <div
                  key={`${step.title}-${index}`}
                  className="relative flex gap-5"
                >
                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    {step.completed ? (
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-full border-4 border-white shadow-sm ${
                          step.current
                            ? "bg-blue-600 text-white"
                            : "bg-emerald-500 text-white"
                        }`}
                      >
                        {step.current ? (
                          <Clock3 size={19} />
                        ) : (
                          <CheckCircle2 size={19} />
                        )}
                      </div>
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-slate-100 text-slate-400 shadow-sm">
                        <Clock3 size={18} />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1 pb-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3
                        className={`font-extrabold ${
                          step.completed
                            ? "text-slate-900"
                            : "text-slate-400"
                        }`}
                      >
                        {step.title}
                      </h3>

                      <span
                        className={`text-xs font-semibold ${
                          step.completed
                            ? "text-slate-400"
                            : "text-slate-300"
                        }`}
                      >
                        {step.date}
                      </span>
                    </div>

                    <p
                      className={`mt-1 max-w-2xl text-sm leading-6 ${
                        step.completed
                          ? "text-slate-500"
                          : "text-slate-400"
                      }`}
                    >
                      {step.description}
                    </p>

                    {step.current && (
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-600" />
                        Current stage
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prototype notice */}
        <section className="mt-7 rounded-3xl border border-indigo-100 bg-indigo-50 p-5 sm:p-6">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
              <Sparkles size={19} />
            </div>

            <div>
              <h3 className="font-extrabold text-indigo-950">
                Smart tracking — prototype mode
              </h3>

              <p className="mt-1 text-sm leading-6 text-indigo-900/70">
                The status and timeline shown here are simulated for
                the SIH prototype demonstration. In a production
                system, this section would connect to the relevant
                government department systems for live updates.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom actions */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => onNavigate("applications")}
            className="flex-1 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            View All Applications
          </button>

          <button
            onClick={() => onNavigate("dashboard")}
            className="flex-1 rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            Return to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}

export default ApplicationTracking;