import { useEffect, useState } from 'react';
import { useClient } from 'sanity';
import { DashboardWidgetContainer } from '@sanity/dashboard';
import { addCardHover, dashboardTheme, removeCardHover } from './theme.js';

const QUERY = `*[_type == "inquiry" && !(_id in path("drafts.**"))]
  | order(submittedAt desc)[0..9]{
    _id, name, phone, email, company, message, status, submittedAt, source
  }`;

const STATUS_MAP = {
  new:       { label: '待处理', bg: '#fff1f2', color: '#e11d48', border: '#fecdd3' },
  contacted: { label: '已联系', bg: '#eef2ff', color: '#4f46e5', border: '#c7d2fe' },
  closed:    { label: '已关闭', bg: '#ecfeff', color: '#0f766e', border: '#99f6e4' },
  done:      { label: '已处理', bg: '#f8fafc', color: '#475569', border: '#e2e8f0' },
};

function Badge({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP.done;
  return (
    <span style={{
      display: 'inline-block',
      fontSize: 11,
      fontWeight: 600,
      padding: '2px 8px',
      borderRadius: 10,
      background: s.bg,
      color: s.color,
      border: `1px solid ${s.border}`,
      whiteSpace: 'nowrap',
    }}>
      {s.label}
    </span>
  );
}

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return '刚刚';
  if (mins < 60) return `${mins}分钟前`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}小时前`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}天前`;
  return new Date(dateStr).toLocaleDateString('zh-CN');
}

export function RecentInquiriesWidget() {
  const client = useClient({ apiVersion: '2024-01-01' });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(QUERY).then((data) => {
      setItems(data || []);
      setLoading(false);
    });
  }, [client]);

  const openDoc = (id) => {
    window.location.href = `/structure/itemInquiries;${id}`;
  };

  return (
    <DashboardWidgetContainer header="询盘中心（最近 10 条）">
      <div style={{ padding: '8px 10px 10px' }}>
        <div style={{
          margin: '0 8px 10px',
          padding: '8px 10px',
          borderRadius: 10,
          border: `1px solid ${dashboardTheme.colors.border}`,
          background: dashboardTheme.colors.bgSoft,
          color: dashboardTheme.colors.textSecondary,
          fontSize: 12,
          fontWeight: 500,
        }}>
          线索追踪看板 · 点击任意记录可打开详情并处理状态
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 24, color: '#999', fontSize: 14 }}>
            加载中…
          </div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 24, color: '#bbb', fontSize: 14 }}>
            暂无询盘
          </div>
        ) : (
          <div>
            {items.map((item, idx) => (
              <div
                key={item._id}
                onClick={() => openDoc(item._id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  margin: '0 8px 8px',
                  padding: '12px 14px',
                  borderBottom: idx < items.length - 1 ? '1px solid #f8fafc' : 'none',
                  border: '1px solid #edf2f7',
                  borderRadius: 12,
                  background: '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.15s, transform 0.15s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8fafc';
                  addCardHover(e);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff';
                  removeCardHover(e);
                }}
              >
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: item.status === 'new' ? '#ffe4e6' : '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  flexShrink: 0,
                  marginTop: 2,
                }}>
                  {item.status === 'new' ? '🔴' : '👤'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>
                      {item.name || '(未留名)'}
                    </span>
                    <Badge status={item.status} />
                    <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 'auto', whiteSpace: 'nowrap' }}>
                      {timeAgo(item.submittedAt)}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 2 }}>
                    {[item.phone, item.email, item.company].filter(Boolean).join(' · ') || '—'}
                  </div>
                  {item.message && (
                    <div style={{
                      fontSize: 12,
                      color: '#475569',
                      lineHeight: 1.5,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.message}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardWidgetContainer>
  );
}
