import { CompanyProfileView } from "@/components/about/company-profile-view"
import { getCompanyProfilePagePayload } from "@/lib/sanity/company-profile-page"

const DEFAULT_INTRO_IMAGE = "/images/about/company-address.jpg"
const DEFAULT_HERO_BG = "/images/about/company-profile-hero.jpg"
const DEFAULT_FOUNDED_IMG = "/images/about/company-building-modern.jpg"

/** 配图来自 Sanity：避免整页被静态化后长期不刷新 */
export const dynamic = "force-dynamic"

export default async function CompanyProfilePage() {
  const p = await getCompanyProfilePagePayload()
  const introImageSrc = p.introImageSrc && p.introImageSrc.length > 0 ? p.introImageSrc : DEFAULT_INTRO_IMAGE
  const heroBackgroundSrc =
    p.heroBackgroundSrc && p.heroBackgroundSrc.length > 0 ? p.heroBackgroundSrc : DEFAULT_HERO_BG
  const foundedSectionSrc =
    p.foundedSectionSrc && p.foundedSectionSrc.length > 0 ? p.foundedSectionSrc : DEFAULT_FOUNDED_IMG

  return (
    <CompanyProfileView
      introImageSrc={introImageSrc}
      heroBackgroundSrc={heroBackgroundSrc}
      foundedSectionSrc={foundedSectionSrc}
    />
  )
}

