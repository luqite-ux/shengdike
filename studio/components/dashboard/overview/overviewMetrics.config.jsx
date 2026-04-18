import { Bell, Inbox, Package, Tags } from 'lucide-react';

/** @typedef {{ key: string, label: string, note: string, structureId: string, Icon: import('lucide-react').LucideIcon, attentionWhenPositive?: boolean }} OverviewMetricDef */

/** @type {OverviewMetricDef[]} */
export const OVERVIEW_METRICS = [
  {
    key: 'products',
    label: '产品总数',
    note: '在售产品清单',
    structureId: 'itemProducts',
    Icon: Package,
  },
  {
    key: 'categories',
    label: '分类数量',
    note: '分类体系结构',
    structureId: 'itemProductCategories',
    Icon: Tags,
  },
  {
    key: 'inquiriesTotal',
    label: '询盘总数',
    note: '历史累计线索',
    structureId: 'itemInquiries',
    Icon: Inbox,
  },
  {
    key: 'inquiriesNew',
    label: '待处理',
    note: '需要优先跟进',
    structureId: 'itemInquiries',
    Icon: Bell,
    attentionWhenPositive: true,
  },
];
