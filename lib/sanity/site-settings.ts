import { isSanityConfigured, sanityClient } from "@/lib/sanity/client"

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
}

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  title,
  contactPhone,
  contactWhatsapp,
  contactEmail,
  address,
  footerCopyright,
  "mainNavigation": coalesce(mainNavigation[]{label, href, openInNewTab}, [])
}`

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!isSanityConfigured || !sanityClient) return null

  try {
    const settings = await sanityClient.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY)
    return settings
  } catch {
    return null
  }
}
