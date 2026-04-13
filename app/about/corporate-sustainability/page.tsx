"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { PageHero } from "@/components/shared/page-hero"
import { Leaf, Quote } from "lucide-react"

export default function CorporateSustainabilityPage() {
  const contentRef = useRef(null)
  const isContentInView = useInView(contentRef, { once: true, margin: "-100px" })

  return (
    <>
      <PageHero
        title="Corporate Sustainability"
        backgroundImage="/images/about/sustainability-hero.jpg"
        icon={<Leaf className="w-10 h-10 text-white" />}
      />

      {/* Main Content Section */}
      <section ref={contentRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Corporate Sustainability
              </h2>
              <div className="w-16 h-1 bg-[#E94709] mt-4" />
              
              {/* Large SUSTAINABILITY text */}
              <div className="mt-8 text-6xl md:text-8xl font-bold text-gray-100 select-none">
                SUSTAINABILITY
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Quote Section */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isContentInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#E94709]">
                  <Quote className="w-8 h-8 text-[#E94709] mb-4" />
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      Credit and reputation foremost to our employees, suppliers and customers is our sustainable operating principles.
                    </p>
                    <p>
                      We want to thank and recognize all our employees for their efforts that we have a privileged position to create the reliable quality assurance, perfect technical service and the best cost-effective.
                    </p>
                    <p>
                      Team SENNDIK is who we are and providing solid state relay solutions in the industrial automation field is what we do. We will be your ideal choice.
                    </p>
                    <p>
                      Thank you for following along on our journey.
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t">
                    <p className="text-gray-500 text-sm">A message from our CEO</p>
                    <p className="text-xl font-serif italic text-gray-800 mt-2">Jack Fang</p>
                  </div>
                </div>
              </motion.div>

              {/* CEO Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isContentInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative"
              >
                <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden shadow-xl">
                  <Image
                    src="/images/about/ceo-climbing.jpg"
                    alt="Leadership Vision"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-[#E94709]/10" />
                <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-[#E94709]/5" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Background Section */}
      <section
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/images/about/sustainability-mountains.jpg')`,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Leaf className="w-16 h-16 text-[#E94709] mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold text-white max-w-2xl mx-auto">
              Building a Sustainable Future Through Innovation and Responsibility
            </h3>
          </motion.div>
        </div>
      </section>
    </>
  )
}
