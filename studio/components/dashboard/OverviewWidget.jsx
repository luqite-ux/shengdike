import { useEffect, useState, useCallback } from 'react';
import { useClient } from 'sanity';
import { DashboardWidgetContainer } from '@sanity/dashboard';
import { addCardHover, dashboardTheme, removeCardHover } from './theme.js';

const STAT_QUERY = `{
  "products":       count(*[_type == "product"       && !(_id in path("drafts.**"))]),
  "categories":     count(*[_type == "productCategory" && !(_id in path("drafts.**"))]),
  "inquiriesTotal": count(*[_type == "inquiry"        && !(_id in path("drafts.**"))]),
  "inquiriesNew":   count(*[_type == "inquiry"        && !(_id in path("drafts.**")) && status == "new"])
}`;

const cards = [
  { key: 'products',       label: '产品总数', icon: '📦', color: '#4f46e5', structureId: 'itemProducts', note: '在售产品清单' },
  { key: 'categories',     label: '分类数量', icon: '🏷️', color: '#7c3aed', structureId: 'itemProductCategories', note: '分类体系结构' },
  { key: 'inquiriesTotal', label: '询盘总数', icon: '📬', color: '#0f766e', structureId: 'itemInquiries', note: '历史累计线索' },
  { key: 'inquiriesNew',   label: '待处理',   icon: '🔔', color: '#dc2626', highlight: true, structureId: 'itemInquiries', note: '需要优先跟进' },
];

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

  useEffect(() => { load(); }, [load]);

  const navigateTo = (structureId) => {
    if (!structureId) return;
    window.location.href = `/structure/${structureId}`;
  };

  return (
    <DashboardWidgetContainer header="业务总览">
      <div style={{ padding: '18px 22px 22px' }}>
        <div style={{
          marginBottom: 14,
          padding: '8px 10px',
          borderRadius: 10,
          border: `1px solid ${dashboardTheme.colors.border}`,
          background: dashboardTheme.colors.bgSoft,
          color: dashboardTheme.colors.textSecondary,
          fontSize: 12,
          fontWeight: 500,
        }}>
          核心指标看板 · 点击卡片可直达对应模块
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 24, color: '#999', fontSize: 14 }}>
            加载中…
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 14,
          }}>
            {cards.map((c) => (
              <div
                key={c.key}
                onClick={() => navigateTo(c.structureId)}
                style={{
                  background: c.highlight && stats?.[c.key] > 0
                    ? 'linear-gradient(145deg, #fff1f2, #ffe4e6)'
                    : `linear-gradient(160deg, ${c.color}14, #ffffff 72%)`,
                  borderRadius: 14,
                  padding: '18px 16px',
                  textAlign: 'left',
                  border: c.highlight && stats?.[c.key] > 0
                    ? '1px solid #fecdd3'
                    : '1px solid #eef2f7',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s, transform 0.15s, border-color 0.2s',
                  minHeight: 116,
                }}
                onMouseEnter={(e) => {
                  addCardHover(e);
                  e.currentTarget.style.borderColor = `${c.color}40`;
                }}
                onMouseLeave={(e) => {
                  removeCardHover(e);
                  e.currentTarget.style.borderColor = c.highlight && stats?.[c.key] > 0 ? '#fecdd3' : '#eef2f7';
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 10 }}>{c.icon}</div>
                <div style={{
                  fontSize: 30,
                  fontWeight: 800,
                  color: c.color,
                  lineHeight: 1.1,
                  marginBottom: 6,
                }}>
                  {stats?.[c.key] ?? '—'}
                </div>
                <div style={{ fontSize: 12.5, color: '#475569', letterSpacing: '0.01em', fontWeight: 600 }}>
                  {c.label}
                </div>
                <div style={{ marginTop: 3, fontSize: 11, color: '#94a3b8' }}>
                  {c.note}
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={load}
          style={{
            display: 'block',
            margin: '18px auto 0',
            background: '#f8fafc',
            border: `1px solid ${dashboardTheme.colors.border}`,
            borderRadius: dashboardTheme.radius.pill,
            padding: '7px 18px',
            fontSize: 12,
            color: '#475569',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          ↻ 刷新
        </button>
      </div>
    </DashboardWidgetContainer>
  );
}
