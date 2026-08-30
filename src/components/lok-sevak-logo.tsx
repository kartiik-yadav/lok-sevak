export function LokSevakLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {/* Official LOK SEVAK Logo */}
      <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-md">
        <img
          src="/lok-sevak-logo.png"
          alt="LOK SEVAK Logo"
          className="h-full w-full object-contain"
        />
      </div>

      {!compact && (
        <div className="min-w-0 leading-tight">
          <div className="text-base font-bold tracking-wide text-white">LOK SEVAK</div>

          <div className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.14em] text-white/70">
            Smart Public Services
          </div>
        </div>
      )}
    </div>
  );
}
