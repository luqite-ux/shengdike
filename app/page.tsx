import { HeroSection } from "@/components/home/hero-section"
import { AboutSection } from "@/components/home/about-section"
import { StrategySection } from "@/components/home/strategy-section"
import { FactsSection } from "@/components/home/facts-section"
import { NewsSection } from "@/components/home/news-section"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <StrategySection />
      <FactsSection />
      <NewsSection />
    </main>
  )
}
