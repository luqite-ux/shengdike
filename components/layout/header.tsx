"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, X, ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getSiteSettings } from "@/lib/sanity/site-settings"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const DEFAULT_LOGO_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SENNDIK%20%20LOGO-nElCfK71jXNeAVY8l7MyEaTeetsPj0.png"

const navigationItems = [
  { name: "Home", href: "/" },
  {
    name: "About Us",
    href: "/about",
    megaMenu: [
      { name: "Company Profile", href: "/about/company-profile" },
      { name: "Cultural Concept", href: "/about/cultural-concept" },
      { name: "Company Strength", href: "/about/company-strength" },
      { name: "Corporate Sustainability", href: "/about/corporate-sustainability" },
    ],
  },
  {
    name: "R&D & Innovation",
    href: "/rnd-innovation",
    megaMenu: [
      { name: "R&D Strategy", href: "/rnd-innovation#rd-strategy" },
      { name: "IPD Development Model", href: "/rnd-innovation#ipd-model" },
      { name: "Our Patents", href: "/rnd-innovation#patents" },
      { name: "Honor and Qualification", href: "/rnd-innovation#honor" },
    ],
  },
  {
    name: "Products",
    href: "/products",
    megaMenu: [
      { name: "PCB Solid State Relay", href: "/products?category=pcb-ssr" },
      { name: "Single-phase SSR", href: "/products?category=single-phase-ssr" },
      { name: "Industrial Grade SSR", href: "/products?category=industrial-ssr" },
      { name: "Two-phase SSR", href: "/products?category=two-phase-ssr" },
      { name: "DIN Rail SSR", href: "/products?category=din-ssr" },
      { name: "Temperature Controller", href: "/products?category=temperature-controller" },
      { name: "Electromagnetic Relay", href: "/products?category=electromagnetic-relay" },
      { name: "Relay Socket & Base", href: "/products?category=relay-socket" },
      { name: "SSR Radiator & Heatsink", href: "/products?category=ssr-radiator" },
      { name: "Thyristor Module", href: "/products?category=thyristor-module" },
    ],
  },
  {
    name: "Solutions",
    href: "/solutions",
    megaMenu: [
      { name: "Home Appliances & Smart Home", href: "/solutions#home-appliances" },
      { name: "Kitchen Equipment", href: "/solutions#kitchen-equipment" },
      { name: "Plastic Industry", href: "/solutions#plastic-industry" },
      { name: "Industrial Manufacturing", href: "/solutions#industrial-manufacturing" },
      { name: "Industrial Control", href: "/solutions#industrial-control" },
      { name: "Photovoltaic Industry", href: "/solutions#photovoltaic" },
    ],
  },
  { name: "Support", href: "/support" },
]

type NavItem = (typeof navigationItems)[number]

/** 与 `app/layout.tsx` 里 `pageLanguage: 'en'` 保持一致 */
const GOOGLE_TRANSLATE_SOURCE = "en"

function normalizeCookieDomain(host: string): string | null {
  if (!host || host === "localhost" || /^\d+\.\d+\.\d+\.\d+$/.test(host)) return null
  return host
}

function setGoogTransCookie(value: string) {
  const host = window.location.hostname
  const domain = normalizeCookieDomain(host)
  document.cookie = `googtrans=${encodeURIComponent(value)};path=/;SameSite=Lax`
  if (domain) {
    document.cookie = `googtrans=${encodeURIComponent(value)};path=/;domain=${domain};SameSite=Lax`
    document.cookie = `googtrans=${encodeURIComponent(value)};path=/;domain=.${domain};SameSite=Lax`
  }
}

function clearGoogTransCookie() {
  const exp = "expires=Thu, 01 Jan 1970 00:00:00 GMT"
  document.cookie = `googtrans=;path=/;${exp}`
  const host = window.location.hostname
  const domain = normalizeCookieDomain(host)
  if (domain) {
    document.cookie = `googtrans=;path=/;domain=${domain};${exp}`
    document.cookie = `googtrans=;path=/;domain=.${domain};${exp}`
  }
}

function readGoogTransCookie(): string {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/)
  return m?.[1] ? decodeURIComponent(m[1]).trim() : ""
}

/**
 * 使用 Google 翻译识别的 `googtrans` Cookie（/源语言/目标语言），再整页刷新。
 * 比操作 `.goog-te-combo` 可靠：控件常在 iframe 内或顶栏被隐藏后无法触发 change。
 */
function applyGoogleTranslatePreference(targetCode: string) {
  if (typeof window === "undefined") return
  if (targetCode === GOOGLE_TRANSLATE_SOURCE) {
    clearGoogTransCookie()
  } else {
    setGoogTransCookie(`/${GOOGLE_TRANSLATE_SOURCE}/${targetCode}`)
  }
  window.location.reload()
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh-CN", name: "中文", flag: "🇨🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(languages[0])
  const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([])
  const [navItems, setNavItems] = useState<NavItem[]>(navigationItems)
  const [logoSrc, setLogoSrc] = useState(DEFAULT_LOGO_URL)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveMenu(null)
  }, [pathname])

  useEffect(() => {
    let cancelled = false

    const loadSettings = async () => {
      const settings = await getSiteSettings()
      if (cancelled || !settings) return

      if (settings.logoUrl) setLogoSrc(settings.logoUrl)

      if (settings.mainNavigation?.length) {
        const mappedNavItems: NavItem[] = settings.mainNavigation
          .filter((item) => item?.label && item?.href)
          .map((item) => ({ name: item.label, href: item.href }))

        if (mappedNavItems.length) {
          setNavItems(mappedNavItems)
        }
      }
    }

    loadSettings()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const savedCode = window.localStorage.getItem("preferred_translate_lang")
    if (!savedCode) return
    const saved = languages.find((lang) => lang.code === savedCode)
    if (!saved) return
    setCurrentLanguage(saved)

    const want =
      savedCode === GOOGLE_TRANSLATE_SOURCE ? "" : `/${GOOGLE_TRANSLATE_SOURCE}/${savedCode}`
    const cur = readGoogTransCookie()
    if (want === "" && cur === "") return
    if (want !== "" && cur === want) return

    const guardKey = "__googtrans_sync_once__"
    if (window.sessionStorage.getItem(guardKey) === "1") return
    window.sessionStorage.setItem(guardKey, "1")
    if (want === "") clearGoogTransCookie()
    else setGoogTransCookie(want)
    window.location.reload()
  }, [])

  const handleLanguageChange = (lang: typeof languages[0]) => {
    setCurrentLanguage(lang)
    if (typeof window !== "undefined") {
      window.localStorage.setItem("preferred_translate_lang", lang.code)
      applyGoogleTranslatePreference(lang.code)
    }
  }

  const toggleMobileSubmenu = (name: string) => {
    setExpandedMobileItems(prev => 
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    )
  }

  return (
    <>
      {/*
        勿使用 `hidden`（display:none）：Google Translate 常因此无法初始化或不注入 `.goog-te-combo`。
        用离屏占位即可隐藏默认控件。
      */}
      <div
        id="google_translate_element"
        className="pointer-events-none fixed left-0 top-0 -z-10 h-px w-px overflow-hidden opacity-0"
        aria-hidden
      />
      
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logoSrc}
                alt="SENNDIK"
                width={140}
                height={36}
                className="h-8 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.megaMenu && setActiveMenu(item.name)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-[#E94709] ${
                      isScrolled ? "text-gray-800" : "text-white"
                    } ${pathname === item.href || pathname.startsWith(item.href + "/") ? "text-[#E94709] border-b-2 border-[#E94709]" : ""}`}
                  >
                    {item.name}
                    {item.megaMenu && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  <AnimatePresence>
                    {item.megaMenu && activeMenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-0 bg-white rounded-lg shadow-xl border border-gray-100 min-w-[280px] overflow-hidden"
                      >
                        <div className="p-4">
                          {item.megaMenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#E94709]/10 hover:text-[#E94709] rounded-md transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative hidden sm:block">
                <AnimatePresence>
                  {isSearchOpen ? (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 200, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      className="absolute right-0 top-1/2 -translate-y-1/2"
                    >
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="pr-8"
                        autoFocus
                        onBlur={() => setIsSearchOpen(false)}
                      />
                    </motion.div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSearchOpen(true)}
                      className={isScrolled ? "text-gray-800" : "text-white"}
                    >
                      <Search className="w-5 h-5" />
                    </Button>
                  )}
                </AnimatePresence>
              </div>

              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-1 ${isScrolled ? "text-gray-800" : "text-white"}`}
                  >
                    <Globe className="w-4 h-4" />
                    <span className="hidden sm:inline">{currentLanguage.code.toUpperCase()}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-[200]">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onSelect={(e) => {
                        e.preventDefault()
                        handleLanguageChange(lang)
                      }}
                      className="cursor-pointer"
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`lg:hidden ${isScrolled ? "text-gray-800" : "text-white"}`}
                  >
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b">
                      <Image
                        src={logoSrc}
                        alt="SENNDIK"
                        width={120}
                        height={32}
                        className="h-7 w-auto"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                    
                    {/* Mobile Search */}
                    <div className="p-4 border-b">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type="search"
                          placeholder="Search..."
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4">
                      {navItems.map((item) => (
                        <div key={item.name} className="mb-2">
                          {item.megaMenu ? (
                            <>
                              <button
                                onClick={() => toggleMobileSubmenu(item.name)}
                                className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-800 hover:bg-gray-100 rounded-lg"
                              >
                                <span className="font-medium">{item.name}</span>
                                <ChevronDown
                                  className={`w-4 h-4 transition-transform ${
                                    expandedMobileItems.includes(item.name) ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                              <AnimatePresence>
                                {expandedMobileItems.includes(item.name) && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="pl-4 py-2">
                                      {item.megaMenu.map((subItem) => (
                                        <Link
                                          key={subItem.name}
                                          href={subItem.href}
                                          className="block px-4 py-2 text-sm text-gray-600 hover:text-[#E94709] hover:bg-[#E94709]/5 rounded-md"
                                          onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                          {subItem.name}
                                        </Link>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </>
                          ) : (
                            <Link
                              href={item.href}
                              className="block px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg font-medium"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </nav>

                    {/* Mobile Language Selector */}
                    <div className="p-4 border-t">
                      <div className="flex items-center gap-2 flex-wrap">
                        {languages.map((lang) => (
                          <Button
                            key={lang.code}
                            variant={currentLanguage.code === lang.code ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleLanguageChange(lang)}
                            className={currentLanguage.code === lang.code ? "bg-[#E94709] hover:bg-[#D13E06]" : ""}
                          >
                            {lang.code.toUpperCase()}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
