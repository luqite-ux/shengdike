export type CatalogSecondaryCategory = {
  id: string
  name: string
  slug: string
  sortOrder?: number
}

export type CatalogPrimaryCategory = {
  id: string
  name: string
  slug: string
  sortOrder?: number
  secondaryCategories: CatalogSecondaryCategory[]
}

export type CatalogProduct = {
  id: string
  name: string
  model: string
  category: string
  categoryName: string
  secondaryCategory?: string
  secondaryCategoryName?: string
  image: string
  description: string
  features: string[]
  specifications: Array<{ label: string; value: string }>
  relatedProducts?: string[]
  datasheetUrl?: string
}

type CategoryInput = { id?: string; slug?: string; name?: string } | null | undefined

type CatalogProductInput = {
  id?: string
  slug?: string
  name?: string
  model?: string
  image?: string
  imageUrl?: string
  description?: string
  features?: string[]
  specifications?: Array<{ label?: string; value?: string }>
  relatedProducts?: string[]
  datasheetUrl?: string
  datasheetAssetUrl?: string
  primaryCategory?: CategoryInput
  secondaryCategory?: CategoryInput | string
  category?: CategoryInput | string
  parentCategory?: CategoryInput
  categoryName?: string
  secondaryCategoryName?: string
}

function categorySlug(value: CategoryInput): string {
  return value?.slug || value?.id || ""
}

export function resolveDatasheetUrl(input: {
  datasheetUrl?: unknown
  datasheetAssetUrl?: unknown
}): string | undefined {
  const external = typeof input.datasheetUrl === "string" ? input.datasheetUrl.trim() : ""
  if (/^https?:\/\//i.test(external)) return external
  if (external.startsWith("/customer-products/") && external.toLowerCase().endsWith(".pdf")) {
    return external
  }
  const asset = typeof input.datasheetAssetUrl === "string" ? input.datasheetAssetUrl.trim() : ""
  if (/^https?:\/\//i.test(asset)) return asset
  return undefined
}

export function normalizeCatalogProduct(input: CatalogProductInput): CatalogProduct {
  const manifestPrimary = typeof input.primaryCategory === "object" ? input.primaryCategory : null
  const sanityParent = input.parentCategory
  const sanityLeaf = typeof input.category === "object" ? input.category : null
  const manifestSecondary = typeof input.secondaryCategory === "object" ? input.secondaryCategory : null
  const flatCategory = typeof input.category === "string" ? input.category : ""
  const flatSecondary = typeof input.secondaryCategory === "string" ? input.secondaryCategory : ""
  const primary = manifestPrimary || sanityParent || sanityLeaf
  const secondary = manifestSecondary || (sanityParent ? sanityLeaf : null)

  return {
    id: input.id || input.slug || "",
    name: input.name || input.model || "",
    model: input.model || input.name || "",
    category: categorySlug(primary) || flatCategory || "all",
    categoryName: primary?.name || input.categoryName || "Uncategorized",
    secondaryCategory: categorySlug(secondary) || flatSecondary || undefined,
    secondaryCategoryName: secondary?.name || input.secondaryCategoryName || undefined,
    image: input.imageUrl || input.image || "/placeholder.svg",
    description: input.description || "",
    features: input.features || [],
    specifications: (input.specifications || []).map((row) => ({
      label: row.label || "",
      value: row.value || "",
    })),
    relatedProducts: input.relatedProducts || [],
    datasheetUrl: resolveDatasheetUrl(input),
  }
}

export function filterCatalogProducts(
  products: CatalogProduct[],
  filters: { primary?: string; secondary?: string; search?: string },
): CatalogProduct[] {
  const primary = filters.primary && filters.primary !== "all" ? filters.primary : ""
  const secondary = filters.secondary || ""
  const search = filters.search?.trim().toLowerCase() || ""

  return products.filter((product) => {
    if (primary && product.category !== primary) return false
    if (secondary && product.secondaryCategory !== secondary) return false
    if (!search) return true
    return product.name.toLowerCase().includes(search) || product.model.toLowerCase().includes(search)
  })
}

export function countProductsByCategory(products: CatalogProduct[]) {
  const primary: Record<string, number> = {}
  const secondary: Record<string, number> = {}
  for (const product of products) {
    primary[product.category] = (primary[product.category] || 0) + 1
    if (product.secondaryCategory) {
      const key = `${product.category}:${product.secondaryCategory}`
      secondary[key] = (secondary[key] || 0) + 1
    }
  }
  return { all: products.length, primary, secondary }
}
