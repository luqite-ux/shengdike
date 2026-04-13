"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getSiteSettings } from "@/lib/sanity/site-settings"
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react"

const footerLinks = {
  aboutUs: {
    title: "About Us",
    links: [
      { name: "Company Profile", href: "/about/company-profile" },
      { name: "Cultural Concept", href: "/about/cultural-concept" },
      { name: "Company Strength", href: "/about/company-strength" },
      { name: "Corporate Sustainability", href: "/about/corporate-sustainability" },
    ],
  },
  rdInnovation: {
    title: "R&D & Innovation",
    links: [
      { name: "R&D Strategy", href: "/rnd-innovation#rd-strategy" },
      { name: "IPD Development Model", href: "/rnd-innovation#ipd-model" },
      { name: "Our Patents", href: "/rnd-innovation#patents" },
      { name: "Honor and Qualification", href: "/rnd-innovation#honor" },
    ],
  },
  solutions: {
    title: "Solutions",
    links: [
      { name: "Home Appliances & Smart Home", href: "/solutions#home-appliances" },
      { name: "Kitchen Equipment", href: "/solutions#kitchen-equipment" },
      { name: "Plastic Industry", href: "/solutions#plastic-industry" },
      { name: "Industrial Manufacturing", href: "/solutions#industrial-manufacturing" },
      { name: "Industrial Control", href: "/solutions#industrial-control" },
      { name: "Photovoltaic Industry", href: "/solutions#photovoltaic" },
    ],
  },
  products: {
    title: "Products",
    links: [
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
}

export function Footer() {
  const [email, setEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("+86 18514211502")
  const [contactWhatsapp, setContactWhatsapp] = useState("+86 18514211502")
  const [contactEmail, setContactEmail] = useState("info@zcximandun.com")
  const [address, setAddress] = useState(
    "No. 5, Baiheng Road, Panshi Town, Yueqing City, Wenzhou City, Zhejiang Province"
  )
  const [footerCopyright, setFooterCopyright] = useState(
    "Copyright © 2024 SENNDIK Electronics Co., Ltd. All Rights Reserved."
  )

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Thank you for subscribing with: ${email}`)
    setEmail("")
  }

  useEffect(() => {
    let cancelled = false

    const loadSettings = async () => {
      const settings = await getSiteSettings()
      if (cancelled || !settings) return

      if (settings.contactPhone) setContactPhone(settings.contactPhone)
      if (settings.contactWhatsapp) setContactWhatsapp(settings.contactWhatsapp)
      if (settings.contactEmail) setContactEmail(settings.contactEmail)
      if (settings.address) setAddress(settings.address)
      if (settings.footerCopyright) setFooterCopyright(settings.footerCopyright)
    }

    loadSettings()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <footer className="bg-[#1a1a2e] text-white">
      {/* Let's Talk Section */}
      <div className="bg-[#E94709] py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white">Let&apos;s talk</h3>
            <p className="text-white/90 text-sm">We can help you figure out your need.</p>
          </div>
          <Link href="/support">
            <Button
              variant="outline"
              className="border-white text-[#E94709] bg-white hover:bg-white/90 hover:text-[#D13E06]"
            >
              + Contact Us
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">{footerLinks.aboutUs.title}</h4>
            <ul className="space-y-2">
              {footerLinks.aboutUs.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#E94709] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* R&D & Innovation */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">{footerLinks.rdInnovation.title}</h4>
            <ul className="space-y-2">
              {footerLinks.rdInnovation.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#E94709] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">{footerLinks.solutions.title}</h4>
            <ul className="space-y-2">
              {footerLinks.solutions.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#E94709] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">{footerLinks.products.title}</h4>
            <ul className="space-y-2">
              {footerLinks.products.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#E94709] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo */}
          <div className="hidden lg:block">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SENNDIK%20%20LOGO-nElCfK71jXNeAVY8l7MyEaTeetsPj0.png"
              alt="SENNDIK"
              width={150}
              height={40}
              className="h-10 w-auto opacity-80"
            />
          </div>
        </div>

        {/* Contact Info & Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E94709] mt-0.5 shrink-0" />
                <p className="text-gray-400 text-sm">
                  Address: {address}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#E94709] shrink-0" />
                <a href={`mailto:${contactEmail}`} className="text-gray-400 hover:text-[#E94709] text-sm">
                  E-mail: {contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#E94709] shrink-0" />
                <a href={`tel:${contactPhone.replace(/\s+/g, "")}`} className="text-gray-400 hover:text-[#E94709] text-sm">
                  Tel: {contactPhone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-[#E94709] shrink-0" />
                <a href={`https://wa.me/${contactWhatsapp.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E94709] text-sm">
                  WhatsApp: {contactWhatsapp}
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:text-right">
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md lg:ml-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-[#2d2d44] border-gray-600 text-white placeholder:text-gray-500"
                    required
                  />
                </div>
                <Button type="submit" className="bg-[#E94709] hover:bg-[#D13E06] text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            {footerCopyright}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/cookies-protocol" className="text-gray-500 hover:text-[#E94709]">
              Cookies Protocol
            </Link>
            <Link href="/privacy-policy" className="text-gray-500 hover:text-[#E94709]">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Cookie Banner */}
      <CookieBanner />
    </footer>
  )
}

function CookieBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          We use cookies to enhance your browsing experience. By continuing to use this website, you agree to our{" "}
          <Link href="/cookies-protocol" className="text-[#E94709] hover:underline">
            Cookie Protocol
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="text-[#E94709] hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex gap-2 shrink-0">
          <Button
            onClick={() => setIsVisible(false)}
            className="bg-[#E94709] hover:bg-[#D13E06] text-white"
          >
            Accept
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsVisible(false)}
          >
            View Privacy Policy
          </Button>
        </div>
      </div>
    </div>
  )
}
