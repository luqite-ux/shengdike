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
  description?: string
  features?: string[]
  specifications?: Array<{ label?: string; value?: string }>
}

const allowFallbackData = process.env.NEXT_PUBLIC_SANITY_ALLOW_FALLBACK_DATA === "true"

function getFallbackCatalog() {
  return {
    products: fallbackProducts,
    categories: fallbackCategories.map((c) => ({ id: c.id, name: c.name })),
  }
}

const PRODUCTS_QUERY = `*[_type == "product" && coalesce(isPublished, true) == true] | order(coalesce(sortOrder, 0) asc, _createdAt desc){
  "id": coalesce(slug.current, _id),
  name,
  model,
  "category": coalesce(category->slug.current, "all"),
  "categoryName": coalesce(category->title, "Uncategorized"),
  mainImage,
  "description": coalesce(description, excerpt, ""),
  "features": coalesce(efficacy, []),
  "specifications": coalesce(specifications[]{label, value}, [])
}`

const PRODUCT_BY_ID_QUERY = `*[_type == "product" && coalesce(isPublished, true) == true && slug.current == $id][0]{
  "id": coalesce(slug.current, _id),
  name,
  model,
  "category": coalesce(category->slug.current, "all"),
  "categoryName": coalesce(category->title, "Uncategorized"),
  mainImage,
  "description": coalesce(description, excerpt, ""),
  "features": coalesce(efficacy, []),
  "specifications": coalesce(specifications[]{label, value}, [])
}`

const CATEGORIES_QUERY = `*[_type == "productCategory" && coalesce(isVisible, true) == true && coalesce(isPublished, true) == true] | order(coalesce(sortOrder, 0) asc){
  "id": slug.current,
  "name": title
}`

function mapSanityProduct(input: SanityProduct): Product {
  return {
    id: input.id || "",
    name: input.name || "",
    model: input.model || input.name || "",
    category: input.category || "all",
    categoryName: input.categoryName || "Uncategorized",
    image: sanityImageUrl(input.image),
    description: input.description || "",
    features: input.features || [],
    specifications: (input.specifications || []).map((spec) => ({
      label: spec.label || "",
      value: spec.value || "",
    })),
    relatedProducts: [],
  }
}

export async function getProductCatalog(): Promise<{ products: Product[]; categories: ProductCategoryOption[] }> {
  if (!isSanityConfigured || !sanityClient) {
    return allowFallbackData ? getFallbackCatalog() : { products: [], categories: [{ id: "all", name: "All Products" }] }
  }

  try {
    const [sanityProducts, sanityCategories] = await Promise.all([
      sanityClient.fetch<SanityProduct[]>(PRODUCTS_QUERY),
      sanityClient.fetch<ProductCategoryOption[]>(CATEGORIES_QUERY),
    ])

    const mappedProducts = (sanityProducts || []).map(mapSanityProduct).filter((p) => p.id && p.name)
    const categories: ProductCategoryOption[] = [
      { id: "all", name: "All Products" },
      ...(sanityCategories || []).filter((c) => c?.id && c?.name),
    ]

    if (!mappedProducts.length) {
      return allowFallbackData ? getFallbackCatalog() : { products: [], categories: [{ id: "all", name: "All Products" }] }
    }

    return { products: mappedProducts, categories }
  } catch {
    return allowFallbackData ? getFallbackCatalog() : { products: [], categories: [{ id: "all", name: "All Products" }] }
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  if (!isSanityConfigured || !sanityClient) {
    return allowFallbackData ? getFallbackProductById(id) : undefined
  }

  try {
    const sanityProduct = await sanityClient.fetch<SanityProduct | null>(PRODUCT_BY_ID_QUERY, { id })
    if (!sanityProduct) return allowFallbackData ? getFallbackProductById(id) : undefined
    return mapSanityProduct(sanityProduct)
  } catch {
    return allowFallbackData ? getFallbackProductById(id) : undefined
  }
}

export async function getAllProductIds(): Promise<string[]> {
  if (!isSanityConfigured || !sanityClient) {
    return allowFallbackData ? fallbackProducts.map((p) => p.id) : []
  }

  try {
    const ids = await sanityClient.fetch<string[]>(
      `*[_type == "product" && coalesce(isPublished, true) == true && defined(slug.current)].slug.current`
    )
    if (ids?.length) return ids
    return allowFallbackData ? fallbackProducts.map((p) => p.id) : []
  } catch {
    return allowFallbackData ? fallbackProducts.map((p) => p.id) : []
  }
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  if (!product?.category) return []
  const { products } = await getProductCatalog()
  const related = products.filter((p) => p.category === product.category && p.id !== product.id)
  if (related.length) return related.slice(0, limit)
  if (!allowFallbackData) return []
  return getFallbackRelatedProducts(product.id).slice(0, limit)
}
