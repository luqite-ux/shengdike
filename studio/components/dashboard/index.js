import { WelcomeWidget } from './WelcomeWidget.jsx';
import { OverviewWidget } from './OverviewWidget.jsx';
import { RecentInquiriesWidget } from './RecentInquiriesWidget.jsx';
import { RecentEditsWidget } from './RecentEditsWidget.jsx';

export function welcomeWidget() {
  return { name: 'senndik-welcome', component: WelcomeWidget, layout: { width: 'full' } };
}
export function overviewWidget() {
  return { name: 'senndik-overview', component: OverviewWidget, layout: { width: 'medium' } };
}
export function recentInquiriesWidget() {
  return { name: 'senndik-inquiries', component: RecentInquiriesWidget, layout: { width: 'medium' } };
}
export function recentEditsWidget() {
  return { name: 'senndik-edits', component: RecentEditsWidget, layout: { width: 'medium' } };
}
