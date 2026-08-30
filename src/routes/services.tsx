import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock3, Grid2X2, Search, Sparkles, Building2, RotateCcw } from "lucide-react";
import { ServiceCard } from "@/components/service-card";
import { type DepartmentId, departments, services } from "@/lib/demo-data";
import { useAppState } from "@/state/app-state";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
});

function ServicesPage() {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState<DepartmentId | "all">("all");
  const { recent } = useAppState();

  const filtered = useMemo(
    () =>
      services.filter(
        (service) =>
          (dept === "all" || service.department === dept) &&
          (service.name.toLowerCase().includes(query.toLowerCase()) ||
            service.description.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, dept],
  );

  const popular = services.filter((service) => service.popular);

  const recentServices = recent
    .map((id) => services.find((service) => service.id === id))
    .filter(Boolean);

  const clearFilters = () => {
    setQuery("");
    setDept("all");
  };

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="rounded-2xl border border-line bg-card p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Grid2X2 className="size-4" />
                UNIFIED GOVERNMENT SERVICES
              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-paper sm:text-4xl">
                Find the service you need.
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-paper-dim">
                Browse available government services from multiple departments in one place. Select
                a service to view requirements and start your application.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
              <Sparkles className="size-4 text-primary" />
              <div>
                <div className="text-xs font-semibold text-paper">Smart Auto-Fill</div>
                <div className="text-[11px] text-paper-dim">Uses your saved profile</div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mt-7 flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-paper-dim" />

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search government services..."
                className="w-full rounded-xl border border-line bg-background py-3.5 pl-12 pr-4 text-sm text-paper outline-none transition placeholder:text-paper-dim focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {(query || dept !== "all") && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-card px-4 py-3 text-sm font-medium text-paper transition hover:bg-muted"
              >
                <RotateCcw className="size-4" />
                Reset
              </button>
            )}
          </div>

          {/* Department Filters */}
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={() => setDept("all")}
              className={
                "rounded-full px-4 py-2 text-sm font-medium transition " +
                (dept === "all"
                  ? "bg-primary text-primary-foreground"
                  : "border border-line bg-background text-paper hover:bg-muted")
              }
            >
              All Services
            </button>

            {departments.map((department) => (
              <button
                key={department.id}
                onClick={() => setDept(department.id)}
                className={
                  "rounded-full px-4 py-2 text-sm font-medium transition " +
                  (dept === department.id
                    ? "bg-primary text-primary-foreground"
                    : "border border-line bg-background text-paper hover:bg-muted")
                }
              >
                {department.name}
              </button>
            ))}
          </div>
        </section>

        {/* Results */}
        <section className="mt-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-paper">Available Services</h2>

              <p className="mt-1 text-sm text-paper-dim">
                {filtered.length} service
                {filtered.length !== 1 ? "s" : ""} available
              </p>
            </div>

            {dept !== "all" && (
              <div className="flex items-center gap-2 text-sm text-paper-dim">
                <Building2 className="size-4 text-primary" />
                {departments.find((department) => department.id === dept)?.name}
              </div>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-card py-14 text-center">
              <Search className="size-9 text-paper-dim" />

              <h3 className="mt-4 font-semibold text-paper">No services found</h3>

              <p className="mt-1 max-w-sm text-sm text-paper-dim">
                Try searching with a different keyword or select another department.
              </p>

              <button
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                View All Services
              </button>
            </div>
          )}
        </section>

        {/* Bottom Sections */}
        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Popular Services */}
          <div className="rounded-2xl border border-line bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="size-5" />
              </div>

              <div>
                <h2 className="font-semibold text-paper">Popular Services</h2>

                <p className="text-xs text-paper-dim">Frequently used government services</p>
              </div>
            </div>

            <div className="space-y-3">
              {popular.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between rounded-xl border border-line bg-background p-4 transition hover:border-primary/30"
                >
                  <div>
                    <div className="font-medium text-paper">{service.name}</div>

                    <div className="mt-1 text-xs text-paper-dim">{service.description}</div>
                  </div>

                  <div className="ml-4 flex shrink-0 items-center gap-1 text-xs text-paper-dim">
                    <Clock3 className="size-3.5" />
                    {service.processingTime}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Accessed */}
          <div className="rounded-2xl border border-line bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Clock3 className="size-5" />
              </div>

              <div>
                <h2 className="font-semibold text-paper">Recently Accessed</h2>

                <p className="text-xs text-paper-dim">Continue where you left off</p>
              </div>
            </div>

            {recentServices.length > 0 ? (
              <div className="space-y-3">
                {recentServices.map((service) => (
                  <div
                    key={service!.id}
                    className="flex items-center justify-between rounded-xl border border-line bg-background p-4"
                  >
                    <div>
                      <div className="font-medium text-paper">{service!.name}</div>

                      <div className="mt-1 text-xs text-paper-dim">{service!.description}</div>
                    </div>

                    <span className="ml-4 shrink-0 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                      Resume
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                <Clock3 className="size-9 text-paper-dim" />

                <h3 className="mt-3 font-medium text-paper">No recent services</h3>

                <p className="mt-1 text-sm text-paper-dim">Services you access will appear here.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
