"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Calendar } from "lucide-react"

const newsItems = [
  {
    id: 1,
    title: "SENNDIK participated in the SPS 2025",
    date: "2025-11-07",
    image: "/images/news/news-1.jpg",
    href: "/news/sps-2025",
  },
  {
    id: 2,
    title: "SENNDIK participated in the Munich Electronica 2024",
    date: "2024-11-12",
    image: "/images/news/news-2.jpg",
    href: "/news/munich-electronica-2024",
  },
  {
    id: 3,
    title: "SENNDIK participated in the International Exhibition for Plast and Rubber Industries",
    date: "2024-09-07",
    image: "/images/news/news-3.jpg",
    href: "/news/plast-rubber-exhibition",
  },
]

export function NewsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 3

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">News</h2>
          <div className="w-16 h-1 bg-[#E94709] mx-auto mt-4" />
        </motion.div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group"
            >
              <Link href={item.href}>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
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

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-2 mt-12"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${
                currentPage === page
                  ? "bg-[#E94709] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Background Text */}
      <div className="relative overflow-hidden mt-20 py-20 bg-gray-50">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[15vw] font-bold text-gray-200 whitespace-nowrap select-none">
            OUR TEAM
          </span>
        </div>
      </div>
    </section>
  )
}
