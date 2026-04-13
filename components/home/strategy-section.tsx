"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Settings, Maximize2, Zap, ShieldCheck, Headphones, Award } from "lucide-react"

const strategies = [
  {
    icon: Settings,
    title: "Professional",
    description: "Expert knowledge and specialized solutions",
  },
  {
    icon: Maximize2,
    title: "Scale",
    description: "Scalable production for any requirement",
  },
  {
    icon: Zap,
    title: "Speed",
    description: "Fast delivery and rapid response time",
  },
  {
    icon: ShieldCheck,
    title: "Quality",
    description: "Highest quality standards guaranteed",
  },
  {
    icon: Headphones,
    title: "Service",
    description: "Dedicated customer support 24/7",
  },
  {
    icon: Award,
    title: "Reputation",
    description: "Trusted by leading companies worldwide",
  },
]

export function StrategySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Competitive Strategy
          </h2>
          <div className="w-16 h-1 bg-[#E94709] mx-auto mt-4" />
          <p className="mt-6 text-gray-600">
            Our competitive strategy will bring differentiated value to customers.
          </p>
        </motion.div>

        {/* Strategy Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 bg-[#1a1a2e] rounded-xl overflow-hidden">
          {strategies.map((strategy, index) => (
            <motion.div
              key={strategy.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-8 text-center border-r border-b border-white/10 last:border-r-0 hover:bg-[#E94709] transition-all duration-300 group ${
                index === 2 || index === 5 ? "lg:border-r-0" : ""
              } ${index >= 3 ? "lg:border-b-0" : ""}`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors mb-4">
                <strategy.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {strategy.title}
              </h3>
              <p className="text-gray-400 group-hover:text-white/80 transition-colors text-sm">
                {strategy.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
