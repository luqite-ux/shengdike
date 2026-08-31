import assert from "node:assert/strict"
import { access, mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import test from "node:test"

import { buildCustomerCatalog, slugifyModel } from "../scripts/build-customer-catalog.mjs"

async function seedProduct(root, { model, manual = true, secondary = "交流输出" }) {
  const productRoot = path.join(root, "面板安装", secondary, model)
  await mkdir(path.join(productRoot, "图片"), { recursive: true })
  await writeFile(path.join(productRoot, "图片", "main.jpg"), "image")
  if (manual) {
    await mkdir(path.join(productRoot, "说明书"), { recursive: true })
    await writeFile(path.join(productRoot, "说明书", `${model} English.pdf`), "pdf")
  }
}

function containsAbsoluteSourcePath(value, sourceRoot) {
  if (typeof value === "string") return value.startsWith(sourceRoot)
  if (Array.isArray(value)) return value.some((item) => containsAbsoluteSourcePath(item, sourceRoot))
  if (value && typeof value === "object") {
    return Object.values(value).some((item) => containsAbsoluteSourcePath(item, sourceRoot))
  }
  return false
}

test("creates stable ASCII model slugs", () => {
  assert.equal(slugifyModel("SDA40S60-TC"), "sda40s60-tc")
  assert.equal(slugifyModel("SDK32(卧式DC)"), "sdk32-dc")
})

test("dry-run returns a manifest without writing output files", async (t) => {
  const sourceRoot = await mkdtemp(path.join(os.tmpdir(), "senndik-source-"))
  const projectRoot = await mkdtemp(path.join(os.tmpdir(), "senndik-project-"))
  t.after(() => Promise.all([
    rm(sourceRoot, { recursive: true, force: true }),
    rm(projectRoot, { recursive: true, force: true }),
  ]))
  await seedProduct(sourceRoot, { model: "MODEL-1" })

  const result = await buildCustomerCatalog({ sourceRoot, projectRoot, dryRun: true })

  assert.equal(result.manifest.products.length, 1)
  assert.equal(result.manifest.products[0].slug, "model-1")
  await assert.rejects(access(path.join(projectRoot, "data", "senndik-customer-catalog.json")))
})

test("write mode copies selected image and datasheet to deterministic public paths", async (t) => {
  const sourceRoot = await mkdtemp(path.join(os.tmpdir(), "senndik-source-"))
  const projectRoot = await mkdtemp(path.join(os.tmpdir(), "senndik-project-"))
  t.after(() => Promise.all([
    rm(sourceRoot, { recursive: true, force: true }),
    rm(projectRoot, { recursive: true, force: true }),
  ]))
  await seedProduct(sourceRoot, { model: "MODEL-2" })
  const staleAsset = path.join(projectRoot, "public", "customer-products", "stale.txt")
  await mkdir(path.dirname(staleAsset), { recursive: true })
  await writeFile(staleAsset, "stale")

  const result = await buildCustomerCatalog({ sourceRoot, projectRoot, dryRun: false })
  const product = result.manifest.products[0]

  assert.equal(product.image, "/customer-products/panel-mount/ac-output/model-2/product.jpg")
  assert.equal(product.datasheetUrl, "/customer-products/panel-mount/ac-output/model-2/datasheet.pdf")
  assert.equal(
    await readFile(path.join(projectRoot, "public", product.image.slice(1)), "utf8"),
    "image",
  )
  assert.equal(
    await readFile(path.join(projectRoot, "public", product.datasheetUrl.slice(1)), "utf8"),
    "pdf",
  )
  const writtenManifest = await readFile(
    path.join(projectRoot, "data", "senndik-customer-catalog.json"),
    "utf8",
  )
  const writtenReport = await readFile(
    path.join(projectRoot, "data", "senndik-customer-catalog-report.json"),
    "utf8",
  )
  assert.equal(containsAbsoluteSourcePath(JSON.parse(writtenManifest), sourceRoot), false)
  assert.equal(containsAbsoluteSourcePath(JSON.parse(writtenReport), sourceRoot), false)
  await assert.rejects(access(staleAsset))
})

test("products without manuals omit datasheetUrl", async (t) => {
  const sourceRoot = await mkdtemp(path.join(os.tmpdir(), "senndik-source-"))
  const projectRoot = await mkdtemp(path.join(os.tmpdir(), "senndik-project-"))
  t.after(() => Promise.all([
    rm(sourceRoot, { recursive: true, force: true }),
    rm(projectRoot, { recursive: true, force: true }),
  ]))
  await seedProduct(sourceRoot, { model: "MODEL-NO-PDF", manual: false })

  const result = await buildCustomerCatalog({ sourceRoot, projectRoot, dryRun: true })

  assert.equal(result.manifest.products[0].datasheetUrl, undefined)
  assert.ok(result.report.warnings.some((warning) => warning.code === "MISSING_MANUAL"))
})

test("duplicate model slugs are disambiguated by category path", async (t) => {
  const sourceRoot = await mkdtemp(path.join(os.tmpdir(), "senndik-source-"))
  const projectRoot = await mkdtemp(path.join(os.tmpdir(), "senndik-project-"))
  t.after(() => Promise.all([
    rm(sourceRoot, { recursive: true, force: true }),
    rm(projectRoot, { recursive: true, force: true }),
  ]))
  await seedProduct(sourceRoot, { model: "MODEL-X", secondary: "交流输出" })
  await seedProduct(sourceRoot, { model: "MODEL-X", secondary: "直流输出" })

  const result = await buildCustomerCatalog({ sourceRoot, projectRoot, dryRun: true })
  const slugs = result.manifest.products.map((product) => product.slug)

  assert.equal(new Set(slugs).size, 2)
  assert.ok(slugs.some((slug) => slug.includes("ac-output")))
  assert.ok(slugs.some((slug) => slug.includes("dc-output")))
})
