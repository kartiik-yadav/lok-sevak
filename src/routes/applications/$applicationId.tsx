import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Building2, Calendar, CheckCircle2 } from "lucide-react";

import { DeptTag, Progress } from "@/components/ui-bits";
import { departmentById } from "@/lib/demo-data";
import { useAppState } from "@/state/app-state";

export const Route = createFileRoute("/applications/$applicationId")({
  component: ApplicationDetailsPage,
});

function ApplicationDetailsPage() {
  const { applicationId } = Route.useParams();

  const { applications } = useAppState();

  const navigate = useNavigate();

  const application = applications.find((app) => app.id === applicationId);

  if (!application) {
    return (
      <div className="mx-auto max-w-[900px] px-6 py-20 text-center">
        <div className="lks-label">Application Not Found</div>

        <h1 className="mt-3 font-display text-3xl text-paper">We couldn't find this application</h1>

        <p className="mt-3 text-sm text-paper-dim">
          The application may have been removed or the reference number is incorrect.
        </p>

        <Link
          to="/applications"
          className="mt-6 inline-flex items-center gap-2 rounded-sm border border-line px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.08em] text-paper hover:border-saffron hover:text-saffron-soft"
        >
          <ArrowLeft className="size-4" />
          Back to Applications
        </Link>
      </div>
    );
  }

  const department = departmentById(application.department);

  const isApproved = application.progress === 100;

  return (
    <div className="mx-auto max-w-[1100px] px-6 py-10 sm:px-8">
      {/* Back Button */}

      <button
        onClick={() => navigate({ to: "/applications" })}
        className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-paper-dim hover:text-saffron-soft"
      >
        <ArrowLeft className="size-4" />
        Back to Applications
      </button>

      {/* Header */}

      <section className="rounded-sm border border-line bg-ink-900">
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-line p-6">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <DeptTag id={application.department} />

              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-paper-dim">
                {application.id}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-medium text-paper">
              {application.serviceName}
            </h1>

            <p className="mt-2 font-mono text-[11px] text-paper-dim">
              {department.name} · {department.systemName}
            </p>
          </div>

          {/* Status Box */}

          <div className="min-w-[200px] rounded-sm border border-line bg-ink p-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper-dim">
              Current Status
            </div>

            <div
              className={
                "mt-2 font-display text-lg " + (isApproved ? "text-signal" : "text-saffron-soft")
              }
            >
              {application.status}
            </div>

            <div className="mt-3 flex justify-between font-mono text-[10px] text-paper-dim">
              <span>Progress</span>
              <span>{application.progress}%</span>
            </div>

            <div className="mt-2">
              <Progress value={application.progress} tone={isApproved ? "signal" : "saffron"} />
            </div>
          </div>
        </div>

        {/* Application Info */}

        <div className="grid gap-4 p-6 md:grid-cols-3">
          <div className="rounded-sm border border-line bg-ink p-4">
            <Calendar className="size-5 text-saffron-soft" />

            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-paper-dim">
              Submitted On
            </div>

            <div className="mt-1 text-sm text-paper">{application.submittedOn}</div>
          </div>

          <div className="rounded-sm border border-line bg-ink p-4">
            <Building2 className="size-5 text-saffron-soft" />

            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-paper-dim">
              Department
            </div>

            <div className="mt-1 text-sm text-paper">{department.name}</div>
          </div>

          <div className="rounded-sm border border-line bg-ink p-4">
            <CheckCircle2 className="size-5 text-saffron-soft" />

            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-paper-dim">
              Application Reference
            </div>

            <div className="mt-1 font-mono text-sm text-paper">{application.id}</div>
          </div>
        </div>
      </section>

      {/* Timeline */}

      <section className="mt-6 rounded-sm border border-line bg-ink-900">
        <div className="border-b border-line p-5">
          <div className="lks-label">Application Journey</div>

          <h2 className="mt-2 font-display text-2xl text-paper">Application Timeline</h2>

          <p className="mt-1 text-sm text-paper-dim">
            Track your application as it moves through the department.
          </p>
        </div>

        <ol className="p-5">
          {application.timeline.map((step, index) => {
            const isLast = index === application.timeline.length - 1;

            return (
              <li
                key={`${application.id}-${step.label}`}
                className="relative flex gap-4 pb-6 last:pb-0"
              >
                {/* Timeline Line */}

                {!isLast && (
                  <span
                    className={
                      "absolute left-[7px] top-4 h-full w-px " +
                      (step.done ? "bg-signal/40" : "bg-line")
                    }
                  />
                )}

                {/* Timeline Dot */}

                <span
                  className={
                    "relative z-10 mt-1 size-4 shrink-0 rounded-full border " +
                    (step.done ? "border-signal bg-signal" : "border-line bg-ink")
                  }
                />

                {/* Timeline Content */}

                <div className="flex flex-1 flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className={step.done ? "text-sm text-paper" : "text-sm text-paper-dim"}>
                      {step.label}
                    </div>

                    {step.done && (
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-signal">
                        Completed
                      </div>
                    )}
                  </div>

                  <div
                    className={
                      "rounded-sm border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] " +
                      (step.done
                        ? "border-signal/30 bg-signal/5 text-signal"
                        : "border-line text-paper-dim")
                    }
                  >
                    {step.at}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Department Integration */}

      <section className="mt-6 rounded-sm border border-line bg-ink-900 p-5">
        <div className="lks-label">Integration Information</div>

        <h2 className="mt-2 font-display text-xl text-paper">Department System Connection</h2>

        <p className="mt-2 text-sm text-paper-dim">
          This application was submitted through the LOK SEVAK Integration Gateway and forwarded to
          the relevant department system.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-sm border border-line bg-ink p-3">
            <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-paper-dim">
              Department
            </div>

            <div className="mt-1 text-sm text-paper">{department.name}</div>
          </div>

          <div className="rounded-sm border border-line bg-ink p-3">
            <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-paper-dim">
              Data Format
            </div>

            <div className="mt-1 font-mono text-sm text-paper">{department.dataFormat}</div>
          </div>

          <div className="rounded-sm border border-line bg-ink p-3">
            <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-paper-dim">
              API Status
            </div>

            <div
              className={
                "mt-1 font-mono text-sm " +
                (department.apiStatus === "Active" ? "text-signal" : "text-warn")
              }
            >
              ● {department.apiStatus}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
