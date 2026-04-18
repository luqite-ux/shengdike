import { isSanityConfigured, sanityClient, sanityLogoUrl, sanitySquarePngUrl } from "@/lib/sanity/client"



export type SiteNavItem = {

  label: string

  href: string

  openInNewTab?: boolean

}



export type SiteSettings = {

  title?: string

  contactPhone?: string

  contactWhatsapp?: string

  contactEmail?: string

  address?: string

  footerCopyright?: string

  mainNavigation?: SiteNavItem[]

  /** 由站点设置「Favicon」生成，供 layout metadata 使用 */

  faviconUrl?: string

  appleTouchIconUrl?: string

  /** 由站点设置「Logo」上传图生成 */

  logoUrl?: string

}



type RawSiteSettingsDoc = Omit<SiteSettings, "faviconUrl" | "appleTouchIconUrl" | "logoUrl"> & {

  _updatedAt?: string

  favicon?: unknown

  logo?: unknown

}

/** 避免浏览器长期缓存同一 favicon/logo URL（换图后地址不变时尤其明显） */
function withIconCacheBust(url: string, versionKey: string | undefined): string {
  if (!url || !versionKey) return url
  const v = encodeURIComponent(versionKey)
  return url.includes("?") ? `${url}&v=${v}` : `${url}?v=${v}`
}



const SITE_SETTINGS_QUERY = `*[_id == "siteSettings"][0]{

  _updatedAt,

  title,

  contactPhone,

  contactWhatsapp,

  contactEmail,

  address,

  footerCopyright,

  "mainNavigation": coalesce(mainNavigation[]{label, href, openInNewTab}, []),

  favicon,

  logo

}`



export async function getSiteSettings(): Promise<SiteSettings | null> {

  if (!isSanityConfigured || !sanityClient) return null



  try {

    const raw = await sanityClient.fetch<RawSiteSettingsDoc | null>(SITE_SETTINGS_QUERY)

    if (!raw) return null



    const bustKey = raw._updatedAt

    const faviconUrl = raw.favicon ? withIconCacheBust(sanitySquarePngUrl(raw.favicon, 32), bustKey) : ""

    const appleTouchIconUrl = raw.favicon ? withIconCacheBust(sanitySquarePngUrl(raw.favicon, 180), bustKey) : ""

    const logoUrl = raw.logo ? withIconCacheBust(sanityLogoUrl(raw.logo), bustKey) : ""



    const { favicon: _f, logo: _l, _updatedAt: _u, ...rest } = raw

    return {

      ...rest,

      ...(faviconUrl ? { faviconUrl, appleTouchIconUrl: appleTouchIconUrl || faviconUrl } : {}),

      ...(logoUrl ? { logoUrl } : {}),

    }

  } catch {

    return null

  }

}

