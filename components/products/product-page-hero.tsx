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
    <section className="relative isolate flex h-[56vh] min-h-[460px] max-h-[620px] items-center justify-center overflow-hidden bg-[#16191d]">
      <Image
        src="/images/products/product-hero-stage.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/15" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/25 to-transparent" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 z-10 mx-auto max-w-[1920px]" aria-hidden="true">
        <div data-hero-product="primary" className="absolute bottom-0 left-0 h-[67%] w-[58%] sm:h-[88%] sm:w-[42%] lg:left-[1%] lg:w-[39%]">
          <Image
            src={PRODUCT_IMAGES.dinRail}
            alt=""
            fill
            sizes="(max-width: 639px) 62vw, 44vw"
            className="object-contain object-left-bottom drop-shadow-[0_24px_28px_rgba(0,0,0,0.55)]"
          />
        </div>

        <div className="absolute bottom-[1%] left-[29%] h-[57%] w-[49%] sm:left-[31%] sm:h-[73%] sm:w-[38%] lg:left-[32%] lg:h-[78%] lg:w-[36%]">
          <Image
            src={PRODUCT_IMAGES.smartSsr}
            alt=""
            fill
            sizes="(max-width: 639px) 52vw, 40vw"
            className="scale-[1.2] object-contain object-center-bottom drop-shadow-[0_22px_24px_rgba(0,0,0,0.55)] sm:scale-[1.3]"
          />
        </div>

        <div className="absolute bottom-0 right-0 h-[63%] w-[48%] sm:right-[1%] sm:h-[84%] sm:w-[38%] lg:right-[2%] lg:h-[88%] lg:w-[35%]">
          <Image
            src={PRODUCT_IMAGES.regulator}
            alt=""
            fill
            sizes="(max-width: 639px) 51vw, 40vw"
            className="object-contain object-right-bottom drop-shadow-[0_24px_28px_rgba(0,0,0,0.55)]"
          />
        </div>

      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 -translate-y-28 rounded-2xl bg-black/55 px-8 py-5 text-center text-white backdrop-blur-[3px] sm:-translate-y-24"
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
