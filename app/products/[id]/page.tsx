import { notFound } from "next/navigation"
import { getProductById } from "@/lib/products"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Leaf } from "lucide-react"
import Link from "next/link"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container px-4 py-12 md:py-24">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-auto object-cover"
            width={600}
            height={600}
          />
        </div>

        <div className="flex flex-col space-y-6">
          <div>
            <Link href="/products" className="text-sm text-green-600 hover:underline mb-4 inline-block">
              ← Back to Products
            </Link>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium dark:bg-green-900 dark:text-green-200">
                {product.category}
              </div>
              {product.inStock ? (
                <div className="ml-2 text-green-600 text-sm flex items-center">
                  <span className="h-2 w-2 rounded-full bg-green-600 mr-1"></span>
                  In Stock
                </div>
              ) : (
                <div className="ml-2 text-red-600 text-sm flex items-center">
                  <span className="h-2 w-2 rounded-full bg-red-600 mr-1"></span>
                  Out of Stock
                </div>
              )}
            </div>
          </div>

          <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>

          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
          </div>

          <div className="flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Eco-friendly product</span>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs dark:bg-gray-800 dark:text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-4">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}

