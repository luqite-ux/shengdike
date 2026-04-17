export const dashboardTheme = {
  colors: {
    bgSoft: '#f8fafc',
    bgCard: '#ffffff',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#94a3b8',
    border: '#e2e8f0',
    borderSoft: '#edf2f7',
    brand: '#4f46e5',
    accent: '#f97316',
  },
  radius: {
    lg: 14,
    xl: 16,
    pill: 999,
  },
  shadow: {
    soft: '0 8px 18px rgba(15, 23, 42, 0.07)',
    mid: '0 14px 24px rgba(15, 23, 42, 0.12)',
    heavy: '0 24px 48px rgba(2, 6, 23, 0.35)',
  },
};

export function addCardHover(e) {
  e.currentTarget.style.transform = 'translateY(-2px)';
  e.currentTarget.style.boxShadow = dashboardTheme.shadow.mid;
}

export function removeCardHover(e) {
  e.currentTarget.style.transform = 'none';
  e.currentTarget.style.boxShadow = 'none';
}
