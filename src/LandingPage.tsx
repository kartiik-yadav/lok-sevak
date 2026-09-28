import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

type LandingPageProps = {
  onEnterDemo: () => void;
  onExploreServices: () => void;
};

function LandingPage({
  onEnterDemo,
  onExploreServices,
}: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ================= NAVBAR ================= */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/20 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

          {/* LOGO */}
          <button
            onClick={onEnterDemo}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white shadow-lg">
              <ShieldCheck size={25} />
            </div>

            <div className="text-left">
              <div className="text-xl font-extrabold tracking-tight text-blue-900">
                LOK SEVAK
              </div>

              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Citizen Service Portal
              </div>
            </div>
          </button>

          {/* NAV LINKS */}
          <nav className="hidden items-center gap-8 md:flex">
            <button
              onClick={onEnterDemo}
              className="text-sm font-semibold text-slate-700 transition hover:text-blue-700"
            >
              Home
            </button>

            <button
              onClick={onExploreServices}
              className="text-sm font-semibold text-slate-700 transition hover:text-blue-700"
            >
              Services
            </button>

            <button
              onClick={onEnterDemo}
              className="text-sm font-semibold text-slate-700 transition hover:text-blue-700"
            >
              How It Works
            </button>
          </nav>

          {/* DEMO BUTTON */}
          <button
            onClick={onEnterDemo}
            className="flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
          >
            Enter Demo
            <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative min-h-[760px] overflow-hidden pt-20">

        {/* PARLIAMENT IMAGE */}
        <img
          src="/parliament.jpg"
          alt="New Parliament Building of India"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* DARK BLUE OVERLAY */}
        <div className="absolute inset-0 bg-blue-950/65" />

        {/* LEFT GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-950/70 to-blue-900/20" />

        {/* BOTTOM GRADIENT */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-50 to-transparent" />

        {/* HERO CONTENT */}
        <div className="relative z-10 mx-auto flex min-h-[680px] max-w-7xl items-center px-6 py-20 lg:px-8">

          <div className="max-w-3xl">

            {/* BADGE */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
              <Sparkles size={16} />
              Smart Government Services Platform
            </div>

            {/* HEADING */}
            <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Government Services.
              <span className="block text-blue-200">
                Simplified for Citizens.
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-50 sm:text-xl">
              Discover government schemes, apply for certificates,
              manage documents, and track applications — all from
              one simple citizen-focused portal.
            </p>

            {/* SEARCH */}
            <div className="mt-9 flex max-w-2xl items-center rounded-2xl border border-white/20 bg-white p-2 shadow-2xl">
              <div className="flex flex-1 items-center gap-3 px-4">
                <Search
                  size={21}
                  className="shrink-0 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search government services..."
                  className="w-full bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>

              <button
                onClick={onExploreServices}
                className="rounded-xl bg-blue-700 px-6 py-3 font-bold text-white transition hover:bg-blue-800"
              >
                Search
              </button>
            </div>

            {/* BUTTONS */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={onEnterDemo}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-blue-800 shadow-xl transition hover:bg-blue-50"
              >
                Explore Dashboard
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onExploreServices}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-7 py-3.5 font-bold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                View Services
              </button>

            </div>

            {/* TRUST POINTS */}
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/90">

              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} />
                Citizen friendly
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} />
                Simple application flow
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} />
                Application tracking
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK ACTIONS ================= */}
      <section className="relative z-20 mx-auto -mt-20 max-w-7xl px-6 pb-20 lg:px-8">

        <div className="grid gap-5 md:grid-cols-3">

          {/* CARD 1 */}
          <button
            onClick={onExploreServices}
            className="group rounded-3xl border border-slate-200 bg-white p-7 text-left shadow-xl shadow-slate-900/10 transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <Search size={24} />
            </div>

            <h3 className="text-lg font-extrabold text-slate-900">
              Find a Service
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Search and explore government services available through
              the LOK SEVAK portal.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-bold text-blue-700">
              Explore Services
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />
            </div>
          </button>

          {/* CARD 2 */}
          <button
            onClick={onEnterDemo}
            className="group rounded-3xl border border-slate-200 bg-white p-7 text-left shadow-xl shadow-slate-900/10 transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
              <FileText size={24} />
            </div>

            <h3 className="text-lg font-extrabold text-slate-900">
              Track Applications
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Check your application status and follow every stage of
              the verification process.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-bold text-indigo-700">
              Open Dashboard
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />
            </div>
          </button>

          {/* CARD 3 */}
          <button
            onClick={onEnterDemo}
            className="group rounded-3xl border border-slate-200 bg-white p-7 text-left shadow-xl shadow-slate-900/10 transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <UserRound size={24} />
            </div>

            <h3 className="text-lg font-extrabold text-slate-900">
              Manage Your Profile
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Keep your citizen profile and submitted documents
              organized in one place.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-bold text-emerald-700">
              Enter Dashboard
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />
            </div>
          </button>

        </div>
      </section>

      {/* ================= POPULAR SERVICES ================= */}
      <section className="bg-white px-6 py-20 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">
            <div className="text-sm font-bold uppercase tracking-widest text-blue-700">
              Popular Services
            </div>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Access important citizen services
            </h2>

            <p className="mt-4 text-slate-500">
              A simplified interface for discovering and applying for
              frequently used government services.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                title: "Income Certificate",
                description: "Apply for an income certificate.",
              },
              {
                title: "Residence Certificate",
                description: "Apply for proof of residence.",
              },
              {
                title: "Caste Certificate",
                description: "Access caste certificate services.",
              },
              {
                title: "Scholarship",
                description: "Explore scholarship applications.",
              },
            ].map((service) => (
              <button
                key={service.title}
                onClick={onExploreServices}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <FileText size={21} />
                </div>

                <h3 className="mt-5 font-extrabold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {service.description}
                </p>

                <div className="mt-4 text-sm font-bold text-blue-700">
                  Apply →
                </div>
              </button>
            ))}

          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-slate-50 px-6 py-20 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">
            <div className="text-sm font-bold uppercase tracking-widest text-blue-700">
              How It Works
            </div>

            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
              From service discovery to application tracking
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-4">

            {[
              {
                number: "01",
                title: "Find a Service",
                text: "Search for the government service you need.",
              },
              {
                number: "02",
                title: "Fill Details",
                text: "Enter your information and upload documents.",
              },
              {
                number: "03",
                title: "Submit",
                text: "Review your application and submit it.",
              },
              {
                number: "04",
                title: "Track",
                text: "Track the application through every stage.",
              },
            ].map((step) => (
              <div key={step.number} className="text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-lg font-black text-white shadow-lg">
                  {step.number}
                </div>

                <h3 className="mt-5 font-extrabold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {step.text}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-blue-950 px-6 py-10 text-white lg:px-8">

        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>
            <div className="text-xl font-black">
              LOK SEVAK
            </div>

            <p className="mt-1 text-sm text-blue-200">
              Government Services. Simplified for Citizens.
            </p>
          </div>

          <div className="text-sm text-blue-200">
            Prototype for Smart India Hackathon
          </div>

        </div>
      </footer>

    </div>
  );
}

export default LandingPage;