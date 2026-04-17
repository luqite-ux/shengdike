import { DashboardWidgetContainer } from '@sanity/dashboard';

export function WelcomeWidget() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? '上午好' : hour < 18 ? '下午好' : '晚上好';

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
          在这里管理产品、文章、FAQ 和询盘。左侧面板可直接编辑内容。
        </div>
      </div>
    </DashboardWidgetContainer>
  );
}
