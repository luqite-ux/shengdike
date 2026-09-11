import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("products page uses a customer-product hero instead of the generic background", async () => {
  const page = await readFile(new URL("../app/products/page.tsx", import.meta.url), "utf8")
  const hero = await readFile(new URL("../components/products/product-page-hero.tsx", import.meta.url), "utf8")

  assert.match(page, /<ProductPageHero/)
  assert.doesNotMatch(page, /productsList\.heroBackgroundUrl/)
  assert.match(hero, /product-hero-stage\.png/)
  assert.match(hero, /customer-products\/din-rail-mount\/ac-output\/sdk32-horizontal-ac\/product\.png/)
  assert.match(hero, /customer-products\/panel-mount\/ac-output\/sda25-diagnostic\/product\.png/)
  assert.match(hero, /customer-products\/power-regulator\/single-phase-output\/sdk13\/product\.png/)
  assert.doesNotMatch(hero, /customer-products\/power-regulator\/single-phase-output\/sdk23\/product\.png/)
  assert.match(hero, /object-contain/)
  assert.match(hero, /aria-hidden="true"/)
  assert.doesNotMatch(hero, /absolute -bottom/)
  assert.doesNotMatch(hero, /-left-\[/)
  assert.match(hero, /document\.getElementById\("product-catalog"\)\?\.scrollIntoView/)
  assert.match(hero, /aria-label="Scroll to product catalog"/)
  assert.match(page, /id="product-catalog"/)
  assert.doesNotMatch(hero, /data-hero-product="primary"[^>]+hidden/)
  assert.match(hero, /data-hero-product="primary"/)
  assert.match(hero, /h-\[88%\]/)
  assert.match(hero, /w-\[42%\]/)
  assert.match(hero, /max-w-\[720px\]/)
  assert.match(hero, /scale-\[1\.2\][^\"]+sm:scale-\[1\.3\]/)
})
