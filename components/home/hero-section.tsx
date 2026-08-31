"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { HomeHeroSlide } from "@/lib/sanity/home-page"
import { getHeroSlides, type SenndikHeroSlide } from "@/lib/hero-slides"

const DEFAULT_PRIMARY_CTA = { label: "Explore Products", href: "/products" }
const DEFAULT_SECONDARY_CTA = { label: "Request a Quote", href: "/support" }

export type HeroSectionProps = {
  /** Sanity「首页轮播图」有数据时使用；否则用内置默认轮播 */
  cmsSlides?: HomeHeroSlide[]
  cmsPrimaryCta?: { label: string; href: string }
  cmsSecondaryCta?: { label: string; href: string }
}

export function HeroSection({ cmsSlides, cmsPrimaryCta, cmsSecondaryCta }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const bannerSlides = useMemo(
    () => getHeroSlides(cmsSlides as SenndikHeroSlide[] | undefined),
    [cmsSlides],
  )

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    setCurrentSlide(0)
  }, [bannerSlides])

  const slide = bannerSlides[currentSlide] ?? bannerSlides[0]
  const showCopy = Boolean(slide?.fullBleedCopy)
  const primaryCta = slide?.primaryCta ?? cmsPrimaryCta ?? DEFAULT_PRIMARY_CTA
  const secondaryCta = slide?.secondaryCta ?? cmsSecondaryCta ?? DEFAULT_SECONDARY_CTA

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
  }, [bannerSlides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
  }, [bannerSlides.length])

  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion) return

    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide, prefersReducedMotion])

  return (
    <section
      className="relative min-h-[100dvh] w-full overflow-hidden bg-slate-100"
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
          transition={{ duration: prefersReducedMotion ? 0 : 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.title || "Banner"}
            fill
            className="hidden object-cover md:block"
            priority
          />
          <Image
            src={slide.mobileImage || slide.image}
            alt=""
            fill
            className="object-cover md:hidden"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {showCopy && (
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/55 to-transparent md:bg-gradient-to-r md:from-white/95 md:via-white/70 md:to-transparent" />
      )}

      {/* Content */}
      <div className="container relative z-10 mx-auto flex min-h-[100dvh] items-start px-4 pt-28 md:items-center md:pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            {showCopy && (
              <>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-balance text-4xl font-bold leading-[1.05] text-slate-950 md:text-5xl lg:text-6xl"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mt-5 max-w-lg text-base leading-relaxed text-slate-700 md:text-lg"
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
                    <Button className="bg-[#E94709] px-7 py-6 text-base text-white hover:bg-[#C73800] focus-visible:ring-2 focus-visible:ring-[#E94709] focus-visible:ring-offset-2">
                      {primaryCta.label}
                    </Button>
                  </Link>
                  <Link href={secondaryCta.href}>
                    <Button variant="outline" className="border-slate-900 bg-white/80 px-7 py-6 text-base text-slate-900 hover:bg-white focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2">
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
      {bannerSlides.length > 1 && <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-900 shadow-sm backdrop-blur-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E94709] md:flex"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>}
      {bannerSlides.length > 1 && <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-900 shadow-sm backdrop-blur-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E94709] md:flex"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>}

      {/* Slide Indicators */}
      {bannerSlides.length > 1 && <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
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
      </div>}
    </section>
  )
}
