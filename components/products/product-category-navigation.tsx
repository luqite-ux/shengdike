"use client"

import { ChevronDown } from "lucide-react"

import type { ProductCategoryOption } from "@/lib/sanity/products"

type CategoryCounts = {
  all: number
  primary: Record<string, number>
  secondary: Record<string, number>
}

type ProductCategoryNavigationProps = {
  categories: ProductCategoryOption[]
  counts: CategoryCounts
  selectedPrimary: string
  selectedSecondary: string
  onPrimaryChange: (slug: string) => void
  onSecondaryChange: (slug: string) => void
}

export function ProductCategoryNavigation({
  categories,
  counts,
  selectedPrimary,
  selectedSecondary,
  onPrimaryChange,
  onSecondaryChange,
}: ProductCategoryNavigationProps) {
  return (
    <aside className="w-full shrink-0 lg:w-72">
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm lg:sticky lg:top-24">
        <div className="bg-[#E94709] p-4 text-white">
          <h2 className="text-lg font-bold">Product Categories</h2>
        </div>
        <nav className="p-2" aria-label="Product categories">
          <button
            type="button"
            onClick={() => onPrimaryChange("all")}
            aria-current={selectedPrimary === "all" ? "page" : undefined}
            className={`flex w-full items-center justify-between rounded-md px-4 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E94709] focus-visible:ring-offset-2 ${
              selectedPrimary === "all"
                ? "bg-[#E94709] font-medium text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span>All Products</span>
            <span className="text-xs opacity-75">({counts.all})</span>
          </button>

          {categories.filter((category) => category.id !== "all").map((category) => {
            const primarySlug = category.slug || category.id
            const isSelected = selectedPrimary === primarySlug
            const children = category.secondaryCategories || []
            return (
              <div key={category.id} className="mt-1">
                <button
                  type="button"
                  onClick={() => onPrimaryChange(primarySlug)}
                  aria-expanded={children.length ? isSelected : undefined}
                  aria-controls={children.length ? `subcategory-${primarySlug}` : undefined}
                  aria-current={isSelected && !selectedSecondary ? "page" : undefined}
                  className={`flex w-full items-center gap-2 rounded-md px-4 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E94709] focus-visible:ring-offset-2 ${
                    isSelected
                      ? "bg-orange-50 font-semibold text-[#C73800]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="min-w-0 flex-1">{category.name}</span>
                  <span className="text-xs opacity-70">({counts.primary[primarySlug] || 0})</span>
                  {children.length > 0 && (
                    <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isSelected ? "rotate-180" : ""}`} />
                  )}
                </button>

                {isSelected && children.length > 0 && (
                  <div id={`subcategory-${primarySlug}`} className="ml-3 border-l border-orange-200 py-1 pl-2">
                    {children.map((secondary) => {
                      const secondarySlug = secondary.slug || secondary.id
                      const countKey = `${primarySlug}:${secondarySlug}`
                      const secondarySelected = selectedSecondary === secondarySlug
                      return (
                        <button
                          key={secondary.id}
                          type="button"
                          onClick={() => onSecondaryChange(secondarySlug)}
                          aria-current={secondarySelected ? "page" : undefined}
                          className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E94709] focus-visible:ring-offset-2 ${
                            secondarySelected
                              ? "bg-[#E94709] font-medium text-white"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          <span>{secondary.name}</span>
                          <span className="text-xs opacity-70">({counts.secondary[countKey] || 0})</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
