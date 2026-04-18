"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { PageHero } from "@/components/shared/page-hero"
import { Heart, Users, Globe, BookOpen } from "lucide-react"
import { useSiteMarketing } from "@/components/site-marketing-provider"

const careIcons = [Heart, Users, Globe]

export default function CulturalConceptPage() {
  const m = useSiteMarketing()
  const c = m.culturalConcept
  const valuesRef = useRef(null)
  const futureRef = useRef(null)
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" })
  const isFutureInView = useInView(futureRef, { once: true, margin: "-100px" })
  const futureParagraphs = c.futureBody.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)

  return (
    <>
      <PageHero
        title="Cultural Concept"
        backgroundImage={c.heroBackgroundUrl}
        icon={<BookOpen className="w-10 h-10 text-white" />}
      />

      <section ref={valuesRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{c.valuesIntroTitle}</h2>
            <div className="w-16 h-1 bg-[#E94709] mx-auto mt-4" />
            <p className="mt-6 text-gray-600">{c.valuesIntroBody}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {c.careCards.map((value, index) => {
              const Icon = careIcons[index] ?? Heart
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100"
                >
                  <div className="relative h-48">
                    <Image src={value.imageUrl} alt={value.title} fill className="object-cover" />
                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#E94709] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <ul className="space-y-3">
                      {value.points.map((point, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-600">
                          <span className="text-[#E94709] mt-1">-</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section
        ref={futureRef}
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: `url('${c.futureBackgroundUrl}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 text-[15vw] font-bold text-white/5 text-center select-none pointer-events-none">
          {c.futureWatermark}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isFutureInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{c.futureTitle}</h2>
              <div className="w-16 h-1 bg-[#E94709] mb-6" />
              <div className="space-y-4 text-gray-300">
                {futureParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
