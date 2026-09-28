import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronLeft,
  Download,
  FileCheck2,
  FileText,
  Info,
  Lock,
  Save,
  ShieldCheck,
  Upload,
  User,
  X,
} from "lucide-react";
import jsPDF from "jspdf";

type ApplicationFormProps = {
  service: string;
  onBack: () => void;
  onSubmit: (applicationId: string) => void;
};

type CitizenProfile = {
  fullName: string;
  dob: string;
  gender: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  district: string;
  state: string;
  pinCode: string;
};

type DocumentStatus = "Available" | "Uploaded" | "Missing";

type ApplicationDocument = {
  name: string;
  description: string;
  status: DocumentStatus;
};

type FormData = {
  fullName: string;
  dob: string;
  gender: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  district: string;
  state: string;
  pinCode: string;

  annualFamilyIncome: string;
  incomeSource: string;
  incomeYear: string;
  purpose: string;
  familyMembers: string;
  familyDetails: string;

  currentAddress: string;
  permanentAddress: string;
  yearsResiding: string;
  placeOfBirth: string;

  collegeName: string;
  course: string;
  academicYear: string;
  scholarshipCategory: string;
  previousPerformance: string;
  familyIncome: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;

  personName: string;
  personDob: string;
  birthPlace: string;
  hospitalLocation: string;
  fatherName: string;
  motherName: string;
  relationship: string;
  contactMobile: string;
  contactEmail: string;

  schemeSelection: string;
  age: string;
  eligibilityDetails: string;
};

const fallbackProfile: CitizenProfile = {
  fullName: "Rahul Sharma",
  dob: "2005-08-15",
  gender: "Male",
  mobile: "+91 98765 43210",
  email: "rahul.sharma@example.com",
  address: "12, Shivaji Nagar",
  city: "Pune",
  district: "Pune",
  state: "Maharashtra",
  pinCode: "411005",
};

const emptyFormData: FormData = {
  fullName: "",
  dob: "",
  gender: "",
  mobile: "",
  email: "",
  address: "",
  city: "",
  district: "",
  state: "",
  pinCode: "",

  annualFamilyIncome: "",
  incomeSource: "",
  incomeYear: "",
  purpose: "",
  familyMembers: "",
  familyDetails: "",

  currentAddress: "",
  permanentAddress: "",
  yearsResiding: "",
  placeOfBirth: "",

  collegeName: "",
  course: "",
  academicYear: "",
  scholarshipCategory: "",
  previousPerformance: "",
  familyIncome: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",

  personName: "",
  personDob: "",
  birthPlace: "",
  hospitalLocation: "",
  fatherName: "",
  motherName: "",
  relationship: "",
  contactMobile: "",
  contactEmail: "",

  schemeSelection: "",
  age: "",
  eligibilityDetails: "",
};

const serviceConfigs: Record<
  string,
  {
    department: string;
    code: string;
    title: string;
  }
> = {
  "Income Certificate": {
    department: "Revenue Department",
    code: "income-certificate",
    title: "Income Certificate",
  },
  "Residence Certificate": {
    department: "Revenue Department",
    code: "residence-certificate",
    title: "Residence / Domicile Certificate",
  },
  Domicile: {
    department: "Revenue Department",
    code: "residence-certificate",
    title: "Residence / Domicile Certificate",
  },
  "Scholarship Application": {
    department: "Education Department",
    code: "scholarship",
    title: "Scholarship Application",
  },
  "Birth Certificate": {
    department: "Municipal Department",
    code: "birth-certificate",
    title: "Birth Certificate",
  },
  "Birth Certificate Request": {
    department: "Municipal Department",
    code: "birth-certificate",
    title: "Birth Certificate",
  },
  "Social Welfare Scheme": {
    department: "Social Welfare Department",
    code: "social-welfare",
    title: "Social Welfare Scheme",
  },
  "Social Welfare": {
    department: "Social Welfare Department",
    code: "social-welfare",
    title: "Social Welfare Scheme",
  },
  "Pension Scheme Application": {
    department: "Social Welfare Department",
    code: "social-welfare",
    title: "Social Welfare Scheme",
  },
};

const stepNames = [
  "Applicant Details",
  "Service Details",
  "Documents",
  "Review & Declaration",
  "Application Preview",
];

function getServiceConfig(service: string) {
  return (
    serviceConfigs[service] ?? {
      department: "Government Department",
      code: "generic",
      title: service,
    }
  );
}

function getDocumentsForService(service: string): ApplicationDocument[] {
  if (
    service === "Income Certificate"
  ) {
    return [
      {
        name: "Aadhaar Card",
        description: "Identity proof available from Citizen Profile",
        status: "Available",
      },
      {
        name: "Address Proof",
        description: "Current address proof available from Citizen Profile",
        status: "Available",
      },
      {
        name: "Income Proof",
        description: "Salary slip, income declaration or supporting proof",
        status: "Missing",
      },
      {
        name: "Passport Size Photograph",
        description: "Recent applicant photograph",
        status: "Missing",
      },
    ];
  }

  if (
    service === "Residence Certificate" ||
    service === "Domicile"
  ) {
    return [
      {
        name: "Aadhaar Card",
        description: "Identity proof available from Citizen Profile",
        status: "Available",
      },
      {
        name: "Address Proof",
        description: "Current address proof available from Citizen Profile",
        status: "Available",
      },
      {
        name: "Birth / Date of Birth Proof",
        description: "Birth certificate or other DOB proof",
        status: "Missing",
      },
      {
        name: "Residence Supporting Document",
        description: "Supporting document for residence claim",
        status: "Missing",
      },
    ];
  }

  if (service === "Scholarship Application") {
    return [
      {
        name: "Aadhaar Card",
        description: "Identity proof available from Citizen Profile",
        status: "Available",
      },
      {
        name: "Address Proof",
        description: "Current address proof available from Citizen Profile",
        status: "Available",
      },
      {
        name: "Student ID / Bonafide",
        description: "Current student identification document",
        status: "Missing",
      },
      {
        name: "Previous Marksheet",
        description: "Latest academic performance document",
        status: "Missing",
      },
      {
        name: "Income Certificate",
        description: "Family income eligibility document",
        status: "Missing",
      },
      {
        name: "Bank Passbook",
        description: "Applicant bank account document",
        status: "Missing",
      },
    ];
  }

  if (
    service === "Birth Certificate" ||
    service === "Birth Certificate Request"
  ) {
    return [
      {
        name: "Hospital / Birth Record",
        description: "Birth record issued by hospital or authority",
        status: "Missing",
      },
      {
        name: "Parent / Guardian ID Proof",
        description: "Identity proof of parent or guardian",
        status: "Missing",
      },
      {
        name: "Address Proof",
        description: "Current residential address proof",
        status: "Available",
      },
      {
        name: "Aadhaar Card",
        description: "Identity proof available from Citizen Profile",
        status: "Available",
      },
    ];
  }

  return [
    {
      name: "Aadhaar Card",
      description: "Identity proof available from Citizen Profile",
      status: "Available",
    },
    {
      name: "Address Proof",
      description: "Current residential address proof",
      status: "Available",
    },
    {
      name: "Age Proof",
      description: "Document confirming applicant age",
      status: "Missing",
    },
    {
      name: "Income Proof",
      description: "Family income supporting document",
      status: "Missing",
    },
    {
      name: "Bank Passbook",
      description: "Applicant bank account document",
      status: "Missing",
    },
  ];
}

function ApplicationForm({
  service,
  onBack,
  onSubmit,
}: ApplicationFormProps) {
  const config = getServiceConfig(service);

  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<CitizenProfile>(fallbackProfile);
  const [formData, setFormData] = useState<FormData>(emptyFormData);
  const [documents, setDocuments] = useState<ApplicationDocument[]>(() =>
    getDocumentsForService(service),
  );

  const [modifiedFields, setModifiedFields] = useState<
    Record<string, boolean>
  >({});

  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const draftKey = `lok-sevak-application-draft-${config.code}`;

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(
        "lok-sevak-citizen-profile",
      );

      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile({
          ...fallbackProfile,
          ...parsedProfile,
        });
      }
    } catch {
      setProfile(fallbackProfile);
    }
  }, []);

  useEffect(() => {
    const activeProfile = profile;

    setFormData((previous) => ({
      ...previous,

      fullName: previous.fullName || activeProfile.fullName,
      dob: previous.dob || activeProfile.dob,
      gender: previous.gender || activeProfile.gender,
      mobile: previous.mobile || activeProfile.mobile,
      email: previous.email || activeProfile.email,
      address: previous.address || activeProfile.address,
      city: previous.city || activeProfile.city,
      district: previous.district || activeProfile.district,
      state: previous.state || activeProfile.state,
      pinCode: previous.pinCode || activeProfile.pinCode,
    }));
  }, [profile]);

  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(draftKey);

      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);

        if (parsed.formData) {
          setFormData((previous) => ({
            ...previous,
            ...parsed.formData,
          }));
        }

        if (parsed.documents) {
          setDocuments(parsed.documents);
        }

        if (typeof parsed.declarationAccepted === "boolean") {
          setDeclarationAccepted(parsed.declarationAccepted);
        }
      }
    } catch {
      // Ignore invalid prototype draft data.
    }
  }, [draftKey]);

  const updateField = (
    field: keyof FormData,
    value: string,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    const profileValue =
      profile[field as keyof CitizenProfile];

    if (profileValue !== undefined) {
      setModifiedFields((previous) => ({
        ...previous,
        [field]: value !== profileValue,
      }));
    }
  };

  const handleDocumentUpload = (documentName: string) => {
    /*
     * IMPORTANT:
     * This is intentionally NOT a real file input.
     *
     * Clicking "Simulate Upload" immediately changes the
     * document status to Uploaded. No file picker opens.
     */
    setDocuments((current) =>
      current.map((document) =>
        document.name === documentName
          ? {
              ...document,
              status: "Uploaded",
            }
          : document,
      ),
    );
  };

  const handleSaveDraft = () => {
    try {
      localStorage.setItem(
        draftKey,
        JSON.stringify({
          formData,
          documents,
          declarationAccepted,
        }),
      );

      setSavedMessage("Draft saved successfully");

      window.setTimeout(() => {
        setSavedMessage("");
      }, 2500);
    } catch {
      setSavedMessage("Unable to save draft");
    }
  };

  const availableCount = documents.filter(
    (document) => document.status === "Available",
  ).length;

  const uploadedCount = documents.filter(
    (document) => document.status === "Uploaded",
  ).length;

  const missingCount = documents.filter(
    (document) => document.status === "Missing",
  ).length;

  const requiredDocumentsComplete = missingCount === 0;

  const validateStep = (step: number) => {
    if (step === 1) {
      return Boolean(
        formData.fullName &&
          formData.dob &&
          formData.mobile &&
          formData.email &&
          formData.address &&
          formData.city &&
          formData.state &&
          formData.pinCode,
      );
    }

    if (step === 2) {
      if (config.code === "income-certificate") {
        return Boolean(
          formData.annualFamilyIncome &&
            formData.incomeSource &&
            formData.incomeYear &&
            formData.purpose,
        );
      }

      if (config.code === "residence-certificate") {
        return Boolean(
          formData.currentAddress &&
            formData.permanentAddress &&
            formData.yearsResiding &&
            formData.purpose,
        );
      }

      if (config.code === "scholarship") {
        return Boolean(
          formData.collegeName &&
            formData.course &&
            formData.academicYear &&
            formData.scholarshipCategory &&
            formData.familyIncome &&
            formData.bankName &&
            formData.accountNumber &&
            formData.ifscCode,
        );
      }

      if (config.code === "birth-certificate") {
        return Boolean(
          formData.personName &&
            formData.personDob &&
            formData.birthPlace &&
            formData.fatherName &&
            formData.motherName &&
            formData.relationship,
        );
      }

      if (config.code === "social-welfare") {
        return Boolean(
          formData.schemeSelection &&
            formData.age &&
            formData.eligibilityDetails &&
            formData.familyIncome &&
            formData.bankName &&
            formData.accountNumber &&
            formData.ifscCode,
        );
      }
    }

    if (step === 3) {
      return requiredDocumentsComplete;
    }

    if (step === 4) {
      return declarationAccepted;
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      setSavedMessage(
        currentStep === 3
          ? "Please complete all required documents"
          : currentStep === 4
            ? "Please accept the declaration"
            : "Please complete the required fields",
      );

      window.setTimeout(() => {
        setSavedMessage("");
      }, 2500);

      return;
    }

    setCurrentStep((previous) =>
      Math.min(previous + 1, 5),
    );
  };

  const previousStep = () => {
    setCurrentStep((previous) =>
      Math.max(previous - 1, 1),
    );
  };

  const generateApplicationId = () => {
    const randomNumber = Math.floor(
      10000 + Math.random() * 90000,
    );

    return `LOK-2026-${randomNumber}`;
  };

  const generatePdf = () => {
    const pdf = new jsPDF();

    const applicationId = generateApplicationId();
    const today = new Date().toLocaleDateString("en-IN");

    pdf.setFillColor(15, 23, 42);
    pdf.rect(0, 0, 210, 30, "F");

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("LOK SEVAK", 20, 18);

    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.text(
      "Unified Government Services Prototype",
      20,
      24,
    );

    pdf.setTextColor(30, 41, 59);
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text("Government Service Application Preview", 20, 45);

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");

    let y = 58;

    const addLine = (
      label: string,
      value: string,
    ) => {
      pdf.setFont("helvetica", "bold");
      pdf.text(`${label}:`, 20, y);

      pdf.setFont("helvetica", "normal");
      pdf.text(value || "-", 70, y);

      y += 8;
    };

    addLine("Service", config.title);
    addLine("Department", config.department);
    addLine("Application Reference", applicationId);
    addLine("Preview Date", today);

    y += 5;

    pdf.setFont("helvetica", "bold");
    pdf.text("Applicant Details", 20, y);
    y += 8;

    pdf.setFont("helvetica", "normal");

    addLine("Full Name", formData.fullName);
    addLine("Date of Birth", formData.dob);
    addLine("Gender", formData.gender);
    addLine("Mobile", formData.mobile);
    addLine("Email", formData.email);
    addLine(
      "Address",
      `${formData.address}, ${formData.city}, ${formData.district}, ${formData.state} - ${formData.pinCode}`,
    );

    y += 5;

    pdf.setFont("helvetica", "bold");
    pdf.text("Service Details", 20, y);
    y += 8;

    pdf.setFont("helvetica", "normal");

    if (config.code === "income-certificate") {
      addLine(
        "Annual Family Income",
        formData.annualFamilyIncome,
      );
      addLine("Income Source", formData.incomeSource);
      addLine("Income Year", formData.incomeYear);
      addLine("Purpose", formData.purpose);
    }

    if (config.code === "residence-certificate") {
      addLine(
        "Current Address",
        formData.currentAddress,
      );
      addLine(
        "Permanent Address",
        formData.permanentAddress,
      );
      addLine(
        "Years Residing",
        formData.yearsResiding,
      );
      addLine("Purpose", formData.purpose);
    }

    if (config.code === "scholarship") {
      addLine("College", formData.collegeName);
      addLine("Course", formData.course);
      addLine(
        "Academic Year",
        formData.academicYear,
      );
      addLine(
        "Scholarship Category",
        formData.scholarshipCategory,
      );
      addLine(
        "Family Income",
        formData.familyIncome,
      );
    }

    if (config.code === "birth-certificate") {
      addLine("Person Name", formData.personName);
      addLine("Date of Birth", formData.personDob);
      addLine("Birth Place", formData.birthPlace);
      addLine(
        "Father's Name",
        formData.fatherName,
      );
      addLine(
        "Mother's Name",
        formData.motherName,
      );
      addLine(
        "Relationship",
        formData.relationship,
      );
    }

    if (config.code === "social-welfare") {
      addLine(
        "Scheme",
        formData.schemeSelection,
      );
      addLine("Age", formData.age);
      addLine(
        "Family Income",
        formData.familyIncome,
      );
      addLine(
        "Bank",
        formData.bankName,
      );
    }

    y += 5;

    pdf.setFont("helvetica", "bold");
    pdf.text("Document Checklist", 20, y);
    y += 8;

    pdf.setFont("helvetica", "normal");

    documents.forEach((document) => {
      pdf.text(
        `${document.status === "Missing" ? "[ ]" : "[✓]"} ${document.name} — ${document.status}`,
        20,
        y,
      );

      y += 7;

      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
    });

    y += 8;

    pdf.setFont("helvetica", "bold");
    pdf.text("Declaration", 20, y);
    y += 7;

    pdf.setFont("helvetica", "normal");
    pdf.text(
      "Applicant declaration accepted: Yes",
      20,
      y,
    );

    y += 15;

    pdf.setFontSize(8);
    pdf.setTextColor(100, 116, 139);
    pdf.text(
      "Generated by LOK SEVAK — Application Preview for Prototype Demonstration.",
      20,
      y,
    );

    pdf.text(
      "This is not an official government-issued document.",
      20,
      y + 5,
    );

    pdf.save(
      `LOK-SEVAK-${config.code}-application-preview.pdf`,
    );
  };

  const submitToTracker = () => {
    if (!validateStep(4)) {
      setSavedMessage(
        "Please accept the declaration before submitting",
      );

      return;
    }

    setSubmitting(true);

    const finalId = generateApplicationId();

    try {
      localStorage.removeItem(draftKey);
    } catch {
      // Ignore localStorage cleanup errors.
    }

    window.setTimeout(() => {
      setSubmitting(false);
      onSubmit(finalId);
    }, 800);
  };

  const renderInput = (
    label: string,
    field: keyof FormData,
    options?: {
      type?: string;
      placeholder?: string;
      required?: boolean;
      disabled?: boolean;
    },
  ) => {
    const isProfileField = [
      "fullName",
      "dob",
      "gender",
      "mobile",
      "email",
      "address",
      "city",
      "district",
      "state",
      "pinCode",
    ].includes(field);

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-800">
            {label}
            {options?.required !== false && (
              <span className="ml-1 text-red-500">*</span>
            )}
          </label>

          {isProfileField && (
            <span
              className={`text-[11px] font-semibold ${
                modifiedFields[field]
                  ? "text-amber-600"
                  : "text-emerald-600"
              }`}
            >
              {modifiedFields[field]
                ? "Modified for this Application"
                : "Auto-filled"}
            </span>
          )}
        </div>

        <input
          type={options?.type ?? "text"}
          value={formData[field]}
          onChange={(event) =>
            updateField(field, event.target.value)
          }
          placeholder={options?.placeholder}
          disabled={options?.disabled}
          className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
            options?.disabled
              ? "cursor-not-allowed bg-slate-50 text-slate-500"
              : "border-slate-200 bg-white text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          }`}
        />
      </div>
    );
  };

  const renderSelect = (
    label: string,
    field: keyof FormData,
    options: string[],
  ) => (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-800">
        {label}
        <span className="ml-1 text-red-500">*</span>
      </label>

      <select
        value={formData[field]}
        onChange={(event) =>
          updateField(field, event.target.value)
        }
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  const renderTextArea = (
    label: string,
    field: keyof FormData,
    placeholder?: string,
  ) => (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-800">
        {label}
        <span className="ml-1 text-red-500">*</span>
      </label>

      <textarea
        value={formData[field]}
        onChange={(event) =>
          updateField(field, event.target.value)
        }
        placeholder={placeholder}
        rows={4}
        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      />
    </div>
  );

  const renderApplicantDetails = () => (
    <div className="space-y-8">
      <SectionHeader
        icon={<User size={20} />}
        title="Applicant Details"
        description="Verify the citizen information used for this application."
      />

      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
        <div className="flex gap-3">
          <Info className="mt-0.5 shrink-0 text-blue-600" size={18} />

          <div>
            <p className="text-sm font-semibold text-blue-900">
              Information from Citizen Profile
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-700">
              Your existing profile information has been
              automatically populated. You can modify values
              specifically for this application without changing
              your saved citizen profile.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {renderInput("Full Name", "fullName")}
        {renderInput("Date of Birth", "dob", {
          type: "date",
        })}
        {renderSelect("Gender", "gender", [
          "Male",
          "Female",
          "Other",
          "Prefer not to say",
        ])}
        {renderInput("Mobile Number", "mobile")}
        {renderInput("Email Address", "email", {
          type: "email",
        })}
        {renderInput("PIN Code", "pinCode")}
      </div>

      {renderTextArea(
        "Address",
        "address",
        "Enter your current residential address",
      )}

      <div className="grid gap-5 md:grid-cols-3">
        {renderInput("City", "city")}
        {renderInput("District", "district")}
        {renderInput("State", "state")}
      </div>
    </div>
  );

  const renderServiceDetails = () => {
    if (config.code === "income-certificate") {
      return (
        <div className="space-y-8">
          <SectionHeader
            icon={<FileText size={20} />}
            title="Income Certificate Details"
            description="Provide the information required to process your income certificate request."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {renderInput(
              "Annual Family Income",
              "annualFamilyIncome",
              {
                type: "number",
                placeholder: "Example: 300000",
              },
            )}

            {renderSelect(
              "Primary Income Source",
              "incomeSource",
              [
                "Salary",
                "Business",
                "Agriculture",
                "Daily Wage",
                "Pension",
                "Other",
              ],
            )}

            {renderSelect(
              "Income Year",
              "incomeYear",
              [
                "2025-26",
                "2024-25",
                "2023-24",
              ],
            )}

            {renderInput("Purpose", "purpose", {
              placeholder:
                "Example: Scholarship / Education",
            })}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {renderInput(
              "Number of Family Members",
              "familyMembers",
              {
                type: "number",
              },
            )}

            {renderTextArea(
              "Family / Income Details",
              "familyDetails",
              "Provide additional information if required",
            )}
          </div>
        </div>
      );
    }

    if (config.code === "residence-certificate") {
      return (
        <div className="space-y-8">
          <SectionHeader
            icon={<Building2 size={20} />}
            title="Residence Certificate Details"
            description="Provide the information needed to verify your residential status."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {renderTextArea(
              "Current Address",
              "currentAddress",
              "Enter your current address",
            )}

            {renderTextArea(
              "Permanent Address",
              "permanentAddress",
              "Enter your permanent address",
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {renderInput(
              "Years Residing at Current Address",
              "yearsResiding",
              {
                type: "number",
              },
            )}

            {renderInput(
              "Place of Birth",
              "placeOfBirth",
            )}

            {renderInput("Purpose", "purpose", {
              placeholder:
                "Example: Education / Employment",
            })}
          </div>
        </div>
      );
    }

    if (config.code === "scholarship") {
      return (
        <div className="space-y-8">
          <SectionHeader
            icon={<FileText size={20} />}
            title="Scholarship Details"
            description="Enter your academic, eligibility and bank information."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {renderInput("College / Institution", "collegeName")}
            {renderInput("Course / Program", "course")}

            {renderSelect(
              "Academic Year",
              "academicYear",
              [
                "2026-27",
                "2025-26",
                "2024-25",
              ],
            )}

            {renderSelect(
              "Scholarship Category",
              "scholarshipCategory",
              [
                "Merit Scholarship",
                "Need Based Scholarship",
                "Post Matric Scholarship",
                "State Scholarship",
                "Other",
              ],
            )}

            {renderInput(
              "Previous Academic Performance",
              "previousPerformance",
              {
                placeholder: "Example: 82%",
              },
            )}

            {renderInput(
              "Annual Family Income",
              "familyIncome",
              {
                type: "number",
              },
            )}
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-slate-900">
              Bank Account Details
            </h3>

            <div className="grid gap-5 md:grid-cols-3">
              {renderInput("Bank Name", "bankName")}
              {renderInput(
                "Account Number",
                "accountNumber",
              )}
              {renderInput("IFSC Code", "ifscCode")}
            </div>
          </div>
        </div>
      );
    }

    if (config.code === "birth-certificate") {
      return (
        <div className="space-y-8">
          <SectionHeader
            icon={<FileText size={20} />}
            title="Birth Certificate Details"
            description="Enter the details of the person whose birth certificate is being requested."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {renderInput("Person's Full Name", "personName")}
            {renderInput(
              "Date of Birth",
              "personDob",
              {
                type: "date",
              },
            )}

            {renderInput(
              "Place of Birth",
              "birthPlace",
            )}

            {renderInput(
              "Hospital / Birth Location",
              "hospitalLocation",
            )}

            {renderInput("Father's Name", "fatherName")}
            {renderInput("Mother's Name", "motherName")}

            {renderSelect(
              "Applicant Relationship",
              "relationship",
              [
                "Self",
                "Father",
                "Mother",
                "Guardian",
                "Other Relative",
              ],
            )}

            {renderInput(
              "Contact Mobile",
              "contactMobile",
            )}

            {renderInput(
              "Contact Email",
              "contactEmail",
              {
                type: "email",
              },
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <SectionHeader
          icon={<ShieldCheck size={20} />}
          title="Social Welfare Scheme Details"
          description="Provide eligibility and bank details for the selected welfare service."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {renderSelect(
            "Scheme",
            "schemeSelection",
            [
              "Senior Citizen Support",
              "Student Welfare Support",
              "Disability Assistance",
              "Family Welfare Support",
              "Other Social Welfare Scheme",
            ],
          )}

          {renderInput("Applicant Age", "age", {
            type: "number",
          })}

          {renderInput(
            "Annual Family Income",
            "familyIncome",
            {
              type: "number",
            },
          )}

          {renderInput("Bank Name", "bankName")}

          {renderInput(
            "Account Number",
            "accountNumber",
          )}

          {renderInput("IFSC Code", "ifscCode")}
        </div>

        {renderTextArea(
          "Eligibility Details",
          "eligibilityDetails",
          "Explain the eligibility or circumstances relevant to this scheme",
        )}
      </div>
    );
  };

  const renderDocuments = () => (
    <div className="space-y-8">
      <SectionHeader
        icon={<FileCheck2 size={20} />}
        title="Required Documents"
        description="Documents already available in your citizen profile are marked automatically. Missing documents can be simulated for this prototype."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Available"
          value={availableCount}
          icon={<CheckCircle2 size={19} />}
          type="green"
        />

        <StatCard
          label="Uploaded"
          value={uploadedCount}
          icon={<Upload size={19} />}
          type="blue"
        />

        <StatCard
          label="Missing"
          value={missingCount}
          icon={<X size={19} />}
          type="amber"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="grid grid-cols-[1fr_130px_170px] border-b border-slate-200 bg-slate-50 px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
          <span>Document</span>
          <span>Status</span>
          <span className="text-right">Action</span>
        </div>

        {documents.map((document) => (
          <div
            key={document.name}
            className="grid grid-cols-[1fr_130px_170px] items-center gap-4 border-b border-slate-100 px-5 py-5 last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  document.status === "Missing"
                    ? "bg-amber-50 text-amber-600"
                    : "bg-emerald-50 text-emerald-600"
                }`}
              >
                {document.status === "Missing" ? (
                  <FileText size={19} />
                ) : (
                  <Check size={20} />
                )}
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  {document.name}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {document.description}
                </p>
              </div>
            </div>

            <div>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide ${
                  document.status === "Available"
                    ? "bg-emerald-50 text-emerald-700"
                    : document.status === "Uploaded"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-amber-50 text-amber-700"
                }`}
              >
                {document.status}
              </span>
            </div>

            <div className="flex justify-end">
              {document.status === "Available" ? (
                <span className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                  <CheckCircle2 size={16} />
                  From Profile
                </span>
              ) : document.status === "Uploaded" ? (
                <button
                  type="button"
                  onClick={() =>
                    handleDocumentUpload(document.name)
                  }
                  className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700"
                >
                  <Check size={15} />
                  Uploaded
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    handleDocumentUpload(document.name)
                  }
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
                >
                  <Upload size={15} />
                  Simulate Upload
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {!requiredDocumentsComplete && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-900">
            {missingCount} document
            {missingCount !== 1 ? "s are" : " is"} still
            missing.
          </p>

          <p className="mt-1 text-xs text-amber-700">
            For this prototype, click “Simulate Upload” to
            mark the document as uploaded. No real file is
            required.
          </p>
        </div>
      )}

      {requiredDocumentsComplete && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2
              size={20}
              className="text-emerald-600"
            />

            <div>
              <p className="text-sm font-bold text-emerald-900">
                Document checklist complete
              </p>

              <p className="mt-1 text-xs text-emerald-700">
                All required documents are available for
                this prototype submission.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const getReviewRows = useMemo(() => {
    const rows: Array<[string, string]> = [
      ["Applicant Name", formData.fullName],
      ["Date of Birth", formData.dob],
      ["Mobile", formData.mobile],
      ["Email", formData.email],
      ["Address", formData.address],
      [
        "Location",
        `${formData.city}, ${formData.district}, ${formData.state} - ${formData.pinCode}`,
      ],
    ];

    if (config.code === "income-certificate") {
      rows.push(
        ["Annual Family Income", formData.annualFamilyIncome],
        ["Income Source", formData.incomeSource],
        ["Income Year", formData.incomeYear],
        ["Purpose", formData.purpose],
      );
    }

    if (config.code === "residence-certificate") {
      rows.push(
        ["Current Address", formData.currentAddress],
        [
          "Permanent Address",
          formData.permanentAddress,
        ],
        [
          "Years Residing",
          formData.yearsResiding,
        ],
        ["Purpose", formData.purpose],
      );
    }

    if (config.code === "scholarship") {
      rows.push(
        ["College", formData.collegeName],
        ["Course", formData.course],
        [
          "Academic Year",
          formData.academicYear,
        ],
        [
          "Scholarship Category",
          formData.scholarshipCategory,
        ],
        [
          "Family Income",
          formData.familyIncome,
        ],
      );
    }

    if (config.code === "birth-certificate") {
      rows.push(
        ["Person Name", formData.personName],
        ["Date of Birth", formData.personDob],
        ["Birth Place", formData.birthPlace],
        ["Father's Name", formData.fatherName],
        ["Mother's Name", formData.motherName],
        [
          "Relationship",
          formData.relationship,
        ],
      );
    }

    if (config.code === "social-welfare") {
      rows.push(
        ["Scheme", formData.schemeSelection],
        ["Age", formData.age],
        [
          "Family Income",
          formData.familyIncome,
        ],
        ["Bank Name", formData.bankName],
      );
    }

    return rows;
  }, [config.code, formData]);

  const renderReview = () => (
    <div className="space-y-8">
      <SectionHeader
        icon={<ShieldCheck size={20} />}
        title="Review & Declaration"
        description="Review the information before generating your application preview."
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
          <p className="text-sm font-bold text-slate-900">
            Application Summary
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {config.title} · {config.department}
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {getReviewRows.map(([label, value]) => (
            <div
              key={label}
              className="grid gap-2 px-5 py-4 sm:grid-cols-[220px_1fr]"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {label}
              </span>

              <span className="text-sm font-medium text-slate-800">
                {value || "—"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FileCheck2 size={19} />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900">
              Document Status
            </p>

            <p className="text-xs text-slate-500">
              {documents.length} required documents
            </p>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {documents.map((document) => (
            <div
              key={document.name}
              className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-3"
            >
              <span className="text-xs font-medium text-slate-700">
                {document.name}
              </span>

              <span
                className={`text-[10px] font-bold ${
                  document.status === "Missing"
                    ? "text-amber-600"
                    : "text-emerald-600"
                }`}
              >
                {document.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <label className="flex cursor-pointer gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-300">
        <input
          type="checkbox"
          checked={declarationAccepted}
          onChange={(event) =>
            setDeclarationAccepted(event.target.checked)
          }
          className="mt-1 h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />

        <div>
          <p className="text-sm font-bold text-slate-900">
            Applicant Declaration
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            I confirm that the information provided in this
            prototype application is accurate to the best of
            my knowledge. I understand that this demonstration
            does not constitute an actual government submission.
          </p>
        </div>
      </label>
    </div>
  );

  const renderPreview = () => (
    <div className="space-y-8">
      <SectionHeader
        icon={<FileText size={20} />}
        title="Application Preview"
        description="Generate and review the application preview before sending it to the simulated unified tracker."
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 sm:flex-row">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                <Building2 size={21} />
              </div>

              <div>
                <p className="text-lg font-extrabold text-slate-900">
                  LOK SEVAK
                </p>

                <p className="text-xs text-slate-500">
                  Unified Government Services Prototype
                </p>
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Service
            </p>

            <p className="mt-1 text-sm font-bold text-slate-900">
              {config.title}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {config.department}
            </p>
          </div>
        </div>

        <div className="grid gap-5 py-6 md:grid-cols-3">
          <PreviewItem
            label="Applicant"
            value={formData.fullName}
          />

          <PreviewItem
            label="Mobile"
            value={formData.mobile}
          />

          <PreviewItem
            label="Location"
            value={`${formData.city}, ${formData.state}`}
          />
        </div>

        <div className="rounded-xl bg-slate-50 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Document Readiness
          </p>

          <div className="mt-3 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{
                  width: `${
                    documents.length
                      ? ((availableCount + uploadedCount) /
                          documents.length) *
                        100
                      : 0
                  }%`,
                }}
              />
            </div>

            <span className="text-xs font-bold text-slate-700">
              {availableCount + uploadedCount}/
              {documents.length}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <button
          type="button"
          onClick={() => setShowPreview(true)}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-blue-300 hover:text-blue-600"
        >
          <FileText size={18} />
          View Preview
        </button>

        <button
          type="button"
          onClick={generatePdf}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-blue-300 hover:text-blue-600"
        >
          <Download size={18} />
          Download PDF
        </button>

        <div className="flex items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-5 py-3 text-center text-xs font-bold text-blue-700">
          <ShieldCheck size={18} />
          Prototype Integration Ready
        </div>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <div className="flex gap-3">
          <Lock
            size={19}
            className="mt-0.5 shrink-0 text-blue-600"
          />

          <div>
            <p className="text-sm font-bold text-blue-900">
              Simulated Integration Gateway
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-700">
              This prototype simulates sending the completed
              application to a unified government-service
              tracker. No real government API or department
              system is contacted.
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={submitToTracker}
        disabled={submitting || !declarationAccepted}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
      >
        {submitting ? (
          <>
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Sending to Unified Tracker...
          </>
        ) : (
          <>
            <ShieldCheck size={20} />
            Submit to Unified Tracker
            <ArrowRight size={18} />
          </>
        )}
      </button>

      {!declarationAccepted && (
        <p className="text-center text-xs font-medium text-amber-600">
          Please accept the declaration in the previous step
          before submitting.
        </p>
      )}
    </div>
  );

  if (!serviceConfigs[service]) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                <Building2 size={20} />
              </div>

              <div>
                <p className="font-extrabold text-slate-900">
                  LOK SEVAK
                </p>

                <p className="text-xs text-slate-500">
                  Government Services Simplified
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600"
            >
              <ArrowLeft size={17} />
              Back
            </button>
          </div>
        </header>

        <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-6">
          <div className="w-full rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Info size={28} />
            </div>

            <h1 className="mt-6 text-2xl font-extrabold text-slate-900">
              Service Coming Soon
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
              The application flow for{" "}
              <strong>{service}</strong> is planned for a
              future version of the LOK SEVAK prototype.
            </p>

            <button
              type="button"
              onClick={onBack}
              className="mt-7 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              Return to Services
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
              <Building2 size={19} />
            </div>

            <div>
              <p className="text-sm font-extrabold tracking-tight text-slate-900">
                LOK SEVAK
              </p>

              <p className="hidden text-[11px] text-slate-400 sm:block">
                Unified Government Services
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm font-bold text-slate-900">
              {config.title}
            </p>

            <p className="text-[11px] text-slate-400">
              {config.department}
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        {/* Page heading */}
        <div className="mb-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-blue-700">
                <ShieldCheck size={14} />
                Secure Prototype Application
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                Apply for {config.title}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Complete the application in a few simple steps.
                Your citizen profile information is automatically
                used where available.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSaveDraft}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
            >
              <Save size={17} />
              Save Draft
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-2 overflow-x-auto">
            {stepNames.map((stepName, index) => {
              const stepNumber = index + 1;
              const active = currentStep === stepNumber;
              const completed = currentStep > stepNumber;

              return (
                <div
                  key={stepName}
                  className="flex min-w-[150px] flex-1 items-center"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                        completed
                          ? "bg-emerald-500 text-white"
                          : active
                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                            : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {completed ? (
                        <Check size={16} />
                      ) : (
                        stepNumber
                      )}
                    </div>

                    <div>
                      <p
                        className={`whitespace-nowrap text-xs font-bold ${
                          active || completed
                            ? "text-slate-900"
                            : "text-slate-400"
                        }`}
                      >
                        {stepName}
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-400">
                        Step {stepNumber}
                      </p>
                    </div>
                  </div>

                  {stepNumber < stepNames.length && (
                    <div
                      className={`mx-4 hidden h-px flex-1 lg:block ${
                        completed
                          ? "bg-emerald-300"
                          : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:p-9">
          {currentStep === 1 && renderApplicantDetails()}
          {currentStep === 2 && renderServiceDetails()}
          {currentStep === 3 && renderDocuments()}
          {currentStep === 4 && renderReview()}
          {currentStep === 5 && renderPreview()}
        </div>

        {/* Bottom controls */}
        {currentStep < 5 && (
          <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <button
              type="button"
              onClick={previousStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft size={17} />
              Previous
            </button>

            <div className="hidden text-xs text-slate-400 sm:block">
              Step {currentStep} of {stepNames.length}
            </div>

            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Continue
              <ArrowRight size={17} />
            </button>
          </div>
        )}

        {currentStep === 5 && (
          <div className="mt-6 flex justify-start">
            <button
              type="button"
              onClick={previousStep}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300"
            >
              <ArrowLeft size={17} />
              Back to Declaration
            </button>
          </div>
        )}
      </main>

      {/* Toast */}
      {savedMessage && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xl">
            <CheckCircle2
              size={18}
              className="text-emerald-400"
            />
            {savedMessage}
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-lg font-extrabold text-slate-900">
                  Application Preview
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {config.title} · {config.department}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[calc(90vh-150px)] overflow-y-auto p-6">
              <div className="rounded-2xl border border-slate-200 p-6">
                <div className="border-b border-slate-200 pb-5">
                  <p className="text-xl font-extrabold text-slate-950">
                    LOK SEVAK
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Government Service Application Preview
                  </p>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {getReviewRows.map(([label, value]) => (
                    <PreviewItem
                      key={label}
                      label={label}
                      value={value}
                    />
                  ))}
                </div>

                <div className="mt-7 border-t border-slate-200 pt-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Documents
                  </p>

                  <div className="mt-3 space-y-2">
                    {documents.map((document) => (
                      <div
                        key={document.name}
                        className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3"
                      >
                        <span className="text-xs font-semibold text-slate-700">
                          {document.name}
                        </span>

                        <span className="text-[10px] font-bold uppercase text-emerald-600">
                          {document.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-7 rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-500">
                  Generated by LOK SEVAK — Application Preview
                  for Prototype Demonstration. This is not an
                  official government-issued document.
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700"
              >
                Close
              </button>

              <button
                type="button"
                onClick={generatePdf}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
              >
                <Download size={16} />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div>
        <h2 className="text-xl font-extrabold text-slate-950">
          {title}
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  type,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  type: "green" | "blue" | "amber";
}) {
  const styles = {
    green: "border-emerald-100 bg-emerald-50 text-emerald-600",
    blue: "border-blue-100 bg-blue-50 text-blue-600",
    amber: "border-amber-100 bg-amber-50 text-amber-600",
  };

  return (
    <div
      className={`rounded-2xl border p-5 ${styles[type]}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wide">
          {label}
        </span>

        {icon}
      </div>

      <p className="mt-3 text-2xl font-extrabold">
        {value}
      </p>
    </div>
  );
}

function PreviewItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value || "—"}
      </p>
    </div>
  );
}

export default ApplicationForm;