"use client"

import { useState } from "react"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
  showQuantity?: boolean
}

export function AddToCartButton({ product, showQuantity = true }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart(product, quantity)
    setTimeout(() => setIsAdding(false), 500)
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <div className="flex flex-col space-y-4">
      {showQuantity && (
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Quantity:</span>
          <Button
            variant="outline"
            size="icon"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="h-8 w-8"
          >
            <Minus className="h-3 w-3" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button variant="outline" size="icon" onClick={incrementQuantity} className="h-8 w-8">
            <Plus className="h-3 w-3" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      )}

      <Button
        onClick={handleAddToCart}
        className="w-full bg-green-600 hover:bg-green-700"
        disabled={isAdding || !product.inStock}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        {isAdding ? "Added!" : "Add to Cart"}
      </Button>
    </div>
  )
}

