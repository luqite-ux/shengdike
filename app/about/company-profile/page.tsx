"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { PageHero } from "@/components/shared/page-hero"
import { BookOpen, Users, Building2, Cpu, Wrench, Percent } from "lucide-react"

const teamStats = [
  { icon: Cpu, label: "R&D", value: "1", suffix: "%" },
  { icon: Users, label: "Sales", value: "0", suffix: "%" },
  { icon: Building2, label: "Production", value: "2", suffix: "%" },
  { icon: Wrench, label: "Quality", value: "0", suffix: "%" },
  { icon: Percent, label: "Others", value: "1", suffix: "%" },
  { icon: Users, label: "Total staff", value: "6", suffix: "+" },
]

export default function CompanyProfilePage() {
  const profileRef = useRef(null)
  const foundedRef = useRef(null)
  const teamRef = useRef(null)
  const isProfileInView = useInView(profileRef, { once: true, margin: "-100px" })
  const isFoundedInView = useInView(foundedRef, { once: true, margin: "-100px" })
  const isTeamInView = useInView(teamRef, { once: true, margin: "-100px" })

  return (
    <>
      <PageHero
        title="Company Profile"
        backgroundImage="/images/about/company-profile-hero.jpg"
        icon={<BookOpen className="w-10 h-10 text-white" />}
      />

      {/* Company Profile Section */}
      <section ref={profileRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isProfileInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/about/company-address.jpg"
                  alt="SENNDIK Logo"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isProfileInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#E94709]/10 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#E94709]" />
                </div>
                <span className="text-[#E94709] font-medium">About Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Company Profile
              </h2>
              <p className="text-gray-600 leading-relaxed">
                SENNDIK is a leading industrial technology company specializing in solid state relay products, solutions and other critical components to create valuable business insights for customers and end users. Solid State Relay is What We Do.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founded Section */}
      <section ref={foundedRef} className="relative py-20">
        <div className="absolute inset-0 bg-[#1a1a2e]" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <Image
            src="/images/about/company-building-modern.jpg"
            alt="SENNDIK Building"
            fill
            className="object-cover"
          />
        </div>

        {/* Large ABOUT text */}
        <div className="absolute right-0 top-10 text-[20vw] font-bold text-white/5 select-none pointer-events-none hidden lg:block">
          ABOUT
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isFoundedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#E94709]/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#E94709]" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                SENNDIK Founded in 2010
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 2010, SENNDIK has established a smart manufacturing base in Yueqing, China with business spanning over 50 countries and regions worldwide.
                </p>
                <p>
                  After more than ten years of development, SENNDIK has accumulated strong R&D and innovation capabilities, global service capabilities, and leading manufacturing capabilities.
                </p>
                <p>
                  With the development vision of &quot;becoming a respected industrial technology enterprise&quot;, we are committed to developing power semiconductor device solutions and other key products, creating commercial value for customers and end-users, and forging ahead with accumulated strengths.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Executive Team Section */}
      <section ref={teamRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Executive Team
            </h2>
            <div className="w-16 h-1 bg-[#E94709] mx-auto mt-4" />
            <p className="mt-6 text-gray-600">
              We are a team of professionals with extensive technical backgrounds in product development, gained from leading companies both domestically and internationally.
            </p>
            <p className="mt-4 text-gray-600">
              The members of our team are young and dynamic, with an average age of 38 years old, showcasing a strong sense of vitality and a penchant for innovation.
            </p>
          </motion.div>

          {/* Team Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {teamStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#1a1a2e] p-6 text-center rounded-lg"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                  <span className="text-lg">{stat.suffix}</span>
                </div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Background Text Section */}
      <section className="relative py-32 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[15vw] font-bold text-gray-200 whitespace-nowrap select-none">
            OUR TEAM
          </span>
        </div>
      </section>
    </>
  )
}
