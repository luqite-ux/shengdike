"use client"

import { createContext, useContext, type ReactNode } from "react"
import { DEFAULT_SITE_MARKETING } from "@/lib/site-marketing-defaults"
import type { SiteMarketingData } from "@/lib/site-marketing-types"

const SiteMarketingContext = createContext<SiteMarketingData>(DEFAULT_SITE_MARKETING)

export function SiteMarketingProvider({
  value,
  children,
}: {
  value: SiteMarketingData
  children: ReactNode
}) {
  return <SiteMarketingContext.Provider value={value}>{children}</SiteMarketingContext.Provider>
}

export function useSiteMarketing(): SiteMarketingData {
  return useContext(SiteMarketingContext)
}
