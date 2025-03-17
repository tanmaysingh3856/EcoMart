import Link from "next/link"
import { notFound } from "next/navigation"
import { getProductsByCategory } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import { ChevronLeft } from "lucide-react"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // Decode the category from the URL
  const decodedCategory = decodeURIComponent(params.category)

  // Get products for this category
  const products = getProductsByCategory(decodedCategory)

  if (products.length === 0) {
    notFound()
  }

  return (
    <div className="container px-4 py-12 md:py-24">
      <div className="mb-8">
        <Link href="/products" className="text-sm text-green-600 hover:underline mb-4 inline-flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to All Products
        </Link>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{decodedCategory}</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Browse our selection of sustainable {decodedCategory.toLowerCase()} products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

