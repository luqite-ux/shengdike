"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ChevronLeft, ChevronRight, Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Product } from "@/lib/products-data"
import { getProductCatalog, type ProductCategoryOption } from "@/lib/sanity/products"
import { PageHero } from "@/components/shared/page-hero"
import { useSiteMarketing } from "@/components/site-marketing-provider"
import { ProductCategoryNavigation } from "@/components/products/product-category-navigation"
import { countProductsByCategory, filterCatalogProducts } from "@/lib/catalog-model"
import { buildCatalogSearchParams, parseCatalogSearchParams } from "@/lib/catalog-state"

function ProductsContent() {
  const m = useSiteMarketing()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category") || "all"
  const secondaryParam = searchParams.get("subcategory") || ""
  
  const [products, setProducts] = useState<Product[]>([])
  const [productCategories, setProductCategories] = useState<ProductCategoryOption[]>([{ id: "all", name: "All Products" }])
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [selectedSecondary, setSelectedSecondary] = useState(secondaryParam)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const itemsPerPage = 9

  useEffect(() => {
    const stableParams = new URLSearchParams()
    if (categoryParam !== "all") stableParams.set("category", categoryParam)
    if (secondaryParam) stableParams.set("subcategory", secondaryParam)
    const selection = parseCatalogSearchParams(stableParams, productCategories)
    setSelectedCategory(selection.primary)
    setSelectedSecondary(selection.secondary)
    setCurrentPage(1)
  }, [categoryParam, secondaryParam, productCategories])

  useEffect(() => {
    let cancelled = false

    const loadCatalog = async () => {
      const catalog = await getProductCatalog()
      if (cancelled) return
      setProducts(catalog.products)
      setProductCategories(catalog.categories)
    }

    loadCatalog()

    return () => {
      cancelled = true
    }
  }, [])

  const navigateToSelection = (primary: string, secondary: string) => {
    const query = buildCatalogSearchParams({ primary, secondary })
    window.history.pushState(null, "", query ? `/products?${query}` : "/products")
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSelectedSecondary("")
    setCurrentPage(1)
    navigateToSelection(category, "")
  }

  const handleSecondaryChange = (secondary: string) => {
    setSelectedSecondary(secondary)
    setCurrentPage(1)
    navigateToSelection(selectedCategory, secondary)
  }

  const filteredProducts = filterCatalogProducts(products, {
    primary: selectedCategory,
    secondary: selectedSecondary,
    search: searchQuery,
  })
  const categoryCounts = countProductsByCategory(products)

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const currentCategory = productCategories.find(c => c.id === selectedCategory)

  return (
    <>
      <PageHero
        title="Products"
        subtitle={currentCategory?.name || "All Products"}
        backgroundImage={m.productsList.heroBackgroundUrl}
      />

      {/* Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Category Filter */}
            <ProductCategoryNavigation
              categories={productCategories}
              counts={categoryCounts}
              selectedPrimary={selectedCategory}
              selectedSecondary={selectedSecondary}
              onPrimaryChange={handleCategoryChange}
              onSecondaryChange={handleSecondaryChange}
            />

            {/* Main Content */}
            <div className="flex-1">
              {/* Search and View Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Input
                    type="search"
                    placeholder="Search products by name or model..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-[#E94709] hover:bg-[#D13E06]" : ""}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-[#E94709] hover:bg-[#D13E06]" : ""}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-6 text-sm text-gray-600">
                Showing {paginatedProducts.length} of {filteredProducts.length} products
                {searchQuery && ` for "${searchQuery}"`}
              </div>

              {/* Products Grid/List */}
              <AnimatePresence mode="wait">
                {viewMode === "grid" ? (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    {paginatedProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Link href={`/products/${product.id}`}>
                          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group h-full">
                            <div className="relative h-56 bg-gray-50 flex items-center justify-center p-6">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain p-4 group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div className="p-4 border-t">
                              <span className="text-xs text-[#E94709] font-medium">
                                {product.secondaryCategoryName || product.categoryName}
                              </span>
                              <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#E94709] transition-colors mt-1 line-clamp-2">
                                {product.name}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">Model: {product.model}</p>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {paginatedProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Link href={`/products/${product.id}`}>
                          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group flex">
                            <div className="relative w-40 h-40 bg-gray-50 flex items-center justify-center shrink-0">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain p-4 group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div className="p-4 flex flex-col justify-center">
                              <span className="text-xs text-[#E94709] font-medium">
                                {product.secondaryCategoryName || product.categoryName}
                              </span>
                              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#E94709] transition-colors mt-1">
                                {product.name}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">Model: {product.model}</p>
                              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Empty State */}
              {paginatedProducts.length === 0 && (
                <div className="text-center py-20 bg-white rounded-lg">
                  <p className="text-gray-500">No products found matching your criteria.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      handleCategoryChange("all")
                    }}
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => setCurrentPage(page)}
                      className={
                        currentPage === page
                          ? "bg-[#E94709] hover:bg-[#D13E06]"
                          : ""
                      }
                    >
                      {page}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E94709]"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
