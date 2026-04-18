"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Phone, Mail, MapPin, MessageCircle, ChevronDown } from "lucide-react"
import { useSiteMarketing } from "@/components/site-marketing-provider"

const countries = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bangladesh",
  "Belgium", "Brazil", "Canada", "Chile", "China", "Colombia", "Czech Republic", "Denmark",
  "Egypt", "Finland", "France", "Germany", "Greece", "Hong Kong", "Hungary", "India",
  "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Japan", "Jordan", "Kenya",
  "South Korea", "Kuwait", "Malaysia", "Mexico", "Morocco", "Netherlands", "New Zealand",
  "Nigeria", "Norway", "Pakistan", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
  "Romania", "Russia", "Saudi Arabia", "Singapore", "South Africa", "Spain", "Sweden",
  "Switzerland", "Taiwan", "Thailand", "Turkey", "UAE", "Ukraine", "United Kingdom",
  "United States", "Venezuela", "Vietnam"
]

export default function SupportPage() {
  const m = useSiteMarketing()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    country: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCountryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, country: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitMessage(null)

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const result = (await response.json()) as { ok?: boolean; message?: string }

      if (!response.ok || !result.ok) {
        setSubmitError(result.message || "提交失败，请稍后重试。")
        return
      }

      setSubmitMessage("提交成功，我们会尽快联系你。")
      setFormData({
        name: "",
        email: "",
        companyName: "",
        country: "",
        message: "",
      })
    } catch {
      setSubmitError("网络异常，请稍后重试。")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[300px] lg:h-[400px] overflow-hidden">
        <Image src={m.supportTop.heroImageUrl} alt="Support" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      </section>

      {/* Logo Display Section */}
      <section className="relative -mt-20 lg:-mt-32 pb-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-b from-gray-100 to-white rounded-lg shadow-lg p-8 lg:p-12 max-w-4xl mx-auto"
          >
            <div className="text-right">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
                <span className="text-[#E94709]">S</span>ENNDIK
              </h1>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-6">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-10 h-10 rounded-full bg-[#E94709] flex items-center justify-center cursor-pointer"
            onClick={() => {
              document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <ChevronDown className="w-6 h-6 text-white" />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-16 lg:py-24 bg-white relative">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-50 to-transparent" />
          <svg
            className="absolute bottom-0 left-0 w-full h-auto opacity-5"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Contact Us
              </h2>
              <div className="w-12 h-1 bg-[#E94709] mb-8" />

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  SENNDIK
                </h3>
                <p className="text-muted-foreground">
                  No. 5, Baiheng Road, Panshi Town, Yueqing City, Wenzhou City, Zhejiang Province
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#E94709]/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#E94709]" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tel</p>
                    <a href="tel:+8618514211502" className="text-foreground hover:text-[#E94709] font-medium">
                      +86 18514211502
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#E94709]/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-[#E94709]" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">WhatsApp</p>
                    <a
                      href="https://wa.me/8618514211502"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-[#E94709] font-medium"
                    >
                      +86 18514211502
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#E94709]/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#E94709]" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">E-mail</p>
                    <a href="mailto:info@zcximandun.com" className="text-foreground hover:text-[#E94709] font-medium">
                      info@zcximandun.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#E94709]/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#E94709]" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <span className="text-foreground font-medium text-sm">
                      No. 5, Baiheng Road, Panshi Town, Yueqing City, Wenzhou, Zhejiang
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-muted-foreground mb-8">
                If you are interested in our brand/products and want to know more details, please leave a message here, we will reply you as soon as we can.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <span className="text-[#E94709]">*</span> Name
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="border-gray-300 focus:border-[#E94709] focus:ring-[#E94709]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <span className="text-[#E94709]">*</span> Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="border-gray-300 focus:border-[#E94709] focus:ring-[#E94709]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <span className="text-[#E94709]">*</span> Company Name
                  </label>
                  <Input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="border-gray-300 focus:border-[#E94709] focus:ring-[#E94709]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <span className="text-[#E94709]">*</span> Country/Region
                  </label>
                  <Select value={formData.country} onValueChange={handleCountryChange}>
                    <SelectTrigger className="border-gray-300 focus:border-[#E94709] focus:ring-[#E94709]">
                      <SelectValue placeholder="Please select country/region" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <span className="text-[#E94709]">*</span> Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="border-gray-300 focus:border-[#E94709] focus:ring-[#E94709]"
                  />
                </div>

                <p className="text-sm text-muted-foreground">
                  By submitting this form, you are agreeing to the{" "}
                  <Link href="/privacy-policy" className="text-[#E94709] hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  of the website.
                </p>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#E94709] hover:bg-[#D13E06] text-white px-8"
                >
                  {isSubmitting ? "Submitting..." : "+ Submit"}
                </Button>
                {submitMessage ? <p className="text-sm text-green-600">{submitMessage}</p> : null}
                {submitError ? <p className="text-sm text-red-600">{submitError}</p> : null}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
