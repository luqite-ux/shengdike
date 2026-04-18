"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { useSiteMarketing } from "@/components/site-marketing-provider"

export function AboutSection() {
  const m = useSiteMarketing()
  const a = m.homeAbout
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
              <Image src={a.leftImageUrl} alt="SENNDIK Company Building" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-white">{a.overlayTitle}</h3>
                  <div className="w-16 h-1 bg-[#E94709] mt-3" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-gray-600 leading-relaxed text-lg">{a.body}</p>

            <div className="mt-8 grid grid-cols-2 gap-6">
              {a.stats.map((s) => (
                <div key={s.label} className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-[#E94709]">{s.value}</div>
                  <div className="text-gray-600 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <Link href={a.ctaHref} className="inline-block mt-8">
              <Button className="bg-[#E94709] hover:bg-[#D13E06] text-white">{a.ctaLabel}</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
