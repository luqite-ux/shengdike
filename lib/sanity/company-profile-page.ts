import { isSanityConfigured, sanityClient, sanityHeroImageUrl } from "@/lib/sanity/client"
import { getSanityWriteClient } from "@/lib/sanity/server-client"

const COMPANY_PROFILE_PAGE_QUERY = `coalesce(
  *[_id == "drafts.companyProfilePage"][0],
  *[_id == "companyProfilePage"][0]
){
  introSectionImage,
  introSectionImageUrl,
  pageHeroBackgroundImage,
  pageHeroBackgroundUrl,
  foundedSectionImage,
  foundedSectionImageUrl
}`

function resolveUrl(external?: string | null, image?: unknown): string | null {
  if (typeof external === "string") {
    const t = external.trim()
    if (t.startsWith("/")) return t
    if (/^https?:\/\//i.test(t)) return t
  }
  if (image) {
    const u = sanityHeroImageUrl(image)
    return u.length > 0 ? u : null
  }
  return null
}

export type CompanyProfilePagePayload = {
  introImageSrc: string | null
  heroBackgroundSrc: string | null
  foundedSectionSrc: string | null
}

export async function getCompanyProfilePagePayload(): Promise<CompanyProfilePagePayload> {
  const empty = { introImageSrc: null, heroBackgroundSrc: null, foundedSectionSrc: null }
  if (!isSanityConfigured || !sanityClient) return empty

  try {
    const client = getSanityWriteClient() ?? sanityClient
    const raw = await client.fetch<{
      introSectionImage?: unknown
      introSectionImageUrl?: string
      pageHeroBackgroundImage?: unknown
      pageHeroBackgroundUrl?: string
      foundedSectionImage?: unknown
      foundedSectionImageUrl?: string
    } | null>(COMPANY_PROFILE_PAGE_QUERY)

    if (!raw) return empty

    return {
      introImageSrc: resolveUrl(raw.introSectionImageUrl, raw.introSectionImage),
      heroBackgroundSrc: resolveUrl(raw.pageHeroBackgroundUrl, raw.pageHeroBackgroundImage),
      foundedSectionSrc: resolveUrl(raw.foundedSectionImageUrl, raw.foundedSectionImage),
    }
  } catch {
    return empty
  }
}
