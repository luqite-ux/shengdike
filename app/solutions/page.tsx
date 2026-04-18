"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { PageHero } from "@/components/shared/page-hero"
import { Button } from "@/components/ui/button"
import { Download, Home, ChefHat, Factory, Settings, Sun, Cpu } from "lucide-react"
import { useSiteMarketing } from "@/components/site-marketing-provider"
import type { SolutionIndustry } from "@/lib/site-marketing-types"

const iconById: Record<string, typeof Home> = {
  "home-appliances": Home,
  "kitchen-equipment": ChefHat,
  "plastic-industry": Settings,
  "industrial-manufacturing": Factory,
  "industrial-control": Cpu,
  photovoltaic: Sun,
}

export default function SolutionsPage() {
  const m = useSiteMarketing()
  const sol = m.solutions

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
      }
    }
  }, [])

  return (
    <main>
      <PageHero title={sol.heroTitle} subtitle={sol.heroSubtitle} backgroundImage={sol.heroBackgroundUrl} />

      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{sol.introTitle}</h2>
            <div className="w-16 h-1 bg-[#E94709] mx-auto mb-8" />
            <p className="text-muted-foreground leading-relaxed">{sol.introBody}</p>
          </motion.div>
        </div>
      </section>

      {sol.industries.map((solution, index) => (
        <SolutionSection key={solution.id} solution={solution} index={index} />
      ))}
    </main>
  )
}

function SolutionSection({ solution, index }: { solution: SolutionIndustry; index: number }) {
  const Icon = iconById[solution.id] ?? Home
  const isRight = solution.position === "right"

  return (
    <section
      id={solution.id}
      className={`relative overflow-hidden scroll-mt-20 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
    >
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col ${isRight ? "lg:flex-row" : "lg:flex-row-reverse"} items-stretch min-h-[500px]`}
        >
          <motion.div
            initial={{ opacity: 0, x: isRight ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 py-12 lg:py-20 flex flex-col justify-center"
          >
            <div className={`max-w-md ${isRight ? "lg:ml-auto lg:mr-12" : "lg:mr-auto lg:ml-12"}`}>
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">SOLUTION</p>
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mb-6">
                <Icon className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">{solution.title}</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">{solution.description}</p>
              <Button className="bg-[#E94709] hover:bg-[#D13E06] text-white">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRight ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[500px]"
          >
            <Image src={solution.imageUrl} alt={solution.title} fill className="object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
