import { defineField, defineType } from 'sanity';

/** 首页轮播单张（配图 + 可选叠字与按钮区） */
export default defineType({
  name: 'heroCarouselSlide',
  title: '轮播幻灯片',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundImage',
      title: '配图（上传）',
      type: 'image',
      options: { hotspot: true },
      description: '建议横向大图约 2400×1350 px；与首屏一致为全宽 cover。',
    }),
    defineField({
      name: 'externalImageUrl',
      title: '或外链图片 URL',
      type: 'url',
      description: '填写则优先于上传图（便于沿用现网图床地址）。',
    }),
    defineField({
      name: 'title',
      title: '叠字主标题',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: '叠字副标题',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'fullBleedCopy',
      title: '完整首屏文案区',
      type: 'boolean',
      description:
        '开启后：显示左侧渐变、主副标题与双按钮；按钮文案与链接取自首页「Hero / Banner」里的主/次按钮（未填则用前台默认）。',
      initialValue: false,
    }),
  ],
  validation: (Rule) =>
    Rule.custom((fields) => {
      if (!fields) return true;
      const hasUpload = Boolean(fields.backgroundImage?.asset);
      const hasUrl = Boolean(fields.externalImageUrl);
      if (!hasUpload && !hasUrl) return '请上传配图或填写外链图片 URL';
      return true;
    }),
  preview: {
    select: { title: 'title', media: 'backgroundImage', ext: 'externalImageUrl' },
    prepare({ title, media, ext }) {
      return {
        title: title || '（无标题）',
        subtitle: ext ? '外链图' : undefined,
        media,
      };
    },
  },
});
