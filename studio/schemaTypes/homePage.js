import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homePage',
  title: '首页',
  type: 'document',
  groups: [
    { name: 'hero', title: '首屏 Banner' },
    { name: 'content', title: '首页模块' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'heroSlides',
      title: '首页轮播图',
      type: 'array',
      group: 'hero',
      description:
        '至少添加 1 条且每条有配图后，前台首页轮播将使用此处数据；留空则沿用代码里的默认轮播。双按钮文案与链接取自下方「Hero / Banner」主/次按钮。',
      of: [{ type: 'heroCarouselSlide' }],
      validation: (r) => r.max(12),
    }),
    defineField({
      name: 'hero',
      title: 'Hero / Banner（推荐）',
      type: 'heroBanner',
      group: 'hero',
      description:
        '用于轮播「完整首屏文案区」时的双按钮；单屏兜底文案也可写在此处。下方旧字段仅兼容存量数据。',
    }),
    defineField({
      name: 'heroImage',
      title: '首屏背景图（旧版）',
      type: 'image',
      description:
        '与 Hero 组件一致：全宽 cover、约一屏高。建议 2400×1350 px（16∶9）或更大；重要视觉偏中下，避开顶栏。',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'heroTitle',
      title: '首屏主标题（旧版）',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      title: '首屏副标题（旧版）',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'trustBadge',
      title: '首屏认证角标（旧版）',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'featuredProducts',
      title: '首页精选产品',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      validation: (r) => r.max(12),
    }),
    defineField({
      name: 'faqSectionTitle',
      title: '首页 FAQ 区块标题',
      type: 'string',
      group: 'content',
      initialValue: '常见问题',
    }),
    defineField({
      name: 'ctaSection',
      title: '首页 CTA 区块',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'title', title: '标题', type: 'string' }),
        defineField({ name: 'subtitle', title: '副标题', type: 'text', rows: 2 }),
        defineField({ name: 'buttonLabel', title: '按钮文案', type: 'string' }),
        defineField({ name: 'buttonUrl', title: '按钮链接', type: 'string' }),
      ],
    }),
    defineField({
      name: 'sections',
      title: '扩展模块（预留）',
      type: 'array',
      group: 'content',
      description: '后续可接入更多自定义区块类型',
      of: [
        {
          type: 'object',
          name: 'homeRichSection',
          title: '富文本块',
          fields: [
            defineField({ name: 'heading', title: '小标题', type: 'string' }),
            defineField({ name: 'body', title: '正文', type: 'blockContent' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: '首页' }),
  },
});
