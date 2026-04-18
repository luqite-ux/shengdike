import { createClient } from "@sanity/client"
import { SANITY_DATASET_FALLBACK, SANITY_PROJECT_ID_FALLBACK } from "@/lib/sanity/constants"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || SANITY_PROJECT_ID_FALLBACK
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || SANITY_DATASET_FALLBACK
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01"
const token = process.env.SANITY_API_WRITE_TOKEN

export function getSanityWriteClient() {
  if (!projectId || !dataset || !token) {
    return null
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  })
}
