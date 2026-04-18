import { appendUrlCacheBust } from "@/lib/sanity/cache-bust"
import { isSanityConfigured, sanityClient, sanityHeroImageUrl } from "@/lib/sanity/client"
import { getSanityWriteClient } from "@/lib/sanity/server-client"

type HeroCta = {
  primaryCtaLabel?: string
  primaryCtaUrl?: string
  secondaryCtaLabel?: string
  secondaryCtaUrl?: string
}

type RawSlide = {
  _key: string
  title?: string
  subtitle?: string
  fullBleedCopy?: boolean
  backgroundImage?: unknown
  externalImageUrl?: string
}

export type HomeHeroSlide = {
  key: string
  image: string
  title: string
  subtitle: string
  /** 为 true 时显示渐变、主副标题与双按钮（按钮来自 Hero / Banner） */
  fullBleedCopy: boolean
}

export type HomeHeroPayload = {
  slides: HomeHeroSlide[]
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

const HERO_FIELDS = `
  _updatedAt,
  "hero": hero{
    primaryCtaLabel,
    primaryCtaUrl,
    secondaryCtaLabel,
    secondaryCtaUrl
  },
  "heroSlides": heroSlides[]{
    _key,
    title,
    subtitle,
    fullBleedCopy,
    backgroundImage,
    externalImageUrl
  }
`

const HOME_HERO_PUBLISHED = `*[_id == "homePage"][0]{ ${HERO_FIELDS} }`

const HOME_HERO_COALESCE = `coalesce(
  *[_id == "drafts.homePage"][0]{ ${HERO_FIELDS} },
  *[_id == "homePage"][0]{ ${HERO_FIELDS} }
)`

const DEFAULT_PRIMARY = { label: "+ Explore More", href: "/about/company-profile" }
const DEFAULT_SECONDARY = { label: "+ View Products", href: "/products" }

function resolveSlideImage(s: RawSlide): string {
  if (s.externalImageUrl) return s.externalImageUrl
  return sanityHeroImageUrl(s.backgroundImage)
}

function countSlidesWithResolvableImage(slides: RawSlide[] | null | undefined): number {
  if (!slides?.length) return 0
  let n = 0
  for (const s of slides) {
    if (resolveSlideImage(s)) n += 1
  }
  return n
}

type HomeHeroDoc = {
  _updatedAt?: string
  hero?: HeroCta | null
  heroSlides?: RawSlide[] | null
} | null

async function fetchHomeHeroDoc(): Promise<HomeHeroDoc> {
  const wc = getSanityWriteClient()
  let doc: HomeHeroDoc = null

  if (wc) {
    try {
      doc = await wc.fetch<HomeHeroDoc>(HOME_HERO_COALESCE)
    } catch (err) {
      console.error("[Sanity] home hero coalesce fetch failed, will try published only:", err)
    }
  }

  if (!doc || countSlidesWithResolvableImage(doc.heroSlides) === 0) {
    try {
      const pub = await sanityClient.fetch<HomeHeroDoc>(HOME_HERO_PUBLISHED)
      if (pub && countSlidesWithResolvableImage(pub.heroSlides) > 0) {
        doc = pub
      } else if (!doc) {
        doc = pub
      }
    } catch (err) {
      console.error("[Sanity] home hero published fetch failed:", err)
    }
  }

  return doc
}

export async function getHomeHeroPayload(): Promise<HomeHeroPayload | null> {
  if (!isSanityConfigured || !sanityClient) return null

  try {
    const doc = await fetchHomeHeroDoc()

    const rawSlides = doc?.heroSlides?.filter(Boolean) ?? []
    const bustKey = doc?._updatedAt ?? ""
    const slides: HomeHeroSlide[] = []

    for (const s of rawSlides) {
      const image = resolveSlideImage(s)
      if (!image) continue
      slides.push({
        key: s._key,
        image: appendUrlCacheBust(image, bustKey || s._key),
        title: s.title ?? "",
        subtitle: s.subtitle ?? "",
        fullBleedCopy: Boolean(s.fullBleedCopy),
      })
    }

    const h = doc?.hero
    const primaryCta = {
      label: h?.primaryCtaLabel?.trim() || DEFAULT_PRIMARY.label,
      href: h?.primaryCtaUrl?.trim() || DEFAULT_PRIMARY.href,
    }
    const secondaryCta = {
      label: h?.secondaryCtaLabel?.trim() || DEFAULT_SECONDARY.label,
      href: h?.secondaryCtaUrl?.trim() || DEFAULT_SECONDARY.href,
    }

    if (slides.length === 0) return null

    return { slides, primaryCta, secondaryCta }
  } catch (err) {
    console.error("[Sanity] getHomeHeroPayload failed:", err)
    return null
  }
}
