/**
 * LOK SEVAK — demo (mock) data layer.
 *
 * Architecture: Frontend -> Business Logic (lib/services) -> Integration Layer
 * (lib/mock-api) -> Government API Connectors. This module holds the seed data
 * only; swapping in real government APIs means replacing lib/mock-api.ts.
 */

export type DepartmentId = "revenue" | "municipal" | "education" | "welfare";

export type Department = {
  id: DepartmentId;
  name: string;
  systemName: string;
  dataFormat: "JSON" | "XML" | "CSV" | "SOAP/XML";
  connected: boolean;
  apiStatus: "Active" | "Degraded";
  lastSync: string;
  endpoint: string;
};

export const departments: Department[] = [
  {
    id: "revenue",
    name: "Revenue Department",
    systemName: "Revenue Department System",
    dataFormat: "JSON",
    connected: true,
    apiStatus: "Active",
    lastSync: "2 minutes ago",
    endpoint: "https://api.mock.revenue.gov.in/v1",
  },
  {
    id: "education",
    name: "Education Department",
    systemName: "Education Department System",
    dataFormat: "XML",
    connected: true,
    apiStatus: "Active",
    lastSync: "6 minutes ago",
    endpoint: "https://api.mock.education.gov.in/v2",
  },
  {
    id: "municipal",
    name: "Municipal Services",
    systemName: "Municipal Department System",
    dataFormat: "JSON",
    connected: true,
    apiStatus: "Active",
    lastSync: "just now",
    endpoint: "https://api.mock.nmc.gov.in/v1",
  },
  {
    id: "welfare",
    name: "Social Welfare",
    systemName: "Social Welfare Department System",
    dataFormat: "SOAP/XML",
    connected: true,
    apiStatus: "Degraded",
    lastSync: "24 minutes ago",
    endpoint: "https://api.mock.welfare.gov.in/v1",
  },
];

export const departmentById = (id: DepartmentId) =>
  departments.find((d) => d.id === id)!;

export type Service = {
  id: string;
  name: string;
  department: DepartmentId;
  description: string;
  documents: string[];
  processingTime: string;
  popular?: boolean;
  eligibility: string[];
  steps: string[];
};

export const services: Service[] = [
  {
    id: "income-certificate",
    name: "Income Certificate",
    department: "revenue",
    description:
      "Certified proof of household annual income, used for scholarships, fee waivers and welfare benefits.",
    documents: ["Identity Proof", "Address Proof", "Income Proof", "Passport Photo"],
    processingTime: "7–15 working days",
    popular: true,
    eligibility: [
      "Resident of the issuing district",
      "Self-declaration of annual family income",
      "Valid identity and address proof",
    ],
    steps: [
      "Submit application with income declaration",
      "Verification by Talathi / revenue inspector",
      "Approval by Tahsildar office",
      "Digitally signed certificate issued",
    ],
  },
  {
    id: "caste-certificate",
    name: "Caste Certificate",
    department: "revenue",
    description:
      "Official certification of caste category for reservations in education and employment.",
    documents: ["Identity Proof", "Address Proof", "Parent Caste Record", "Passport Photo"],
    processingTime: "15–21 working days",
    eligibility: ["Family caste record available", "Resident of Maharashtra"],
    steps: ["Application", "Record verification", "Scrutiny", "Certificate issued"],
  },
  {
    id: "domicile-certificate",
    name: "Domicile Certificate",
    department: "revenue",
    description:
      "Proof of permanent residence in the state, required for state quota admissions and jobs.",
    documents: ["Identity Proof", "Address Proof", "Residence Duration Proof"],
    processingTime: "10–15 working days",
    eligibility: ["Continuous residence of 15 years or more"],
    steps: ["Application", "Local verification", "Approval", "Certificate issued"],
  },
  {
    id: "birth-certificate",
    name: "Birth Certificate",
    department: "municipal",
    description: "Official record of birth issued by the municipal corporation.",
    documents: ["Hospital Record", "Identity Proof of Parent", "Address Proof"],
    processingTime: "5–10 working days",
    popular: true,
    eligibility: ["Birth registered within municipal limits"],
    steps: ["Application", "Registry match", "Approval", "Certificate issued"],
  },
  {
    id: "death-certificate",
    name: "Death Certificate",
    department: "municipal",
    description: "Legal record of death, required for insurance, pension and succession.",
    documents: ["Medical Certificate", "Identity Proof of Applicant", "Address Proof"],
    processingTime: "5–10 working days",
    eligibility: ["Death registered within municipal limits"],
    steps: ["Application", "Registry match", "Approval", "Certificate issued"],
  },
  {
    id: "property-services",
    name: "Property Services",
    department: "municipal",
    description: "Property tax assessment, name transfer and municipal property extracts.",
    documents: ["Property Card", "Identity Proof", "Latest Tax Receipt"],
    processingTime: "15–30 working days",
    eligibility: ["Registered property holder"],
    steps: ["Application", "Site verification", "Assessment", "Record updated"],
  },
  {
    id: "scholarship",
    name: "State Scholarship",
    department: "education",
    description:
      "Merit and means-based financial aid for higher studies under state education schemes.",
    documents: [
      "Identity Proof",
      "Address Proof",
      "Income Certificate",
      "Previous Marksheet",
      "Bank Passbook",
      "Passport Photo",
    ],
    processingTime: "20–30 working days",
    popular: true,
    eligibility: [
      "Enrolled in a recognised institution",
      "Family income below the scheme ceiling",
      "Minimum 60% in the previous examination",
    ],
    steps: [
      "Application with income certificate",
      "Institute verification",
      "Departmental sanction",
      "Direct benefit transfer",
    ],
  },
  {
    id: "student-certificate",
    name: "Student Certificates",
    department: "education",
    description: "Bonafide, transfer and migration certificates from your institution.",
    documents: ["Student ID", "Identity Proof"],
    processingTime: "3–7 working days",
    eligibility: ["Currently or previously enrolled student"],
    steps: ["Request", "Institute approval", "Certificate issued"],
  },
  {
    id: "education-scheme",
    name: "Education Schemes",
    department: "education",
    description: "Fee reimbursement, hostel allowance and skill development schemes.",
    documents: ["Identity Proof", "Income Certificate", "Admission Proof"],
    processingTime: "20–25 working days",
    eligibility: ["Enrolled student meeting scheme criteria"],
    steps: ["Application", "Eligibility check", "Sanction", "Disbursal"],
  },
  {
    id: "pension-scheme",
    name: "Pension Schemes",
    department: "welfare",
    description: "Old age, widow and Niradhar pension schemes for eligible citizens.",
    documents: ["Identity Proof", "Age Proof", "Income Proof", "Bank Passbook"],
    processingTime: "30–45 working days",
    eligibility: ["Meets age and income criteria of the scheme"],
    steps: ["Application", "Field verification", "Sanction", "Monthly disbursal"],
  },
  {
    id: "disability-benefits",
    name: "Disability Benefits",
    department: "welfare",
    description: "UDID-linked benefits, assistive aids and travel concessions.",
    documents: ["Identity Proof", "Disability Certificate", "Address Proof"],
    processingTime: "20–30 working days",
    eligibility: ["Certified disability of 40% or more"],
    steps: ["Application", "Medical board review", "Sanction", "Benefit issued"],
  },
  {
    id: "welfare-scheme",
    name: "Welfare Schemes",
    department: "welfare",
    description: "Housing, food security and livelihood support schemes.",
    documents: ["Identity Proof", "Address Proof", "Income Proof"],
    processingTime: "25–40 working days",
    eligibility: ["Household below the scheme income ceiling"],
    steps: ["Application", "Verification", "Sanction", "Benefit issued"],
  },
];

export const serviceById = (id: string) => services.find((s) => s.id === id);

export type CitizenProfile = {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  district: string;
  state: string;
  pin: string;
  aadhaar: string;
  pan: string;
  completion: number;
  documents: { name: string; status: "Verified" | "Pending"; issuer: string }[];
};

export const demoCitizen: CitizenProfile = {
  fullName: "Rahul Sharma",
  dateOfBirth: "2005-08-15",
  gender: "Male",
  mobile: "9876543210",
  email: "rahul.demo@example.com",
  address: "Plot 24, Shivaji Nagar, Nagpur",
  city: "Nagpur",
  district: "Nagpur",
  state: "Maharashtra",
  pin: "440010",
  aadhaar: "XXXX XXXX 1234",
  pan: "Not provided",
  completion: 90,
  documents: [
    { name: "Identity Proof", status: "Verified", issuer: "UIDAI (simulated)" },
    { name: "Address Proof", status: "Verified", issuer: "Municipal Records (simulated)" },
    { name: "Income Proof", status: "Verified", issuer: "Revenue Dept (simulated)" },
    { name: "Passport Photo", status: "Verified", issuer: "Citizen Upload (simulated)" },
  ],
};

export type ApplicationStatus =
  | "Submitted"
  | "Processing"
  | "Documents Required"
  | "Documents Verified"
  | "Approved";

export type Application = {
  id: string;

  reference?: string;

  serviceId: string;
  serviceName: string;

  department: DepartmentId;

  submittedOn: string;

  status: ApplicationStatus;

  progress: number;

  values?: Record<string, string>;

  documents?: Record<string, string>;

  declared?: boolean;

  timeline: {
    label: string;
    at: string;
    done: boolean;
  }[];
};

export const seedApplications: Application[] = [
  {
    id: "REV-2025-0418",
    serviceId: "income-certificate",
    serviceName: "Income Certificate",
    department: "revenue",
    submittedOn: "12 Mar 2025",
    status: "Processing",
    progress: 60,
    timeline: [
      { label: "Submitted via LOK SEVAK gateway", at: "12 Mar 2025", done: true },
      { label: "Received by Revenue Dept API", at: "12 Mar 2025", done: true },
      { label: "Documents verified", at: "15 Mar 2025", done: true },
      { label: "Under Tahsildar review", at: "In progress", done: false },
      { label: "Certificate issued", at: "Pending", done: false },
    ],
  },
  {
    id: "EDU-2025-0291",
    serviceId: "scholarship",
    serviceName: "Scholarship Application",
    department: "education",
    submittedOn: "08 Mar 2025",
    status: "Documents Verified",
    progress: 75,
    timeline: [
      { label: "Submitted via LOK SEVAK gateway", at: "08 Mar 2025", done: true },
      { label: "Received by Education Dept API", at: "08 Mar 2025", done: true },
      { label: "Institute verification", at: "11 Mar 2025", done: true },
      { label: "Documents verified", at: "14 Mar 2025", done: true },
      { label: "Sanction & disbursal", at: "Pending", done: false },
    ],
  },
  {
    id: "MUN-2025-0102",
    serviceId: "birth-certificate",
    serviceName: "Birth Certificate",
    department: "municipal",
    submittedOn: "02 Mar 2025",
    status: "Approved",
    progress: 100,
    timeline: [
      { label: "Submitted via LOK SEVAK gateway", at: "02 Mar 2025", done: true },
      { label: "Received by Municipal Dept API", at: "02 Mar 2025", done: true },
      { label: "Registry matched", at: "04 Mar 2025", done: true },
      { label: "Approved", at: "07 Mar 2025", done: true },
      { label: "Certificate available for download", at: "07 Mar 2025", done: true },
    ],
  },
];

/** Pre-configured AI navigator responses (simulated NLU). */
export type AiMatch = {
  query: string;
  serviceId: string;
  confidence: number;
  reason: string;
  nextStep: string;
};

export const aiExampleQueries = [
  "मला scholarship साठी income certificate पाहिजे.",
  "I need an income certificate for scholarship.",
  "मुझे सरकारी छात्रवृत्ति के लिए आवेदन करना है.",
  "I need a birth certificate.",
];

export const aiKnowledgeBase: AiMatch[] = [
  {
    query: "income certificate scholarship उत्पन्न दाखला छात्रवृत्ति",
    serviceId: "income-certificate",
    confidence: 98,
    reason:
      "An income certificate may be required as proof of family income for scholarship eligibility.",
    nextStep:
      "Lok Sevak found that most of your required information is already available in your Citizen Profile.",
  },
  {
    query: "scholarship छात्रवृत्ति शिष्यवृत्ती education fee",
    serviceId: "scholarship",
    confidence: 94,
    reason:
      "State scholarships are administered by the Education Department and need an income certificate as supporting proof.",
    nextStep: "Your profile already carries 8 of the 10 fields this application needs.",
  },
  {
    query: "birth certificate जन्म दाखला जन्म प्रमाण पत्र",
    serviceId: "birth-certificate",
    confidence: 96,
    reason:
      "Birth records are maintained by the Municipal Corporation, so the birth certificate is issued by Municipal Services.",
    nextStep: "Your identity and address proofs are already verified in your Citizen Profile.",
  },
  {
    query: "caste certificate जात प्रमाणपत्र जाति",
    serviceId: "caste-certificate",
    confidence: 91,
    reason:
      "A caste certificate is issued by the Revenue Department and is used for reservation benefits.",
    nextStep: "Identity and address proof are ready; a parent caste record is still needed.",
  },
  {
    query: "pension वृद्धापकाळ पेंशन old age widow",
    serviceId: "pension-scheme",
    confidence: 89,
    reason:
      "Pension schemes are administered by the Social Welfare Department based on age and income criteria.",
    nextStep: "Income proof from your profile can be reused for this application.",
  },
  {
    query: "domicile रहिवासी दाखला residence",
    serviceId: "domicile-certificate",
    confidence: 90,
    reason:
      "A domicile certificate proves permanent residence in the state and is issued by the Revenue Department.",
    nextStep: "Your address proof is already verified in your Citizen Profile.",
  },
];

/** Very small keyword-overlap matcher standing in for a real NLU service. */
export function matchService(query: string): AiMatch {
  const q = query.toLowerCase();
  let best: AiMatch = aiKnowledgeBase[0]!;
  let bestScore = -1;
  for (const entry of aiKnowledgeBase) {
    const score = entry.query
      .toLowerCase()
      .split(/\s+/)
      .reduce((acc, token) => (token && q.includes(token) ? acc + 1 : acc), 0);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return best;
}
