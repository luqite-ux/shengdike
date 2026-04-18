"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { HomeHeroSlide } from "@/lib/sanity/home-page"

const DEFAULT_PRIMARY_CTA = { label: "+ Explore More", href: "/about/company-profile" }
const DEFAULT_SECONDARY_CTA = { label: "+ View Products", href: "/products" }

const defaultBannerSlides: HomeHeroSlide[] = [
  {
    key: "d1",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner1-5jVnfhrq76pjfv2nW4zVxbW1jIyXAr.jpg",
    title: "SENNDIK",
    subtitle: "The Solid State Relay Specialist",
    fullBleedCopy: true,
  },
  {
    key: "d2",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner2-YmZyibTUQUwyIooHJiMVd7oirdtm5G.jpg",
    title: "SENNDIK",
    subtitle: "Trusted Solutions for Industrial Control",
    fullBleedCopy: true,
  },
  {
    key: "d3",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner3-nL7Y4BOmAhXiB1wlD6qrWaqNm9LrIT.jpg",
    title: "SOLID STATE RELAYS",
    subtitle: "High-Performance Solid State Switching Solutions",
    fullBleedCopy: false,
  },
  {
    key: "d4",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner4-Evk72rTsKrUZsuEEWfVYMfWWj8SBOW.jpg",
    title: "HEATSINKS",
    subtitle: "Optimal Thermal Management for Solid State Relays",
    fullBleedCopy: false,
  },
  {
    key: "d5",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner5-YP7zViHqM9mTHPWtmf2CweSF5i5YVI.jpg",
    title: "INDUSTRIAL GRADE",
    subtitle: "Reliable Performance for Demanding Industrial Applications",
    fullBleedCopy: false,
  },
  {
    key: "d6",
    image: "/banner6.jpg",
    title: "SINGLE-PHASE SSR",
    subtitle: "DC to DC / DC to AC / AC to AC Solutions",
    fullBleedCopy: false,
  },
]

export type HeroSectionProps = {
  /** Sanity「首页轮播图」有数据时使用；否则用内置默认轮播 */
  cmsSlides?: HomeHeroSlide[]
  cmsPrimaryCta?: { label: string; href: string }
  cmsSecondaryCta?: { label: string; href: string }
}

export function HeroSection({ cmsSlides, cmsPrimaryCta, cmsSecondaryCta }: HeroSectionProps) {
  const bannerSlides = useMemo(() => {
    if (cmsSlides?.length) return cmsSlides
    return defaultBannerSlides
  }, [cmsSlides])

  const primaryCta = cmsSlides?.length
    ? (cmsPrimaryCta ?? DEFAULT_PRIMARY_CTA)
    : DEFAULT_PRIMARY_CTA
  const secondaryCta = cmsSlides?.length
    ? (cmsSecondaryCta ?? DEFAULT_SECONDARY_CTA)
    : DEFAULT_SECONDARY_CTA

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    setCurrentSlide(0)
  }, [bannerSlides])

  const slide = bannerSlides[currentSlide] ?? bannerSlides[0]
  const showCopy = Boolean(slide?.fullBleedCopy)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
  }, [bannerSlides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
  }, [bannerSlides.length])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  return (
    <section
      className="relative h-screen min-h-[600px] w-full overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.title || "Banner"}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {showCopy && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            {showCopy && (
              <>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mt-6 text-lg md:text-xl text-white/90"
                >
                  {slide.subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="mt-8 flex flex-wrap gap-4"
                >
                  <Link href={primaryCta.href}>
                    <Button className="bg-[#E94709] hover:bg-[#D13E06] text-white px-8 py-6 text-lg">
                      {primaryCta.label}
                    </Button>
                  </Link>
                  <Link href={secondaryCta.href}>
                    <Button className="bg-[#E94709] hover:bg-[#D13E06] text-white px-8 py-6 text-lg">
                      {secondaryCta.label}
                    </Button>
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {bannerSlides.map((_, index) => (
          <button
            key={bannerSlides[index]?.key ?? index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                ? "bg-[#E94709] w-8"
                : "bg-white/50 hover:bg-white/80"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
