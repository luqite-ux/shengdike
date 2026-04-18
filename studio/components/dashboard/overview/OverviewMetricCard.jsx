/**
 * @param {{
 *   label: string,
 *   note: string,
 *   value: string | number,
 *   Icon: import('lucide-react').LucideIcon,
 *   onClick: () => void,
 *   attentionActive?: boolean,
 * }} props
 */
export function OverviewMetricCard({ label, note, value, Icon, onClick, attentionActive }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'group relative flex w-full flex-col rounded-xl border bg-white p-4 text-left antialiased',
        'shadow-[0_1px_0_rgba(0,0,0,0.03),0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-4px_rgba(15,23,42,0.06)]',
        'transition duration-200 ease-out',
        'hover:-translate-y-px hover:border-slate-300/90 hover:shadow-[0_1px_0_rgba(0,0,0,0.04),0_4px_12px_rgba(15,23,42,0.06),0_20px_40px_-12px_rgba(15,23,42,0.1)]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400',
        attentionActive
          ? 'border-rose-200/90 ring-1 ring-rose-500/[0.12]'
          : 'border-slate-200/70 ring-0 ring-transparent',
      ].join(' ')}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <span
          className={[
            'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border',
            attentionActive
              ? 'border-rose-100 bg-rose-50/80 text-rose-600'
              : 'border-slate-100 bg-slate-50 text-slate-600',
          ].join(' ')}
        >
          <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </span>
      </div>
      <div
        className={[
          'mb-1 text-3xl font-semibold tabular-nums tracking-tight',
          attentionActive ? 'text-rose-600' : 'text-slate-900',
        ].join(' ')}
      >
        {value}
      </div>
      <div className="text-[13px] font-medium text-slate-700">{label}</div>
      <div className="mt-0.5 text-xs leading-snug text-slate-500">{note}</div>
    </button>
  );
}
