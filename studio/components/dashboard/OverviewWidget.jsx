import { useCallback, useEffect, useState } from 'react';
import { useClient } from 'sanity';
import { DashboardWidgetContainer } from '@sanity/dashboard';
import { OVERVIEW_METRICS } from './overview/overviewMetrics.config.jsx';
import { OverviewHint } from './overview/OverviewHint.jsx';
import { OverviewMetricCard } from './overview/OverviewMetricCard.jsx';
import { OverviewMetricSkeleton } from './overview/OverviewMetricSkeleton.jsx';
import { OverviewRefreshButton } from './overview/OverviewRefreshButton.jsx';

const STAT_QUERY = `{
  "products":       count(*[_type == "product"       && !(_id in path("drafts.**"))]),
  "categories":     count(*[_type == "productCategory" && !(_id in path("drafts.**"))]),
  "inquiriesTotal": count(*[_type == "inquiry"        && !(_id in path("drafts.**"))]),
  "inquiriesNew":   count(*[_type == "inquiry"        && !(_id in path("drafts.**")) && status == "new"])
}`;

export function OverviewWidget() {
  const client = useClient({ apiVersion: '2024-01-01' });
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    client.fetch(STAT_QUERY).then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, [client]);

  useEffect(() => {
    load();
  }, [load]);

  const navigateTo = (structureId) => {
    if (!structureId) return;
    window.location.href = `/structure/${structureId}`;
  };

  return (
    <DashboardWidgetContainer header="业务总览">
      <div className="px-5 pb-5 pt-4 font-sans antialiased">
        <OverviewHint />
        {loading && stats === null ? (
          <OverviewMetricSkeleton />
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {OVERVIEW_METRICS.map((m) => {
              const raw = stats?.[m.key];
              const display = raw == null ? '—' : raw;
              const attentionActive = Boolean(
                m.attentionWhenPositive && typeof raw === 'number' && raw > 0,
              );
              return (
                <OverviewMetricCard
                  key={m.key}
                  label={m.label}
                  note={m.note}
                  value={display}
                  Icon={m.Icon}
                  attentionActive={attentionActive}
                  onClick={() => navigateTo(m.structureId)}
                />
              );
            })}
          </div>
        )}
        <OverviewRefreshButton onClick={load} loading={loading && stats !== null} />
      </div>
    </DashboardWidgetContainer>
  );
}
