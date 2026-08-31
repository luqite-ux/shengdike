import assert from "node:assert/strict"
import test from "node:test"

import {
  buildCatalogSearchParams,
  parseCatalogSearchParams,
  selectPrimaryCategory,
} from "../lib/catalog-state.ts"

const categories = [
  {
    id: "power-regulator",
    name: "Power Regulator",
    slug: "power-regulator",
    secondaryCategories: [
      { id: "power-regulator:single-phase-output", name: "Single-phase Output", slug: "single-phase-output" },
      { id: "power-regulator:three-phase-output", name: "Three-phase Output", slug: "three-phase-output" },
    ],
  },
]

test("parses all-products state when query values are missing", () => {
  assert.deepEqual(parseCatalogSearchParams(new URLSearchParams(), categories), {
    primary: "all",
    secondary: "",
  })
})

test("keeps a valid primary and secondary selection", () => {
  const params = new URLSearchParams("category=power-regulator&subcategory=three-phase-output")
  assert.deepEqual(parseCatalogSearchParams(params, categories), {
    primary: "power-regulator",
    secondary: "three-phase-output",
  })
})

test("drops unknown and incompatible query values", () => {
  assert.deepEqual(
    parseCatalogSearchParams(new URLSearchParams("category=unknown&subcategory=three-phase-output"), categories),
    { primary: "all", secondary: "" },
  )
  assert.deepEqual(
    parseCatalogSearchParams(new URLSearchParams("category=power-regulator&subcategory=dc-output"), categories),
    { primary: "power-regulator", secondary: "" },
  )
})

test("selecting a new primary clears the prior secondary and page", () => {
  assert.deepEqual(selectPrimaryCategory("panel-mount"), {
    primary: "panel-mount",
    secondary: "",
    page: 1,
  })
})

test("builds canonical shareable query parameters", () => {
  assert.equal(buildCatalogSearchParams({ primary: "all", secondary: "" }), "")
  assert.equal(
    buildCatalogSearchParams({ primary: "power-regulator", secondary: "single-phase-output" }),
    "category=power-regulator&subcategory=single-phase-output",
  )
})
