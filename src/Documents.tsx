import { useState, type ReactNode } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  FileCheck2,
  FileText,
  ScanLine,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";

type DocumentsProps = {
  onNavigate: (screen: string) => void;
};

type DocumentItem = {
  id: number;
  name: string;
  type: string;
  status: "Available" | "Missing";
};

const initialDocuments: DocumentItem[] = [
  {
    id: 1,
    name: "Aadhaar Card",
    type: "Identity Proof",
    status: "Available",
  },
  {
    id: 2,
    name: "PAN Card",
    type: "Identity Proof",
    status: "Available",
  },
  {
    id: 3,
    name: "Address Proof",
    type: "Address Document",
    status: "Missing",
  },
  {
    id: 4,
    name: "Income Proof",
    type: "Financial Document",
    status: "Missing",
  },
  {
    id: 5,
    name: "Bank Account Proof",
    type: "Banking Document",
    status: "Missing",
  },
];

function Documents({ onNavigate }: DocumentsProps) {
  const [documents, setDocuments] =
    useState<DocumentItem[]>(initialDocuments);

  const handleSimulateUpload = (id: number) => {
    setDocuments((currentDocuments) =>
      currentDocuments.map((document) =>
        document.id === id
          ? {
              ...document,
              status: "Available",
            }
          : document,
      ),
    );
  };

  const handleRemove = (id: number) => {
    setDocuments((currentDocuments) =>
      currentDocuments.map((document) =>
        document.id === id
          ? {
              ...document,
              status: "Missing",
            }
          : document,
      ),
    );
  };

  const availableCount = documents.filter(
    (document) => document.status === "Available",
  ).length;

  const missingCount = documents.filter(
    (document) => document.status === "Missing",
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <button
            onClick={() => onNavigate("dashboard")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <FileText size={21} />
            </div>

            <div className="text-left">
              <p className="text-lg font-black tracking-tight text-slate-900">
                My Documents
              </p>

              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                LOK SEVAK
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate("dashboard")}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft size={17} />
            Dashboard
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-indigo-700 to-indigo-800 px-5 py-10 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider ring-1 ring-white/15">
                <FileCheck2 size={15} />
                Document Vault
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Your Documents
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100">
                Manage your commonly required documents and use OCR to
                extract information from document images.
              </p>
            </div>

            {/* OCR Button */}
            <button
              onClick={() => onNavigate("ocr")}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              <ScanLine size={19} />
              Scan Document with OCR
            </button>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        {/* Summary */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Documents
            </p>

            <p className="mt-2 text-3xl font-black text-slate-900">
              {documents.length}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Available
            </p>

            <p className="mt-2 text-3xl font-black text-emerald-800">
              {availableCount}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Required / Missing
            </p>

            <p className="mt-2 text-3xl font-black text-amber-800">
              {missingCount}
            </p>
          </div>
        </div>

        {/* OCR CTA */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex flex-col gap-5 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
                <Sparkles size={22} />
              </div>

              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Need to extract information from a document?
                </h2>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                  Use the built-in OCR scanner to upload a document image
                  and automatically extract its text.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate("ocr")}
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              <ScanLine size={18} />
              Open OCR Scanner
            </button>
          </div>
        </section>

        {/* Documents */}
        <section className="mt-10">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Saved documents
            </p>

            <h2 className="mt-1 text-2xl font-black text-slate-900">
              Document Checklist
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              These documents can be used while completing government
              service applications.
            </p>
          </div>

          <div className="space-y-4">
            {documents.map((document) => {
              const isAvailable =
                document.status === "Available";

              return (
                <div
                  key={document.id}
                  className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                        isAvailable
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {isAvailable ? (
                        <FileCheck2 size={22} />
                      ) : (
                        <FileText size={22} />
                      )}
                    </div>

                    <div>
                      <h3 className="font-extrabold text-slate-900">
                        {document.name}
                      </h3>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        {document.type}
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        {isAvailable ? (
                          <>
                            <CheckCircle2
                              size={14}
                              className="text-emerald-600"
                            />

                            <span className="text-xs font-bold text-emerald-700">
                              Available
                            </span>
                          </>
                        ) : (
                          <span className="text-xs font-bold text-amber-600">
                            Missing
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    {isAvailable ? (
                      <button
                        onClick={() =>
                          handleRemove(document.id)
                        }
                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleSimulateUpload(document.id)
                        }
                        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                      >
                        <Upload size={16} />
                        Simulate Upload
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* OCR explanation */}
        <section className="mt-10 grid gap-5 md:grid-cols-3">
          <InfoCard
            icon={<Upload size={20} />}
            title="1. Upload"
            description="Select a clear image of your document from your device."
          />

          <InfoCard
            icon={<ScanLine size={20} />}
            title="2. Scan"
            description="Tesseract.js processes the image and identifies readable text."
          />

          <InfoCard
            icon={<FileCheck2 size={20} />}
            title="3. Review"
            description="Review the extracted text before using it in your application."
          />
        </section>

        {/* Notice */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <div className="flex gap-3">
            <Sparkles className="mt-0.5 shrink-0" size={18} />

            <div>
              <p className="font-bold">
                Prototype / Demo Notice
              </p>

              <p className="mt-1 leading-6">
                Document storage and upload status are simulated for this
                SIH prototype. OCR processing itself runs in the browser
                using Tesseract.js.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

type InfoCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

function InfoCard({
  icon,
  title,
  description,
}: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <h3 className="mt-4 font-extrabold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

export default Documents;