"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { PageHero } from "@/components/shared/page-hero"
import { Building2, Award, Users, Factory } from "lucide-react"
import { useSiteMarketing } from "@/components/site-marketing-provider"

const strengthIcons = [Building2, Award, Users]

export default function CompanyStrengthPage() {
  const m = useSiteMarketing()
  const s = m.companyStrength
  const introRef = useRef(null)
  const manufacturingRef = useRef(null)
  const isIntroInView = useInView(introRef, { once: true, margin: "-100px" })
  const isManufacturingInView = useInView(manufacturingRef, { once: true, margin: "-100px" })

  const tabs = s.tabTitles.map((title, i) => ({
    icon: strengthIcons[i] ?? Building2,
    title,
    active: i === 0,
  }))

  return (
    <>
      <PageHero
        title="Company Strength"
        backgroundImage={s.heroBackgroundUrl}
        icon={<Factory className="w-10 h-10 text-white" />}
      />

      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-4">
            {tabs.map((tab, index) => (
              <div
                key={tab.title}
                className={`flex items-center gap-4 p-6 rounded-lg cursor-pointer transition-all ${
                  tab.active ? "bg-[#E94709] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <tab.icon className={`w-8 h-8 ${tab.active ? "text-white" : "text-[#E94709]"}`} />
                <span className="font-medium">{tab.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={introRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isIntroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="text-4xl text-[#E94709]">01</span>
                </h3>
                <ul className="mt-6 space-y-4 text-gray-600">
                  {s.introLeftLines.map((line, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#E94709] font-bold">•</span>
                      <span>{line.replace(/^•\s*/, "")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isIntroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image src={s.introRightImageUrl} alt="Production Line" fill className="object-cover" />
              </div>
              <div className="mt-8 bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="text-4xl text-[#E94709]">02</span>
                </h3>
                <ul className="mt-6 space-y-4 text-gray-600">
                  {s.introRightLines.map((line, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#E94709] font-bold">•</span>
                      <span>{line.replace(/^•\s*/, "")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={manufacturingRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isManufacturingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="text-6xl font-bold text-gray-200">03</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">{s.manufacturingHeading}</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-[#E94709]">{s.manufacturingSubheading}</h3>
          </motion.div>

          <div className="space-y-16">
            {s.steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isManufacturingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                <div className={`relative h-[300px] rounded-lg overflow-hidden ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Image src={step.imageUrl} alt={step.title} fill className="object-cover" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
