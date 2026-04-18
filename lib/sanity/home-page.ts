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

const HOME_HERO_QUERY = `coalesce(
  *[_id == "drafts.homePage"][0],
  *[_id == "homePage"][0]
){
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
}`

const DEFAULT_PRIMARY = { label: "+ Explore More", href: "/about/company-profile" }
const DEFAULT_SECONDARY = { label: "+ View Products", href: "/products" }

function resolveSlideImage(s: RawSlide): string {
  if (s.externalImageUrl) return s.externalImageUrl
  return sanityHeroImageUrl(s.backgroundImage)
}

export async function getHomeHeroPayload(): Promise<HomeHeroPayload | null> {
  if (!isSanityConfigured || !sanityClient) return null

  try {
    const client = getSanityWriteClient() ?? sanityClient
    const doc = await client.fetch<{
      hero?: HeroCta | null
      heroSlides?: RawSlide[] | null
    } | null>(HOME_HERO_QUERY)

    const rawSlides = doc?.heroSlides?.filter(Boolean) ?? []
    const slides: HomeHeroSlide[] = []

    for (const s of rawSlides) {
      const image = resolveSlideImage(s)
      if (!image) continue
      slides.push({
        key: s._key,
        image,
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
  } catch {
    return null
  }
}
