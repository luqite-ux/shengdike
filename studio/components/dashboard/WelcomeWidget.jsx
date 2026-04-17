import { DashboardWidgetContainer } from '@sanity/dashboard';
import { dashboardTheme } from './theme.js';

export function WelcomeWidget() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? '上午好' : hour < 18 ? '下午好' : '晚上好';
  const quickActions = [
    { label: '编辑首页', href: '/structure/itemHomePage', icon: '🏠' },
    { label: '品牌探索页', href: '/structure/itemAboutPage', icon: '🌐' },
    { label: '站点设置', href: '/structure/itemSiteSettings', icon: '⚙️' },
    { label: '产品分类', href: '/structure/itemProductCategories', icon: '🗂️' },
    { label: '产品管理', href: '/structure/itemProducts', icon: '📦' },
    { label: '询盘中心', href: '/structure/itemInquiries', icon: '📬' },
  ];

  return (
    <DashboardWidgetContainer>
      <div style={{
        padding: '36px 32px',
        background:
          `radial-gradient(1200px 420px at 12% -55%, rgba(249,115,22,0.38), transparent 56%), linear-gradient(135deg, #0b1324 0%, #111827 42%, #312e81 100%)`,
        color: '#fff',
        borderRadius: dashboardTheme.radius.xl,
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: dashboardTheme.shadow.heavy,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div
          style={{
            position: 'absolute',
            right: -120,
            top: -120,
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(79,70,229,0.38) 0%, rgba(79,70,229,0) 70%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 11,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.78)',
          border: '1px solid rgba(255,255,255,0.22)',
          borderRadius: dashboardTheme.radius.pill,
          padding: '5px 11px',
          marginBottom: 12,
          background: 'rgba(255,255,255,0.08)',
          width: 'fit-content',
        }}>
          SENNDIK Console
        </div>
        <div style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.4, marginBottom: 10 }}>
          {greeting}，欢迎回来 👋
        </div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.76)', lineHeight: 1.65, maxWidth: 900 }}>
          SENNDIK 内容管理中心已就绪。通过下方快捷入口可直达核心编辑区域，快速完成内容更新、产品维护与询盘处理。
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
          {quickActions.map((action) => (
            <a
              key={action.href}
              href={action.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 7,
                padding: '9px 14px',
                borderRadius: dashboardTheme.radius.pill,
                border: '1px solid rgba(255,255,255,0.24)',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
                textDecoration: 'none',
                fontSize: 12.5,
                fontWeight: 600,
                lineHeight: 1,
                transition: 'transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.24)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.16)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              }}
            >
              <span aria-hidden="true">{action.icon}</span>
              <span>{action.label}</span>
            </a>
          ))}
        </div>
      </div>
    </DashboardWidgetContainer>
  );
}
