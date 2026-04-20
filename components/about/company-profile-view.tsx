"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { PageHero } from "@/components/shared/page-hero"
import { BookOpen, Users, Building2, Cpu, Wrench, Percent, Award, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSiteMarketing } from "@/components/site-marketing-provider"

type TeamStat = {
  icon: typeof Cpu
  label: string
  value: number
  suffix: string
}

const teamStats: TeamStat[] = [
  { icon: Cpu, label: "R&D", value: 30, suffix: "%" },
  { icon: Users, label: "Sales", value: 10, suffix: "%" },
  { icon: Building2, label: "Production", value: 35, suffix: "%" },
  { icon: Wrench, label: "Quality", value: 8, suffix: "%" },
  { icon: Percent, label: "Others", value: 17, suffix: "%" },
  { icon: Users, label: "Total staff", value: 100, suffix: "+" },
]

/** 数字从 0 数到 value 的动画（进入视口触发） */
function AnimatedNumber({ value, active }: { value: number; active: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    const duration = 1800
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
  }, [active, value])

  return <>{count}</>
}

export type CompanyProfileViewProps = {
  /** 首段「Company Profile」左侧配图；由站点设置上传/外链，或本地默认 */
  introImageSrc: string
  heroBackgroundSrc: string
  foundedSectionSrc: string
}

export function CompanyProfileView({
  introImageSrc,
  heroBackgroundSrc,
  foundedSectionSrc,
}: CompanyProfileViewProps) {
  const m = useSiteMarketing()
  const r = m.rnd
  const profileRef = useRef(null)
  const foundedRef = useRef(null)
  const teamRef = useRef(null)
  const certRef = useRef(null)
  const isProfileInView = useInView(profileRef, { once: true, margin: "-100px" })
  const isFoundedInView = useInView(foundedRef, { once: true, margin: "-100px" })
  const isTeamInView = useInView(teamRef, { once: true, margin: "-100px" })
  const isCertInView = useInView(certRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (typeof window === "undefined") return
    const hash = window.location.hash
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 200)
    }
  }, [])

  return (
    <>
      <PageHero
        title="Company Profile"
        backgroundImage={heroBackgroundSrc}
        icon={<BookOpen className="w-10 h-10 text-white" />}
      />

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
                  src={introImageSrc}
                  alt="SENNDIK company"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Company Profile</h2>
              <p className="text-gray-600 leading-relaxed">
                SENNDIK is a leading industrial technology company specializing in solid state relay products,
                solutions and other critical components to create valuable business insights for customers and end
                users. Solid State Relay is What We Do.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={foundedRef} className="relative py-20">
        <div className="absolute inset-0 bg-[#1a1a2e]" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <Image src={foundedSectionSrc} alt="SENNDIK Building" fill className="object-cover" />
        </div>

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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">SENNDIK Founded in 2010</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 2010, SENNDIK has established a smart manufacturing base in Yueqing, China with business
                  spanning over 50 countries and regions worldwide.
                </p>
                <p>
                  After more than ten years of development, SENNDIK has accumulated strong R&D and innovation
                  capabilities, global service capabilities, and leading manufacturing capabilities.
                </p>
                <p>
                  With the development vision of &quot;becoming a respected industrial technology enterprise&quot;, we
                  are committed to developing power semiconductor device solutions and other key products, creating
                  commercial value for customers and end-users, and forging ahead with accumulated strengths.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={teamRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Executive Team</h2>
            <div className="w-16 h-1 bg-[#E94709] mx-auto mt-4" />
            <p className="mt-6 text-gray-600">
              We are a team of professionals with extensive technical backgrounds in product development, gained from
              leading companies both domestically and internationally.
            </p>
            <p className="mt-4 text-gray-600">
              The members of our team are young and dynamic, with an average age of 38 years old, showcasing a strong
              sense of vitality and a penchant for innovation.
            </p>
          </motion.div>

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
                  <AnimatedNumber value={stat.value} active={isTeamInView} />
                  <span className="text-lg">{stat.suffix}</span>
                </div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={certRef}
        id="certifications"
        className="relative py-20 bg-gray-50 overflow-hidden scroll-mt-20"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[15vw] font-bold text-gray-200 whitespace-nowrap select-none">CERTIFIED</span>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCertInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Certifications &amp; Qualifications</h2>
            <div className="w-16 h-1 bg-[#E94709] mx-auto mt-4" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isCertInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl bg-white">
                <Image
                  src={r.honorImageUrl}
                  alt="Certifications & Qualifications"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isCertInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#E94709]/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#E94709]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{r.honorTitle}</h3>
              </div>
              <p className="text-[#E94709] font-medium mb-6 pl-13">{r.honorLead}</p>

              <div className="space-y-6">
                {r.honorYears.map((honor) => (
                  <div key={honor.year}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#E94709]">◇</span>
                      <span className="font-semibold text-gray-900">{honor.year} year</span>
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

              <Button className="mt-8 bg-[#E94709] hover:bg-[#D13E06] text-white">
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
