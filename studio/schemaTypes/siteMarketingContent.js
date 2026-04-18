import { defineField, defineType } from 'sanity';

const statPairFields = [
  defineField({ name: 'value', title: '数值', type: 'string' }),
  defineField({ name: 'label', title: '标签', type: 'string' }),
];

const strategyCardFields = [
  defineField({ name: 'title', title: '标题', type: 'string' }),
  defineField({ name: 'description', title: '描述', type: 'text', rows: 2 }),
];

const newsItemFields = [
  defineField({ name: 'title', title: '标题', type: 'string' }),
  defineField({ name: 'date', title: '日期', type: 'string' }),
  defineField({
    name: 'image',
    title: '配图（上传）',
    type: 'image',
    options: { hotspot: true },
  }),
  defineField({
    name: 'imageUrl',
    title: '或外链 URL（填写则优先于上传）',
    type: 'url',
  }),
  defineField({ name: 'href', title: '链接', type: 'string' }),
];

const factFields = [
  defineField({ name: 'value', title: '数字', type: 'number' }),
  defineField({ name: 'suffix', title: '后缀', type: 'string' }),
  defineField({ name: 'label', title: '单位行', type: 'string' }),
  defineField({ name: 'description', title: '说明', type: 'string' }),
];

const industryFields = [
  defineField({ name: 'id', title: '锚点 ID（如 home-appliances）', type: 'string' }),
  defineField({ name: 'title', title: '标题', type: 'string' }),
  defineField({ name: 'description', title: '描述', type: 'text', rows: 3 }),
  defineField({
    name: 'image',
    title: '配图（上传）',
    type: 'image',
    options: { hotspot: true },
  }),
  defineField({ name: 'imageUrl', title: '或外链 URL（优先于上传）', type: 'url' }),
  defineField({
    name: 'position',
    title: '大图在右/左',
    type: 'string',
    options: { list: ['left', 'right'] },
  }),
];

const careCardFields = [
  defineField({ name: 'title', title: '标题', type: 'string' }),
  defineField({
    name: 'image',
    title: '配图（上传）',
    type: 'image',
    options: { hotspot: true },
  }),
  defineField({ name: 'imageUrl', title: '或外链 URL（优先于上传）', type: 'url' }),
  defineField({ name: 'points', title: '要点（多条）', type: 'array', of: [{ type: 'string' }] }),
];

const manufacturingStepFields = [
  defineField({ name: 'number', title: '序号', type: 'string' }),
  defineField({ name: 'title', title: '标题', type: 'string' }),
  defineField({ name: 'description', title: '正文', type: 'text', rows: 4 }),
  defineField({
    name: 'image',
    title: '配图（上传）',
    type: 'image',
    options: { hotspot: true },
  }),
  defineField({ name: 'imageUrl', title: '或外链 URL（优先于上传）', type: 'url' }),
];

const honorYearFields = [
  defineField({ name: 'year', title: '年份', type: 'string' }),
  defineField({ name: 'items', title: '条目', type: 'array', of: [{ type: 'string' }] }),
];

/** 全站固定区块的图文；未填字段前台使用代码内默认值 */
export default defineType({
  name: 'siteMarketingContent',
  title: '全站营销图文',
  type: 'document',
  groups: [
    { name: 'home', title: '首页' },
    { name: 'solutions', title: 'Solutions' },
    { name: 'rnd', title: '研发与创新' },
    { name: 'support', title: 'Support' },
    { name: 'products', title: '产品列表' },
    { name: 'cultural', title: '文化理念' },
    { name: 'strength', title: '公司实力' },
    { name: 'sustainability', title: '可持续' },
  ],
  fields: [
    defineField({
      name: 'homeAbout',
      title: '首页 · About 区块',
      type: 'object',
      group: 'home',
      fields: [
        defineField({
          name: 'leftImage',
          title: '左侧大图（上传）',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'leftImageUrl', title: '或左侧大图 URL（优先于上传）', type: 'url' }),
        defineField({ name: 'overlayTitle', title: '叠字标题', type: 'string' }),
        defineField({ name: 'body', title: '正文', type: 'text', rows: 5 }),
        defineField({
          name: 'stats',
          title: '四宫格数据',
          type: 'array',
          of: [{ type: 'object', name: 'homeStat', fields: statPairFields }],
          validation: (r) => r.max(4),
        }),
        defineField({ name: 'ctaLabel', title: '按钮', type: 'string' }),
        defineField({ name: 'ctaHref', title: '按钮链接', type: 'string' }),
      ],
    }),
    defineField({
      name: 'homeStrategy',
      title: '首页 · Competitive Strategy',
      type: 'object',
      group: 'home',
      fields: [
        defineField({ name: 'sectionTitle', title: '区块标题', type: 'string' }),
        defineField({ name: 'sectionSubtitle', title: '副标题', type: 'text', rows: 2 }),
        defineField({
          name: 'cards',
          title: '六宫格（顺序固定，图标仍用前台）',
          type: 'array',
          of: [{ type: 'object', name: 'strategyCard', fields: strategyCardFields }],
          validation: (r) => r.max(6),
        }),
      ],
    }),
    defineField({
      name: 'homeFacts',
      title: '首页 · Facts & Figures',
      type: 'object',
      group: 'home',
      fields: [
        defineField({
          name: 'backgroundImage',
          title: '背景图（上传）',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'backgroundUrl', title: '或背景图 URL（优先于上传）', type: 'url' }),
        defineField({ name: 'sectionTitle', title: '标题', type: 'string' }),
        defineField({ name: 'sectionSubtitle', title: '副标题', type: 'string' }),
        defineField({ name: 'watermark', title: '背景大字', type: 'string' }),
        defineField({
          name: 'facts',
          title: '数据列',
          type: 'array',
          of: [{ type: 'object', name: 'factItem', fields: factFields }],
          validation: (r) => r.max(8),
        }),
      ],
    }),
    defineField({
      name: 'homeNews',
      title: '首页 · News',
      type: 'object',
      group: 'home',
      fields: [
        defineField({ name: 'sectionTitle', title: '标题', type: 'string' }),
        defineField({
          name: 'items',
          title: '新闻卡片',
          type: 'array',
          of: [{ type: 'object', name: 'newsItem', fields: newsItemFields }],
          validation: (r) => r.max(9),
        }),
      ],
    }),
    defineField({
      name: 'solutions',
      title: 'Solutions 页',
      type: 'object',
      group: 'solutions',
      fields: [
        defineField({ name: 'heroTitle', title: 'Hero 主标题', type: 'string' }),
        defineField({ name: 'heroSubtitle', title: 'Hero 副标题', type: 'string' }),
        defineField({
          name: 'heroBackgroundImage',
          title: 'Hero 背景（上传）',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'heroBackgroundUrl', title: '或 Hero 背景 URL（优先于上传）', type: 'url' }),
        defineField({ name: 'introTitle', title: 'About Our Solution 标题', type: 'string' }),
        defineField({ name: 'introBody', title: 'About 正文', type: 'text', rows: 5 }),
        defineField({
          name: 'industries',
          title: '行业分块',
          type: 'array',
          of: [{ type: 'object', name: 'industryBlock', fields: industryFields }],
          validation: (r) => r.max(10),
        }),
      ],
    }),
    defineField({
      name: 'rnd',
      title: 'R&D 与创新页',
      type: 'object',
      group: 'rnd',
      fields: [
        defineField({ name: 'heroTitle', title: 'Hero 主标题', type: 'string' }),
        defineField({
          name: 'heroBackgroundImage',
          title: 'Hero 背景（上传）',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'heroBackgroundUrl', title: '或 Hero 背景 URL（优先于上传）', type: 'url' }),
        defineField({ name: 'pageSectionTitle', title: '页中总标题', type: 'string' }),
        defineField({ name: 'strategyTitle', title: '战略块标题', type: 'string' }),
        defineField({ name: 'strategyLead', title: '战略块副标题', type: 'string' }),
        defineField({ name: 'strategyBullets', title: '战略要点（多条）', type: 'array', of: [{ type: 'string' }] }),
        defineField({
          name: 'strategyImage',
          title: '战略配图（上传）',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'strategyImageUrl', title: '或战略配图 URL（优先于上传）', type: 'url' }),
        defineField({
          name: 'ipdMeetingImage',
          title: 'IPD 会议图（上传）',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'ipdMeetingImageUrl', title: '或 IPD 会议图 URL（优先于上传）', type: 'url' }),
        defineField({ name: 'ipdTitle', title: 'IPD 标题', type: 'string' }),
        defineField({ name: 'ipdLead', title: 'IPD 导语', type: 'text', rows: 3 }),
        defineField({
          name: 'ipdDiagram',
          title: 'IPD 示意图（上传）',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'ipdDiagramUrl', title: '或 IPD 示意图 URL（优先于上传）', type: 'url' }),
        defineField({ name: 'patentsTitle', title: '专利块标题', type: 'string' }),
        defineField({ name: 'patentsLead', title: '专利块副标题', type: 'string' }),
        defineField({ name: 'patentsTotal', title: '专利总数', type: 'number' }),
        defineField({ name: 'patentsInvention', title: '发明专利数', type: 'number' }),
        defineField({ name: 'patentsUtility', title: '实用新型数', type: 'number' }),
        defineField({
          name: 'patentsImage',
          title: '专利配图（上传）',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'patentsImageUrl', title: '或专利配图 URL（优先于上传）', type: 'url' }),
        defineField({ name: 'honorTitle', title: '荣誉标题', type: 'string' }),
        defineField({ name: 'honorLead', title: '荣誉副标题', type: 'string' }),
        defineField({
          name: 'honorImage',
          title: '荣誉配图（上传）',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'honorImageUrl', title: '或荣誉配图 URL（优先于上传）', type: 'url' }),
        defineField({
          name: 'honorYears',
          title: '荣誉年份列表',
          type: 'array',
          of: [{ type: 'object', name: 'honorYear', fields: honorYearFields }],
        }),
      ],
    }),
    defineField({
      name: 'supportTop',
      title: 'Support 页顶图',
      type: 'object',
      group: 'support',
      fields: [
        defineField({
          name: 'heroImage',
          title: 'Hero 图（上传）',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'heroImageUrl', title: '或 Hero 图 URL（优先于上传）', type: 'url' }),
      ],
    }),
    defineField({
      name: 'productsList',
      title: '产品列表页 Hero',
      type: 'object',
      group: 'products',
      fields: [
        defineField({
          name: 'heroBackgroundImage',
          title: '背景图（上传）',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'heroBackgroundUrl', title: '或背景图 URL（优先于上传）', type: 'url' }),
      ],
    }),
    defineField({
      name: 'culturalConcept',
      title: '文化理念页',
      type: 'object',
      group: 'cultural',
      fields: [
        defineField({
          name: 'heroBackgroundImage',
          title: 'Hero 背景（上传）',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'heroBackgroundUrl', title: '或 Hero 背景 URL（优先于上传）', type: 'url' }),
        defineField({ name: 'valuesIntroTitle', title: '价值观区标题', type: 'string' }),
        defineField({ name: 'valuesIntroBody', title: '价值观区引言', type: 'text', rows: 4 }),
        defineField({
          name: 'careCards',
          title: '三张 CARE 卡',
          type: 'array',
          of: [{ type: 'object', name: 'careCard', fields: careCardFields }],
          validation: (r) => r.max(5),
        }),
        defineField({
          name: 'futureBackgroundImage',
          title: 'Future 区背景（上传）',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'futureBackgroundUrl', title: '或 Future 区背景 URL（优先于上传）', type: 'url' }),
        defineField({ name: 'futureWatermark', title: '背景水印字', type: 'string' }),
        defineField({ name: 'futureTitle', title: 'Future 标题', type: 'string' }),
        defineField({ name: 'futureBody', title: 'Future 正文（可用空行分段）', type: 'text', rows: 6 }),
      ],
    }),
    defineField({
      name: 'companyStrength',
      title: '公司实力页',
      type: 'object',
      group: 'strength',
      fields: [
        defineField({
          name: 'heroBackgroundImage',
          title: 'Hero 背景（上传）',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'heroBackgroundUrl', title: '或 Hero 背景 URL（优先于上传）', type: 'url' }),
        defineField({ name: 'tabTitles', title: '顶部三 Tab 标题', type: 'array', of: [{ type: 'string' }], validation: (r) => r.max(5) }),
        defineField({ name: 'introLeftLines', title: '左侧介绍（多行）', type: 'array', of: [{ type: 'string' }] }),
        defineField({
          name: 'introRightImage',
          title: '右侧产线图（上传）',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'introRightImageUrl', title: '或右侧产线图 URL（优先于上传）', type: 'url' }),
        defineField({ name: 'introRightLines', title: '右侧列表（多行）', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'manufacturingHeading', title: '制造区大标题上一行', type: 'string' }),
        defineField({ name: 'manufacturingSubheading', title: '制造区橙色副标题', type: 'string' }),
        defineField({
          name: 'steps',
          title: '制造步骤',
          type: 'array',
          of: [{ type: 'object', name: 'mfgStep', fields: manufacturingStepFields }],
          validation: (r) => r.max(15),
        }),
      ],
    }),
    defineField({
      name: 'corporateSustainability',
      title: '可持续页',
      type: 'object',
      group: 'sustainability',
      fields: [
        defineField({
          name: 'heroBackgroundImage',
          title: 'Hero 背景（上传）',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'heroBackgroundUrl', title: '或 Hero 背景 URL（优先于上传）', type: 'url' }),
        defineField({ name: 'contentTitle', title: '内容区主标题', type: 'string' }),
        defineField({ name: 'quoteParagraphs', title: '引用段落（多条）', type: 'array', of: [{ type: 'text', rows: 3 }] }),
        defineField({ name: 'ceoCaption', title: 'CEO 说明', type: 'string' }),
        defineField({ name: 'ceoName', title: 'CEO 署名', type: 'string' }),
        defineField({
          name: 'ceoImage',
          title: 'CEO 图（上传）',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'ceoImageUrl', title: '或 CEO 图 URL（优先于上传）', type: 'url' }),
        defineField({ name: 'bottomTitle', title: '底部横幅标题', type: 'string' }),
        defineField({
          name: 'bottomBackgroundImage',
          title: '底部横幅背景（上传）',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'bottomBackgroundUrl', title: '或底部横幅背景 URL（优先于上传）', type: 'url' }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: '全站营销图文' }) },
});
