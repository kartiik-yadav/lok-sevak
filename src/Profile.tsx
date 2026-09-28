import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Edit3,
  FileText,
  Lock,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  User,
  X,
} from "lucide-react";

type ProfileProps = {
  onNavigate: (screen: string) => void;
};

type ProfileData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pin: string;
};

const defaultProfile: ProfileData = {
  name: "Kartik Yadav",
  email: "kartik.yadav@example.com",
  phone: "+91 98765 43210",
  address: "123, Civil Lines",
  city: "Nashik",
  state: "Maharashtra",
  pin: "422001",
};

function Profile({ onNavigate }: ProfileProps) {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [formData, setFormData] = useState<ProfileData>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("lok-sevak-profile");

    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);

        setProfile({
          ...defaultProfile,
          ...parsedProfile,
        });

        setFormData({
          ...defaultProfile,
          ...parsedProfile,
        });
      } catch {
        // Keep default profile if saved data is invalid.
      }
    }
  }, []);

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
    setSaved(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
    setSaved(false);
  };

  const handleChange = (
    field: keyof ProfileData,
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setProfile(formData);
    localStorage.setItem(
      "lok-sevak-profile",
      JSON.stringify(formData),
    );

    setIsEditing(false);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("dashboard")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <p className="text-lg font-bold tracking-tight text-slate-900">
                My Profile
              </p>
              <p className="text-xs text-slate-500">
                Manage your citizen information
              </p>
            </div>
          </div>

          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Edit3 size={16} />
              Edit Profile
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <X size={16} />
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Saved message */}
        {saved && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
            <CheckCircle2 size={19} />
            Profile updated successfully.
          </div>
        )}

        {/* Profile hero */}
        <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 text-white shadow-lg sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-3xl font-bold ring-1 ring-white/20">
                {profile.name
                  .split(" ")
                  .map((word) => word[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>

              <div>
                <p className="mb-1 text-sm font-medium text-blue-100">
                  Citizen Profile
                </p>

                <h1 className="text-2xl font-bold sm:text-3xl">
                  {profile.name}
                </h1>

                <p className="mt-1 text-sm text-blue-100">
                  {profile.email}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/10">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <ShieldCheck size={18} />
                Profile Verified
              </div>

              <p className="mt-1 text-xs text-blue-100">
                Demo citizen account
              </p>
            </div>
          </div>
        </section>

        {/* Personal information */}
        <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your basic citizen details
              </p>
            </div>

            <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:flex">
              <User size={19} />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <ProfileField
              label="Full Name"
              value={isEditing ? formData.name : profile.name}
              icon={<User size={17} />}
              editing={isEditing}
              onChange={(value) => handleChange("name", value)}
            />

            <ProfileField
              label="Email Address"
              value={isEditing ? formData.email : profile.email}
              icon={<Mail size={17} />}
              editing={isEditing}
              type="email"
              onChange={(value) => handleChange("email", value)}
            />

            <ProfileField
              label="Mobile Number"
              value={isEditing ? formData.phone : profile.phone}
              icon={<Phone size={17} />}
              editing={isEditing}
              type="tel"
              onChange={(value) => handleChange("phone", value)}
            />

            <ProfileField
              label="PIN Code"
              value={isEditing ? formData.pin : profile.pin}
              icon={<MapPin size={17} />}
              editing={isEditing}
              onChange={(value) => handleChange("pin", value)}
            />
          </div>
        </section>

        {/* Address */}
        <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Address Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your residential address
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <ProfileField
                label="Address"
                value={isEditing ? formData.address : profile.address}
                icon={<MapPin size={17} />}
                editing={isEditing}
                onChange={(value) =>
                  handleChange("address", value)
                }
              />
            </div>

            <ProfileField
              label="City"
              value={isEditing ? formData.city : profile.city}
              icon={<MapPin size={17} />}
              editing={isEditing}
              onChange={(value) => handleChange("city", value)}
            />

            <ProfileField
              label="State"
              value={isEditing ? formData.state : profile.state}
              icon={<MapPin size={17} />}
              editing={isEditing}
              onChange={(value) => handleChange("state", value)}
            />
          </div>
        </section>

        {/* Documents */}
        <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                <FileText size={21} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Saved Documents
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage documents used for applications
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate("documents")}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View All Documents
            </button>
          </div>
        </section>

        {/* Security */}
        <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Lock size={21} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Account Security
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your account information is protected in this demo.
              </p>
            </div>
          </div>
        </section>

        {/* Prototype notice */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="text-sm font-semibold text-blue-900">
            Prototype Notice
          </p>

          <p className="mt-1 text-sm leading-6 text-blue-700">
            Profile editing and storage are simulated using browser
            local storage for this prototype. A production version
            would securely store citizen information on a government
            backend.
          </p>
        </div>
      </main>
    </div>
  );
}

type ProfileFieldProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
  editing: boolean;
  type?: string;
  onChange: (value: string) => void;
};

function ProfileField({
  label,
  value,
  icon,
  editing,
  type = "text",
  onChange,
}: ProfileFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div
        className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition ${
          editing
            ? "border-blue-300 bg-white ring-2 ring-blue-50"
            : "border-slate-200 bg-slate-50"
        }`}
      >
        <span className="shrink-0 text-slate-400">{icon}</span>

        {editing ? (
          <input
            type={type}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
          />
        ) : (
          <span className="text-sm font-medium text-slate-800">
            {value}
          </span>
        )}
      </div>
    </div>
  );
}

export default Profile;