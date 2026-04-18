import { appendUrlCacheBust } from "@/lib/sanity/cache-bust"
import { isSanityConfigured, sanityClient, sanityHeroImageUrl } from "@/lib/sanity/client"
import { getSanityWriteClient } from "@/lib/sanity/server-client"

const PROFILE_FIELDS = `
  _updatedAt,
  introSectionImage,
  introSectionImageUrl,
  pageHeroBackgroundImage,
  pageHeroBackgroundUrl,
  foundedSectionImage,
  foundedSectionImageUrl
`

const COMPANY_PROFILE_PUBLISHED = `*[_id == "companyProfilePage"][0]{ ${PROFILE_FIELDS} }`

const COMPANY_PROFILE_COALESCE = `coalesce(
  *[_id == "drafts.companyProfilePage"][0]{ ${PROFILE_FIELDS} },
  *[_id == "companyProfilePage"][0]{ ${PROFILE_FIELDS} }
)`

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

function countResolvedProfileImages(raw: {
  introSectionImageUrl?: string
  introSectionImage?: unknown
  pageHeroBackgroundUrl?: string
  pageHeroBackgroundImage?: unknown
  foundedSectionImageUrl?: string
  foundedSectionImage?: unknown
} | null): number {
  if (!raw) return 0
  let n = 0
  if (resolveUrl(raw.introSectionImageUrl, raw.introSectionImage)) n += 1
  if (resolveUrl(raw.pageHeroBackgroundUrl, raw.pageHeroBackgroundImage)) n += 1
  if (resolveUrl(raw.foundedSectionImageUrl, raw.foundedSectionImage)) n += 1
  return n
}

export type CompanyProfilePagePayload = {
  introImageSrc: string | null
  heroBackgroundSrc: string | null
  foundedSectionSrc: string | null
}

type RawCompanyProfile = {
  _updatedAt?: string
  introSectionImage?: unknown
  introSectionImageUrl?: string
  pageHeroBackgroundImage?: unknown
  pageHeroBackgroundUrl?: string
  foundedSectionImage?: unknown
  foundedSectionImageUrl?: string
} | null

async function fetchCompanyProfileRaw(): Promise<RawCompanyProfile> {
  const wc = getSanityWriteClient()
  let raw: RawCompanyProfile = null

  if (wc) {
    try {
      raw = await wc.fetch<RawCompanyProfile>(COMPANY_PROFILE_COALESCE)
    } catch (err) {
      console.error("[Sanity] company profile coalesce fetch failed, will try published only:", err)
    }
  }

  if (!raw || countResolvedProfileImages(raw) === 0) {
    try {
      const pub = await sanityClient.fetch<RawCompanyProfile>(COMPANY_PROFILE_PUBLISHED)
      if (pub && countResolvedProfileImages(pub) > 0) {
        raw = pub
      } else if (!raw) {
        raw = pub
      }
    } catch (err) {
      console.error("[Sanity] company profile published fetch failed:", err)
    }
  }

  return raw
}

export async function getCompanyProfilePagePayload(): Promise<CompanyProfilePagePayload> {
  const empty = { introImageSrc: null, heroBackgroundSrc: null, foundedSectionSrc: null }
  if (!isSanityConfigured || !sanityClient) return empty

  try {
    const raw = await fetchCompanyProfileRaw()
    if (!raw) return empty

    const bust = raw._updatedAt ?? ""

    const intro = resolveUrl(raw.introSectionImageUrl, raw.introSectionImage)
    const hero = resolveUrl(raw.pageHeroBackgroundUrl, raw.pageHeroBackgroundImage)
    const founded = resolveUrl(raw.foundedSectionImageUrl, raw.foundedSectionImage)

    return {
      introImageSrc: intro ? appendUrlCacheBust(intro, bust) : null,
      heroBackgroundSrc: hero ? appendUrlCacheBust(hero, bust) : null,
      foundedSectionSrc: founded ? appendUrlCacheBust(founded, bust) : null,
    }
  } catch (err) {
    console.error("[Sanity] getCompanyProfilePagePayload failed:", err)
    return empty
  }
}
