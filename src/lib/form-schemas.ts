/**
 * LOK SEVAK — online government application form schemas.
 *
 * Only five services have a complete application flow in this prototype.
 * Every other service stays visible as a "coming soon" listing.
 */

import type { CitizenProfile } from "./demo-data";

export const IMPLEMENTED_SERVICE_IDS = [
  "income-certificate",
  "domicile-certificate",
  "scholarship",
  "birth-certificate",
  "pension-scheme",
] as const;

export type ImplementedServiceId = (typeof IMPLEMENTED_SERVICE_IDS)[number];

export const isImplemented = (id: string): id is ImplementedServiceId =>
  (IMPLEMENTED_SERVICE_IDS as readonly string[]).includes(id);

export type FieldType = "text" | "textarea" | "select" | "radio" | "date" | "number" | "tel" | "email";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  hint?: string;
  /** Maps to a Citizen Profile key for automatic population. */
  profileKey?: keyof CitizenProfile;
  half?: boolean;
};

export type SectionDef = { title: string; note?: string; fields: FieldDef[] };

export type ServiceForm = {
  applicant: SectionDef[];
  serviceDetails: SectionDef[];
  documents: string[];
  declaration: string;
};

const personalSection: SectionDef = {
  title: "Personal Details",
  note: "Fetched from your One Citizen Profile. Edits apply to this application only.",
  fields: [
    { key: "fullName", label: "Full Name (as per Aadhaar)", type: "text", required: true, profileKey: "fullName" },
    { key: "dateOfBirth", label: "Date of Birth", type: "date", required: true, profileKey: "dateOfBirth", half: true },
    {
      key: "gender",
      label: "Gender",
      type: "radio",
      required: true,
      options: ["Male", "Female", "Other"],
      profileKey: "gender",
      half: true,
    },
    { key: "mobile", label: "Mobile Number", type: "tel", required: true, profileKey: "mobile", half: true, hint: "10 digit mobile number" },
    { key: "email", label: "Email Address", type: "email", required: true, profileKey: "email", half: true },
    { key: "aadhaar", label: "Aadhaar Number (masked)", type: "text", profileKey: "aadhaar", half: true },
  ],
};

const addressSection: SectionDef = {
  title: "Address Details",
  fields: [
    { key: "address", label: "Address Line (House / Street / Locality)", type: "textarea", required: true, profileKey: "address" },
    { key: "city", label: "City / Town / Village", type: "text", required: true, profileKey: "city", half: true },
    {
      key: "district",
      label: "District",
      type: "select",
      required: true,
      options: ["Nagpur", "Pune", "Mumbai Suburban", "Nashik", "Amravati", "Aurangabad"],
      profileKey: "district",
      half: true,
    },
    {
      key: "state",
      label: "State",
      type: "select",
      required: true,
      options: ["Maharashtra", "Madhya Pradesh", "Gujarat", "Karnataka", "Telangana"],
      profileKey: "state",
      half: true,
    },
    { key: "pin", label: "PIN Code", type: "text", required: true, profileKey: "pin", half: true, hint: "6 digit postal code" },
  ],
};

const applicantBase: SectionDef[] = [personalSection, addressSection];

const YEARS = ["2026-27", "2025-26", "2024-25", "2023-24", "2022-23"];

export const serviceForms: Record<ImplementedServiceId, ServiceForm> = {
  "income-certificate": {
    applicant: applicantBase,
    serviceDetails: [
      {
        title: "Income Details",
        fields: [
          { key: "annualIncome", label: "Annual Family Income (₹)", type: "number", required: true, half: true, placeholder: "e.g. 180000" },
          {
            key: "incomeSource",
            label: "Primary Source of Income",
            type: "select",
            required: true,
            half: true,
            options: ["Agriculture", "Salaried Employment", "Daily Wage / Labour", "Business / Self-Employed", "Pension", "Other"],
          },
          { key: "incomeYear", label: "Income Year", type: "select", required: true, half: true, options: YEARS },
          {
            key: "purpose",
            label: "Purpose of Certificate",
            type: "select",
            required: true,
            half: true,
            options: ["Educational Scholarship", "Fee Concession", "Welfare Scheme", "Employment", "Other"],
          },
        ],
      },
      {
        title: "Family Details",
        fields: [
          { key: "fatherName", label: "Father's / Guardian's Name", type: "text", required: true, half: true },
          { key: "familyMembers", label: "Number of Family Members", type: "number", required: true, half: true },
          { key: "earningMembers", label: "Number of Earning Members", type: "number", required: true, half: true },
          {
            key: "rationCardType",
            label: "Ration Card Type",
            type: "radio",
            required: true,
            half: true,
            options: ["APL", "BPL", "Antyodaya", "Not Available"],
          },
        ],
      },
    ],
    documents: ["Identity Proof (Aadhaar)", "Address Proof", "Income Proof / Salary Slip", "Ration Card", "Passport Photo"],
    declaration:
      "I declare that the income details furnished above are true to the best of my knowledge and are submitted for the purpose stated.",
  },

  "domicile-certificate": {
    applicant: applicantBase,
    serviceDetails: [
      {
        title: "Residence Details",
        fields: [
          { key: "permanentAddress", label: "Permanent Address", type: "textarea", required: true },
          {
            key: "sameAsCurrent",
            label: "Is the permanent address same as current address?",
            type: "radio",
            required: true,
            half: true,
            options: ["Yes", "No"],
          },
          { key: "yearsResiding", label: "Number of Years Residing in Maharashtra", type: "number", required: true, half: true },
          { key: "placeOfBirth", label: "Place of Birth", type: "text", required: true, half: true },
          {
            key: "purpose",
            label: "Purpose of Certificate",
            type: "select",
            required: true,
            half: true,
            options: ["State Quota Admission", "State Government Employment", "Scheme Eligibility", "Other"],
          },
        ],
      },
    ],
    documents: ["Identity Proof (Aadhaar)", "Address Proof", "Residence Duration Proof", "School Leaving Certificate", "Passport Photo"],
    declaration:
      "I declare that I have been residing continuously at the address stated above and the residence details furnished are correct.",
  },

  scholarship: {
    applicant: applicantBase,
    serviceDetails: [
      {
        title: "Educational Details",
        fields: [
          { key: "collegeName", label: "College / Institution Name", type: "text", required: true },
          { key: "course", label: "Course", type: "text", required: true, half: true, placeholder: "e.g. B.E. Computer Science" },
          { key: "academicYear", label: "Academic Year", type: "select", required: true, half: true, options: YEARS },
          {
            key: "scholarshipCategory",
            label: "Scholarship Category",
            type: "select",
            required: true,
            half: true,
            options: ["Merit Based", "Means Based (EBC)", "SC / ST", "OBC / VJNT", "Minority", "Disability"],
          },
          { key: "previousPercentage", label: "Previous Academic Performance (%)", type: "number", required: true, half: true },
          { key: "familyIncome", label: "Annual Family Income (₹)", type: "number", required: true, half: true },
          { key: "hostelResident", label: "Hosteller / Day Scholar", type: "radio", required: true, half: true, options: ["Hosteller", "Day Scholar"] },
        ],
      },
      {
        title: "Bank Details (Demo Only)",
        note: "Demo data only — no real bank information is collected in this prototype.",
        fields: [
          { key: "bankName", label: "Bank Name", type: "text", required: true, half: true },
          { key: "accountNumber", label: "Account Number", type: "text", required: true, half: true },
          { key: "ifsc", label: "IFSC Code", type: "text", required: true, half: true, placeholder: "e.g. SBIN0001234" },
          { key: "accountHolder", label: "Account Holder Name", type: "text", required: true, half: true },
        ],
      },
    ],
    documents: ["Identity Proof (Aadhaar)", "Income Certificate", "Previous Marksheet", "Admission / Bonafide Proof", "Bank Passbook", "Passport Photo"],
    declaration:
      "I declare that the educational and income particulars furnished are correct and that I have not availed any other scholarship for the same academic year.",
  },

  "birth-certificate": {
    applicant: applicantBase,
    serviceDetails: [
      {
        title: "Birth Record Details",
        fields: [
          { key: "personName", label: "Name of Person (on record)", type: "text", required: true, half: true },
          { key: "birthDate", label: "Date of Birth", type: "date", required: true, half: true },
          { key: "placeOfBirth", label: "Place of Birth (City / Village)", type: "text", required: true, half: true },
          {
            key: "registrationLocation",
            label: "Hospital / Registration Location",
            type: "text",
            required: true,
            half: true,
            placeholder: "e.g. Govt. Medical College, Nagpur",
          },
          { key: "fatherName", label: "Father's Name", type: "text", required: true, half: true },
          { key: "motherName", label: "Mother's Name", type: "text", required: true, half: true },
          {
            key: "relationship",
            label: "Relationship with Applicant",
            type: "select",
            required: true,
            half: true,
            options: ["Self", "Son / Daughter", "Father / Mother", "Legal Guardian", "Other"],
          },
          { key: "copies", label: "Number of Copies Required", type: "number", required: true, half: true },
        ],
      },
      {
        title: "Contact Details for Delivery",
        fields: [
          { key: "contactPerson", label: "Contact Person Name", type: "text", required: true, half: true },
          { key: "contactNumber", label: "Contact Number", type: "tel", required: true, half: true, hint: "10 digit mobile number" },
          { key: "deliveryMode", label: "Delivery Mode", type: "radio", required: true, half: true, options: ["Digital Copy", "Post", "Counter Collection"] },
        ],
      },
    ],
    documents: ["Hospital Birth Record", "Identity Proof of Parent", "Address Proof", "Affidavit (if delayed registration)"],
    declaration:
      "I declare that the birth particulars stated above are correct and that I am entitled to request this record.",
  },

  "pension-scheme": {
    applicant: applicantBase,
    serviceDetails: [
      {
        title: "Scheme Selection",
        fields: [
          {
            key: "scheme",
            label: "Select Scheme",
            type: "select",
            required: true,
            options: [
              "Indira Gandhi National Old Age Pension",
              "Sanjay Gandhi Niradhar Anudan Yojana",
              "Widow Pension Scheme",
              "Divyang (Disability) Pension",
              "National Family Benefit Scheme",
            ],
          },
          { key: "age", label: "Age of Beneficiary (Years)", type: "number", required: true, half: true },
          {
            key: "category",
            label: "Beneficiary Category",
            type: "radio",
            required: true,
            half: true,
            options: ["General", "SC / ST", "OBC", "Minority"],
          },
        ],
      },
      {
        title: "Eligibility Details",
        fields: [
          { key: "familyIncome", label: "Annual Family Income (₹)", type: "number", required: true, half: true },
          {
            key: "otherPension",
            label: "Currently receiving any other pension?",
            type: "radio",
            required: true,
            half: true,
            options: ["Yes", "No"],
          },
          { key: "dependents", label: "Number of Dependents", type: "number", required: true, half: true },
          {
            key: "residenceDuration",
            label: "Years of Residence in Maharashtra",
            type: "number",
            required: true,
            half: true,
          },
        ],
      },
      {
        title: "Bank Details (Demo Only)",
        note: "Demo data only — benefit transfer details are simulated in this prototype.",
        fields: [
          { key: "bankName", label: "Bank Name", type: "text", required: true, half: true },
          { key: "accountNumber", label: "Account Number", type: "text", required: true, half: true },
          { key: "ifsc", label: "IFSC Code", type: "text", required: true, half: true },
          { key: "accountHolder", label: "Account Holder Name", type: "text", required: true, half: true },
        ],
      },
    ],
    documents: ["Identity Proof (Aadhaar)", "Age Proof", "Income Proof", "Bank Passbook", "Residence Proof", "Passport Photo"],
    declaration:
      "I declare that I fulfil the eligibility conditions of the selected scheme and that the details furnished above are correct.",
  },
};

export const getServiceForm = (id: string): ServiceForm | undefined =>
  isImplemented(id) ? serviceForms[id] : undefined;

export function allFields(form: ServiceForm): FieldDef[] {
  return [...form.applicant, ...form.serviceDetails].flatMap((s) => s.fields);
}

export function validateField(field: FieldDef, value: string): string | null {
  const v = (value ?? "").trim();
  if (field.required && !v) return `${field.label} is required`;
  if (!v) return null;
  if (field.type === "tel" && !/^\d{10}$/.test(v)) return "Enter a valid 10 digit mobile number";
  if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address";
  if (field.key === "pin" && !/^\d{6}$/.test(v)) return "PIN code must be 6 digits";
  if (field.type === "number" && Number.isNaN(Number(v))) return "Enter a valid number";
  if (field.key === "previousPercentage" && (Number(v) < 0 || Number(v) > 100))
    return "Percentage must be between 0 and 100";
  return null;
}
