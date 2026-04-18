/** 与 Sanity「全站营销图文」及前台默认值对齐的结构 */

export type StatPair = { value: string; label: string }

export type StrategyCard = { title: string; description: string }

export type NewsCard = { title: string; date: string; imageUrl: string; href: string }

export type FactCounter = {
  value: number
  suffix: string
  label: string
  description: string
}

export type SolutionIndustry = {
  id: string
  title: string
  description: string
  imageUrl: string
  position: "left" | "right"
}

export type CareCard = {
  title: string
  imageUrl: string
  points: string[]
}

export type ManufacturingStep = {
  number: string
  title: string
  description: string
  imageUrl: string
}

export type SiteMarketingData = {
  homeAbout: {
    leftImageUrl: string
    overlayTitle: string
    body: string
    stats: StatPair[]
    ctaLabel: string
    ctaHref: string
  }
  homeStrategy: {
    sectionTitle: string
    sectionSubtitle: string
    cards: StrategyCard[]
  }
  homeFacts: {
    backgroundUrl: string
    sectionTitle: string
    sectionSubtitle: string
    watermark: string
    facts: FactCounter[]
  }
  homeNews: {
    sectionTitle: string
    items: NewsCard[]
  }
  solutions: {
    heroTitle: string
    heroSubtitle: string
    heroBackgroundUrl: string
    introTitle: string
    introBody: string
    industries: SolutionIndustry[]
  }
  rnd: {
    heroTitle: string
    heroBackgroundUrl: string
    pageSectionTitle: string
    strategyTitle: string
    strategyLead: string
    strategyBullets: string[]
    strategyImageUrl: string
    ipdMeetingImageUrl: string
    ipdTitle: string
    ipdLead: string
    ipdDiagramUrl: string
    patentsTitle: string
    patentsLead: string
    patentsTotal: number
    patentsInvention: number
    patentsUtility: number
    patentsImageUrl: string
    honorTitle: string
    honorLead: string
    honorImageUrl: string
    honorYears: { year: string; items: string[] }[]
  }
  supportTop: {
    heroImageUrl: string
  }
  productsList: {
    heroBackgroundUrl: string
  }
  culturalConcept: {
    heroBackgroundUrl: string
    valuesIntroTitle: string
    valuesIntroBody: string
    careCards: CareCard[]
    futureBackgroundUrl: string
    futureWatermark: string
    futureTitle: string
    futureBody: string
  }
  companyStrength: {
    heroBackgroundUrl: string
    tabTitles: string[]
    introLeftLines: string[]
    introRightImageUrl: string
    introRightLines: string[]
    manufacturingHeading: string
    manufacturingSubheading: string
    steps: ManufacturingStep[]
  }
  corporateSustainability: {
    heroBackgroundUrl: string
    contentTitle: string
    quoteParagraphs: string[]
    ceoCaption: string
    ceoName: string
    ceoImageUrl: string
    bottomTitle: string
    bottomBackgroundUrl: string
  }
}
