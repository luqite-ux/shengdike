"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image with Overlay Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/images/about-building.png"
                alt="SENNDIK Company Building"
                fill
                className="object-cover"
              />
              {/* Overlay Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-white">About SENNDIK</h3>
                  <div className="w-16 h-1 bg-[#E94709] mt-3" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-gray-600 leading-relaxed text-lg">
              SENNDIK is a leading industrial technology company specializing in solid state relay products, solutions and other critical components to create valuable business insights for customers and end users. Solid State Relay is What We Do.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-[#E94709]">14+</div>
                <div className="text-gray-600 mt-1">Years Experience</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-[#E94709]">50+</div>
                <div className="text-gray-600 mt-1">Countries Served</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-[#E94709]">35+</div>
                <div className="text-gray-600 mt-1">Patents Obtained</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-[#E94709]">100+</div>
                <div className="text-gray-600 mt-1">Team Members</div>
              </div>
            </div>

            <Link href="/about/company-profile" className="inline-block mt-8">
              <Button className="bg-[#E94709] hover:bg-[#D13E06] text-white">
                + Explore More
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
