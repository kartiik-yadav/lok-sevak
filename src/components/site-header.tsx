import { Link, useNavigate } from "@tanstack/react-router";
import { Moon, Sun, LayoutDashboard, UserRound, Grid2X2, ClipboardList, FileText, Bell, CircleHelp, Settings, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAppState } from "@/state/app-state";
import { languages } from "@/lib/i18n";
import { LokSevakLogo } from "@/components/lok-sevak-logo";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/profile", label: "My Profile", icon: UserRound },
  { to: "/services", label: "Services", icon: Grid2X2 },
  { to: "/applications", label: "My Applications", icon: ClipboardList },
  { to: "/interoperability", label: "Documents & Hub", icon: FileText },
  { to: "/assistant", label: "AI Assistant", icon: CircleHelp },
] as const;

export function SiteHeader() {
  const { lang, setLang, theme, setTheme } = useAppState();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const sidebar = (
    <div className="flex h-full flex-col bg-[var(--sidebar)] text-[var(--sidebar-foreground)]">
      <div className="border-b border-white/10 px-5 py-5"><LokSevakLogo /></div>
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to} activeOptions={{ exact: to === "/" }} onClick={() => setOpen(false)}
            activeProps={{ className: "bg-saffron text-ink shadow-sm" }}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white">
            <Icon className="size-4" />{label}
          </Link>
        ))}
      </nav>
      <div className="space-y-1 border-t border-white/10 p-3">
        <button onClick={() => navigate({ to: "/applications" })} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/75 hover:bg-white/10"><Bell className="size-4" />Notifications</button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/75 hover:bg-white/10"><Settings className="size-4" />Settings</button>
        <div className="mt-3 flex items-center justify-between rounded-lg bg-white/10 px-3 py-2">
          <span className="text-xs text-white/70">मराठी</span><span className="text-xs text-white/50">Demo</span>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">{sidebar}</aside>
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-background/95 px-4 py-3 backdrop-blur lg:ml-64 lg:px-8">
        <button onClick={() => setOpen(true)} className="rounded-lg border border-line p-2 lg:hidden"><Menu className="size-5" /></button>
        <div className="hidden text-sm font-medium text-paper sm:block">Unified Citizen Services Platform</div>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden overflow-hidden rounded-lg border border-line sm:flex">
            {languages.map((l) => <button key={l.id} onClick={() => setLang(l.id)} className={"px-2.5 py-2 text-xs font-medium " + (lang === l.id ? "bg-primary text-primary-foreground" : "text-paper-dim hover:bg-muted")}>{l.short}</button>)}
          </div>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-3 py-2 text-sm font-medium text-paper hover:bg-muted" aria-label="Toggle light or dark mode">
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}<span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        </div>
      </header>
      {open && <div className="fixed inset-0 z-50 lg:hidden"><div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} /><aside className="relative h-full w-72 shadow-2xl">{sidebar}<button onClick={() => setOpen(false)} className="absolute right-3 top-3 rounded-md p-2 text-white/70"><X className="size-5" /></button></aside></div>}
    </>
  );
}
