"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart(product)
    setTimeout(() => setIsAdding(false), 500)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <div className="overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={300}
            className="h-[200px] w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <Link href={`/products/${product.id}`} className="font-semibold hover:underline">
            {product.name}
          </Link>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">${product.price.toFixed(2)}</div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full bg-green-600 hover:bg-green-700" disabled={isAdding}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isAdding ? "Added!" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}

