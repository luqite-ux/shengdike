import { useEffect, useState } from 'react';
import { useClient } from 'sanity';
import { DashboardWidgetContainer } from '@sanity/dashboard';
import { addCardHover, dashboardTheme, removeCardHover } from './theme.js';

const QUERY = `*[_type in ["homePage","aboutPage","siteSettings","productCategory","product","inquiry"] && !(_id in path("drafts.**"))]
  | order(_updatedAt desc)[0..7]{
    _id,
    _type,
    _updatedAt,
    "title": coalesce(name, title, heading, heroTitle, heroEyebrow, company, question)
  }`;

const TYPE_META = {
  homePage:        { label: '首页', icon: '🏠', color: '#4f46e5' },
  aboutPage:       { label: '品牌探索页', icon: '🌐', color: '#2563eb' },
  siteSettings:    { label: '站点设置', icon: '⚙️', color: '#0f766e' },
  productCategory: { label: '产品分类', icon: '🏷️', color: '#7c3aed' },
  product:         { label: '产品', icon: '📦', color: '#4338ca' },
  inquiry:         { label: '询盘', icon: '📬', color: '#e11d48' },
};

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

export function RecentEditsWidget() {
  const client = useClient({ apiVersion: '2024-01-01' });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(QUERY).then((data) => {
      setItems(data || []);
      setLoading(false);
    });
  }, [client]);

  const TYPE_TO_STRUCTURE = {
    homePage: 'itemHomePage',
    aboutPage: 'itemAboutPage',
    siteSettings: 'itemSiteSettings',
    productCategory: 'itemProductCategories',
    product: 'itemProducts',
    inquiry: 'itemInquiries',
  };

  const openDoc = (id, type) => {
    const structureId = TYPE_TO_STRUCTURE[type] || 'itemProducts';
    window.location.href = `/structure/${structureId};${id}`;
  };

  return (
    <DashboardWidgetContainer header="最近更新">
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
          内容编辑动态 · 快速查看最近改动并继续编辑
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 24, color: '#999', fontSize: 14 }}>
            加载中…
          </div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 24, color: '#bbb', fontSize: 14 }}>
            暂无数据
          </div>
        ) : (
          <div>
            {items.map((item, idx) => {
              const meta = TYPE_META[item._type] || { label: item._type, icon: '📁', color: '#999' };
              return (
                <div
                  key={item._id}
                  onClick={() => openDoc(item._id, item._type)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    margin: '0 8px 8px',
                    padding: '11px 14px',
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
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{meta.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 13.5,
                      fontWeight: 500,
                      color: '#0f172a',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.title || '(无标题)'}
                    </div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>
                      <span style={{
                        display: 'inline-block',
                        background: `${meta.color}1f`,
                        color: meta.color,
                        fontSize: 10,
                        fontWeight: 700,
                        padding: '2px 7px',
                        borderRadius: 999,
                        marginRight: 6,
                      }}>
                        {meta.label}
                      </span>
                      {timeAgo(item._updatedAt)}
                    </div>
                  </div>
                  <span style={{ fontSize: 14, color: '#ccc', flexShrink: 0 }}>›</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardWidgetContainer>
  );
}
