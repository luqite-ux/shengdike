import { defineField, defineType } from 'sanity';

/** 前台路由 /about/company-profile 的可编辑区块（单例文档 id：companyProfilePage） */
export default defineType({
  name: 'companyProfilePage',
  title: '公司简介页',
  type: 'document',
  groups: [
    { name: 'intro', title: '首段 · Company Profile' },
    { name: 'hero', title: '页头与其它配图' },
  ],
  fields: [
    defineField({
      name: 'introSectionImage',
      title: '左侧大图',
      type: 'image',
      options: { hotspot: true },
      group: 'intro',
      description: '首段双栏左侧展示图，建议横向高清（约 16∶9 或更宽），主体避开边缘裁切。',
    }),
    defineField({
      name: 'introSectionImageUrl',
      title: '左侧大图外链（可选）',
      type: 'url',
      group: 'intro',
      description: '填写完整 https 地址则优先于上方上传图。',
    }),
    defineField({
      name: 'pageHeroBackgroundImage',
      title: '页头 Hero 背景图',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'pageHeroBackgroundUrl',
      title: '页头 Hero 背景外链',
      type: 'url',
      group: 'hero',
      description: '优先于上传图；留空则用前台默认 company-profile-hero.jpg',
    }),
    defineField({
      name: 'foundedSectionImage',
      title: 'Founded 区块右侧大图',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'foundedSectionImageUrl',
      title: 'Founded 区块大图外链',
      type: 'url',
      group: 'hero',
      description: '优先于上传；留空则用默认 company-building-modern.jpg',
    }),
  ],
  preview: {
    prepare: () => ({ title: '公司简介页', subtitle: '/about/company-profile' }),
  },
});
