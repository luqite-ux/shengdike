import { RotateCw } from 'lucide-react';

/**
 * @param {{ onClick: () => void, loading?: boolean }} props
 */
export function OverviewRefreshButton({ onClick, loading }) {
  return (
    <div className="mt-6 flex justify-end">
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 disabled:pointer-events-none disabled:opacity-50"
      >
        <RotateCw
          className={`h-3.5 w-3.5 shrink-0 text-slate-500 ${loading ? 'animate-spin' : ''}`}
          aria-hidden
        />
        刷新
      </button>
    </div>
  );
}
