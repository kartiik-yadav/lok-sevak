import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  type Application,
  type CitizenProfile,
  demoCitizen,
  seedApplications,
} from "@/lib/demo-data";

import { type Lang } from "@/lib/i18n";

export type DocStatus = "Available" | "Required" | "Uploaded" | "Missing";

export type ApplicationDraft = {
  serviceId: string;
  reference: string;
  step: number;
  values: Record<string, string>;
  modified: string[];
  documents: Record<string, DocStatus>;
  declared: boolean;
  savedAt: string;
};

export type Theme = "light" | "dark";

type AppState = {
  demoStarted: boolean;
  startDemo: () => void;

  lang: Lang;
  setLang: (l: Lang) => void;

  theme: Theme;
  setTheme: (theme: Theme) => void;

  profile: CitizenProfile;
  saveProfile: (p: CitizenProfile) => void;

  applications: Application[];
  addApplication: (app: Application) => void;

  recent: string[];
  markRecent: (serviceId: string) => void;

  journeyStep: number;
  setJourneyStep: (n: number) => void;

  drafts: Record<string, ApplicationDraft>;
  saveDraft: (draft: ApplicationDraft) => void;
  clearDraft: (serviceId: string) => void;
};

const Ctx = createContext<AppState | null>(null);

const PROFILE_KEY = "loksevak.profile.v1";
const DRAFTS_KEY = "loksevak.drafts.v1";
const THEME_KEY = "loksevak.theme.v1";
const APPLICATIONS_KEY = "loksevak.applications.v1";

function readLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key: string, value: unknown) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable in prototype environment
  }
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [demoStarted, setDemoStarted] = useState(false);

  const [lang, setLang] = useState<Lang>("en");

  const [theme, setThemeState] = useState<Theme>("light");

  const [applications, setApplications] = useState<Application[]>(seedApplications);

  const [recent, setRecent] = useState<string[]>(["income-certificate", "scholarship"]);

  const [journeyStep, setJourneyStep] = useState(0);

  const [profile, setProfile] = useState<CitizenProfile>(demoCitizen);

  const [drafts, setDrafts] = useState<Record<string, ApplicationDraft>>({});

  /*
   * Hydrate persisted data after mount.
   * This keeps the code SSR-safe.
   */
  useEffect(() => {
    setProfile(readLocal<CitizenProfile>(PROFILE_KEY, demoCitizen));

    setDrafts(readLocal<Record<string, ApplicationDraft>>(DRAFTS_KEY, {}));

    setApplications(readLocal<Application[]>(APPLICATIONS_KEY, seedApplications));

    setThemeState(readLocal<Theme>(THEME_KEY, "light"));
  }, []);

  /*
   * Theme handling
   */
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }

    writeLocal(THEME_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
  }, []);

  const startDemo = useCallback(() => {
    setDemoStarted(true);
    setJourneyStep(0);
  }, []);

  /*
   * Profile persistence
   */
  const saveProfile = useCallback((p: CitizenProfile) => {
    setProfile(p);
    writeLocal(PROFILE_KEY, p);
  }, []);

  /*
   * Draft persistence
   */
  const saveDraft = useCallback((draft: ApplicationDraft) => {
    setDrafts((prev) => {
      const next = {
        ...prev,
        [draft.serviceId]: draft,
      };

      writeLocal(DRAFTS_KEY, next);

      return next;
    });
  }, []);

  const clearDraft = useCallback((serviceId: string) => {
    setDrafts((prev) => {
      const next = {
        ...prev,
      };

      delete next[serviceId];

      writeLocal(DRAFTS_KEY, next);

      return next;
    });
  }, []);

  /*
   * Application persistence
   */
  const addApplication = useCallback((app: Application) => {
    setApplications((prev) => {
      const next = [app, ...prev];

      writeLocal(APPLICATIONS_KEY, next);

      return next;
    });
  }, []);

  /*
   * Recent services
   */
  const markRecent = useCallback((serviceId: string) => {
    setRecent((prev) => [serviceId, ...prev.filter((s) => s !== serviceId)].slice(0, 4));
  }, []);

  const value = useMemo(
    () => ({
      demoStarted,
      startDemo,

      lang,
      setLang,

      theme,
      setTheme,

      profile,
      saveProfile,

      applications,
      addApplication,

      recent,
      markRecent,

      journeyStep,
      setJourneyStep,

      drafts,
      saveDraft,
      clearDraft,
    }),
    [
      demoStarted,
      startDemo,

      lang,

      theme,
      setTheme,

      profile,
      saveProfile,

      applications,
      addApplication,

      recent,
      markRecent,

      journeyStep,

      drafts,
      saveDraft,
      clearDraft,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const ctx = useContext(Ctx);

  if (!ctx) {
    throw new Error("useAppState must be used inside AppStateProvider");
  }

  return ctx;
}
