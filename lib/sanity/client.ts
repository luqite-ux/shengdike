import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01"

export const isSanityConfigured = Boolean(projectId && dataset)

/**
 * 全站数据读取客户端（用于 Server Components / Node）。
 * useCdn 关闭：避免 Sanity API CDN 层缓存导致「后台已发布，前台仍显示旧轮播/旧图」。
 * 浏览器内请勿用此实例高频直连（当前代码仅在服务端引用）。
 */
export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    })
  : null

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null

export function sanityImageUrl(source: unknown): string {
  if (!builder || !source) return ""
  return builder.image(source).width(1200).quality(85).url()
}

/** 首屏大图：更宽尺寸减轻放大模糊 */
export function sanityHeroImageUrl(source: unknown): string {
  if (!builder || !source) return ""
  return builder.image(source).width(2400).quality(88).url()
}

/** 正方形 PNG，用于 favicon / Apple 图标（裁剪居中） */
export function sanitySquarePngUrl(source: unknown, size: number): string {
  if (!builder || !source) return ""
  return builder.image(source).width(size).height(size).format("png").fit("crop").quality(90).url()
}

/** 页头 Logo：略加宽以适配高清屏 */
export function sanityLogoUrl(source: unknown): string {
  if (!builder || !source) return ""
  return builder.image(source).width(320).quality(92).url()
}
