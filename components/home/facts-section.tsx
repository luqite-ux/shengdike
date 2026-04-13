"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Lightbulb, Briefcase, Cpu, Users, Factory } from "lucide-react"

const facts = [
  {
    icon: Lightbulb,
    value: 14,
    suffix: "",
    label: "years",
    description: "R&D and Manufacturing",
  },
  {
    icon: Briefcase,
    value: 2,
    suffix: "+",
    label: "years",
    description: "Business Experience",
  },
  {
    icon: Cpu,
    value: 35,
    suffix: "+",
    label: "",
    description: "Patented technologies",
  },
  {
    icon: Users,
    value: 30,
    suffix: "+",
    label: "",
    description: "Engineers",
  },
  {
    icon: Users,
    value: 100,
    suffix: "+",
    label: "",
    description: "Employees",
  },
  {
    icon: Factory,
    value: 1305,
    suffix: "",
    label: "m²",
    description: "of factory",
  },
]

function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000 // 2 seconds
      const steps = 60
      const increment = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
      {label && <span className="text-base ml-1">{label}</span>}
    </span>
  )
}

export function FactsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative py-20 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/images/facts-bg.jpg')`,
      }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Facts & Figures
          </h2>
          <div className="w-16 h-1 bg-[#E94709] mx-auto mt-4" />
          <p className="mt-4 text-gray-400">As of Nov.2024</p>
        </motion.div>

        {/* Facts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {facts.map((fact, index) => (
            <motion.div
              key={fact.description}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E94709]/20 mb-4">
                <fact.icon className="w-6 h-6 text-[#E94709]" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                <Counter value={fact.value} suffix={fact.suffix} label={fact.label} />
              </div>
              <p className="text-gray-400 text-sm">{fact.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Large Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[20vw] font-bold text-white/5 whitespace-nowrap select-none">
          SENNDIK
        </span>
      </div>
    </section>
  )
}
