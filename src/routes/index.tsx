import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  ClipboardList,
  FileCheck2,
  Search,
  Sparkles,
} from "lucide-react";
import { AiNavigator } from "@/components/ai-navigator";
import { ServiceCard } from "@/components/service-card";
import { services } from "@/lib/demo-data";
import { useAppState } from "@/state/app-state";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { startDemo, applications, setJourneyStep } = useAppState();
  const navigate = useNavigate();

  const featured = [
    "income-certificate",
    "birth-certificate",
    "scholarship",
  ]
    .map((id) => services.find((s) => s.id === id))
    .filter(Boolean);

  const quickActions = [
    {
      title: "AI Service Navigator",
      description: "Tell us what you need and we'll guide you.",
      icon: Bot,
      action: () => navigate({ to: "/assistant" }),
    },
    {
      title: "Smart Auto-Fill",
      description: "Use your citizen profile to fill applications faster.",
      icon: Sparkles,
      action: () => navigate({ to: "/services" }),
    },
    {
      title: "My Applications",
      description: "Track all your government applications in one place.",
      icon: ClipboardList,
      action: () => navigate({ to: "/applications" }),
    },
  ];

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[1500px] space-y-8 px-4 py-6 sm:px-6 lg:px-8">

        {/* Welcome Section */}
        <section className="rounded-2xl border border-line bg-card p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Sparkles className="size-4" />
                LOK SEVAK DIGITAL SERVICES
              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-paper sm:text-4xl">
                Welcome back 👋
              </h1>

              <p className="mt-2 max-w-2xl text-paper-dim">
                Access government services, manage your profile and track
                applications — all from one unified platform.
              </p>
            </div>

            <button
              onClick={() => {
                startDemo();
                setJourneyStep(0);
                navigate({ to: "/assistant" });
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
            >
              Start Guided Demo
              <ArrowRight className="size-4" />
            </button>

          </div>

          {/* Service Search */}
          <button
            onClick={() => navigate({ to: "/assistant" })}
            className="mt-7 flex w-full items-center gap-3 rounded-xl border border-line bg-background px-5 py-4 text-left transition hover:border-primary/50 hover:shadow-sm"
          >
            <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
              <Search className="size-5" />
            </div>

            <div>
              <div className="font-medium text-paper">
                What service do you need?
              </div>
              <div className="text-sm text-paper-dim">
                Ask our AI to find the right government service for you
              </div>
            </div>

            <ArrowRight className="ml-auto size-5 text-paper-dim" />
          </button>
        </section>

        {/* Quick Actions */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-paper">
                Quick Actions
              </h2>
              <p className="text-sm text-paper-dim">
                Access the most useful LOK SEVAK features
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {quickActions.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.title}
                  onClick={item.action}
                  className="group rounded-2xl border border-line bg-card p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>

                    <ArrowRight className="size-5 text-paper-dim transition group-hover:translate-x-1 group-hover:text-primary" />
                  </div>

                  <h3 className="mt-5 font-semibold text-paper">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-paper-dim">
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Main Grid */}
        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">

          {/* Popular Services */}
          <div className="rounded-2xl border border-line bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-paper">
                  Popular Services
                </h2>
                <p className="text-sm text-paper-dim">
                  Start your application in just a few steps
                </p>
              </div>

              <button
                onClick={() => navigate({ to: "/services" })}
                className="text-sm font-medium text-primary hover:underline"
              >
                View all
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featured.map((service) => (
                <ServiceCard
                  key={service!.id}
                  service={service!}
                />
              ))}
            </div>
          </div>

          {/* AI Navigator */}
          <div className="rounded-2xl border border-line bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <Bot className="size-5 text-primary" />
                <h2 className="text-xl font-bold text-paper">
                  AI Service Navigator
                </h2>
              </div>

              <p className="mt-1 text-sm text-paper-dim">
                Describe what you need in simple language.
              </p>
            </div>

            <AiNavigator compact />
          </div>

        </section>

        {/* Applications */}
        <section className="rounded-2xl border border-line bg-card p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-paper">
                Recent Applications
              </h2>
              <p className="text-sm text-paper-dim">
                Track your latest government service requests
              </p>
            </div>

            <button
              onClick={() => navigate({ to: "/applications" })}
              className="text-sm font-medium text-primary hover:underline"
            >
              View all
            </button>
          </div>

          {applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line py-10 text-center">
              <FileCheck2 className="size-9 text-paper-dim" />
              <h3 className="mt-3 font-medium text-paper">
                No applications yet
              </h3>
              <p className="mt-1 text-sm text-paper-dim">
                Start a service application to see it here.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {applications.slice(0, 3).map((application) => (
                <button
                  key={application.id}
                  onClick={() => navigate({ to: "/applications" })}
                  className="rounded-xl border border-line bg-background p-4 text-left transition hover:border-primary/40 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-paper">
                        {application.serviceName}
                      </div>

                      <div className="mt-1 text-xs text-paper-dim">
                        {application.id}
                      </div>
                    </div>

                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      {application.status}
                    </span>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex justify-between text-xs text-paper-dim">
                      <span>Progress</span>
                      <span>{application.progress}%</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{
                          width: `${application.progress}%`,
                        }}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}