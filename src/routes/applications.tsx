import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, FileText, Search } from "lucide-react";

import { DeptTag, Progress, SectionHeading } from "@/components/ui-bits";
import { departmentById, departments } from "@/lib/demo-data";
import { useAppState } from "@/state/app-state";

export const Route = createFileRoute("/applications")({
  head: () => ({
    meta: [
      {
        title: "Unified Application Tracker — LOK SEVAK",
      },
      {
        name: "description",
        content:
          "Track applications across Revenue, Education and Municipal departments in one timeline, with status, progress and department system references.",
      },
      {
        property: "og:title",
        content: "Unified Application Tracker — LOK SEVAK",
      },
      {
        property: "og:description",
        content: "Every department's application status in one place.",
      },
    ],
  }),

  component: ApplicationsPage,
});

function ApplicationsPage() {
  const { applications } = useAppState();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState("all");

  const filteredApplications = useMemo(() => {
    const query = search.toLowerCase().trim();

    return applications.filter((application) => {
      const matchesSearch =
        !query ||
        application.serviceName.toLowerCase().includes(query) ||
        application.id.toLowerCase().includes(query);

      const matchesDepartment =
        department === "all" ||
        application.department === department;

      const matchesStatus =
        status === "all" ||
        application.status === status;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [applications, search, department, status]);

  const departmentCount = new Set(
    applications.map((application) => application.department),
  ).size;

  return (
    <div className="mx-auto max-w-[1320px] px-6 py-14 sm:px-8">
      {/* Page Header */}

      <SectionHeading
        eyebrow="Unified Application Tracking"
        title="My Applications"
        right={
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-paper-dim">
            {applications.length} applications · {departmentCount} departments
          </span>
        }
      />

      {/* Filters */}

      <div className="mt-8 rounded-sm border border-line bg-ink-900 p-4">
        <div className="grid gap-3 md:grid-cols-3">
          {/* Search */}

          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-paper-dim" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search application or reference..."
              className="w-full rounded-sm border border-line bg-ink py-2.5 pl-10 pr-3 text-sm text-paper outline-none placeholder:text-paper-dim focus:border-saffron"
            />
          </div>

          {/* Department Filter */}

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="rounded-sm border border-line bg-ink px-3 py-2.5 text-sm text-paper outline-none focus:border-saffron"
          >
            <option value="all">All Departments</option>

            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-sm border border-line bg-ink px-3 py-2.5 text-sm text-paper outline-none focus:border-saffron"
          >
            <option value="all">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Processing">Processing</option>
            <option value="Documents Required">
              Documents Required
            </option>
            <option value="Documents Verified">
              Documents Verified
            </option>
            <option value="Approved">Approved</option>
          </select>
        </div>
      </div>

      {/* Results Count */}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper-dim">
          Showing {filteredApplications.length} of {applications.length} applications
        </span>

        {(search || department !== "all" || status !== "all") && (
          <button
            onClick={() => {
              setSearch("");
              setDepartment("all");
              setStatus("all");
            }}
            className="font-mono text-[10px] uppercase tracking-[0.1em] text-saffron-soft hover:text-saffron"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Applications */}

      <div className="mt-4 space-y-3">
        {/* No Applications */}

        {applications.length === 0 && (
          <div className="rounded-sm border border-dashed border-line bg-ink-900 p-10 text-center">
            <FileText className="mx-auto size-10 text-paper-dim" />

            <div className="mt-4 lks-label">
              No Applications Yet
            </div>

            <h3 className="mt-3 font-display text-xl text-paper">
              You haven't submitted any applications.
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-paper-dim">
              Browse government services and submit an application.
              Your submitted applications will appear here with status tracking.
            </p>
          </div>
        )}

        {/* No Filter Results */}

        {applications.length > 0 &&
          filteredApplications.length === 0 && (
            <div className="rounded-sm border border-dashed border-line bg-ink-900 p-10 text-center">
              <Search className="mx-auto size-9 text-paper-dim" />

              <div className="mt-4 lks-label">
                No Matching Applications
              </div>

              <p className="mt-2 text-sm text-paper-dim">
                Try changing your search or filters.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setDepartment("all");
                  setStatus("all");
                }}
                className="mt-4 rounded-sm border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-paper hover:border-saffron hover:text-saffron-soft"
              >
                Reset Filters
              </button>
            </div>
          )}

        {/* Application Cards */}

        {filteredApplications.map((application) => {
          const departmentInfo = departmentById(
            application.department,
          );

          const isApproved = application.progress === 100;

          const isDocumentsRequired =
            application.status === "Documents Required";

          return (
            <button
              key={application.id}
              onClick={() =>
                navigate({
                  to: "/applications/$applicationId",
                  params: {
                    applicationId: application.id,
                  },
                })
              }
              className="group w-full rounded-sm border border-line bg-ink-900 p-5 text-left transition-all hover:border-saffron/50 hover:bg-ink-900/80"
            >
              <div className="grid gap-6 lg:grid-cols-12">
                {/* Left Side - Application Info */}

                <div className="lg:col-span-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <DeptTag id={application.department} />

                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper-dim">
                        {application.id}
                      </span>
                    </div>

                    <ArrowRight className="size-5 shrink-0 text-paper-dim transition-transform group-hover:translate-x-1 group-hover:text-saffron-soft" />
                  </div>

                  {/* Service Name */}

                  <h3 className="mt-4 font-display text-xl font-medium text-paper">
                    {application.serviceName}
                  </h3>

                  {/* Department */}

                  <div className="mt-1 font-mono text-[11px] text-paper-dim">
                    {departmentInfo.systemName}
                  </div>

                  {/* Submission Date */}

                  <div className="mt-1 font-mono text-[11px] text-paper-dim">
                    Submitted · {application.submittedOn}
                  </div>

                  {/* Status */}

                  <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em]">
                    <span
                      className={
                        isApproved
                          ? "text-signal"
                          : isDocumentsRequired
                            ? "text-warn"
                            : "text-saffron-soft"
                      }
                    >
                      {application.status}
                    </span>

                    <span className="text-paper-dim">
                      {application.progress}%
                    </span>
                  </div>

                  {/* Progress Bar */}

                  <div className="mt-2">
                    <Progress
                      value={application.progress}
                      tone={
                        isApproved
                          ? "signal"
                          : "saffron"
                      }
                    />
                  </div>

                  {/* Mobile View Button */}

                  <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-saffron-soft lg:hidden">
                    View Application Details →
                  </div>
                </div>

                {/* Right Side - Timeline */}

                <div className="hidden lg:col-span-7 lg:block">
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-paper-dim">
                    Application Timeline
                  </div>

                  <ol>
                    {application.timeline.map((timelineStep) => (
                      <li
                        key={`${application.id}-${timelineStep.label}`}
                        className="flex gap-3 border-b border-line py-2.5 last:border-0"
                      >
                        {/* Timeline Dot */}

                        <span
                          className={
                            "mt-1.5 size-2 shrink-0 rounded-full " +
                            (
                              timelineStep.done
                                ? "bg-signal"
                                : "bg-ink-600"
                            )
                          }
                        />

                        {/* Timeline Content */}

                        <div className="flex flex-1 flex-wrap items-baseline justify-between gap-3">
                          <span
                            className={
                              timelineStep.done
                                ? "text-sm text-paper"
                                : "text-sm text-paper-dim"
                            }
                          >
                            {timelineStep.label}
                          </span>

                          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-paper-dim">
                            {timelineStep.at}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-saffron-soft">
                    View full application
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}