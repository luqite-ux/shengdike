import assert from "node:assert/strict"
import test from "node:test"

import { getDatasheetAction } from "../lib/datasheet-action.ts"

test("returns a direct PDF download action for a customer-owned manual", () => {
  assert.deepEqual(
    getDatasheetAction({
      id: "sdk13",
      model: "SDK13",
      name: "SDK13",
      datasheetUrl: "/customer-products/power-regulator/sdk13/datasheet.pdf",
    }),
    {
      href: "/customer-products/power-regulator/sdk13/datasheet.pdf",
      downloadName: "SDK13-datasheet.pdf",
      label: "Download Datasheet",
    },
  )
})

test("supports a Sanity HTTPS PDF", () => {
  const action = getDatasheetAction({
    id: "sdk13",
    model: "SDK13",
    name: "SDK13",
    datasheetUrl: "https://cdn.sanity.io/files/project/dataset/manual.pdf",
  })
  assert.equal(action?.href, "https://cdn.sanity.io/files/project/dataset/manual.pdf")
})

test("returns null for a missing or unsafe manual", () => {
  assert.equal(getDatasheetAction({ id: "no-pdf", model: "NO-PDF", name: "NO-PDF" }), null)
  assert.equal(
    getDatasheetAction({ id: "unsafe", model: "UNSAFE", name: "UNSAFE", datasheetUrl: "javascript:alert(1)" }),
    null,
  )
})

test("sanitizes the browser download filename", () => {
  const action = getDatasheetAction({
    id: "sdk32",
    model: "SDK32 / AC",
    name: "SDK32 AC",
    datasheetUrl: "/customer-products/sdk32/datasheet.pdf",
  })
  assert.equal(action?.downloadName, "SDK32-AC-datasheet.pdf")
})
