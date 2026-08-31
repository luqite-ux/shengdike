import assert from "node:assert/strict"
import test from "node:test"

import {
  countProductsByCategory,
  filterCatalogProducts,
  normalizeCatalogProduct,
  resolveDatasheetUrl,
} from "../lib/catalog-model.ts"

const fallbackProduct = {
  id: "sdk13",
  slug: "sdk13",
  name: "SDK13",
  model: "SDK13",
  primaryCategory: { id: "power-regulator", name: "Power Regulator", slug: "power-regulator" },
  secondaryCategory: { id: "power-regulator:single-phase-output", name: "Single-phase Output", slug: "single-phase-output" },
  image: "/customer-products/power-regulator/single-phase-output/sdk13/product.png",
  datasheetUrl: "/customer-products/power-regulator/single-phase-output/sdk13/datasheet.pdf",
}

test("normalizes a fallback manifest product", () => {
  const product = normalizeCatalogProduct(fallbackProduct)

  assert.equal(product.category, "power-regulator")
  assert.equal(product.categoryName, "Power Regulator")
  assert.equal(product.secondaryCategory, "single-phase-output")
  assert.equal(product.secondaryCategoryName, "Single-phase Output")
})

test("normalizes a Sanity leaf category and its parent", () => {
  const product = normalizeCatalogProduct({
    id: "sdk13",
    name: "SDK13",
    model: "SDK13",
    image: "https://cdn.sanity.io/sdk13.png",
    category: { slug: "single-phase-output", name: "Single-phase Output" },
    parentCategory: { slug: "power-regulator", name: "Power Regulator" },
  })

  assert.equal(product.category, "power-regulator")
  assert.equal(product.secondaryCategory, "single-phase-output")
})

test("filters by primary, secondary and English name or model", () => {
  const products = [
    normalizeCatalogProduct(fallbackProduct),
    normalizeCatalogProduct({
      ...fallbackProduct,
      id: "sdk37",
      slug: "sdk37",
      name: "SDK37 Three Phase",
      model: "SDK37",
      secondaryCategory: { id: "power-regulator:three-phase-output", name: "Three-phase Output", slug: "three-phase-output" },
    }),
  ]

  assert.equal(filterCatalogProducts(products, { primary: "power-regulator" }).length, 2)
  assert.deepEqual(
    filterCatalogProducts(products, { primary: "power-regulator", secondary: "three-phase-output" }).map((product) => product.id),
    ["sdk37"],
  )
  assert.deepEqual(filterCatalogProducts(products, { search: "three phase" }).map((product) => product.id), ["sdk37"])
  assert.deepEqual(filterCatalogProducts(products, { search: "SDK13" }).map((product) => product.id), ["sdk13"])
})

test("counts primary and secondary products from normalized records", () => {
  const products = [normalizeCatalogProduct(fallbackProduct)]
  const counts = countProductsByCategory(products)

  assert.equal(counts.all, 1)
  assert.equal(counts.primary["power-regulator"], 1)
  assert.equal(counts.secondary["power-regulator:single-phase-output"], 1)
})

test("allows only supported datasheet URL forms", () => {
  assert.equal(resolveDatasheetUrl({ datasheetUrl: "/customer-products/sdk13/datasheet.pdf" }), "/customer-products/sdk13/datasheet.pdf")
  assert.equal(resolveDatasheetUrl({ datasheetUrl: "https://cdn.sanity.io/sdk13.pdf" }), "https://cdn.sanity.io/sdk13.pdf")
  assert.equal(resolveDatasheetUrl({ datasheetUrl: "javascript:alert(1)" }), undefined)
  assert.equal(resolveDatasheetUrl({ datasheetUrl: "/other-folder/file.pdf" }), undefined)
  assert.equal(resolveDatasheetUrl({ datasheetAssetUrl: "https://cdn.sanity.io/asset.pdf" }), "https://cdn.sanity.io/asset.pdf")
})
