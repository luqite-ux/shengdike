import { DashboardWidgetContainer } from '@sanity/dashboard';

export function WelcomeWidget() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? '上午好' : hour < 18 ? '下午好' : '晚上好';
  const quickActions = [
    { label: '编辑首页', href: '/structure/itemHomePage' },
    { label: '编辑品牌探索页', href: '/structure/itemAboutPage' },
    { label: '编辑站点设置', href: '/structure/itemSiteSettings' },
    { label: '编辑产品分类', href: '/structure/itemProductCategories' },
    { label: '编辑产品', href: '/structure/itemProducts' },
    { label: '查看询盘', href: '/structure/itemInquiries' },
  ];

  return (
    <DashboardWidgetContainer>
      <div style={{
        padding: '32px 28px',
        background: 'linear-gradient(135deg, #111 0%, #1a1a2e 100%)',
        color: '#fff',
        borderRadius: 0,
      }}>
        <div style={{ fontSize: 26, fontWeight: 300, lineHeight: 1.4, marginBottom: 8 }}>
          {greeting}，欢迎回来 👋
        </div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
          在这里管理网站内容与询盘。可使用下方快捷按钮直接进入对应编辑页。
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
          {quickActions.map((action) => (
            <a
              key={action.href}
              href={action.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.22)',
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                textDecoration: 'none',
                fontSize: 12,
                lineHeight: 1,
              }}
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </DashboardWidgetContainer>
  );
}
