import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("favicon is a SENNDIK brand mark rather than the template icon", async () => {
  const svg = await readFile(new URL("../public/icon.svg", import.meta.url), "utf8")

  assert.match(svg, /aria-label="SENNDIK"/)
  assert.match(svg, /#E60012/i)
  assert.equal(svg.includes("clip0_7960_43945"), false)
})
