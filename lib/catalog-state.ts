type SecondaryCategory = { slug?: string; id?: string }
type PrimaryCategory = {
  slug?: string
  id: string
  secondaryCategories?: SecondaryCategory[]
}

export type CatalogSelection = {
  primary: string
  secondary: string
}

export function parseCatalogSearchParams(
  params: Pick<URLSearchParams, "get">,
  categories: PrimaryCategory[],
): CatalogSelection {
  const requestedPrimary = params.get("category") || "all"
  const primaryCategory = categories.find(
    (category) => (category.slug || category.id) === requestedPrimary,
  )
  if (!primaryCategory) return { primary: "all", secondary: "" }

  const requestedSecondary = params.get("subcategory") || ""
  const secondaryIsValid = primaryCategory.secondaryCategories?.some(
    (category) => (category.slug || category.id) === requestedSecondary,
  )

  return {
    primary: primaryCategory.slug || primaryCategory.id,
    secondary: secondaryIsValid ? requestedSecondary : "",
  }
}

export function selectPrimaryCategory(primary: string) {
  return { primary, secondary: "", page: 1 }
}

export function buildCatalogSearchParams(selection: CatalogSelection): string {
  if (!selection.primary || selection.primary === "all") return ""
  const params = new URLSearchParams({ category: selection.primary })
  if (selection.secondary) params.set("subcategory", selection.secondary)
  return params.toString()
}
