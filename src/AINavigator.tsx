import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Award,
  Baby,
  Bot,
  CheckCircle2,
  GraduationCap,
  Home,
  Landmark,
  Search,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";

type AINavigatorProps = {
  onNavigate: (screen: string) => void;
  onApply: (service: string) => void;
};

type Service = {
  title: string;
  department: string;
  description: string;
  keywords: string[];
  icon: ReactNode;
  iconClass: string;
  iconBg: string;
};

const services: Service[] = [
  {
    title: "Income Certificate",
    department: "Revenue Department",
    description:
      "Apply for an income certificate for scholarships, government benefits and other official requirements.",
    keywords: [
      "income",
      "salary",
      "earnings",
      "revenue",
      "income proof",
    ],
    icon: <Landmark size={22} />,
    iconClass: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    title: "Residence Certificate",
    department: "Revenue Department",
    description:
      "Get proof of residence for government applications, education and official services.",
    keywords: [
      "residence",
      "resident",
      "address",
      "domicile",
      "home",
      "address proof",
    ],
    icon: <Home size={22} />,
    iconClass: "text-indigo-600",
    iconBg: "bg-indigo-100",
  },
  {
    title: "Scholarship Application",
    department: "Education Department",
    description:
      "Apply for eligible government scholarship programs and education-related financial support.",
    keywords: [
      "scholarship",
      "student",
      "education",
      "college",
      "school",
      "financial aid",
      "study",
    ],
    icon: <GraduationCap size={22} />,
    iconClass: "text-purple-600",
    iconBg: "bg-purple-100",
  },
  {
    title: "Birth Certificate",
    department: "Municipal Department",
    description:
      "Apply for or request a birth certificate for official records and documentation.",
    keywords: [
      "birth",
      "baby",
      "child",
      "born",
      "newborn",
    ],
    icon: <Baby size={22} />,
    iconClass: "text-pink-600",
    iconBg: "bg-pink-100",
  },
  {
    title: "Social Welfare Scheme",
    department: "Social Welfare Department",
    description:
      "Explore government welfare schemes and support programs for eligible citizens.",
    keywords: [
      "welfare",
      "scheme",
      "benefit",
      "pension",
      "financial support",
      "social",
    ],
    icon: <Users size={22} />,
    iconClass: "text-emerald-600",
    iconBg: "bg-emerald-100",
  },
];

const quickQuestions = [
  {
    label: "I need an income certificate",
    searchValue: "income",
    icon: <Landmark size={17} />,
  },
  {
    label: "I want a scholarship",
    searchValue: "scholarship",
    icon: <GraduationCap size={17} />,
  },
  {
    label: "I need proof of residence",
    searchValue: "residence",
    icon: <Home size={17} />,
  },
  {
    label: "I need a birth certificate",
    searchValue: "birth",
    icon: <Baby size={17} />,
  },
];

function AINavigator({
  onNavigate,
  onApply,
}: AINavigatorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return services;
    }

    const words = query
      .split(/\s+/)
      .map((word) => word.replace(/[^a-z0-9]/g, ""))
      .filter(
        (word) =>
          word.length > 2 &&
          ![
            "the",
            "and",
            "for",
            "need",
            "want",
            "get",
            "please",
            "certificate",
            "application",
          ].includes(word),
      );

    return services.filter((service) => {
      const searchableText = [
        service.title,
        service.department,
        service.description,
        ...service.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return words.some((word) =>
        searchableText.includes(word),
      );
    });
  }, [searchQuery]);

  const handleQuickQuestion = (searchValue: string) => {
    setSearchQuery(searchValue);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <button
            onClick={() => onNavigate("dashboard")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <Landmark size={21} />
            </div>

            <div className="text-left">
              <p className="text-lg font-black tracking-tight text-slate-900">
                LOK SEVAK
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Government Services
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate("dashboard")}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-indigo-700 to-indigo-800 px-5 py-14 text-white sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
            <Sparkles size={30} />
          </div>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider ring-1 ring-white/15">
            <Bot size={15} />
            AI Navigator
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            What government service do you need?
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
            Tell us what you need in simple words. The navigator will help
            you find the relevant government service.
          </p>

          {/* Search */}
          <div className="mx-auto mt-8 max-w-3xl">
            <div className="flex items-center gap-3 rounded-2xl bg-white p-2 shadow-2xl">
              <Search
                size={22}
                className="ml-3 shrink-0 text-slate-400"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Example: I need an income certificate"
                className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="rounded-xl px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        {/* Quick Questions */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-blue-600" />

            <h2 className="text-lg font-extrabold text-slate-900">
              Try asking
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickQuestions.map((question) => (
              <button
                key={question.label}
                onClick={() =>
                  handleQuickQuestion(question.searchValue)
                }
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  {question.icon}
                </div>

                <span className="text-sm font-semibold leading-5 text-slate-700">
                  {question.label}
                </span>

                <ArrowRight
                  size={16}
                  className="ml-auto shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500"
                />
              </button>
            ))}
          </div>
        </section>

        {/* Results */}
        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Available services
              </p>

              <h2 className="mt-1 text-2xl font-black text-slate-900">
                {searchQuery
                  ? "Services matching your request"
                  : "Explore Government Services"}
              </h2>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
              {filteredServices.length}{" "}
              {filteredServices.length === 1
                ? "service"
                : "services"}
            </span>
          </div>

          {filteredServices.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {filteredServices.map((service) => (
                <div
                  key={service.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${service.iconBg} ${service.iconClass}`}
                    >
                      {service.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-extrabold text-slate-900">
                          {service.title}
                        </h3>

                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                          Demo Available
                        </span>
                      </div>

                      <p className="mt-1 text-xs font-semibold text-slate-500">
                        {service.department}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>

                  <button
                    onClick={() => onApply(service.title)}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    Apply Now
                    <ArrowRight size={17} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Search size={25} />
              </div>

              <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                No services found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Try words like income, scholarship, residence, birth
                certificate or welfare.
              </p>

              <button
                onClick={() => setSearchQuery("")}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
              >
                Show All Services
              </button>
            </div>
          )}
        </section>

        {/* How it works */}
        <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Simple process
            </p>

            <h2 className="mt-1 text-2xl font-black text-slate-900">
              How the Navigator works
            </h2>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Step
              number="01"
              icon={<UserRound size={20} />}
              title="Tell us what you need"
              description="Type your requirement in normal language."
            />

            <Step
              number="02"
              icon={<Bot size={20} />}
              title="Find the service"
              description="The prototype matches your request with available services."
            />

            <Step
              number="03"
              icon={<CheckCircle2 size={20} />}
              title="Start your application"
              description="Choose the service and continue to the application form."
            />
          </div>
        </section>

        {/* Notice */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <div className="flex gap-3">
            <Award className="mt-0.5 shrink-0" size={18} />

            <div>
              <p className="font-bold">
                Prototype / Demo Notice
              </p>

              <p className="mt-1 leading-6">
                The AI Navigator currently uses simulated service
                matching for the SIH prototype. A production version
                could connect to live government service databases and
                an AI model.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => onNavigate("services")}
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            Browse All Services
          </button>

          <button
            onClick={() => onNavigate("dashboard")}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
          >
            Back to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}

type StepProps = {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
};

function Step({
  number,
  icon,
  title,
  description,
}: StepProps) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <p className="mt-3 text-[11px] font-black tracking-widest text-blue-600">
        {number}
      </p>

      <h3 className="mt-1 font-extrabold text-slate-900">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

export default AINavigator;