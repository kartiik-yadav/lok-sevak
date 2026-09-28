import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  Clock3,
  FileCheck2,
  FileText,
  GraduationCap,
  House,
 Search,
ScanLine,
ShieldCheck,
Sparkles,
  UserRound,
  Users,
} from "lucide-react";

type DashboardProps = {
  onNavigate: (screen: string) => void;
};

function Dashboard({ onNavigate }: DashboardProps) {
  const services = [
    {
      title: "Income Certificate",
      description:
        "Apply for your income certificate online in a few simple steps.",
      icon: FileText,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      visual: "income",
    },
    {
      title: "Residence Certificate",
      description:
        "Get your residence certificate quickly and easily.",
      icon: House,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      visual: "residence",
    },
    {
      title: "Scholarship Application",
      description:
        "Apply for government scholarships for your education.",
      icon: GraduationCap,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      visual: "scholarship",
    },
    {
      title: "Caste Certificate",
      description:
        "Submit your caste certificate application online.",
      icon: Users,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
      visual: "caste",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ========================================================= */}
      {/* NAVBAR */}
      {/* ========================================================= */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">

        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center px-6 lg:px-10">

          {/* LOGO */}
          <button
            onClick={() => onNavigate("dashboard")}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
              <ShieldCheck size={25} strokeWidth={2.4} />
            </div>

            <div className="text-left leading-none">
              <div className="text-[22px] font-black tracking-tight text-[#102a61]">
                LOK SEVAK
              </div>

              <div className="mt-1 text-[11px] font-medium text-slate-500">
                Government Service Portal
              </div>
            </div>
          </button>

          {/* DIVIDER */}
          <div className="mx-7 hidden h-8 w-px bg-slate-200 lg:block" />

          {/* NAVIGATION */}
          <nav className="hidden items-center gap-2 lg:flex">

            <button
              onClick={() => onNavigate("dashboard")}
              className="flex items-center gap-2 rounded-xl bg-blue-50 px-5 py-3 text-sm font-bold text-blue-700"
            >
              <House size={18} />
              Home
            </button>

            <button
              onClick={() => onNavigate("services")}
              className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
            >
              <BriefcaseBusiness size={18} />
              Services
            </button>

            <button
              onClick={() => onNavigate("ai-navigator")}
              className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
            >
              <ShieldCheck size={18} />
              How It Works
            </button>

            <button
              onClick={() => onNavigate("profile")}
              className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
            >
              <UserRound size={18} />
              About
            </button>

          </nav>

          {/* RIGHT SIDE */}
          <div className="ml-auto flex items-center gap-3">

            {/* SEARCH */}
            <button
              onClick={() => onNavigate("services")}
              className="hidden h-11 w-[250px] items-center gap-3 rounded-full bg-slate-100 px-5 text-left text-sm text-slate-400 transition hover:bg-slate-200 xl:flex"
            >
              <Search size={18} />

              <span>
                Search services, schemes...
              </span>
            </button>

            {/* NOTIFICATION */}
            <button
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100"
            >
              <Bell size={22} />

              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
            </button>

            <div className="hidden h-8 w-px bg-slate-200 sm:block" />

            {/* USER */}
            <button
              onClick={() => onNavigate("profile")}
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-slate-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#17366f] text-white">
                <UserRound size={21} />
              </div>

              <span className="hidden text-sm font-bold text-slate-800 md:block">
                Rahul
              </span>

              <ChevronDown
                size={17}
                className="hidden text-slate-500 md:block"
              />
            </button>

          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* HERO */}
      {/* ========================================================= */}

      <section className="relative overflow-hidden">

        {/* PARLIAMENT IMAGE */}
        <img
          src="/parliament.jpg"
          alt="New Parliament Building of India"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* WHITE / BLUE OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/10" />

        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-blue-100/50" />

        {/* CONTENT */}
        <div className="relative mx-auto max-w-[1500px] px-6 pb-24 pt-12 lg:px-10">

          {/* SMALL LABEL */}
          <div className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-blue-600">
            Quick Access
          </div>

          {/* TITLE */}
          <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-tight text-[#10295d] sm:text-5xl lg:text-[54px]">
            What would you{" "}
            <span className="text-blue-600">
              like to do?
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Access government services, track applications, manage your
            profile and more — all in one place with LOK SEVAK.
          </p>

          {/* SEARCH */}
          <button
            onClick={() => onNavigate("services")}
            className="mt-7 flex h-[58px] w-full max-w-[670px] items-center gap-4 rounded-full border border-slate-200 bg-white/95 px-6 text-left shadow-lg shadow-blue-900/10 transition hover:shadow-xl"
          >
            <Search
              size={23}
              className="shrink-0 text-slate-500"
            />

            <span className="flex-1 text-sm text-slate-400 sm:text-base">
              Search for a service (e.g. Income Certificate, Scholarship...)
            </span>

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
              <ArrowRight size={20} />
            </span>
          </button>

          {/* QUICK ACCESS CARDS */}
          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

            {/* APPLY */}
            <button
              onClick={() => onNavigate("services")}
              className="group flex min-h-[112px] items-center gap-4 rounded-2xl border border-white/80 bg-white/90 p-5 text-left shadow-lg shadow-blue-900/10 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <FileCheck2 size={27} />
              </div>

              <div className="flex-1">
                <h3 className="font-extrabold text-[#10295d]">
                  Apply for a Service
                </h3>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Find and apply for government services.
                </p>
              </div>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-200 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <ArrowRight size={17} />
              </div>
            </button>

            {/* TRACK */}
            <button
              onClick={() => onNavigate("applications")}
              className="group flex min-h-[112px] items-center gap-4 rounded-2xl border border-white/80 bg-white/90 p-5 text-left shadow-lg shadow-blue-900/10 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <Clock3 size={27} />
              </div>

              <div className="flex-1">
                <h3 className="font-extrabold text-[#10295d]">
                  Track Application
                </h3>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Check the latest status of your application.
                </p>
              </div>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-200 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <ArrowRight size={17} />
              </div>
            </button>

            {/* APPLICATIONS */}
            <button
              onClick={() => onNavigate("applications")}
              className="group flex min-h-[112px] items-center gap-4 rounded-2xl border border-white/80 bg-white/90 p-5 text-left shadow-lg shadow-blue-900/10 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <FileText size={27} />
              </div>

              <div className="flex-1">
                <h3 className="font-extrabold text-[#10295d]">
                  My Applications
                </h3>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  View all your submitted applications.
                </p>
              </div>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-200 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <ArrowRight size={17} />
              </div>
            </button>

            {/* PROFILE */}
            <button
              onClick={() => onNavigate("profile")}
              className="group flex min-h-[112px] items-center gap-4 rounded-2xl border border-white/80 bg-white/90 p-5 text-left shadow-lg shadow-blue-900/10 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <UserRound size={27} />
              </div>

              <div className="flex-1">
                <h3 className="font-extrabold text-[#10295d]">
                  My Profile
                </h3>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Manage your citizen profile and details.
                </p>
              </div>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-200 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <ArrowRight size={17} />
              </div>
            </button>

            
          </div>
          
        </div>
      </section>

      {/* ========================================================= */}
      {/* SERVICES */}
      {/* ========================================================= */}

      <section className="bg-white px-6 py-9 lg:px-10">

        <div className="mx-auto max-w-[1500px]">

          {/* SECTION HEADER */}
          <div className="flex items-end justify-between">

            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                Our Services
              </div>

              <h2 className="mt-1 text-3xl font-black tracking-tight text-[#10295d]">
                Most Used Government Services
              </h2>
            </div>

            <button
              onClick={() => onNavigate("services")}
              className="hidden items-center gap-2 text-sm font-bold text-blue-600 sm:flex"
            >
              View All Services
              <ArrowRight size={17} />
            </button>

          </div>

          {/* SERVICE CARDS */}
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            {services.map((service) => {
              const Icon = service.icon;

              return (
                <button
                  key={service.title}
                  onClick={() => onNavigate("services")}
                  className="group relative min-h-[185px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* DECORATIVE VISUAL */}
                  <div className="absolute bottom-0 right-0 h-32 w-40 opacity-40">

                    {service.visual === "income" && (
                      <div className="absolute right-[-15px] bottom-[-35px] h-36 w-40 rotate-[-12deg] rounded-xl bg-gradient-to-br from-slate-100 to-slate-300 shadow-lg">
                        <div className="p-5">
                          <div className="h-2 w-20 rounded bg-slate-400" />
                          <div className="mt-3 h-2 w-28 rounded bg-slate-300" />
                          <div className="mt-3 h-2 w-16 rounded bg-slate-300" />
                        </div>
                      </div>
                    )}

                    {service.visual === "residence" && (
                      <div className="absolute bottom-[-12px] right-[-5px]">
                        <div className="h-20 w-32 rounded-t-[40px] bg-purple-100" />
                        <div className="mx-auto h-12 w-24 bg-purple-200" />
                        <div className="absolute bottom-0 left-1/2 h-8 w-7 -translate-x-1/2 bg-purple-400" />
                      </div>
                    )}

                    {service.visual === "scholarship" && (
                      <div className="absolute bottom-[-15px] right-0">
                        <div className="h-10 w-32 rounded-md bg-emerald-100 shadow-md" />
                        <div className="mt-1 h-8 w-28 rounded-md bg-emerald-200 shadow-md" />
                        <div className="mt-1 h-7 w-24 rounded-md bg-emerald-300 shadow-md" />
                        <div className="absolute -top-7 right-8 h-10 w-14 rotate-[-15deg] rounded-t-full bg-emerald-300" />
                      </div>
                    )}

                    {service.visual === "caste" && (
                      <div className="absolute bottom-[-10px] right-5">
                        <div className="h-28 w-24 rounded-t-[50%] bg-orange-100" />
                        <div className="absolute bottom-0 left-5 h-16 w-14 rounded-t-full bg-orange-200" />
                      </div>
                    )}

                  </div>

                  {/* CONTENT */}
                  <div className="relative z-10">

                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${service.iconBg} ${service.iconColor}`}
                    >
                      <Icon size={24} />
                    </div>

                    <h3 className="mt-5 text-base font-black text-[#10295d]">
                      {service.title}
                    </h3>

                    <p className="mt-1 max-w-[240px] text-sm leading-5 text-slate-500">
                      {service.description}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-sm font-bold text-blue-600">
                      Get Started
                      <ArrowRight
                        size={16}
                        className="transition group-hover:translate-x-1"
                      />
                    </div>

                  </div>
                </button>
              );
            })}

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* RECENT APPLICATIONS */}
      {/* ========================================================= */}

      <section className="bg-white px-6 pb-10 lg:px-10">

        <div className="mx-auto max-w-[1500px] rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-blue-50 p-5">

          {/* HEADER */}
          <div className="mb-4 flex items-center justify-between">

            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                Activity
              </div>

              <h2 className="mt-1 text-2xl font-black text-[#10295d]">
                Recent Applications
              </h2>
            </div>

            <button
              onClick={() => onNavigate("applications")}
              className="flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              View All
              <ArrowRight size={17} />
            </button>

          </div>

          {/* CONTENT */}
          <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">

            {/* APPLICATION */}
            <button
              onClick={() => onNavigate("applications")}
              className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:shadow-md"
            >

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <FileText size={22} />
              </div>

              <div className="flex-1">

                <div className="font-extrabold text-[#10295d]">
                  Income Certificate
                </div>

                <div className="mt-1 text-xs text-slate-400">
                  LOK-2026-10481
                  <span className="mx-2">•</span>
                  05 September 2026
                </div>

              </div>

              <div className="rounded-full bg-orange-100 px-4 py-2 text-xs font-bold text-orange-500">
                Under Review
              </div>

              <ArrowRight
                size={18}
                className="text-slate-400"
              />

            </button>

            {/* PROFILE COMPLETION */}
            <button
              onClick={() => onNavigate("profile")}
              className="group flex items-center gap-4 rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-50 to-blue-50 p-4 text-left transition hover:shadow-md"
            >

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                <UserRound size={24} />
              </div>

              <div className="flex-1">

                <div className="font-extrabold text-[#10295d]">
                  Complete your profile
                </div>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  A complete profile helps you apply for services faster
                  and reduces repeated data entry.
                </p>

              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm transition group-hover:bg-blue-600 group-hover:text-white">
                <ArrowRight size={18} />
              </div>

            </button>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FOOTER */}
      {/* ========================================================= */}

      <footer className="border-t border-slate-200 bg-white px-6 py-6 lg:px-10">

        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-3 text-sm text-slate-400 sm:flex-row">

          <span>
            © 2026 LOK SEVAK
          </span>

          <span>
            Prototype for Smart India Hackathon
          </span>

        </div>
      </footer>

      {/* ========================================================= */}
      {/* FLOATING AI NAVIGATOR */}
      {/* ========================================================= */}

      <button
        onClick={() => onNavigate("ai-navigator")}
        aria-label="Open AI Navigator"
        className="group fixed bottom-6 right-6 z-[60] flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-left text-white shadow-xl shadow-blue-900/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:bottom-8 sm:right-8 sm:px-5 sm:py-3.5"
      >
        {/* AI ICON */}
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
          <Sparkles
            size={21}
            className="transition-transform duration-300 group-hover:rotate-12"
          />

          {/* ONLINE DOT */}
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-blue-600" />
        </div>

        {/* TEXT */}
        <div className="hidden sm:block">
          <p className="text-sm font-extrabold">
            AI Navigator
          </p>

          <p className="mt-0.5 text-[11px] text-blue-100">
            Need help finding a service?
          </p>
        </div>

        {/* ARROW */}
        <ArrowRight
          size={17}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>

    </div>
  );
}

export default Dashboard;