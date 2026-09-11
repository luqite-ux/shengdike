import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("products page uses the approved complete customer-product composition", async () => {
  const page = await readFile(new URL("../app/products/page.tsx", import.meta.url), "utf8")
  const hero = await readFile(new URL("../components/products/product-page-hero.tsx", import.meta.url), "utf8")

  assert.match(page, /<ProductPageHero/)
  assert.doesNotMatch(page, /productsList\.heroBackgroundUrl/)
  assert.match(hero, /product-hero-composite-v2\.png/)
  assert.doesNotMatch(hero, /PRODUCT_IMAGES/)
  assert.doesNotMatch(hero, /customer-products\//)
  assert.match(hero, /object-cover/)
  assert.match(hero, /aria-hidden="true"/)
  assert.doesNotMatch(hero, /absolute -bottom/)
  assert.doesNotMatch(hero, /-left-\[/)
  assert.match(hero, /document\.getElementById\("product-catalog"\)\?\.scrollIntoView/)
  assert.match(hero, /aria-label="Scroll to product catalog"/)
  assert.match(page, /id="product-catalog"/)
  assert.match(hero, /max-w-\[720px\]/)
  assert.match(hero, /object-\[center_center\]/)
  assert.doesNotMatch(hero, /sm:aspect-\[2\/1\]/)
  assert.match(hero, /sm:h-\[50vh\]/)
  assert.match(hero, /sm:min-h-\[400px\]/)
})
