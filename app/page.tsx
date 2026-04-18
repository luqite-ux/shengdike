import { HeroSection } from "@/components/home/hero-section"
import { AboutSection } from "@/components/home/about-section"
import { StrategySection } from "@/components/home/strategy-section"
import { FactsSection } from "@/components/home/facts-section"
import { NewsSection } from "@/components/home/news-section"
import { getHomeHeroPayload } from "@/lib/sanity/home-page"

export default async function HomePage() {
  const heroPayload = await getHomeHeroPayload()

  return (
    <main>
      <HeroSection
        cmsSlides={heroPayload?.slides}
        cmsPrimaryCta={heroPayload?.primaryCta}
        cmsSecondaryCta={heroPayload?.secondaryCta}
      />
      <AboutSection />
      <StrategySection />
      <FactsSection />
      <NewsSection />
    </main>
  )
}
