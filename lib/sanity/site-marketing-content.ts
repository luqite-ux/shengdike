import { isSanityConfigured, sanityClient } from "@/lib/sanity/client"
import { normalizeSiteMarketingFromSanity } from "@/lib/sanity/site-marketing-from-sanity"
import { mergeSiteMarketing } from "@/lib/sanity/site-marketing-merge"
import type { SiteMarketingData } from "@/lib/site-marketing-types"

/** 含各区块内「上传图」字段，供 normalize 合并为 URL 字符串 */
const SITE_MARKETING_QUERY = `*[_id == "siteMarketingContent"][0]{
  homeAbout{
    leftImageUrl, leftImage,
    overlayTitle, body,
    stats[]{value, label},
    ctaLabel, ctaHref
  },
  homeStrategy{
    sectionTitle, sectionSubtitle,
    cards[]{title, description}
  },
  homeFacts{
    backgroundUrl, backgroundImage,
    sectionTitle, sectionSubtitle, watermark,
    facts[]{value, suffix, label, description}
  },
  homeNews{
    sectionTitle,
    items[]{ title, date, imageUrl, href, image }
  },
  solutions{
    heroTitle, heroSubtitle,
    heroBackgroundUrl, heroBackgroundImage,
    introTitle, introBody,
    industries[]{ id, title, description, imageUrl, position, image }
  },
  rnd{
    heroTitle, heroBackgroundUrl, heroBackgroundImage,
    pageSectionTitle,
    strategyTitle, strategyLead, strategyBullets,
    strategyImageUrl, strategyImage,
    ipdMeetingImageUrl, ipdMeetingImage,
    ipdTitle, ipdLead,
    ipdDiagramUrl, ipdDiagram,
    patentsTitle, patentsLead,
    patentsTotal, patentsInvention, patentsUtility,
    patentsImageUrl, patentsImage,
    honorTitle, honorLead,
    honorImageUrl, honorImage,
    honorGallery[]{imageUrl, image},
    honorYears[]{ year, items }
  },
  supportTop{ heroImageUrl, heroImage },
  productsList{ heroBackgroundUrl, heroBackgroundImage },
  culturalConcept{
    heroBackgroundUrl, heroBackgroundImage,
    valuesIntroTitle, valuesIntroBody,
    careCards[]{ title, imageUrl, image, points },
    futureBackgroundUrl, futureBackgroundImage,
    futureWatermark, futureTitle, futureBody
  },
  companyStrength{
    heroBackgroundUrl, heroBackgroundImage,
    tabTitles, introLeftLines,
    introRightImageUrl, introRightImage,
    introRightLines,
    manufacturingHeading, manufacturingSubheading,
    steps[]{ number, title, description, imageUrl, image }
  },
  corporateSustainability{
    heroBackgroundUrl, heroBackgroundImage,
    contentTitle, quoteParagraphs,
    ceoCaption, ceoName,
    ceoImageUrl, ceoImage,
    bottomTitle,
    bottomBackgroundUrl, bottomBackgroundImage
  }
}`

export async function getSiteMarketingContent(): Promise<SiteMarketingData> {
  if (!isSanityConfigured || !sanityClient) {
    return mergeSiteMarketing(null)
  }
  try {
    const doc = await sanityClient.fetch<unknown>(SITE_MARKETING_QUERY)
    const normalized = normalizeSiteMarketingFromSanity(doc)
    return mergeSiteMarketing(normalized)
  } catch {
    return mergeSiteMarketing(null)
  }
}
