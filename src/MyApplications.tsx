import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  LayoutDashboard,
  ListChecks,
  Search,
  ShieldCheck,
} from "lucide-react";

type MyApplicationsProps = {
  onTrack: (applicationId: string) => void;
  onNavigate: (screen: string) => void;
};

type Application = {
  id: string;
  service: string;
  department: string;
  date: string;
  status: "Under Review" | "Approved" | "Submitted";
  description: string;
};

const applications: Application[] = [
  {
    id: "LOK-2026-10482",
    service: "Income Certificate",
    department: "Revenue Department",
    date: "03 September 2026",
    status: "Under Review",
    description:
      "Application submitted for income certificate verification.",
  },
  {
    id: "LOK-2026-10371",
    service: "Residence Certificate",
    department: "Revenue Department",
    date: "28 August 2026",
    status: "Approved",
    description:
      "Residence certificate application successfully processed.",
  },
  {
    id: "LOK-2026-10294",
    service: "Scholarship Application",
    department: "Education Department",
    date: "21 August 2026",
    status: "Submitted",
    description:
      "Scholarship application has been submitted for processing.",
  },
];

function MyApplications({
  onTrack,
  onNavigate,
}: MyApplicationsProps) {
  const activeCount = applications.filter(
    (application) =>
      application.status === "Submitted" ||
      application.status === "Under Review",
  ).length;

  const approvedCount = applications.filter(
    (application) => application.status === "Approved",
  ).length;

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
              <Building2 size={19} />
            </div>

            <div>
              <p className="text-sm font-extrabold tracking-tight text-slate-950">
                LOK SEVAK
              </p>

              <p className="hidden text-[11px] text-slate-400 sm:block">
                Unified Government Services
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate("dashboard")}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
        {/* Page heading */}
        <section className="mb-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-blue-700">
                <ListChecks size={14} />
                Application Management
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
                My Applications
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                View your submitted government-service applications
                and track their current simulated processing status.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate("services")}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
            >
              <FileText size={17} />
              Apply for a Service
            </button>
          </div>
        </section>

        {/* Summary cards */}
        <section className="mb-7 grid gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Total Applications"
            value={applications.length}
            icon={<ListChecks size={19} />}
            type="blue"
          />

          <SummaryCard
            label="Active Applications"
            value={activeCount}
            icon={<Clock3 size={19} />}
            type="amber"
          />

          <SummaryCard
            label="Approved"
            value={approvedCount}
            icon={<CheckCircle2 size={19} />}
            type="green"
          />
        </section>

        {/* Application list */}
        <section className="space-y-4">
          {applications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onTrack={() => onTrack(application.id)}
            />
          ))}
        </section>

        {/* Prototype notice */}
        <section className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <div className="flex gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
              <ShieldCheck size={17} />
            </div>

            <div>
              <p className="text-sm font-bold text-blue-900">
                Prototype Application Tracker
              </p>

              <p className="mt-1 text-xs leading-5 text-blue-700">
                The applications and statuses shown here are
                simulated data created for the LOK SEVAK prototype.
                They do not represent real government records.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate("dashboard")}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </button>

          <button
            type="button"
            onClick={() => onNavigate("services")}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
          >
            <FileText size={16} />
            Government Services
          </button>
        </div>
      </main>
    </div>
  );
}

function ApplicationCard({
  application,
  onTrack,
}: {
  application: Application;
  onTrack: () => void;
}) {
  const statusConfig = {
    "Under Review": {
      icon: <Clock3 size={16} />,
      className: "bg-amber-50 text-amber-700 border-amber-100",
    },
    Approved: {
      icon: <CheckCircle2 size={16} />,
      className: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    Submitted: {
      icon: <FileText size={16} />,
      className: "bg-blue-50 text-blue-700 border-blue-100",
    },
  };

  const status = statusConfig[application.status];

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-100 hover:shadow-md">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Main application information */}
          <div className="flex min-w-0 gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FileText size={21} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-extrabold text-slate-950 sm:text-lg">
                  {application.service}
                </h2>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${status.className}`}
                >
                  {status.icon}
                  {application.status}
                </span>
              </div>

              <p className="mt-1 text-xs font-medium text-slate-400">
                {application.department}
              </p>

              <p className="mt-3 max-w-2xl text-xs leading-5 text-slate-500">
                {application.description}
              </p>
            </div>
          </div>

          {/* Track button */}
          <button
            type="button"
            onClick={onTrack}
            className="group flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/15 transition hover:bg-blue-700"
          >
            <Search size={16} />
            Track Application
            <ArrowRight
              size={16}
              className="transition group-hover:translate-x-0.5"
            />
          </button>
        </div>

        {/* Metadata */}
        <div className="mt-6 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
              Application ID
            </p>

            <p className="mt-1 text-sm font-extrabold tracking-wide text-slate-800">
              {application.id}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
              Submitted On
            </p>

            <p className="mt-1 text-sm font-bold text-slate-800">
              {application.date}
            </p>
          </div>
        </div>
      </div>

      {/* Status footer */}
      <div
        className={`flex items-center justify-between border-t px-5 py-3 sm:px-6 ${
          application.status === "Approved"
            ? "border-emerald-100 bg-emerald-50/50"
            : application.status === "Under Review"
              ? "border-amber-100 bg-amber-50/50"
              : "border-blue-100 bg-blue-50/50"
        }`}
      >
        <div className="flex items-center gap-2">
          {status.icon}

          <span className="text-xs font-bold">
            {application.status === "Approved"
              ? "Application completed"
              : application.status === "Under Review"
                ? "Application is being reviewed"
                : "Application received"}
          </span>
        </div>

        <button
          type="button"
          onClick={onTrack}
          className="text-xs font-bold text-slate-600 transition hover:text-blue-600"
        >
          View Timeline →
        </button>
      </div>
    </article>
  );
}

function SummaryCard({
  label,
  value,
  icon,
  type,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  type: "blue" | "amber" | "green";
}) {
  const styles = {
    blue: {
      wrapper: "border-blue-100 bg-blue-50/60",
      icon: "bg-white text-blue-600",
      value: "text-blue-950",
    },
    amber: {
      wrapper: "border-amber-100 bg-amber-50/60",
      icon: "bg-white text-amber-600",
      value: "text-amber-950",
    },
    green: {
      wrapper: "border-emerald-100 bg-emerald-50/60",
      icon: "bg-white text-emerald-600",
      value: "text-emerald-950",
    },
  };

  const style = styles[type];

  return (
    <div
      className={`rounded-2xl border p-5 ${style.wrapper}`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-sm ${style.icon}`}
        >
          {icon}
        </div>

        <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
          LOK SEVAK
        </span>
      </div>

      <p
        className={`mt-5 text-3xl font-extrabold ${style.value}`}
      >
        {value}
      </p>

      <p className="mt-1 text-xs font-semibold text-slate-500">
        {label}
      </p>
    </div>
  );
}

export default MyApplications;