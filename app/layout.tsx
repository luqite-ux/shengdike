import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SiteMarketingProvider } from "@/components/site-marketing-provider"
import { getSiteMarketingContent } from "@/lib/sanity/site-marketing-content"
import { getSiteSettings } from "@/lib/sanity/site-settings"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

/** 未在 Sanity 配置 Favicon 时使用 public 下静态文件 */
const DEFAULT_ICONS: Metadata["icons"] = {
  icon: [
    { url: "/favicon.ico" },
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  ],
  apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
}

const STATIC_METADATA_BASE: Omit<Metadata, "icons"> = {
  title: {
    default: "SENNDIK - Solid State Relay is What We Do",
    template: "%s | SENNDIK",
  },
  description:
    "SENNDIK is a leading industrial technology company that develops solid state relay products, solutions and other critical products to create valuable business insights for customers and end users.",
  keywords: [
    "solid state relay",
    "SSR",
    "industrial technology",
    "power semiconductor",
    "temperature controller",
    "relay manufacturer",
    "SENNDIK",
  ],
  authors: [{ name: "SENNDIK" }],
  creator: "SENNDIK",
  publisher: "SENNDIK Electronics Co., Ltd.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.senndik.com",
    siteName: "SENNDIK",
    title: "SENNDIK - Solid State Relay is What We Do",
    description:
      "SENNDIK is a leading industrial technology company that develops solid state relay products, solutions and other critical products to create valuable business insights for customers and end users.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SENNDIK - Solid State Relay Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SENNDIK - Solid State Relay is What We Do",
    description:
      "SENNDIK is a leading industrial technology company that develops solid state relay products.",
    images: ["/og-image.jpg"],
  },
  manifest: "/site.webmanifest",
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const cmsIcon = settings?.faviconUrl
  const apple = settings?.appleTouchIconUrl

  if (cmsIcon) {
    return {
      ...STATIC_METADATA_BASE,
      icons: {
        icon: [
          { url: cmsIcon, sizes: "32x32", type: "image/png" },
          { url: cmsIcon, sizes: "16x16", type: "image/png" },
        ],
        apple: apple ? [{ url: apple, sizes: "180x180", type: "image/png" }] : [{ url: cmsIcon, sizes: "180x180", type: "image/png" }],
      },
    }
  }

  return {
    ...STATIC_METADATA_BASE,
    icons: DEFAULT_ICONS,
  }
}

/** 站点设置（含 favicon）变更后最多约 5 分钟反映到 HTML metadata */
export const revalidate = 300

export const viewport: Viewport = {
  themeColor: "#E94709",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteMarketing = await getSiteMarketingContent()

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${_geist.variable} ${_geistMono.variable}`}>
      <head>
        {/* Google Translate */}
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,zh-CN,es,de,fr,ja',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
              }, 'google_translate_element');
            }
          `}
        </Script>
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <SiteMarketingProvider value={siteMarketing}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SiteMarketingProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
