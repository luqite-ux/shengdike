"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Calendar } from "lucide-react"
import { useSiteMarketing } from "@/components/site-marketing-provider"

export function NewsSection() {
  const m = useSiteMarketing()
  const n = m.homeNews
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(n.items.length / 3))

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{n.sectionTitle}</h2>
          <div className="w-16 h-1 bg-[#E94709] mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {n.items.map((item, index) => (
            <motion.article
              key={`${item.href}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group"
            >
              <Link href={item.href}>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#E94709] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Date: {item.date}</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentPage === page ? "bg-[#E94709] w-8" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Page ${page}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
