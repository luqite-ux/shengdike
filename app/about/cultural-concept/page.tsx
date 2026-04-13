"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { PageHero } from "@/components/shared/page-hero"
import { Heart, Users, Globe, BookOpen } from "lucide-react"

const careValues = [
  {
    title: "Customer Care",
    image: "/images/about/customer-care.jpg",
    icon: Heart,
    points: [
      "Centered on customer interests, we prioritize them by providing optimal solutions and cost-effective products.",
      "We focus on enhancing product quality, controlling production processes, and developing customized products.",
      "We pay attention to customers' individual needs, offering comprehensive after-sales support, and swiftly addressing their issues.",
    ],
  },
  {
    title: "Staff Care",
    image: "/images/about/staff-care.jpg",
    icon: Users,
    points: [
      "We strive to create a safe and comfortable working environment for employees, offering benefits and remuneration that exceed industry standards.",
      "We develop career planning and training programs to provide employees with a favorable development platform.",
      "We encourage employees to enhance their self-worth and cultivate a personality characterized by courage, enthusiasm, decisiveness, resilience, confidence, dedication, and a strong sense of responsibility.",
    ],
  },
  {
    title: "Social Care",
    image: "/images/about/social-care.jpg",
    icon: Globe,
    points: [
      "Environmental Concern: We have always adhered to the principle of sustainable development in our production and operation, upholding green, environmentally friendly, and low-carbon production models. We have obtained ISO14001 environmental management system certification as well as ROHS, REACH, and other certifications.",
      "Social Responsibility: We are committed to public welfare undertakings, responding to social donations, and caring for disadvantaged children.",
    ],
  },
]

export default function CulturalConceptPage() {
  const valuesRef = useRef(null)
  const futureRef = useRef(null)
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" })
  const isFutureInView = useInView(futureRef, { once: true, margin: "-100px" })

  return (
    <>
      <PageHero
        title="Cultural Concept"
        backgroundImage="/images/about/cultural-concept-hero.jpg"
        icon={<BookOpen className="w-10 h-10 text-white" />}
      />

      {/* SENNDIK Values Section */}
      <section ref={valuesRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              SENNDIK Values
            </h2>
            <div className="w-16 h-1 bg-[#E94709] mx-auto mt-4" />
            <p className="mt-6 text-gray-600">
              In the process of development, SENNDIK attaches great importance to customer satisfaction, staff&apos;s self-worth, and social harmony, gradually forming a value system centered on <span className="font-bold text-[#E94709]">&quot;CARE&quot;</span>, which includes three parts: Customer care, Staff care, and Social care.
            </p>
          </motion.div>

          {/* Care Values Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100"
              >
                <div className="relative h-48">
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#E94709] flex items-center justify-center">
                    <value.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
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
            ))}
          </div>
        </div>
      </section>

      {/* Future Focus Section */}
      <section
        ref={futureRef}
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/about/future-focus-bg.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

        {/* PARTNER Background Text */}
        <div className="absolute bottom-0 left-0 right-0 text-[15vw] font-bold text-white/5 text-center select-none pointer-events-none">
          PARTNER
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isFutureInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Future Focus
              </h2>
              <div className="w-16 h-1 bg-[#E94709] mb-6" />
              <div className="space-y-4 text-gray-300">
                <p>
                  Our vision is to be a world leader and early innovator in power semiconductor solutions and insights while satisfying the world&apos;s growing need for safety, efficiency and a clean environment and being a partner of choice.
                </p>
                <p>
                  Our products are the fundamental building blocks needed for a cleaner, more efficient, electrified, and connected world.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
