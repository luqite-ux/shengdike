import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Download, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { productCategories as fallbackCategories } from "@/lib/products-data"
import {
  getAllProductIds,
  getProductById,
  getProductCatalog,
  getRelatedProducts,
} from "@/lib/sanity/products"

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  const ids = await getAllProductIds()
  return ids.map((id) => ({ id }))
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getProductById(id)
  
  if (!product) {
    return {
      title: "Product Not Found - SENNDIK",
    }
  }
  
  return {
    title: `${product.name} - SENNDIK`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getProductById(id)
  
  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product)
  const { products } = await getProductCatalog()
  const categoryProducts = products.filter((p) => p.category === product.category && p.id !== id).slice(0, 4)
  const category = fallbackCategories.find((c) => c.id === product.category) || {
    id: product.category,
    name: product.categoryName,
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4 mt-16 lg:mt-20">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#E94709]">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/products" className="text-gray-500 hover:text-[#E94709]">Products</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href={`/products?category=${product.category}`} className="text-gray-500 hover:text-[#E94709]">
              {product.categoryName}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{product.model}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Category Sidebar */}
            <aside className="w-full lg:w-64 shrink-0 order-2 lg:order-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                <div className="bg-[#E94709] text-white p-4">
                  <h3 className="font-bold text-lg">Product Categories</h3>
                </div>
                <nav className="p-2">
                  {[...new Map(products.map((p) => [p.category, { id: p.category, name: p.categoryName }])).values()]
                    .filter((cat) => cat.id !== "all")
                    .map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${cat.id}`}
                      className={`block px-4 py-3 rounded-md text-sm transition-colors ${
                        cat.id === product.category
                          ? "bg-[#E94709] text-white font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Product Content */}
            <div className="flex-1 order-1 lg:order-2">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Product Image */}
                <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
                  <div className="relative w-full aspect-square max-w-md">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div>
                  <span className="inline-block px-3 py-1 bg-[#E94709]/10 text-[#E94709] text-sm font-medium rounded-full mb-4">
                    {product.categoryName}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <p className="text-lg text-gray-500 mb-6">Model: {product.model}</p>
                  
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-[#E94709] rounded-full mt-2 shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    {product.datasheetUrl ? (
                      <a
                        href={product.datasheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={`${product.model || product.name}-datasheet.pdf`}
                      >
                        <Button className="bg-[#E94709] hover:bg-[#D13E06]">
                          <Download className="w-4 h-4 mr-2" />
                          Download Datasheet
                        </Button>
                      </a>
                    ) : (
                      <Link href={`/support?product=${encodeURIComponent(product.model || product.id)}`}>
                        <Button className="bg-[#E94709] hover:bg-[#D13E06]">
                          <Download className="w-4 h-4 mr-2" />
                          Request Datasheet
                        </Button>
                      </Link>
                    )}
                    <Link href="/support">
                      <Button variant="outline" className="border-[#E94709] text-[#E94709] hover:bg-[#E94709]/10">
                        <Mail className="w-4 h-4 mr-2" />
                        Request Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Specifications Table */}
              <div className="bg-gray-50 rounded-lg p-6 mb-12">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody>
                      {product.specifications.map((spec, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-700 w-1/3 border border-gray-200">
                            {spec.label}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-[#1a1f36] rounded-lg p-8 mb-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">Need Help Choosing?</h3>
                    <p className="text-gray-300">Our technical team is ready to assist you with product selection.</p>
                  </div>
                  <div className="flex gap-4">
                    <Link href="/support">
                      <Button className="bg-[#E94709] hover:bg-[#D13E06]">
                        <Mail className="w-4 h-4 mr-2" />
                        Contact Us
                      </Button>
                    </Link>
                    <a href="tel:+8618514211502">
                      <Button variant="outline" className="border-white text-white hover:bg-white/10">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                    </a>
                  </div>
                </div>
              </div>

              {/* Related Products */}
              {relatedProducts.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Related Products</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedProducts.map((relatedProduct) => (
                      <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
                          <div className="relative h-40 bg-gray-50 flex items-center justify-center p-4">
                            <Image
                              src={relatedProduct.image}
                              alt={relatedProduct.name}
                              fill
                              className="object-contain p-4 group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="p-4 border-t">
                            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#E94709] transition-colors line-clamp-2">
                              {relatedProduct.name}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">Model: {relatedProduct.model}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* More from Category */}
              {categoryProducts.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">More {category?.name}</h2>
                    <Link 
                      href={`/products?category=${product.category}`}
                      className="text-[#E94709] hover:underline text-sm font-medium"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categoryProducts.map((catProduct) => (
                      <Link key={catProduct.id} href={`/products/${catProduct.id}`}>
                        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
                          <div className="relative h-36 bg-gray-50 flex items-center justify-center p-4">
                            <Image
                              src={catProduct.image}
                              alt={catProduct.name}
                              fill
                              className="object-contain p-4 group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="p-3 border-t">
                            <h3 className="text-xs font-semibold text-gray-900 group-hover:text-[#E94709] transition-colors line-clamp-2">
                              {catProduct.name}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
