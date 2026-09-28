import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Copy,
  FileText,
  LayoutDashboard,
  ListChecks,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

type ApplicationSuccessProps = {
  applicationId: string;
  service: string;
  onTrack: () => void;
  onApplications: () => void;
  onDashboard: () => void;
};

const departmentMap: Record<string, string> = {
  "Income Certificate": "Revenue Department",
  "Residence Certificate": "Revenue Department",
  Domicile: "Revenue Department",
  "Scholarship Application": "Education Department",
  "Birth Certificate": "Municipal Department",
  "Birth Certificate Request": "Municipal Department",
  "Social Welfare Scheme": "Social Welfare Department",
  "Social Welfare": "Social Welfare Department",
  "Pension Scheme Application": "Social Welfare Department",
};

function ApplicationSuccess({
  applicationId,
  service,
  onTrack,
  onApplications,
  onDashboard,
}: ApplicationSuccessProps) {
  const [copied, setCopied] = useState(false);

  const department =
    departmentMap[service] ?? "Government Department";

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(applicationId);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
              <Building2 size={20} />
            </div>

            <div>
              <p className="text-sm font-extrabold tracking-tight text-slate-950">
                LOK SEVAK
              </p>

              <p className="text-[11px] text-slate-400">
                Unified Government Services
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 sm:flex">
            <ShieldCheck
              size={14}
              className="text-emerald-600"
            />

            <span className="text-[11px] font-bold text-emerald-700">
              Prototype Submission
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 lg:px-8 lg:py-14">
        {/* Success hero */}
        <section className="relative overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-sm">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-50" />
          <div className="absolute -bottom-28 -left-20 h-56 w-56 rounded-full bg-blue-50" />

          <div className="relative px-6 py-10 text-center sm:px-10 sm:py-14">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/60">
              <CheckCircle2
                size={44}
                strokeWidth={2}
                className="text-emerald-500"
              />
            </div>

            <div className="mx-auto mt-7 max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700">
                <Check size={13} />
                Submission Successful
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Application Submitted
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Your application has been successfully
                submitted to the simulated LOK SEVAK Unified
                Tracker for this prototype demonstration.
              </p>
            </div>

            {/* Application ID */}
            <div className="mx-auto mt-9 max-w-xl rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-500">
                Application ID
              </p>

              <div className="mt-3 flex items-center justify-center gap-3">
                <span className="break-all text-xl font-extrabold tracking-wide text-blue-900 sm:text-2xl">
                  {applicationId}
                </span>

                <button
                  type="button"
                  onClick={handleCopyId}
                  title="Copy Application ID"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm transition hover:bg-blue-600 hover:text-white"
                >
                  {copied ? (
                    <Check size={17} />
                  ) : (
                    <Copy size={17} />
                  )}
                </button>
              </div>

              <p className="mt-3 text-xs text-blue-600">
                {copied
                  ? "Application ID copied"
                  : "Keep this ID to track your application"}
              </p>
            </div>
          </div>
        </section>

        {/* Application details */}
        <section className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FileText size={19} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Service
                </p>

                <p className="mt-1 text-sm font-extrabold text-slate-900">
                  {service}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Building2 size={19} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Processing Department
                </p>

                <p className="mt-1 text-sm font-extrabold text-slate-900">
                  {department}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Submission pipeline */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-extrabold text-slate-950">
                Submission Pipeline
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Status of your application within the prototype
                workflow.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-blue-700">
              <Clock3 size={14} />
              Submitted
            </span>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <PipelineStep
              number="01"
              icon={<ClipboardCheck size={18} />}
              title="Application Preview"
              description="Application data reviewed and preview generated."
              completed
            />

            <PipelineStep
              number="02"
              icon={<ShieldCheck size={18} />}
              title="Unified Tracker"
              description="Application reference created in the simulated tracker."
              completed
            />

            <PipelineStep
              number="03"
              icon={<Search size={18} />}
              title="Track Status"
              description="View the simulated processing timeline."
              active
            />
          </div>
        </section>

        {/* Important note */}
        <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <ShieldCheck size={16} />
            </div>

            <div>
              <p className="text-sm font-bold text-amber-900">
                Prototype Notice
              </p>

              <p className="mt-1 text-xs leading-5 text-amber-800">
                This demonstration simulates the submission
                and tracking process. No real government
                department, API, database, or official service
                has been contacted.
              </p>
            </div>
          </div>
        </section>

        {/* Main actions */}
        <section className="mt-8">
          <div className="grid gap-4 md:grid-cols-3">
            <button
              type="button"
              onClick={onTrack}
              className="group flex items-center justify-between rounded-2xl bg-blue-600 p-5 text-left text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              <div>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                  <Search size={19} />
                </div>

                <p className="text-sm font-extrabold">
                  Track Application
                </p>

                <p className="mt-1 text-xs text-blue-100">
                  View your application timeline
                </p>
              </div>

              <ArrowRight
                size={20}
                className="transition group-hover:translate-x-1"
              />
            </button>

            <button
              type="button"
              onClick={onApplications}
              className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <div>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <ListChecks size={19} />
                </div>

                <p className="text-sm font-extrabold text-slate-900">
                  View My Applications
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  See all submitted applications
                </p>
              </div>

              <ArrowRight
                size={20}
                className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
              />
            </button>

            <button
              type="button"
              onClick={onDashboard}
              className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <div>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <LayoutDashboard size={19} />
                </div>

                <p className="text-sm font-extrabold text-slate-900">
                  Return to Dashboard
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Continue exploring LOK SEVAK
                </p>
              </div>

              <ArrowRight
                size={20}
                className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
              />
            </button>
          </div>
        </section>

        {/* Back link */}
        <div className="mt-7 flex justify-center">
          <button
            type="button"
            onClick={onDashboard}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 transition hover:text-blue-600"
          >
            <ArrowLeft size={15} />
            Back to LOK SEVAK Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}

function PipelineStep({
  number,
  icon,
  title,
  description,
  completed = false,
  active = false,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  completed?: boolean;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        active
          ? "border-blue-200 bg-blue-50/60"
          : completed
            ? "border-emerald-100 bg-emerald-50/50"
            : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            active
              ? "bg-blue-600 text-white"
              : completed
                ? "bg-emerald-500 text-white"
                : "bg-slate-200 text-slate-500"
          }`}
        >
          {completed ? <Check size={18} /> : icon}
        </div>

        <span className="text-[10px] font-extrabold tracking-widest text-slate-400">
          {number}
        </span>
      </div>

      <p className="mt-5 text-sm font-extrabold text-slate-900">
        {title}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {description}
      </p>
    </div>
  );
}

export default ApplicationSuccess;