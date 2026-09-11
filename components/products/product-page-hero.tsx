"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface ProductPageHeroProps {
  subtitle: string
}

export function ProductPageHero({ subtitle }: ProductPageHeroProps) {
  const scrollToCatalog = () => {
    document.getElementById("product-catalog")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative isolate flex h-[460px] w-full items-center justify-center overflow-hidden bg-[#16191d] sm:h-[50vh] sm:min-h-[400px]">
      <Image
        src="/images/products/product-hero-composite-v2.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-[center_center] sm:block"
        aria-hidden="true"
      />
      <Image
        src="/images/products/product-hero-composite-v2.png"
        alt=""
        width={1776}
        height={887}
        priority
        sizes="100vw"
        className="absolute inset-x-0 bottom-0 h-auto w-full object-contain sm:hidden"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/10" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 -translate-y-28 rounded-2xl bg-black/45 px-8 py-5 text-center text-white backdrop-blur-[3px] sm:translate-y-16"
      >
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Products</h1>
        <p className="mx-auto mt-3 max-w-[720px] text-lg text-white/90 md:text-xl">{subtitle}</p>
      </motion.div>

      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={scrollToCatalog}
        aria-label="Scroll to product catalog"
        className="absolute bottom-6 left-1/2 z-30 flex h-10 w-10 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-[#E94709] text-white transition-colors hover:bg-[#D13E06] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <ChevronDown className="h-5 w-5" aria-hidden="true" />
      </motion.button>
    </section>
  )
}
