import { useRef, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  FileSearch,
  Image as ImageIcon,
  Loader2,
  ScanLine,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { createWorker } from "tesseract.js";

type OCRScannerProps = {
  onBack: () => void;
};

function OCRScanner({ onBack }: OCRScannerProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [ocrText, setOcrText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const handleFileSelect = (file: File) => {
    setError("");
    setOcrText("");
    setProgress(0);

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file such as JPG, JPEG or PNG.");
      return;
    }

    setSelectedFile(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setOcrText("");
    setProgress(0);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleScan = async () => {
    if (!selectedFile) {
      setError("Please select a document image first.");
      return;
    }

    setIsProcessing(true);
    setError("");
    setOcrText("");
    setProgress(0);

    try {
      const worker = await createWorker("eng", 1, {
        logger: (message: { status: string; progress?: number }) => {
          if (
            message.status === "recognizing text" &&
            typeof message.progress === "number"
          ) {
            setProgress(Math.round(message.progress * 100));
          }
        },
      });

      const result = await worker.recognize(selectedFile);

      setOcrText(result.data.text.trim());

      await worker.terminate();
    } catch (ocrError) {
      console.error(ocrError);

      setError(
        "OCR could not process this document. Please try a clearer image.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <ScanLine size={21} />
            </div>

            <div>
              <p className="text-lg font-black tracking-tight text-slate-900">
                Document OCR
              </p>

              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                LOK SEVAK
              </p>
            </div>
          </div>

          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft size={17} />
            Back
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-indigo-700 to-indigo-800 px-5 py-12 text-white sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
            <Sparkles size={29} />
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Scan Your Document
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
            Upload a clear document image and LOK SEVAK will extract the
            text automatically using OCR.
          </p>
        </div>
      </section>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upload */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Step 01
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-900">
                Upload document
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Use a clear photo or scan of your document.
              </p>
            </div>

            {!selectedFile ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex min-h-64 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 text-center transition hover:border-blue-400 hover:bg-blue-50"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                  <Upload size={25} />
                </div>

                <p className="mt-4 font-extrabold text-slate-900">
                  Choose a document image
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  JPG, JPEG or PNG
                </p>
              </button>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <div className="relative bg-slate-100">
                  <img
                    src={previewUrl}
                    alt="Selected document"
                    className="max-h-80 w-full object-contain"
                  />

                  <button
                    onClick={handleRemove}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-600 shadow-md transition hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove document"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <ImageIcon size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-800">
                      {selectedFile.name}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleInputChange}
              className="hidden"
            />

            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <button
              onClick={handleScan}
              disabled={!selectedFile || isProcessing}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Scanning... {progress}%
                </>
              ) : (
                <>
                  <ScanLine size={18} />
                  Scan Document
                </>
              )}
            </button>

            {isProcessing && (
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </section>

          {/* Result */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Step 02
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-900">
                Extracted text
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                OCR results will appear here after scanning.
              </p>
            </div>

            {ocrText ? (
              <div>
                <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                  <CheckCircle2 size={18} />
                  Document scanned successfully
                </div>

                <textarea
                  value={ocrText}
                  onChange={(event) =>
                    setOcrText(event.target.value)
                  }
                  className="min-h-72 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />

                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <FileSearch size={15} />
                  Extracted text can be reviewed before using it in an
                  application.
                </div>
              </div>
            ) : (
              <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-300 shadow-sm">
                  <FileSearch size={25} />
                </div>

                <p className="mt-4 font-bold text-slate-700">
                  No OCR result yet
                </p>

                <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500">
                  Upload a document and click “Scan Document” to extract
                  its text.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Prototype notice */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <div className="flex gap-3">
            <Sparkles className="mt-0.5 shrink-0" size={18} />

            <div>
              <p className="font-bold">
                OCR Prototype Notice
              </p>

              <p className="mt-1 leading-6">
                OCR processing is performed in the browser using Tesseract.js.
                For the SIH prototype, extracted text is displayed for review.
                Production systems would require additional document
                validation, security and structured field extraction.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OCRScanner;