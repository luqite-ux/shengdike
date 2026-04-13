import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
}

export const viewport: Viewport = {
  themeColor: "#E94709",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
