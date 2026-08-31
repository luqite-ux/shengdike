import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDirectory, "..", "..")
const manifestPath = path.join(repoRoot, "data", "senndik-customer-catalog.json")

function absoluteAssetUrl(value, siteOrigin) {
  if (!value) return undefined
  if (/^https?:\/\//i.test(value)) return value
  return new URL(value, `${siteOrigin.replace(/\/$/, "")}/`).toString()
}

export function createSanityCatalogDocuments(
  manifest,
  { siteOrigin = "https://zcximandun.com" } = {},
) {
  const categories = []

  for (const primary of manifest.categories || []) {
    const primaryId = `productCategory.${primary.slug}`
    categories.push({
      _id: primaryId,
      _type: "productCategory",
      title: primary.name,
      slug: { _type: "slug", current: primary.slug },
      sortOrder: primary.sortOrder || 0,
      isVisible: true,
      isPublished: true,
    })
    for (const secondary of primary.secondaryCategories || []) {
      categories.push({
        _id: `productCategory.${primary.slug}.${secondary.slug}`,
        _type: "productCategory",
        title: secondary.name,
        slug: { _type: "slug", current: secondary.slug },
        parent: { _type: "reference", _ref: primaryId },
        sortOrder: secondary.sortOrder || 0,
        isVisible: true,
        isPublished: true,
      })
    }
  }

  const products = (manifest.products || []).map((product) => {
    const primarySlug = product.primaryCategory.slug
    const secondarySlug = product.secondaryCategory?.slug
    const categoryRef = secondarySlug
      ? `productCategory.${primarySlug}.${secondarySlug}`
      : `productCategory.${primarySlug}`
    const document = {
      _id: `product.${product.slug}`,
      _type: "product",
      name: product.name,
      model: product.model,
      slug: { _type: "slug", current: product.slug },
      category: { _type: "reference", _ref: categoryRef },
      imageUrl: absoluteAssetUrl(product.image, siteOrigin),
      sortOrder: product.sortOrder || 0,
      isPublished: true,
    }
    if (product.datasheetUrl) {
      document.datasheetUrl = absoluteAssetUrl(product.datasheetUrl, siteOrigin)
    }
    return document
  })

  return { categories, products }
}

async function parseEnvFile(filePath) {
  try {
    const text = await readFile(filePath, "utf8")
    return Object.fromEntries(
      text.split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#") && line.includes("="))
        .map((line) => {
          const index = line.indexOf("=")
          return [line.slice(0, index).trim(), line.slice(index + 1).trim().replace(/^['"]|['"]$/g, "")]
        }),
    )
  } catch {
    return {}
  }
}

async function loadEnvironment() {
  return {
    ...(await parseEnvFile(path.join(repoRoot, ".env.local"))),
    ...(await parseEnvFile(path.join(repoRoot, "studio", ".env.local"))),
    ...process.env,
  }
}

async function main() {
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"))
  const documents = createSanityCatalogDocuments(manifest)
  const shouldWrite = process.argv.includes("--write")

  if (!shouldWrite) {
    process.stdout.write(`${JSON.stringify({
      mode: "dry-run",
      categoryCount: documents.categories.length,
      productCount: documents.products.length,
      documentCount: documents.categories.length + documents.products.length,
    }, null, 2)}\n`)
    return
  }

  const env = await loadEnvironment()
  const projectId = env.SANITY_STUDIO_PROJECT_ID || env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = env.SANITY_STUDIO_DATASET || env.NEXT_PUBLIC_SANITY_DATASET || "production"
  const token = env.SANITY_API_WRITE_TOKEN
  if (!projectId || !token) {
    throw new Error("Sanity write configuration is missing; dry-run remains available without credentials.")
  }

  const { createClient } = await import("@sanity/client")
  const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false })
  let transaction = client.transaction()
  for (const document of documents.categories) transaction = transaction.createOrReplace(document)
  await transaction.commit()

  for (let index = 0; index < documents.products.length; index += 20) {
    let batch = client.transaction()
    for (const document of documents.products.slice(index, index + 20)) {
      batch = batch.createOrReplace(document)
    }
    await batch.commit()
  }

  const result = await client.fetch(
    `{"categories": count(*[_type == "productCategory" && !(_id in path("drafts.**"))]), "products": count(*[_type == "product" && !(_id in path("drafts.**"))])}`,
  )
  process.stdout.write(`${JSON.stringify({ mode: "write", verifiedCounts: result }, null, 2)}\n`)
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isDirectRun) await main()
