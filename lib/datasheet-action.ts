import { resolveDatasheetUrl } from "./catalog-model.ts"

type DatasheetProduct = {
  id: string
  name: string
  model: string
  datasheetUrl?: string
}

function sanitizeDownloadName(value: string) {
  const safe = value
    .normalize("NFKC")
    .replace(/[^A-Za-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
  return `${safe || "product"}-datasheet.pdf`
}

export function getDatasheetAction(product: DatasheetProduct) {
  const href = resolveDatasheetUrl({ datasheetUrl: product.datasheetUrl })
  if (!href) return null
  return {
    href,
    downloadName: sanitizeDownloadName(product.model || product.name || product.id),
    label: "Download Datasheet" as const,
  }
}
