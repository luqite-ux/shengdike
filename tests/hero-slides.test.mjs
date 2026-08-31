import assert from "node:assert/strict"
import test from "node:test"

import { SENNDIK_HERO_SLIDE, getHeroSlides } from "../lib/hero-slides.ts"

test("places the approved SENNDIK product Banner first", () => {
  const slides = getHeroSlides()

  assert.equal(slides[0].key, "senndik-engineered-control")
  assert.equal(slides[0].image, "/banners/senndik-relay-desktop.webp")
  assert.equal(slides[0].mobileImage, "/banners/senndik-relay-mobile.webp")
})

test("keeps CMS slides without duplicating the approved Banner", () => {
  const slides = getHeroSlides([
    SENNDIK_HERO_SLIDE,
    { key: "cms-1", image: "/cms.jpg", title: "CMS", subtitle: "CMS slide" },
  ])

  assert.deepEqual(slides.map((slide) => slide.key), ["senndik-engineered-control", "cms-1"])
})

test("uses exact English CTA copy and customer routes", () => {
  assert.deepEqual(SENNDIK_HERO_SLIDE.primaryCta, { label: "Explore Products", href: "/products" })
  assert.deepEqual(SENNDIK_HERO_SLIDE.secondaryCta, { label: "Request a Quote", href: "/support" })
})

test("does not include the rejected legacy catalogue-grid Banner", () => {
  const serialized = JSON.stringify(getHeroSlides())
  assert.equal(serialized.includes("shendike-banner-redesign-v2"), false)
  assert.equal(serialized.includes("banner1-PjpyLk"), false)
})
