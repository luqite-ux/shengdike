export type SenndikHeroSlide = {
  key: string
  image: string
  mobileImage?: string
  title: string
  subtitle: string
  fullBleedCopy?: boolean
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

export const SENNDIK_HERO_SLIDE: SenndikHeroSlide = {
  key: "senndik-engineered-control",
  image: "/banners/senndik-relay-desktop.webp",
  mobileImage: "/banners/senndik-relay-mobile.webp",
  title: "Engineered for Reliable Industrial Control",
  subtitle: "Solid state relays and power control components built for precise switching and dependable integration.",
  fullBleedCopy: true,
  primaryCta: { label: "Explore Products", href: "/products" },
  secondaryCta: { label: "Request a Quote", href: "/support" },
}

export function getHeroSlides(cmsSlides?: SenndikHeroSlide[]): SenndikHeroSlide[] {
  if (!cmsSlides?.length) return [SENNDIK_HERO_SLIDE]
  return [
    SENNDIK_HERO_SLIDE,
    ...cmsSlides.filter(
      (slide) => slide.key !== SENNDIK_HERO_SLIDE.key && slide.image !== SENNDIK_HERO_SLIDE.image,
    ),
  ]
}
