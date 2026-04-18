export function OverviewMetricSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-slate-200/60 bg-slate-50/80 p-4"
        >
          <div className="mb-3 h-9 w-9 rounded-lg bg-slate-200/80" />
          <div className="mb-2 h-8 w-16 rounded-md bg-slate-200/80" />
          <div className="mb-1 h-4 w-24 rounded bg-slate-200/60" />
          <div className="h-3 w-32 rounded bg-slate-200/50" />
        </div>
      ))}
    </div>
  );
}
