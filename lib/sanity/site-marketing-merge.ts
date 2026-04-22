import { DEFAULT_SITE_MARKETING } from "@/lib/site-marketing-defaults"
import type {
  CareCard,
  FactCounter,
  ManufacturingStep,
  NewsCard,
  SiteMarketingData,
  SolutionIndustry,
  StatPair,
  StrategyCard,
} from "@/lib/site-marketing-types"

function pickStr(def: string, patch: string | undefined | null | false): string {
  if (patch === undefined || patch === null) return def
  const s = String(patch).trim()
  return s.length ? s : def
}

export function pickNum(def: number, patch: number | undefined | null): number {
  if (patch === undefined || patch === null || Number.isNaN(Number(patch))) return def
  return Number(patch)
}

function mergeStats(def: StatPair[], patch?: StatPair[] | null): StatPair[] {
  if (!patch?.length) return def
  return patch.map((row, i) => ({
    value: pickStr(def[i]?.value ?? "", row.value),
    label: pickStr(def[i]?.label ?? "", row.label),
  }))
}

function mergeStrategyCards(def: StrategyCard[], patch?: StrategyCard[] | null): StrategyCard[] {
  if (!patch?.length) return def
  return patch.map((row, i) => ({
    title: pickStr(def[i]?.title ?? "", row.title),
    description: pickStr(def[i]?.description ?? "", row.description),
  }))
}

function mergeNews(def: NewsCard[], patch?: NewsCard[] | null): NewsCard[] {
  if (!patch?.length) return def
  return patch.map((row, i) => ({
    title: pickStr(def[i]?.title ?? "", row.title),
    date: pickStr(def[i]?.date ?? "", row.date),
    imageUrl: pickStr(def[i]?.imageUrl ?? "", row.imageUrl),
    href: pickStr(def[i]?.href ?? "", row.href),
  }))
}

function mergeFacts(def: FactCounter[], patch?: FactCounter[] | null): FactCounter[] {
  if (!patch?.length) return def
  return patch.map((row, i) => ({
    value: pickNum(def[i]?.value ?? 0, row.value),
    suffix: pickStr(def[i]?.suffix ?? "", row.suffix),
    label: pickStr(def[i]?.label ?? "", row.label),
    description: pickStr(def[i]?.description ?? "", row.description),
  }))
}

function mergeIndustries(def: SolutionIndustry[], patch?: SolutionIndustry[] | null): SolutionIndustry[] {
  if (!patch?.length) return def
  return patch.map((row, i) => ({
    id: pickStr(def[i]?.id ?? "", row.id),
    title: pickStr(def[i]?.title ?? "", row.title),
    description: pickStr(def[i]?.description ?? "", row.description),
    imageUrl: pickStr(def[i]?.imageUrl ?? "", row.imageUrl),
    position: row.position === "left" || row.position === "right" ? row.position : def[i]?.position ?? "right",
    popupTitle: pickStr(def[i]?.popupTitle ?? "", row.popupTitle) || undefined,
    popupContent: pickStr(def[i]?.popupContent ?? "", row.popupContent) || undefined,
    popupImageUrl: pickStr(def[i]?.popupImageUrl ?? "", row.popupImageUrl) || undefined,
  }))
}

function mergeCareCards(def: CareCard[], patch?: CareCard[] | null): CareCard[] {
  if (!patch?.length) return def
  return patch.map((row, i) => ({
    title: pickStr(def[i]?.title ?? "", row.title),
    imageUrl: pickStr(def[i]?.imageUrl ?? "", row.imageUrl),
    points: row.points?.filter(Boolean).length ? row.points.map(String) : def[i]?.points ?? [],
  }))
}

function mergeSteps(def: ManufacturingStep[], patch?: ManufacturingStep[] | null): ManufacturingStep[] {
  if (!patch?.length) return def
  return patch.map((row, i) => ({
    number: pickStr(def[i]?.number ?? "", row.number),
    title: pickStr(def[i]?.title ?? "", row.title),
    description: pickStr(def[i]?.description ?? "", row.description),
    imageUrl: pickStr(def[i]?.imageUrl ?? "", row.imageUrl),
  }))
}

/** 将 CMS 文档与代码内默认值合并（缺省或空字段沿用默认） */
export function mergeSiteMarketing(patch: unknown): SiteMarketingData {
  const p = (patch && typeof patch === "object" ? patch : {}) as Partial<SiteMarketingData>
  const d = DEFAULT_SITE_MARKETING

  return {
    homeAbout: {
      ...d.homeAbout,
      ...p.homeAbout,
      stats: mergeStats(d.homeAbout.stats, p.homeAbout?.stats),
    },
    homeStrategy: {
      ...d.homeStrategy,
      ...p.homeStrategy,
      cards: mergeStrategyCards(d.homeStrategy.cards, p.homeStrategy?.cards),
    },
    homeFacts: {
      ...d.homeFacts,
      ...p.homeFacts,
      facts: mergeFacts(d.homeFacts.facts, p.homeFacts?.facts),
    },
    homeNews: {
      ...d.homeNews,
      ...p.homeNews,
      items: mergeNews(d.homeNews.items, p.homeNews?.items),
    },
    solutions: {
      ...d.solutions,
      ...p.solutions,
      industries: mergeIndustries(d.solutions.industries, p.solutions?.industries),
    },
    rnd: {
      ...d.rnd,
      ...p.rnd,
      patentsTotal: pickNum(d.rnd.patentsTotal, p.rnd?.patentsTotal),
      patentsInvention: pickNum(d.rnd.patentsInvention, p.rnd?.patentsInvention),
      patentsUtility: pickNum(d.rnd.patentsUtility, p.rnd?.patentsUtility),
      strategyBullets:
        (p.rnd?.strategyBullets?.filter(Boolean).length ?? 0) > 0
          ? (p.rnd!.strategyBullets ?? []).map(String)
          : d.rnd.strategyBullets,
      honorGalleryUrls:
        (p.rnd?.honorGalleryUrls?.filter(Boolean).length ?? 0) > 0
          ? (p.rnd!.honorGalleryUrls ?? []).map(String)
          : d.rnd.honorGalleryUrls,
      honorYears:
        (p.rnd?.honorYears?.length ?? 0) > 0
          ? (p.rnd!.honorYears ?? []).map((h) => ({
              year: String(h?.year ?? ""),
              items: Array.isArray(h?.items) ? h.items.map(String) : [],
            }))
          : d.rnd.honorYears,
    },
    supportTop: { ...d.supportTop, ...p.supportTop },
    productsList: { ...d.productsList, ...p.productsList },
    culturalConcept: {
      ...d.culturalConcept,
      ...p.culturalConcept,
      careCards: mergeCareCards(d.culturalConcept.careCards, p.culturalConcept?.careCards),
    },
    companyStrength: {
      ...d.companyStrength,
      ...p.companyStrength,
      tabTitles:
        (p.companyStrength?.tabTitles?.filter(Boolean).length ?? 0) > 0
          ? (p.companyStrength!.tabTitles ?? []).map(String)
          : d.companyStrength.tabTitles,
      introLeftLines:
        (p.companyStrength?.introLeftLines?.length ?? 0) > 0
          ? (p.companyStrength!.introLeftLines ?? []).map(String)
          : d.companyStrength.introLeftLines,
      introRightLines:
        (p.companyStrength?.introRightLines?.length ?? 0) > 0
          ? (p.companyStrength!.introRightLines ?? []).map(String)
          : d.companyStrength.introRightLines,
      steps: mergeSteps(d.companyStrength.steps, p.companyStrength?.steps),
    },
    corporateSustainability: {
      ...d.corporateSustainability,
      ...p.corporateSustainability,
      quoteParagraphs:
        (p.corporateSustainability?.quoteParagraphs?.length ?? 0) > 0
          ? (p.corporateSustainability!.quoteParagraphs ?? [])
              .map((x) => String(x ?? "").trim())
              .filter(Boolean)
          : d.corporateSustainability.quoteParagraphs,
    },
  }
}
