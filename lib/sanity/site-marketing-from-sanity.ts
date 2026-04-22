import { sanityHeroImageUrl, sanityImageUrl } from "@/lib/sanity/client"
import type { SiteMarketingData } from "@/lib/site-marketing-types"

function trimStr(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined
  const t = v.trim()
  return t.length ? t : undefined
}

/** 外链或站内路径优先，否则用 Sanity 上传图（大图） */
function resolveHeroMedia(external: unknown, image: unknown): string | undefined {
  const ex = trimStr(external)
  if (ex && (/^https?:\/\//i.test(ex) || ex.startsWith("/"))) return ex
  const u = sanityHeroImageUrl(image)
  return u.length ? u : undefined
}

/** 示意图等：略小宽度即可 */
function resolveDiagramMedia(external: unknown, image: unknown): string | undefined {
  const ex = trimStr(external)
  if (ex && (/^https?:\/\//i.test(ex) || ex.startsWith("/"))) return ex
  const u = sanityImageUrl(image)
  return u.length ? u : undefined
}

/**
 * 将 Sanity 拉取的「全站营销图文」原始文档转为 mergeSiteMarketing 可用的 patch：
 * 把各 object 内的 image + *Url 合并为与前台类型一致的字符串 URL。
 */
export function normalizeSiteMarketingFromSanity(raw: unknown): Partial<SiteMarketingData> {
  if (!raw || typeof raw !== "object") return {}
  const r = raw as Record<string, unknown>
  const out: Partial<SiteMarketingData> = {}

  const ha = r.homeAbout
  if (ha && typeof ha === "object") {
    const o = ha as Record<string, unknown>
    const leftImageUrl = resolveHeroMedia(o.leftImageUrl, o.leftImage)
    const patch: Partial<SiteMarketingData["homeAbout"]> = {}
    if (leftImageUrl) patch.leftImageUrl = leftImageUrl
    const overlayTitle = trimStr(o.overlayTitle)
    if (overlayTitle) patch.overlayTitle = overlayTitle
    const body = trimStr(o.body)
    if (body) patch.body = body
    if (Array.isArray(o.stats) && o.stats.length)
      patch.stats = o.stats.map((row: unknown) => {
        const x = row as Record<string, unknown>
        return {
          value: trimStr(x.value) ?? "",
          label: trimStr(x.label) ?? "",
        }
      })
    const ctaLabel = trimStr(o.ctaLabel)
    if (ctaLabel) patch.ctaLabel = ctaLabel
    const ctaHref = trimStr(o.ctaHref)
    if (ctaHref) patch.ctaHref = ctaHref
    if (Object.keys(patch).length) out.homeAbout = patch as SiteMarketingData["homeAbout"]
  }

  const hs = r.homeStrategy
  if (hs && typeof hs === "object") {
    const o = hs as Record<string, unknown>
    const patch: Partial<SiteMarketingData["homeStrategy"]> = {}
    const sectionTitle = trimStr(o.sectionTitle)
    if (sectionTitle) patch.sectionTitle = sectionTitle
    const sectionSubtitle = trimStr(o.sectionSubtitle)
    if (sectionSubtitle) patch.sectionSubtitle = sectionSubtitle
    if (Array.isArray(o.cards) && o.cards.length) {
      patch.cards = o.cards.map((row: unknown) => {
        const x = row as Record<string, unknown>
        return {
          title: trimStr(x.title) ?? "",
          description: trimStr(x.description) ?? "",
        }
      })
    }
    if (Object.keys(patch).length) out.homeStrategy = patch as SiteMarketingData["homeStrategy"]
  }

  const hf = r.homeFacts
  if (hf && typeof hf === "object") {
    const o = hf as Record<string, unknown>
    const patch: Partial<SiteMarketingData["homeFacts"]> = {}
    const backgroundUrl = resolveHeroMedia(o.backgroundUrl, o.backgroundImage)
    if (backgroundUrl) patch.backgroundUrl = backgroundUrl
    const sectionTitle = trimStr(o.sectionTitle)
    if (sectionTitle) patch.sectionTitle = sectionTitle
    const sectionSubtitle = trimStr(o.sectionSubtitle)
    if (sectionSubtitle) patch.sectionSubtitle = sectionSubtitle
    const watermark = trimStr(o.watermark)
    if (watermark) patch.watermark = watermark
    if (Array.isArray(o.facts) && o.facts.length) {
      patch.facts = o.facts.map((row: unknown) => {
        const x = row as Record<string, unknown>
        return {
          value: typeof x.value === "number" && !Number.isNaN(x.value) ? x.value : Number(x.value) || 0,
          suffix: trimStr(x.suffix) ?? "",
          label: trimStr(x.label) ?? "",
          description: trimStr(x.description) ?? "",
        }
      })
    }
    if (Object.keys(patch).length) out.homeFacts = patch as SiteMarketingData["homeFacts"]
  }

  const hn = r.homeNews
  if (hn && typeof hn === "object") {
    const o = hn as Record<string, unknown>
    const patch: Partial<SiteMarketingData["homeNews"]> = {}
    const sectionTitle = trimStr(o.sectionTitle)
    if (sectionTitle) patch.sectionTitle = sectionTitle
    if (Array.isArray(o.items) && o.items.length) {
      patch.items = o.items.map((row: unknown) => {
        const x = row as Record<string, unknown>
        const imageUrl = resolveHeroMedia(x.imageUrl, x.image) ?? ""
        return {
          title: trimStr(x.title) ?? "",
          date: trimStr(x.date) ?? "",
          imageUrl,
          href: trimStr(x.href) ?? "",
        }
      })
    }
    if (Object.keys(patch).length) out.homeNews = patch as SiteMarketingData["homeNews"]
  }

  const sol = r.solutions
  if (sol && typeof sol === "object") {
    const o = sol as Record<string, unknown>
    const patch: Partial<SiteMarketingData["solutions"]> = {}
    const heroTitle = trimStr(o.heroTitle)
    if (heroTitle) patch.heroTitle = heroTitle
    const heroSubtitle = trimStr(o.heroSubtitle)
    if (heroSubtitle) patch.heroSubtitle = heroSubtitle
    const heroBackgroundUrl = resolveHeroMedia(o.heroBackgroundUrl, o.heroBackgroundImage)
    if (heroBackgroundUrl) patch.heroBackgroundUrl = heroBackgroundUrl
    const introTitle = trimStr(o.introTitle)
    if (introTitle) patch.introTitle = introTitle
    const introBody = trimStr(o.introBody)
    if (introBody) patch.introBody = introBody
    if (Array.isArray(o.industries) && o.industries.length) {
      patch.industries = o.industries.map((row: unknown) => {
        const x = row as Record<string, unknown>
        const pos = x.position === "left" || x.position === "right" ? x.position : "right"
        const imageUrl = resolveHeroMedia(x.imageUrl, x.image) ?? ""
        const popupImageUrl = resolveHeroMedia(x.popupImageUrl, x.popupImage)
        return {
          id: trimStr(x.id) ?? "",
          title: trimStr(x.title) ?? "",
          description: trimStr(x.description) ?? "",
          imageUrl,
          position: pos,
          popupTitle: trimStr(x.popupTitle),
          popupContent: trimStr(x.popupContent),
          popupImageUrl: popupImageUrl || undefined,
        }
      })
    }
    if (Object.keys(patch).length) out.solutions = patch as SiteMarketingData["solutions"]
  }

  const rnd = r.rnd
  if (rnd && typeof rnd === "object") {
    const o = rnd as Record<string, unknown>
    const patch: Partial<SiteMarketingData["rnd"]> = {}
    const heroTitle = trimStr(o.heroTitle)
    if (heroTitle) patch.heroTitle = heroTitle
    const heroBackgroundUrl = resolveHeroMedia(o.heroBackgroundUrl, o.heroBackgroundImage)
    if (heroBackgroundUrl) patch.heroBackgroundUrl = heroBackgroundUrl
    const pageSectionTitle = trimStr(o.pageSectionTitle)
    if (pageSectionTitle) patch.pageSectionTitle = pageSectionTitle
    const strategyTitle = trimStr(o.strategyTitle)
    if (strategyTitle) patch.strategyTitle = strategyTitle
    const strategyLead = trimStr(o.strategyLead)
    if (strategyLead) patch.strategyLead = strategyLead
    if (Array.isArray(o.strategyBullets) && o.strategyBullets.length) {
      patch.strategyBullets = o.strategyBullets.map((x: unknown) => String(x ?? "").trim()).filter(Boolean)
    }
    const strategyImageUrl = resolveHeroMedia(o.strategyImageUrl, o.strategyImage)
    if (strategyImageUrl) patch.strategyImageUrl = strategyImageUrl
    const ipdMeetingImageUrl = resolveHeroMedia(o.ipdMeetingImageUrl, o.ipdMeetingImage)
    if (ipdMeetingImageUrl) patch.ipdMeetingImageUrl = ipdMeetingImageUrl
    const ipdTitle = trimStr(o.ipdTitle)
    if (ipdTitle) patch.ipdTitle = ipdTitle
    const ipdLead = trimStr(o.ipdLead)
    if (ipdLead) patch.ipdLead = ipdLead
    const ipdDiagramUrl = resolveDiagramMedia(o.ipdDiagramUrl, o.ipdDiagram)
    if (ipdDiagramUrl) patch.ipdDiagramUrl = ipdDiagramUrl
    const patentsTitle = trimStr(o.patentsTitle)
    if (patentsTitle) patch.patentsTitle = patentsTitle
    const patentsLead = trimStr(o.patentsLead)
    if (patentsLead) patch.patentsLead = patentsLead
    if (typeof o.patentsTotal === "number" && !Number.isNaN(o.patentsTotal)) patch.patentsTotal = o.patentsTotal
    if (typeof o.patentsInvention === "number" && !Number.isNaN(o.patentsInvention))
      patch.patentsInvention = o.patentsInvention
    if (typeof o.patentsUtility === "number" && !Number.isNaN(o.patentsUtility)) patch.patentsUtility = o.patentsUtility
    const patentsImageUrl = resolveHeroMedia(o.patentsImageUrl, o.patentsImage)
    if (patentsImageUrl) patch.patentsImageUrl = patentsImageUrl
    const honorTitle = trimStr(o.honorTitle)
    if (honorTitle) patch.honorTitle = honorTitle
    const honorLead = trimStr(o.honorLead)
    if (honorLead) patch.honorLead = honorLead
    const honorImageUrl = resolveHeroMedia(o.honorImageUrl, o.honorImage)
    if (honorImageUrl) patch.honorImageUrl = honorImageUrl
    if (Array.isArray(o.honorGallery) && o.honorGallery.length) {
      patch.honorGalleryUrls = o.honorGallery
        .map((row: unknown) => {
          const x = row as Record<string, unknown>
          return resolveHeroMedia(x.imageUrl, x.image)
        })
        .filter((url): url is string => Boolean(url))
    }
    if (Array.isArray(o.honorYears) && o.honorYears.length) {
      patch.honorYears = o.honorYears.map((row: unknown) => {
        const x = row as Record<string, unknown>
        return {
          year: trimStr(x.year) ?? "",
          items: Array.isArray(x.items) ? x.items.map((i: unknown) => String(i ?? "").trim()).filter(Boolean) : [],
        }
      })
    }
    if (Object.keys(patch).length) out.rnd = patch as SiteMarketingData["rnd"]
  }

  const sup = r.supportTop
  if (sup && typeof sup === "object") {
    const o = sup as Record<string, unknown>
    const heroImageUrl = resolveHeroMedia(o.heroImageUrl, o.heroImage)
    if (heroImageUrl) out.supportTop = { heroImageUrl }
  }

  const pl = r.productsList
  if (pl && typeof pl === "object") {
    const o = pl as Record<string, unknown>
    const heroBackgroundUrl = resolveHeroMedia(o.heroBackgroundUrl, o.heroBackgroundImage)
    if (heroBackgroundUrl) out.productsList = { heroBackgroundUrl }
  }

  const cc = r.culturalConcept
  if (cc && typeof cc === "object") {
    const o = cc as Record<string, unknown>
    const patch: Partial<SiteMarketingData["culturalConcept"]> = {}
    const heroBackgroundUrl = resolveHeroMedia(o.heroBackgroundUrl, o.heroBackgroundImage)
    if (heroBackgroundUrl) patch.heroBackgroundUrl = heroBackgroundUrl
    const valuesIntroTitle = trimStr(o.valuesIntroTitle)
    if (valuesIntroTitle) patch.valuesIntroTitle = valuesIntroTitle
    const valuesIntroBody = trimStr(o.valuesIntroBody)
    if (valuesIntroBody) patch.valuesIntroBody = valuesIntroBody
    if (Array.isArray(o.careCards) && o.careCards.length) {
      patch.careCards = o.careCards.map((row: unknown) => {
        const x = row as Record<string, unknown>
        const imageUrl = resolveHeroMedia(x.imageUrl, x.image) ?? ""
        const points = Array.isArray(x.points)
          ? x.points.map((p: unknown) => String(p ?? "").trim()).filter(Boolean)
          : []
        return {
          title: trimStr(x.title) ?? "",
          imageUrl,
          points,
        }
      })
    }
    const futureBackgroundUrl = resolveHeroMedia(o.futureBackgroundUrl, o.futureBackgroundImage)
    if (futureBackgroundUrl) patch.futureBackgroundUrl = futureBackgroundUrl
    const futureWatermark = trimStr(o.futureWatermark)
    if (futureWatermark) patch.futureWatermark = futureWatermark
    const futureTitle = trimStr(o.futureTitle)
    if (futureTitle) patch.futureTitle = futureTitle
    const futureBody = trimStr(o.futureBody)
    if (futureBody) patch.futureBody = futureBody
    if (Object.keys(patch).length) out.culturalConcept = patch as SiteMarketingData["culturalConcept"]
  }

  const cs = r.companyStrength
  if (cs && typeof cs === "object") {
    const o = cs as Record<string, unknown>
    const patch: Partial<SiteMarketingData["companyStrength"]> = {}
    const heroBackgroundUrl = resolveHeroMedia(o.heroBackgroundUrl, o.heroBackgroundImage)
    if (heroBackgroundUrl) patch.heroBackgroundUrl = heroBackgroundUrl
    if (Array.isArray(o.tabTitles) && o.tabTitles.length) {
      patch.tabTitles = o.tabTitles.map((t: unknown) => String(t ?? "").trim()).filter(Boolean)
    }
    if (Array.isArray(o.introLeftLines) && o.introLeftLines.length) {
      patch.introLeftLines = o.introLeftLines.map((t: unknown) => String(t ?? "").trim()).filter(Boolean)
    }
    const introRightImageUrl = resolveHeroMedia(o.introRightImageUrl, o.introRightImage)
    if (introRightImageUrl) patch.introRightImageUrl = introRightImageUrl
    if (Array.isArray(o.introRightLines) && o.introRightLines.length) {
      patch.introRightLines = o.introRightLines.map((t: unknown) => String(t ?? "").trim()).filter(Boolean)
    }
    const manufacturingHeading = trimStr(o.manufacturingHeading)
    if (manufacturingHeading) patch.manufacturingHeading = manufacturingHeading
    const manufacturingSubheading = trimStr(o.manufacturingSubheading)
    if (manufacturingSubheading) patch.manufacturingSubheading = manufacturingSubheading
    if (Array.isArray(o.steps) && o.steps.length) {
      patch.steps = o.steps.map((row: unknown) => {
        const x = row as Record<string, unknown>
        const imageUrl = resolveHeroMedia(x.imageUrl, x.image) ?? ""
        return {
          number: trimStr(x.number) ?? "",
          title: trimStr(x.title) ?? "",
          description: trimStr(x.description) ?? "",
          imageUrl,
        }
      })
    }
    if (Object.keys(patch).length) out.companyStrength = patch as SiteMarketingData["companyStrength"]
  }

  const sus = r.corporateSustainability
  if (sus && typeof sus === "object") {
    const o = sus as Record<string, unknown>
    const patch: Partial<SiteMarketingData["corporateSustainability"]> = {}
    const heroBackgroundUrl = resolveHeroMedia(o.heroBackgroundUrl, o.heroBackgroundImage)
    if (heroBackgroundUrl) patch.heroBackgroundUrl = heroBackgroundUrl
    const contentTitle = trimStr(o.contentTitle)
    if (contentTitle) patch.contentTitle = contentTitle
    if (Array.isArray(o.quoteParagraphs) && o.quoteParagraphs.length) {
      patch.quoteParagraphs = o.quoteParagraphs
        .map((p: unknown) => String(p ?? "").trim())
        .filter(Boolean)
    }
    const ceoCaption = trimStr(o.ceoCaption)
    if (ceoCaption) patch.ceoCaption = ceoCaption
    const ceoName = trimStr(o.ceoName)
    if (ceoName) patch.ceoName = ceoName
    const ceoImageUrl = resolveHeroMedia(o.ceoImageUrl, o.ceoImage)
    if (ceoImageUrl) patch.ceoImageUrl = ceoImageUrl
    const bottomTitle = trimStr(o.bottomTitle)
    if (bottomTitle) patch.bottomTitle = bottomTitle
    const bottomBackgroundUrl = resolveHeroMedia(o.bottomBackgroundUrl, o.bottomBackgroundImage)
    if (bottomBackgroundUrl) patch.bottomBackgroundUrl = bottomBackgroundUrl
    if (Object.keys(patch).length) out.corporateSustainability = patch as SiteMarketingData["corporateSustainability"]
  }

  return out
}
