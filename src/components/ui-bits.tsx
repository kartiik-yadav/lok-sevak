import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { type DepartmentId, departmentById } from "@/lib/demo-data";

export function SectionHeading({
  eyebrow,
  title,
  right,
}: {
  eyebrow: string;
  title: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-saffron-soft">
          <span className="h-px w-6 bg-saffron" />
          {eyebrow}
        </div>
        <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-paper">{title}</h2>
      </div>
      {right}
    </div>
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-sm border border-line bg-ink-900 p-5 ${className}`}>{children}</div>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return <div className="lks-label">{children}</div>;
}

const deptTone: Record<DepartmentId, string> = {
  revenue: "bg-saffron/12 text-saffron-soft ring-saffron/25",
  municipal: "bg-signal/10 text-signal ring-signal/25",
  education: "bg-info/10 text-info ring-info/25",
  welfare: "bg-warn/10 text-warn ring-warn/25",
};

export function DeptTag({ id }: { id: DepartmentId }) {
  return (
    <span
      className={`rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ring-1 ring-inset ${deptTone[id]}`}
    >
      {departmentById(id).name.replace(" Department", "").replace(" Services", "")}
    </span>
  );
}

export function Progress({ value, tone = "saffron" }: { value: number; tone?: "saffron" | "signal" }) {
  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-ink-700">
      <div
        className={`h-full transition-all duration-700 ${tone === "signal" ? "bg-signal" : "bg-saffron"}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  className = "",
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-sm bg-saffron px-5 py-2.5 font-mono text-[13px] font-medium uppercase tracking-[0.06em] text-ink ring-1 ring-inset ring-saffron-soft/60 transition-transform hover:-translate-y-px ${className}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-sm border border-line px-5 py-2.5 font-mono text-[13px] uppercase tracking-[0.06em] text-paper transition-colors hover:border-saffron hover:text-saffron-soft ${className}`}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  to,
  params,
  children,
  variant = "ghost",
  className = "",
}: {
  to: string;
  params?: Record<string, string>;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    variant === "primary"
      ? "bg-saffron text-ink ring-1 ring-inset ring-saffron-soft/60 hover:-translate-y-px"
      : "border border-line text-paper hover:border-saffron hover:text-saffron-soft";
  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      to={to as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params={params as any}
      className={`inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 font-mono text-[13px] uppercase tracking-[0.06em] transition-all ${base} ${className}`}
    >
      {children}
    </Link>
  );
}
