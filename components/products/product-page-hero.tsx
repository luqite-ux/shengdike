"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

const PRODUCT_IMAGES = {
  dinRail: "/customer-products/din-rail-mount/ac-output/sdk32-horizontal-ac/product.png",
  smartSsr: "/customer-products/panel-mount/ac-output/sda25-diagnostic/product.png",
  regulator: "/customer-products/power-regulator/single-phase-output/sdk13/product.png",
} as const

interface ProductPageHeroProps {
  subtitle: string
}

export function ProductPageHero({ subtitle }: ProductPageHeroProps) {
  const scrollToCatalog = () => {
    document.getElementById("product-catalog")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative isolate flex h-[50vh] min-h-[400px] items-center justify-center overflow-hidden bg-[#16191d]">
      <Image
        src="/images/products/product-hero-stage.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/25" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
        <div className="absolute bottom-0 left-[1%] hidden h-[70%] w-[34%] sm:block lg:left-[2%] lg:h-[76%] lg:w-[31%]">
          <Image
            src={PRODUCT_IMAGES.dinRail}
            alt=""
            fill
            sizes="36vw"
            className="object-contain object-left-bottom drop-shadow-[0_24px_28px_rgba(0,0,0,0.55)]"
          />
        </div>

        <div className="absolute bottom-0 left-[5%] h-[52%] w-[40%] sm:left-[38%] sm:h-[48%] sm:w-[24%] lg:left-[40%] lg:w-[20%]">
          <Image
            src={PRODUCT_IMAGES.smartSsr}
            alt=""
            fill
            sizes="(max-width: 639px) 43vw, 28vw"
            className="object-contain object-center-bottom drop-shadow-[0_22px_24px_rgba(0,0,0,0.55)]"
          />
        </div>

        <div className="absolute bottom-0 right-[3%] h-[55%] w-[44%] sm:right-[5%] sm:h-[62%] sm:w-[28%] lg:right-[7%] lg:w-[24%]">
          <Image
            src={PRODUCT_IMAGES.regulator}
            alt=""
            fill
            sizes="(max-width: 639px) 48vw, 34vw"
            className="object-contain object-right-bottom drop-shadow-[0_24px_28px_rgba(0,0,0,0.55)]"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 -translate-y-12 px-5 text-center text-white sm:-translate-y-10"
      >
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Products</h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-white/85 md:text-xl">{subtitle}</p>
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
