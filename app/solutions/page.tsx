"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { PageHero } from "@/components/shared/page-hero"
import { Button } from "@/components/ui/button"
import { Download, Home, ChefHat, Factory, Settings, Sun, Cpu } from "lucide-react"

const solutions = [
  {
    id: "home-appliances",
    icon: Home,
    title: "Home Appliances & Smart Home",
    description: "High reliability, no noise, low energy consumption, achieving healthier, more efficient living solutions.",
    image: "/images/solutions/home-appliances.jpg",
    position: "right",
  },
  {
    id: "kitchen-equipment",
    icon: ChefHat,
    title: "Kitchen Equipment",
    description: "High reliability, no noise, low energy consumption, achieving healthier, more efficient using solutions.",
    image: "/images/solutions/kitchen-equipment.jpg",
    position: "left",
  },
  {
    id: "plastic-industry",
    icon: Settings,
    title: "Plastic Industry",
    description: "Precise temperature control, compact design, empower the plastic industry.",
    image: "/images/solutions/plastic-industry.jpg",
    position: "right",
  },
  {
    id: "industrial-manufacturing",
    icon: Factory,
    title: "Industrial Manufacturing",
    description: "Stable switching control, no arc sparks, ensure stable equipment operation.",
    image: "/images/solutions/industrial-manufacturing.jpg",
    position: "left",
  },
  {
    id: "industrial-control",
    icon: Cpu,
    title: "Industrial Control",
    description: "Extend SCR lifespan, limit starting capacity, enhance efficiency of industrial control systems.",
    image: "/images/solutions/industrial-control.jpg",
    position: "right",
  },
  {
    id: "photovoltaic",
    icon: Sun,
    title: "Photovoltaic Industry",
    description: "Excellent high voltage and thermal power output, effectively improve the yield of battery components.",
    image: "/images/solutions/photovoltaic.jpg",
    position: "left",
  },
]

export default function SolutionsPage() {
  // Handle anchor scroll on page load
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
      {/* Hero Section */}
      <PageHero
        title="Comprehensive"
        subtitle="Solutions for Every Industry"
        backgroundImage="/images/solutions/solutions-hero.jpg"
      />

      {/* About Our Solution Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              About Our Solution
            </h2>
            <div className="w-16 h-1 bg-[#E94709] mx-auto mb-8" />
            <p className="text-muted-foreground leading-relaxed">
              SENNDIK relays on constant product development and commitment to work with customers to develop bespoke solutions. Innovation is the challenge that SENNDIK takes up every day by anticipating market trends and implementing specific knowledge and skills in partnership with industry and research.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solution Sections */}
      {solutions.map((solution, index) => (
        <SolutionSection key={solution.id} solution={solution} index={index} />
      ))}
    </main>
  )
}

function SolutionSection({
  solution,
  index,
}: {
  solution: typeof solutions[0]
  index: number
}) {
  const Icon = solution.icon
  const isRight = solution.position === "right"

  return (
    <section
      id={solution.id}
      className={`relative overflow-hidden scroll-mt-20 ${
        index % 2 === 0 ? "bg-white" : "bg-gray-50"
      }`}
    >
      {/* Decorative wave pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col ${
            isRight ? "lg:flex-row" : "lg:flex-row-reverse"
          } items-stretch min-h-[500px]`}
        >
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: isRight ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 py-12 lg:py-20 flex flex-col justify-center"
          >
            <div className={`max-w-md ${isRight ? "lg:ml-auto lg:mr-12" : "lg:mr-auto lg:ml-12"}`}>
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">
                SOLUTION
              </p>
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mb-6">
                <Icon className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                {solution.title}
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {solution.description}
              </p>
              <Button className="bg-[#E94709] hover:bg-[#D13E06] text-white">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: isRight ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[500px]"
          >
            <Image
              src={solution.image}
              alt={solution.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
