"use client"

import { useEffect } from "react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    // Clear the cart once when the success page loads
    const clearCartOnce = () => {
      clearCart()
    }
    clearCartOnce()
  }, []) // Remove clearCart from dependencies

  return (
    <div className="container px-4 py-12 md:py-24 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="max-w-md w-full text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Order Successful!</h1>
        <p className="text-gray-500 mb-6">
          Thank you for your purchase. We've received your order and will begin processing it right away. You'll receive
          a confirmation email shortly.
        </p>
        <Button asChild className="bg-green-600 hover:bg-green-700">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  )
}

