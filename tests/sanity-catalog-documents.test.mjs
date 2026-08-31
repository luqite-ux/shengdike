import assert from "node:assert/strict"
import test from "node:test"

import manifest from "../data/senndik-customer-catalog.json" with { type: "json" }
import { createSanityCatalogDocuments } from "../studio/scripts/seed-customer-catalog.mjs"

test("creates deterministic parent and child category documents", () => {
  const docs = createSanityCatalogDocuments(manifest)
  const parent = docs.categories.find((doc) => doc._id === "productCategory.power-regulator")
  const child = docs.categories.find((doc) => doc._id === "productCategory.power-regulator.single-phase-output")

  assert.equal(parent.title, "Power Regulator")
  assert.equal(parent.parent, undefined)
  assert.deepEqual(child.parent, { _type: "reference", _ref: parent._id })
})

test("products reference leaf categories and preserve customer asset URLs", () => {
  const docs = createSanityCatalogDocuments(manifest)
  const product = docs.products.find((doc) => doc.slug.current === "sdk13")

  assert.equal(product.category._ref, "productCategory.power-regulator.single-phase-output")
  assert.match(product.imageUrl, /^https:\/\/zcximandun\.com\/customer-products\//)
  assert.match(product.datasheetUrl, /^https:\/\/zcximandun\.com\/customer-products\/.+\/datasheet\.pdf$/)
})

test("products without manuals omit datasheetUrl", () => {
  const docs = createSanityCatalogDocuments(manifest)
  const product = docs.products.find((doc) => doc.slug.current === "sdd-5s48")

  assert.ok(product)
  assert.equal("datasheetUrl" in product, false)
})

test("document IDs are unique and repeated generation is identical", () => {
  const first = createSanityCatalogDocuments(manifest)
  const second = createSanityCatalogDocuments(manifest)
  const allIds = [...first.categories, ...first.products].map((doc) => doc._id)

  assert.equal(new Set(allIds).size, allIds.length)
  assert.deepEqual(first, second)
})

test("all public document titles are English-only", () => {
  const docs = createSanityCatalogDocuments(manifest)
  for (const doc of [...docs.categories, ...docs.products]) {
    assert.equal(/[\u3400-\u9fff]/.test(doc.title || doc.name || ""), false)
  }
})
