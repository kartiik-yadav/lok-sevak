import {
  ArrowLeft,
  ArrowRight,
  Award,
  Baby,
  BadgeIndianRupee,
  CheckCircle2,
  Clock3,
  FileCheck2,
  GraduationCap,
  Home,
  Landmark,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

type GovernmentServicesProps = {
  onApply: (service: string) => void;
  onNavigate: (screen: string) => void;
};

type Service = {
  name: string;
  description: string;
  department: string;
  time: string;
  category: string;
  icon: typeof FileCheck2;
  available: boolean;
};

const services: Service[] = [
  {
    name: "Income Certificate",
    description:
      "Apply for an official certificate showing your annual family income.",
    department: "Revenue Department",
    time: "5–10 min",
    category: "Certificates",
    icon: BadgeIndianRupee,
    available: true,
  },
  {
    name: "Residence Certificate",
    description:
      "Get proof of residence for government services, schemes and official purposes.",
    department: "Revenue Department",
    time: "5–10 min",
    category: "Certificates",
    icon: Home,
    available: true,
  },
  {
    name: "Scholarship Application",
    description:
      "Apply for education-related financial assistance through a guided workflow.",
    department: "Education Department",
    time: "10–15 min",
    category: "Education",
    icon: GraduationCap,
    available: true,
  },
  {
    name: "Birth Certificate",
    description:
      "Submit a request for an official birth certificate.",
    department: "Municipal Administration",
    time: "10–15 min",
    category: "Certificates",
    icon: Baby,
    available: true,
  },
  {
    name: "Social Welfare Scheme",
    description:
      "Explore and apply for eligible social welfare assistance.",
    department: "Social Welfare Department",
    time: "10–15 min",
    category: "Welfare",
    icon: Users,
    available: true,
  },
  {
    name: "Caste Certificate",
    description:
      "Access caste certificate application services.",
    department: "Revenue Department",
    time: "Coming soon",
    category: "Certificates",
    icon: FileCheck2,
    available: false,
  },
  {
    name: "Senior Citizen Services",
    description:
      "Explore services and benefits intended for senior citizens.",
    department: "Social Welfare Department",
    time: "Coming soon",
    category: "Welfare",
    icon: Award,
    available: false,
  },
  {
    name: "Business Registration",
    description:
      "Explore government registration services for businesses and enterprises.",
    department: "Industries Department",
    time: "Coming soon",
    category: "Business",
    icon: Landmark,
    available: false,
  },
];

const categories = [
  "All",
  "Certificates",
  "Education",
  "Welfare",
  "Business",
];

function GovernmentServices({
  onApply,
  onNavigate,
}: GovernmentServicesProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return services.filter((service) => {
      const matchesCategory =
        category === "All" || service.category === category;

      const matchesSearch =
        !query ||
        service.name.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.department.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const availableCount = services.filter(
    (service) => service.available,
  ).length;

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
              <div className="text-lg font-extrabold tracking-tight">
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

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        {/* Back */}
        <button
          onClick={() => onNavigate("dashboard")}
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-6 text-white shadow-xl sm:p-9">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-purple-300/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold backdrop-blur">
              <Sparkles size={14} />
              Government Service Centre
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
              Find the service you need.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
              Browse common government services and start an application
              through the LOK SEVAK guided workflow.
            </p>

            {/* Search */}
            <div className="mt-7 flex items-center rounded-2xl bg-white px-4 shadow-lg">
              <Search
                size={20}
                className="mr-3 flex-shrink-0 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search services, departments or certificates..."
                className="w-full bg-transparent py-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-7 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Landmark size={20} />
            </div>

            <p className="text-2xl font-black">
              {services.length}
            </p>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Services Listed
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={20} />
            </div>

            <p className="text-2xl font-black">
              {availableCount}
            </p>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Demo Flows Available
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Clock3 size={20} />
            </div>

            <p className="text-2xl font-black">
              5–15 min
            </p>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Typical Demo Journey
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold">
                Browse Services
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose a category or search directly.
              </p>
            </div>

            <span className="hidden text-xs font-semibold text-slate-400 sm:block">
              {filteredServices.length} results
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-bold transition ${
                  category === item
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* Service cards */}
        <section className="mt-6">
          {filteredServices.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <Search
                size={30}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-extrabold">
                No services found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try a different search term or category.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredServices.map((service) => {
                const Icon = service.icon;

                return (
                  <article
                    key={service.name}
                    className={`group rounded-3xl border bg-white p-6 shadow-sm transition ${
                      service.available
                        ? "border-slate-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                        : "border-slate-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                          service.available
                            ? "bg-blue-50 text-blue-600"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        <Icon size={22} />
                      </div>

                      {service.available ? (
                        <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                          Demo Available
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Coming Soon
                        </span>
                      )}
                    </div>

                    <h3 className="mt-5 text-xl font-black">
                      {service.name}
                    </h3>

                    <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-500">
                      {service.description}
                    </p>

                    <div className="mt-5 space-y-2.5">
                      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Department
                        </span>

                        <span className="max-w-[58%] text-right text-xs font-bold text-slate-700">
                          {service.department}
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Time
                        </span>

                        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                          {service.available && <Clock3 size={13} />}
                          {service.time}
                        </span>
                      </div>
                    </div>

                    {service.available ? (
                      <button
                        onClick={() => onApply(service.name)}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-extrabold text-white transition hover:bg-blue-700"
                      >
                        Apply Now
                        <ArrowRight size={17} />
                      </button>
                    ) : (
                      <button
                        disabled
                        className="mt-5 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3.5 text-sm font-bold text-slate-400"
                      >
                        Coming Soon
                      </button>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* AI Navigator CTA */}
        <section className="mt-9 overflow-hidden rounded-3xl border border-purple-100 bg-gradient-to-r from-purple-50 to-blue-50 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-purple-600 shadow-sm">
                <Sparkles size={22} />
              </div>

              <div>
                <h2 className="font-extrabold text-slate-900">
                  Not sure which service you need?
                </h2>

                <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
                  Describe your requirement in simple language and
                  use the Smart Service Navigator to discover relevant
                  services.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate("ai-navigator")}
              className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-purple-700"
            >
              Open Navigator
              <ArrowRight size={17} />
            </button>
          </div>
        </section>

        {/* Prototype notice */}
        <section className="mt-5 rounded-3xl border border-indigo-100 bg-indigo-50 p-5 sm:p-6">
          <div className="flex gap-3">
            <ShieldCheck
              size={20}
              className="mt-0.5 flex-shrink-0 text-indigo-600"
            />

            <p className="text-sm leading-6 text-indigo-900/75">
              <span className="font-bold text-indigo-950">
                SIH prototype:
              </span>{" "}
              Service listings and application workflows are simulated
              for demonstration. The portal does not directly submit
              applications to live government systems.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default GovernmentServices;