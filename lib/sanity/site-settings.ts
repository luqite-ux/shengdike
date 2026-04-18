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

  favicon?: unknown

  logo?: unknown

}



const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{

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



    const faviconUrl = raw.favicon ? sanitySquarePngUrl(raw.favicon, 32) : ""

    const appleTouchIconUrl = raw.favicon ? sanitySquarePngUrl(raw.favicon, 180) : ""

    const logoUrl = raw.logo ? sanityLogoUrl(raw.logo) : ""



    const { favicon: _f, logo: _l, ...rest } = raw

    return {

      ...rest,

      ...(faviconUrl ? { faviconUrl, appleTouchIconUrl: appleTouchIconUrl || faviconUrl } : {}),

      ...(logoUrl ? { logoUrl } : {}),

    }

  } catch {

    return null

  }

}

