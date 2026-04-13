"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { PageHero } from "@/components/shared/page-hero"
import { Lightbulb, FileText, Award, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

const patents = {
  total: 35,
  invention: 5,
  utilityModel: 24,
}

const honors = [
  {
    year: "2023",
    items: ["Recognized as \"National High-tech Enterprise\" again."],
  },
  {
    year: "2022",
    items: [
      "\"Specialized, Refined, Distinctive, and Innovative\" small and medium-sized enterprise in Fujian Province and in",
    ],
  },
]

export default function RndInnovationPage() {
  const strategyRef = useRef(null)
  const ipdRef = useRef(null)
  const patentsRef = useRef(null)
  const honorRef = useRef(null)
  
  const isStrategyInView = useInView(strategyRef, { once: true, margin: "-100px" })
  const isIpdInView = useInView(ipdRef, { once: true, margin: "-100px" })
  const isPatentsInView = useInView(patentsRef, { once: true, margin: "-100px" })
  const isHonorInView = useInView(honorRef, { once: true, margin: "-100px" })

  return (
    <>
      <PageHero
        title="Endless skills, striving for excellence"
        backgroundImage="/images/rnd/rnd-hero.jpg"
        icon={<Lightbulb className="w-10 h-10 text-white" />}
      />

      {/* Section Title */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            R&D and Innovation
          </h2>
          <div className="w-16 h-1 bg-[#E94709] mx-auto mt-4" />
        </div>
      </section>

      {/* R&D Strategy Section */}
      <section ref={strategyRef} id="rd-strategy" className="py-20 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isStrategyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                R&D and Innovation
              </h3>
              <p className="text-[#E94709] font-medium mb-6">
                Technology and products insist on walking ahead of competitors
              </p>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-[#E94709] mt-1">◇</span>
                  <span>
                    High-intensity allocation of resources to achieve key breakthroughs. Annual investment in R&D expenses exceeds <span className="text-[#E94709] font-bold">12%</span> of total sales.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#E94709] mt-1">◇</span>
                  <span>
                    Constantly update product design, and provide personalized design and technical services for customers around the world.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#E94709] mt-1">◇</span>
                  <span>
                    SENNDIK has obtained <span className="text-[#E94709] font-bold">35+</span> patents, covering invention patents, design patents, utility model patents...
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isStrategyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/images/rnd/rnd-strategy.jpg"
                  alt="R&D Strategy"
                  fill
                  className="object-cover"
                />
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* IPD Development Model Section */}
      <section ref={ipdRef} id="ipd-model" className="py-20 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isIpdInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/images/rnd/ipd-meeting.jpg"
                  alt="IPD Meeting"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isIpdInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                IPD development model
              </h3>
              <p className="text-[#E94709] font-medium mb-6">
                The objective is to ensure the compliance of output products with customer requirements and achieve seamless integration between technology and market.
              </p>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Image
                  src="/images/rnd/ipd-diagram.png"
                  alt="IPD Development Model Diagram"
                  width={500}
                  height={300}
                  className="w-full"
                />
              </div>
              

            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Patents Section */}
      <section ref={patentsRef} id="patents" className="py-20 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isPatentsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Our Patents
              </h3>
              <p className="text-[#E94709] font-medium mb-6">
                As of November 2024
              </p>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-[#E94709] mt-1">◇</span>
                  <span>
                    We have accumulated a total of <span className="text-[#E94709] font-bold">{patents.total}</span> patents.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#E94709] mt-1">◇</span>
                  <span>
                    Including <span className="text-[#E94709] font-bold">{patents.invention}</span> invention patents.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#E94709] mt-1">◇</span>
                  <span>
                    <span className="text-[#E94709] font-bold">{patents.utilityModel}</span> utility model patents.
                  </span>
                </li>
              </ul>
              

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isPatentsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/images/rnd/patents.jpg"
                  alt="Patents"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-[#E94709]/20 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#E94709]/30 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-[#E94709]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Honor and Qualification Section */}
      <section ref={honorRef} id="honor" className="py-20 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isHonorInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/images/rnd/certifications.jpg"
                  alt="Certifications"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isHonorInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Honor and Qualification
              </h3>
              <p className="text-[#E94709] font-medium mb-6">
                As of November 2024
              </p>
              
              <div className="space-y-6">
                {honors.map((honor) => (
                  <div key={honor.year}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#E94709]">◇</span>
                      <span className="font-semibold">{honor.year} year</span>
                    </div>
                    <ul className="pl-6 space-y-2">
                      {honor.items.map((item, i) => (
                        <li key={i} className="text-gray-600">
                          -{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <Button className="mt-6 bg-[#E94709] hover:bg-[#D13E06] text-white">
                <Download className="w-4 h-4 mr-2" />
                Download Certifications
              </Button>
              

            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
