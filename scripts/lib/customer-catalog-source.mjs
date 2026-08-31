import { readdir } from "node:fs/promises"
import path from "node:path"

const PRIMARY_CATEGORIES = new Map([
  ["PCB安装", { name: "PCB Mount", slug: "pcb-mount" }],
  ["导轨安装", { name: "DIN Rail Mount", slug: "din-rail-mount" }],
  ["面板安装", { name: "Panel Mount", slug: "panel-mount" }],
  ["工业级固态继电器", { name: "Industrial Grade SSR", slug: "industrial-grade-ssr" }],
  ["电力调整器", { name: "Power Regulator", slug: "power-regulator" }],
  ["工业控制器", { name: "Industrial Controller", slug: "industrial-controller" }],
  ["可控硅模块", { name: "Thyristor Module", slug: "thyristor-module" }],
])

const SECONDARY_CATEGORIES = new Map([
  ["交流输出", { name: "AC Output", slug: "ac-output" }],
  ["直流输出", { name: "DC Output", slug: "dc-output" }],
  ["双路交流", { name: "Dual-channel AC", slug: "dual-channel-ac" }],
  ["双路直流", { name: "Dual-channel DC", slug: "dual-channel-dc" }],
  ["单相输出", { name: "Single-phase Output", slug: "single-phase-output" }],
  ["三相输出", { name: "Three-phase Output", slug: "three-phase-output" }],
  ["三相交流", { name: "Three-phase AC", slug: "three-phase-ac" }],
  ["三相交流输出SDK66", { name: "Three-phase AC Output", slug: "three-phase-ac-output" }],
  ["交流输出差SDK2卧式", { name: "AC Output, Horizontal SDK2", slug: "ac-output-horizontal-sdk2" }],
  ["直流输出差SDK2卧式", { name: "DC Output, Horizontal SDK2", slug: "dc-output-horizontal-sdk2" }],
])

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"])

function identity(sourceName, mapped) {
  if (!mapped) return null
  return { sourceName, ...mapped }
}

export function translatePrimaryCategory(sourceName) {
  return identity(sourceName, PRIMARY_CATEGORIES.get(sourceName))
}

export function translateSecondaryCategory(sourceName) {
  return identity(sourceName, SECONDARY_CATEGORIES.get(sourceName))
}

function isEnglishManual(filePath) {
  const name = path.basename(filePath).toLowerCase()
  return name.includes("english") || name.includes("英文")
}

export function selectDatasheet(paths) {
  const pdfs = paths
    .filter((filePath) => path.extname(filePath).toLowerCase() === ".pdf")
    .sort((a, b) => a.localeCompare(b, "en"))
  return pdfs.find(isEnglishManual) ?? pdfs[0] ?? null
}

async function listDirectories(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({ name: entry.name, path: path.join(directory, entry.name) }))
    .sort((a, b) => a.name.localeCompare(b.name, "zh-CN"))
}

async function listFilesRecursively(directory) {
  const files = []
  const entries = await readdir(directory, { withFileTypes: true })
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name, "zh-CN"))) {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await listFilesRecursively(entryPath)))
    } else if (entry.isFile()) {
      files.push(entryPath)
    }
  }
  return files
}

function selectImage(paths) {
  return (
    paths
      .filter((filePath) => IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, "zh-CN"))[0] ?? null
  )
}

async function looksLikeProductDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  return entries.some((entry) => {
    if (entry.isDirectory()) return entry.name === "图片" || entry.name === "说明书"
    if (!entry.isFile()) return false
    const extension = path.extname(entry.name).toLowerCase()
    return IMAGE_EXTENSIONS.has(extension) || extension === ".pdf"
  })
}

async function parseProductDirectory({
  directory,
  primaryCategory,
  secondaryCategory,
  products,
  warnings,
  seenIdentities,
}) {
  const files = await listFilesRecursively(directory.path)
  const imagePath = selectImage(files)
  const datasheetPath = selectDatasheet(files)
  const identityKey = [primaryCategory.slug, secondaryCategory?.slug ?? "root", directory.name]
    .join(":")
    .toLowerCase()

  if (seenIdentities.has(identityKey)) {
    warnings.push({
      code: "DUPLICATE_PRODUCT_IDENTITY",
      sourcePath: directory.path,
      sourceName: directory.name,
    })
    return
  }
  seenIdentities.add(identityKey)

  if (!imagePath) {
    warnings.push({
      code: "MISSING_IMAGE",
      sourcePath: directory.path,
      sourceName: directory.name,
    })
    return
  }

  products.push({
    sourcePrimary: primaryCategory.sourceName,
    sourceSecondary: secondaryCategory?.sourceName ?? null,
    model: directory.name,
    sourcePath: directory.path,
    imagePath,
    datasheetPath,
  })

  if (!datasheetPath) {
    warnings.push({
      code: "MISSING_MANUAL",
      sourcePath: directory.path,
      sourceName: directory.name,
    })
  }
}

export async function buildCatalogSource(rootDir) {
  const categories = []
  const products = []
  const warnings = []
  const seenIdentities = new Set()

  for (const primaryDirectory of await listDirectories(rootDir)) {
    const primaryCategory = translatePrimaryCategory(primaryDirectory.name)
    if (!primaryCategory) {
      warnings.push({
        code: "UNKNOWN_PRIMARY_CATEGORY",
        sourcePath: primaryDirectory.path,
        sourceName: primaryDirectory.name,
      })
      continue
    }

    const category = { ...primaryCategory, secondaryCategories: [] }
    categories.push(category)

    for (const childDirectory of await listDirectories(primaryDirectory.path)) {
      if (await looksLikeProductDirectory(childDirectory.path)) {
        await parseProductDirectory({
          directory: childDirectory,
          primaryCategory,
          secondaryCategory: null,
          products,
          warnings,
          seenIdentities,
        })
        continue
      }

      const secondaryCategory = translateSecondaryCategory(childDirectory.name)
      if (!secondaryCategory) {
        warnings.push({
          code: "UNKNOWN_SECONDARY_CATEGORY",
          sourcePath: childDirectory.path,
          sourceName: childDirectory.name,
        })
        continue
      }

      category.secondaryCategories.push(secondaryCategory)
      for (const productDirectory of await listDirectories(childDirectory.path)) {
        await parseProductDirectory({
          directory: productDirectory,
          primaryCategory,
          secondaryCategory,
          products,
          warnings,
          seenIdentities,
        })
      }
    }
  }

  return { categories, products, warnings }
}
