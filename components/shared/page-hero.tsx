"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface PageHeroProps {
  title: string
  subtitle?: string
  backgroundImage: string
  icon?: React.ReactNode
}

export function PageHero({ title, subtitle, backgroundImage, icon }: PageHeroProps) {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: "smooth",
    })
  }

  return (
    <section
      className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${backgroundImage}')`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-white"
      >
        {icon && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm mb-6"
          >
            {icon}
          </motion.div>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl mx-auto px-4">
            {subtitle}
          </p>
        )}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#E94709] flex items-center justify-center text-white hover:bg-[#D13E06] transition-colors cursor-pointer"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.button>
    </section>
  )
}
