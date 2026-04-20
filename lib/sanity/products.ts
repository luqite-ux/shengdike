import type { Product } from "@/lib/products-data"
import {
  products as fallbackProducts,
  productCategories as fallbackCategories,
  getProductById as getFallbackProductById,
  getRelatedProducts as getFallbackRelatedProducts,
} from "@/lib/products-data"
import { isSanityConfigured, sanityClient, sanityImageUrl } from "@/lib/sanity/client"

export type ProductCategoryOption = {
  id: string
  name: string
}

type SanityProduct = {
  id?: string
  name?: string
  model?: string
  category?: string
  categoryName?: string
  image?: unknown
  imageUrl?: string
  description?: string
  features?: string[]
  specifications?: Array<{ label?: string; value?: string }>
  datasheetUrl?: string
  datasheetAssetUrl?: string
}

/**
 * 为 true 时：即使已配置 Sanity，只要 CMS 里没有任何已发布产品，前台也**不**展示
 * `lib/products-data` 内置目录（适合已把产品全部迁入 CMS 的项目）。
 * 默认 false：CMS 无产品时自动使用内置目录（与 v0 时期一致，图仍为 Blob 外链）。
 */
const strictSanityProductsOnly = process.env.NEXT_PUBLIC_SANITY_PRODUCTS_STRICT === "true"

function getFallbackCatalog() {
  return {
    products: fallbackProducts,
    categories: fallbackCategories.map((c) => ({ id: c.id, name: c.name })),
  }
}

function useBuiltInCatalogWhenEmpty(sanityConfigured: boolean, sanityProductCount: number) {
  if (!sanityConfigured) return true
  if (sanityProductCount > 0) return false
  return !strictSanityProductsOnly
}

const PRODUCTS_QUERY = `*[_type == "product" && coalesce(isPublished, true) == true] | order(coalesce(sortOrder, 0) asc, _createdAt desc){
  "id": coalesce(slug.current, _id),
  name,
  model,
  "category": coalesce(category->slug.current, "all"),
  "categoryName": coalesce(category->title, "Uncategorized"),
  "image": coalesce(mainImage, image),
  imageUrl,
  "description": coalesce(description, excerpt, ""),
  "features": coalesce(efficacy, []),
  "specifications": coalesce(specifications[]{label, value}, []),
  datasheetUrl,
  "datasheetAssetUrl": datasheet.asset->url
}`

const PRODUCT_BY_ID_QUERY = `*[_type == "product" && coalesce(isPublished, true) == true && slug.current == $id][0]{
  "id": coalesce(slug.current, _id),
  name,
  model,
  "category": coalesce(category->slug.current, "all"),
  "categoryName": coalesce(category->title, "Uncategorized"),
  "image": coalesce(mainImage, image),
  imageUrl,
  "description": coalesce(description, excerpt, ""),
  "features": coalesce(efficacy, []),
  "specifications": coalesce(specifications[]{label, value}, []),
  datasheetUrl,
  "datasheetAssetUrl": datasheet.asset->url
}`

function resolveProductImage(input: SanityProduct): string {
  if (typeof input.imageUrl === "string" && /^https?:\/\//.test(input.imageUrl)) {
    return input.imageUrl
  }
  if (typeof input.image === "string" && /^https?:\/\//.test(input.image)) {
    return input.image
  }
  return sanityImageUrl(input.image)
}

const CATEGORIES_QUERY = `*[_type == "productCategory" && coalesce(isVisible, true) == true && coalesce(isPublished, true) == true] | order(coalesce(sortOrder, 0) asc){
  "id": slug.current,
  "name": title
}`

function resolveDatasheetUrl(input: SanityProduct): string | undefined {
  const ext = typeof input.datasheetUrl === "string" ? input.datasheetUrl.trim() : ""
  if (ext && (/^https?:\/\//i.test(ext) || ext.startsWith("/"))) return ext
  const asset = typeof input.datasheetAssetUrl === "string" ? input.datasheetAssetUrl.trim() : ""
  if (asset) return asset
  return undefined
}

function mapSanityProduct(input: SanityProduct): Product {
  return {
    id: input.id || "",
    name: input.name || "",
    model: input.model || input.name || "",
    category: input.category || "all",
    categoryName: input.categoryName || "Uncategorized",
    image: resolveProductImage(input),
    description: input.description || "",
    features: input.features || [],
    specifications: (input.specifications || []).map((spec) => ({
      label: spec.label || "",
      value: spec.value || "",
    })),
    relatedProducts: [],
    datasheetUrl: resolveDatasheetUrl(input),
  }
}

export async function getProductCatalog(): Promise<{ products: Product[]; categories: ProductCategoryOption[] }> {
  const configured = Boolean(isSanityConfigured && sanityClient)

  if (!configured) {
    return getFallbackCatalog()
  }

  try {
    const [sanityProducts, sanityCategories] = await Promise.all([
      sanityClient!.fetch<SanityProduct[]>(PRODUCTS_QUERY),
      sanityClient!.fetch<ProductCategoryOption[]>(CATEGORIES_QUERY),
    ])

    const mappedProducts = (sanityProducts || []).map(mapSanityProduct).filter((p) => p.id && p.name)

    if (useBuiltInCatalogWhenEmpty(true, mappedProducts.length)) {
      return getFallbackCatalog()
    }

    const categories: ProductCategoryOption[] = [
      { id: "all", name: "All Products" },
      ...(sanityCategories || []).filter((c) => c?.id && c?.name),
    ]

    return { products: mappedProducts, categories }
  } catch {
    return getFallbackCatalog()
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  if (!isSanityConfigured || !sanityClient) {
    return getFallbackProductById(id)
  }

  try {
    const sanityProduct = await sanityClient.fetch<SanityProduct | null>(PRODUCT_BY_ID_QUERY, { id })
    if (sanityProduct) {
      const mapped = mapSanityProduct(sanityProduct)
      if (mapped.id && mapped.name) return mapped
    }
  } catch {
    return getFallbackProductById(id)
  }

  if (!strictSanityProductsOnly) {
    return getFallbackProductById(id)
  }

  return undefined
}

export async function getAllProductIds(): Promise<string[]> {
  if (!isSanityConfigured || !sanityClient) {
    return fallbackProducts.map((p) => p.id)
  }

  try {
    const ids = await sanityClient.fetch<string[]>(
      `*[_type == "product" && coalesce(isPublished, true) == true && defined(slug.current)].slug.current`
    )
    if (ids?.length) return ids
    if (strictSanityProductsOnly) return []
    return fallbackProducts.map((p) => p.id)
  } catch {
    return fallbackProducts.map((p) => p.id)
  }
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  if (!product?.category) return []
  const { products } = await getProductCatalog()
  const related = products.filter((p) => p.category === product.category && p.id !== product.id)
  if (related.length) return related.slice(0, limit)
  return getFallbackRelatedProducts(product.id).slice(0, limit)
}
