import { copyFile, mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { buildCatalogSource, translatePrimaryCategory, translateSecondaryCategory } from "./lib/customer-catalog-source.mjs"

export function slugifyModel(value) {
  return value
    .normalize("NFKC")
    .replace(/[\u3400-\u9fff]+/g, "-")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
}

function publicModelName(value) {
  return value
    .normalize("NFKC")
    .replace(/[\u3400-\u9fff]+/g, " ")
    .replace(/[()（）]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function ensureWithin(root, candidate) {
  const resolvedRoot = path.resolve(root)
  const resolvedCandidate = path.resolve(candidate)
  if (resolvedCandidate !== resolvedRoot && !resolvedCandidate.startsWith(`${resolvedRoot}${path.sep}`)) {
    throw new Error(`Refusing to write outside customer asset root: ${resolvedCandidate}`)
  }
  return resolvedCandidate
}

function buildCategories(sourceCategories) {
  return sourceCategories.map((primary, primaryIndex) => ({
    id: primary.slug,
    name: primary.name,
    slug: primary.slug,
    sortOrder: primaryIndex,
    secondaryCategories: primary.secondaryCategories.map((secondary, secondaryIndex) => ({
      id: `${primary.slug}:${secondary.slug}`,
      name: secondary.name,
      slug: secondary.slug,
      sortOrder: secondaryIndex,
    })),
  }))
}

function createManifest(source, sourceRoot) {
  const baseSlugCounts = new Map()
  for (const product of source.products) {
    const baseSlug = slugifyModel(product.model)
    baseSlugCounts.set(baseSlug, (baseSlugCounts.get(baseSlug) ?? 0) + 1)
  }

  const products = source.products.map((product, index) => {
    const primary = translatePrimaryCategory(product.sourcePrimary)
    const secondary = product.sourceSecondary
      ? translateSecondaryCategory(product.sourceSecondary)
      : null
    const baseSlug = slugifyModel(product.model)
    const slug = baseSlugCounts.get(baseSlug) > 1
      ? `${baseSlug}-${secondary?.slug ?? primary.slug}`
      : baseSlug
    const relativeAssetDirectory = path.posix.join(
      "customer-products",
      primary.slug,
      secondary?.slug ?? "general",
      slug,
    )
    const imageExtension = path.extname(product.imagePath).toLowerCase() || ".jpg"
    const manifestProduct = {
      id: slug,
      slug,
      name: publicModelName(product.model),
      model: publicModelName(product.model),
      sourceModel: product.model,
      primaryCategory: { id: primary.slug, name: primary.name, slug: primary.slug },
      secondaryCategory: secondary
        ? { id: `${primary.slug}:${secondary.slug}`, name: secondary.name, slug: secondary.slug }
        : null,
      image: `/${relativeAssetDirectory}/product${imageExtension}`,
      sortOrder: index,
      source: {
        directory: path.relative(sourceRoot, product.sourcePath),
        image: path.relative(sourceRoot, product.imagePath),
        datasheet: product.datasheetPath ? path.relative(sourceRoot, product.datasheetPath) : null,
      },
    }
    if (product.datasheetPath) {
      manifestProduct.datasheetUrl = `/${relativeAssetDirectory}/datasheet.pdf`
    }
    return manifestProduct
  })

  return {
    generatedAt: new Date().toISOString(),
    categories: buildCategories(source.categories),
    products,
  }
}

async function writeOutputs({ projectRoot, sourceRoot, manifest, report }) {
  const dataRoot = ensureWithin(projectRoot, path.join(projectRoot, "data"))
  const publicRoot = ensureWithin(projectRoot, path.join(projectRoot, "public", "customer-products"))
  await mkdir(dataRoot, { recursive: true })
  await mkdir(publicRoot, { recursive: true })

  for (const product of manifest.products) {
    const assetDirectory = ensureWithin(
      publicRoot,
      path.join(projectRoot, "public", path.dirname(product.image.slice(1))),
    )
    await mkdir(assetDirectory, { recursive: true })
    await copyFile(
      path.join(sourceRoot, product.source.image),
      ensureWithin(publicRoot, path.join(projectRoot, "public", product.image.slice(1))),
    )
    if (product.datasheetUrl && product.source.datasheet) {
      await copyFile(
        path.join(sourceRoot, product.source.datasheet),
        ensureWithin(publicRoot, path.join(projectRoot, "public", product.datasheetUrl.slice(1))),
      )
    }
  }

  await writeFile(
    path.join(dataRoot, "senndik-customer-catalog.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  )
  await writeFile(
    path.join(dataRoot, "senndik-customer-catalog-report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  )
}

export async function buildCustomerCatalog({ sourceRoot, projectRoot, dryRun = true }) {
  const source = await buildCatalogSource(sourceRoot)
  const manifest = createManifest(source, sourceRoot)
  const report = {
    dryRun,
    sourceFolder: path.basename(sourceRoot),
    categoryCount: manifest.categories.length,
    productCount: manifest.products.length,
    imageCount: manifest.products.length,
    datasheetCount: manifest.products.filter((product) => product.datasheetUrl).length,
    warnings: source.warnings.map((warning) => ({
      ...warning,
      sourcePath: path.relative(sourceRoot, warning.sourcePath),
    })),
  }

  if (!dryRun) await writeOutputs({ projectRoot, sourceRoot, manifest, report })
  return { manifest, report }
}

function parseArguments(argv) {
  const sourceIndex = argv.indexOf("--source")
  if (sourceIndex === -1 || !argv[sourceIndex + 1]) {
    throw new Error("Usage: node scripts/build-customer-catalog.mjs --source <folder> [--dry-run]")
  }
  return {
    sourceRoot: path.resolve(argv[sourceIndex + 1]),
    projectRoot: path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."),
    dryRun: argv.includes("--dry-run"),
  }
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isDirectRun) {
  const result = await buildCustomerCatalog(parseArguments(process.argv.slice(2)))
  process.stdout.write(`${JSON.stringify(result.report, null, 2)}\n`)
}
