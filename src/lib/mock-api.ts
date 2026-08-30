/**
 * Integration Layer — simulated government API connectors.
 *
 * Every department system is reached through a connector that speaks
 * its own native data format.
 *
 * The transformation layer normalises payloads into the
 * Common Citizen Data Format (CCDF).
 */

import {
  type Application,
  type CitizenProfile,
  type DepartmentId,
  type Service,
  departmentById,
} from "./demo-data";

export type CommonCitizenRecord = {
  ccdf_version: "1.0";

  citizen: {
    full_name: string;

    date_of_birth: string;

    gender: string;

    contact: {
      mobile: string;
      email: string;
    };

    address: {
      line1: string;
      city: string;
      district: string;
      state: string;
      pin: string;
    };

    identity: {
      aadhaar_masked: string;
      pan: string;
    };
  };

  documents: {
    type: string;
    status: string;
  }[];
};

/*
 * Convert citizen profile to
 * Common Citizen Data Format.
 */
export function toCommonFormat(
  profile: CitizenProfile,
): CommonCitizenRecord {
  return {
    ccdf_version: "1.0",

    citizen: {
      full_name: profile.fullName,

      date_of_birth: profile.dateOfBirth,

      gender: profile.gender,

      contact: {
        mobile: profile.mobile,
        email: profile.email,
      },

      address: {
        line1: profile.address,
        city: profile.city,
        district: profile.district,
        state: profile.state,
        pin: profile.pin,
      },

      identity: {
        aadhaar_masked: profile.aadhaar,
        pan: profile.pan,
      },
    },

    documents: profile.documents.map(
      (document) => ({
        type: document.name,
        status: document.status,
      }),
    ),
  };
}

export type AutoFillField = {
  label: string;

  value: string;

  autoFilled: boolean;

  source?: string;
};

/*
 * Build auto-filled form using
 * the ACTUAL citizen profile.
 */
export function buildAutoFilledForm(
  service: Service,
  profile: CitizenProfile,
): AutoFillField[] {
  const p = profile;

  const base: AutoFillField[] = [
    {
      label: "Applicant Name",
      value: p.fullName,
      autoFilled: true,
      source: "Citizen Profile",
    },

    {
      label: "Date of Birth",
      value: p.dateOfBirth,
      autoFilled: true,
      source: "Citizen Profile",
    },

    {
      label: "Gender",
      value: p.gender,
      autoFilled: true,
      source: "Citizen Profile",
    },

    {
      label: "Address",
      value: p.address,
      autoFilled: true,
      source: "Citizen Profile",
    },

    {
      label: "District",
      value: p.district,
      autoFilled: true,
      source: "Citizen Profile",
    },

    {
      label: "State",
      value: p.state,
      autoFilled: true,
      source: "Citizen Profile",
    },

    {
      label: "Mobile Number",
      value: p.mobile,
      autoFilled: true,
      source: "Citizen Profile",
    },

    {
      label: "Email",
      value: p.email,
      autoFilled: true,
      source: "Citizen Profile",
    },
  ];

  const pending: AutoFillField[] =
    service.id === "income-certificate"
      ? [
          {
            label: "Annual Family Income (₹)",
            value: "",
            autoFilled: false,
          },

          {
            label: "Purpose of Certificate",
            value: "",
            autoFilled: false,
          },
        ]
      : [
          {
            label: `Purpose / Scheme for ${service.name}`,
            value: "",
            autoFilled: false,
          },

          {
            label: "Additional Remarks",
            value: "",
            autoFilled: false,
          },
        ];

  return [
    ...base,
    ...pending,
  ];
}

export type GatewayStep = {
  id: string;

  label: string;

  detail: string;
};

/*
 * Integration gateway steps.
 */
export function gatewaySteps(
  department: DepartmentId,
): GatewayStep[] {
  const dept =
    departmentById(department);

  return [
    {
      id: "validate",

      label:
        "Validating with LOK SEVAK business logic",

      detail:
        "Eligibility rules and document checklist evaluated",
    },

    {
      id: "ccdf",

      label:
        "Encoding to Common Citizen Data Format",

      detail:
        "CCDF v1.0 payload generated from Citizen Profile",
    },

    {
      id: "transform",

      label:
        "Data Transformation Layer",

      detail:
        `CCDF → ${dept.dataFormat} for ${dept.systemName}`,
    },

    {
      id: "gateway",

      label:
        "API Integration Gateway",

      detail:
        `POST ${dept.endpoint}/applications`,
    },

    {
      id: "ack",

      label:
        `${dept.systemName} acknowledged`,

      detail:
        "Mock API returned 201 Created with an application reference",
    },
  ];
}

const prefix: Record<
  DepartmentId,
  string
> = {
  revenue: "REV",

  education: "EDU",

  municipal: "MUN",

  welfare: "SWD",
};

/*
 * Simulated submission to a government department.
 */
export function submitToDepartment(
  service: Service,
  reference: string,
  values: Record<string, string>,
  documents: Record<string, string>,
  declared: boolean,
): Application {
  const now = new Date();

  const id =
    `${prefix[service.department]}-` +
    `${now.getFullYear()}-` +
    `${Math.floor(
      Math.random() * 9000,
    ) + 1000}`;

  const submittedOn =
    now.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );

  return {
    id,

    reference,

    serviceId: service.id,

    serviceName: service.name,

    department:
      service.department,

    submittedOn,

    status: "Submitted",

    progress: 25,

    values,

    documents,

    declared,

    timeline: [
      {
        label:
          "Submitted via LOK SEVAK gateway",

        at: submittedOn,

        done: true,
      },

      {
        label:
          `Received by ${
            departmentById(
              service.department,
            ).systemName
          }`,

        at: submittedOn,

        done: true,
      },

      {
        label:
          "Document verification",

        at: "Queued",

        done: false,
      },

      {
        label:
          "Departmental review",

        at: "Pending",

        done: false,
      },

      {
        label:
          "Certificate issued",

        at: "Pending",

        done: false,
      },
    ],
  };
}

export const wait = (
  ms: number,
) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms),
  );