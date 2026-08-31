import assert from "node:assert/strict"
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import test from "node:test"

import {
  buildCatalogSource,
  selectDatasheet,
  translatePrimaryCategory,
  translateSecondaryCategory,
} from "../scripts/lib/customer-catalog-source.mjs"

async function createFixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "senndik-catalog-"))
  const nestedImageDir = path.join(
    root,
    "导轨安装",
    "直流输出",
    "SDK32(卧式DC)",
    "图片",
    "图片",
  )
  const nestedManualDir = path.join(
    root,
    "导轨安装",
    "直流输出",
    "SDK32(卧式DC)",
    "图片",
    "说明书",
  )

  await mkdir(nestedImageDir, { recursive: true })
  await mkdir(nestedManualDir, { recursive: true })
  await writeFile(path.join(nestedImageDir, "1.jpg"), "image")
  await writeFile(path.join(nestedManualDir, "SDK32 English manual.pdf"), "pdf")

  return root
}

test("translates the seven canonical primary categories", () => {
  assert.deepEqual(translatePrimaryCategory("PCB安装"), {
    sourceName: "PCB安装",
    name: "PCB Mount",
    slug: "pcb-mount",
  })
  assert.deepEqual(translatePrimaryCategory("可控硅模块"), {
    sourceName: "可控硅模块",
    name: "Thyristor Module",
    slug: "thyristor-module",
  })
})

test("translates known secondary categories without exposing Chinese", () => {
  assert.deepEqual(translateSecondaryCategory("直流输出"), {
    sourceName: "直流输出",
    name: "DC Output",
    slug: "dc-output",
  })
  assert.deepEqual(translateSecondaryCategory("交流输出差SDK2卧式"), {
    sourceName: "交流输出差SDK2卧式",
    name: "AC Output, Horizontal SDK2",
    slug: "ac-output-horizontal-sdk2",
  })
})

test("prefers an English manual when Chinese and English PDFs coexist", () => {
  assert.equal(
    selectDatasheet([
      "C:\\manuals\\SDA说明书.pdf",
      "C:\\manuals\\SDA English manual.pdf",
    ]),
    "C:\\manuals\\SDA English manual.pdf",
  )
})

test("parses primary, secondary and model folders and finds nested assets", async (t) => {
  const root = await createFixture()
  t.after(() => rm(root, { recursive: true, force: true }))

  const result = await buildCatalogSource(root)

  assert.equal(result.categories.length, 1)
  assert.equal(result.products.length, 1)
  assert.equal(result.products[0].model, "SDK32(卧式DC)")
  assert.match(result.products[0].imagePath, /1\.jpg$/)
  assert.match(result.products[0].datasheetPath, /English manual\.pdf$/)
})

test("reports unknown secondary categories instead of guessing public labels", async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "senndik-catalog-"))
  t.after(() => rm(root, { recursive: true, force: true }))
  const modelDir = path.join(root, "导轨安装", "未确认分类", "MODEL-1", "图片")
  await mkdir(modelDir, { recursive: true })
  await writeFile(path.join(modelDir, "1.png"), "image")

  const result = await buildCatalogSource(root)

  assert.equal(result.products.length, 0)
  assert.deepEqual(result.warnings[0], {
    code: "UNKNOWN_SECONDARY_CATEGORY",
    sourcePath: path.join(root, "导轨安装", "未确认分类"),
    sourceName: "未确认分类",
  })
})

test("reports missing manuals without excluding an otherwise valid product", async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "senndik-catalog-"))
  t.after(() => rm(root, { recursive: true, force: true }))
  const modelDir = path.join(root, "面板安装", "交流输出", "MODEL-NO-PDF", "图片")
  await mkdir(modelDir, { recursive: true })
  await writeFile(path.join(modelDir, "1.jpg"), "image")

  const result = await buildCatalogSource(root)

  assert.equal(result.products.length, 1)
  assert.equal(result.products[0].datasheetPath, null)
  assert.equal(result.warnings.at(-1).code, "MISSING_MANUAL")
})
