import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  FileText,
  MapPin,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Progress } from "@/components/ui-bits";
import type { CitizenProfile } from "@/lib/demo-data";
import { useAppState } from "@/state/app-state";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function EditField({
  label,
  value,
  onChange,
  type = "text",
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  options?: string[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-paper">
        {label}
      </label>

      {options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-line bg-background px-3 py-2.5 text-sm text-paper outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-line bg-background px-3 py-2.5 text-sm text-paper outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
      )}
    </div>
  );
}

function ProfilePage() {
  const { profile, saveProfile } = useAppState();

  const [draft, setDraft] = useState<CitizenProfile>(profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDraft(profile);
  }, [profile]);

  const set = (key: keyof CitizenProfile) => (value: string) =>
    setDraft((previous) => ({
      ...previous,
      [key]: value,
    }) as CitizenProfile);

  const dirty = JSON.stringify(draft) !== JSON.stringify(profile);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">

        {/* Header */}
        <section className="mb-6 flex flex-col gap-5 rounded-2xl border border-line bg-card p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <UserRound className="size-4" />
              ONE CITIZEN PROFILE
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-paper">
              Your information, entered once.
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-paper-dim">
              Keep your basic information updated. LOK SEVAK securely reuses
              eligible details to help pre-fill government service applications.
            </p>
          </div>

          <div className="min-w-[230px] rounded-xl border border-line bg-background p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-paper">
                Profile Completion
              </span>
              <span className="font-semibold text-primary">
                {draft.completion}%
              </span>
            </div>

            <div className="mt-3">
              <Progress value={draft.completion} />
            </div>

            <p className="mt-2 text-xs text-paper-dim">
              Complete profiles enable faster application filling.
            </p>
          </div>
        </section>

        {/* Profile Sections */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Personal Information */}
          <section className="rounded-2xl border border-line bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <UserRound className="size-5" />
              </div>

              <div>
                <h2 className="font-semibold text-paper">
                  Personal Information
                </h2>
                <p className="text-xs text-paper-dim">
                  Basic details used across applications
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <EditField
                label="Full Name"
                value={draft.fullName}
                onChange={set("fullName")}
              />

              <EditField
                label="Date of Birth"
                type="date"
                value={draft.dateOfBirth}
                onChange={set("dateOfBirth")}
              />

              <EditField
                label="Gender"
                value={draft.gender}
                onChange={set("gender")}
                options={["Male", "Female", "Other"]}
              />

              <EditField
                label="Mobile Number"
                value={draft.mobile}
                onChange={set("mobile")}
              />

              <div className="sm:col-span-2">
                <EditField
                  label="Email Address"
                  type="email"
                  value={draft.email}
                  onChange={set("email")}
                />
              </div>
            </div>
          </section>

          {/* Address */}
          <section className="rounded-2xl border border-line bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="size-5" />
              </div>

              <div>
                <h2 className="font-semibold text-paper">
                  Address Information
                </h2>
                <p className="text-xs text-paper-dim">
                  Your primary residential address
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <EditField
                  label="Address"
                  value={draft.address}
                  onChange={set("address")}
                />
              </div>

              <EditField
                label="City"
                value={draft.city}
                onChange={set("city")}
              />

              <EditField
                label="PIN Code"
                value={draft.pin}
                onChange={set("pin")}
              />

              <EditField
                label="District"
                value={draft.district}
                onChange={set("district")}
                options={[
                  "Nagpur",
                  "Pune",
                  "Mumbai Suburban",
                  "Nashik",
                  "Amravati",
                  "Aurangabad",
                ]}
              />

              <EditField
                label="State"
                value={draft.state}
                onChange={set("state")}
                options={[
                  "Maharashtra",
                  "Madhya Pradesh",
                  "Gujarat",
                  "Karnataka",
                  "Telangana",
                ]}
              />
            </div>
          </section>

          {/* Identity */}
          <section className="rounded-2xl border border-line bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="size-5" />
              </div>

              <div>
                <h2 className="font-semibold text-paper">
                  Identity Information
                </h2>
                <p className="text-xs text-paper-dim">
                  Used for eligible application verification
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <EditField
                label="Aadhaar Number (Masked)"
                value={draft.aadhaar}
                onChange={set("aadhaar")}
              />

              <EditField
                label="PAN Number (Optional)"
                value={draft.pan}
                onChange={set("pan")}
              />
            </div>
          </section>

          {/* Documents */}
          <section className="rounded-2xl border border-line bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <FileText className="size-5" />
              </div>

              <div>
                <h2 className="font-semibold text-paper">
                  Saved Documents
                </h2>
                <p className="text-xs text-paper-dim">
                  Documents available for compatible applications
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {draft.documents.map((document) => (
                <div
                  key={document.name}
                  className="flex items-center justify-between rounded-xl border border-line bg-background p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="size-4" />
                    </div>

                    <div>
                      <div className="text-sm font-medium text-paper">
                        {document.name}
                      </div>
                      <div className="text-xs text-paper-dim">
                        {document.issuer}
                      </div>
                    </div>
                  </div>

                  <span
                    className={
                      "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium " +
                      (document.status === "Verified"
                        ? "bg-signal/15 text-signal"
                        : "bg-warn/15 text-warn")
                    }
                  >
                    {document.status === "Verified" && (
                      <CheckCircle2 className="size-3" />
                    )}
                    {document.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Save Bar */}
        <section className="sticky bottom-4 z-20 mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-card/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-medium text-paper">
              {saved
                ? "Profile saved successfully"
                : dirty
                  ? "You have unsaved changes"
                  : "Your profile is up to date"}
            </div>

            <div className="mt-1 text-xs text-paper-dim">
              {saved
                ? "Applications can now use your latest information."
                : "Your saved profile can be used to pre-fill eligible forms."}
            </div>
          </div>

          <button
            onClick={() => {
              saveProfile(draft);
              setSaved(true);

              window.setTimeout(() => {
                setSaved(false);
              }, 2500);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <Save className="size-4" />
            Save Profile
          </button>
        </section>

        {/* Consent */}
        <section className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />

            <div>
              <h3 className="font-semibold text-paper">
                Your data, your control
              </h3>

              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-paper-dim">
                Your common profile information can be reused for compatible
                government services. Service-specific information is collected
                only when required for that particular application. This
                prototype uses simulated demo data only.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}