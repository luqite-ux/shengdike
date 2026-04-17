import { DashboardWidgetContainer } from '@sanity/dashboard';

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
        padding: '34px 30px',
        background:
          'radial-gradient(1200px 400px at 10% -50%, rgba(255,146,84,0.35), transparent 55%), linear-gradient(135deg, #0f172a 0%, #111827 45%, #1e1b4b 100%)',
        color: '#fff',
        borderRadius: 14,
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: '0 20px 40px rgba(2, 6, 23, 0.35)',
      }}>
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
                borderRadius: 999,
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
                e.currentTarget.style.boxShadow = '0 8px 18px rgba(0,0,0,0.24)';
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
