"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { loadStripe } from "@stripe/stripe-js"
import { useRouter } from "next/navigation"
import { createCheckoutSession } from "@/lib/stripe-actions"
import { toast } from "sonner"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [error, setError] = useState("")

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/cart")
    }
  }, [cart.length, router])

  const shippingCost = shippingMethod === "express" ? 1200 : 400 // Changed to INR (₹400 and ₹1200)
  const subtotalInr = subtotal * 80 // Convert USD to INR (approximate conversion)
  const gstRate = 0.18 // 18% GST
  const gstAmount = (subtotalInr + shippingCost) * gstRate
  const total = subtotalInr + shippingCost + gstAmount

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (cart.length === 0) {
      setError("Your cart is empty")
      toast.error("Your cart is empty")
      return
    }

    setIsLoading(true)

    try {
      const stripe = await stripePromise

      if (!stripe) {
        throw new Error("Failed to initialize Stripe")
      }

      const lineItems = cart.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.product.name,
            description: item.product.description,
            images: [item.product.image],
          },
          unit_amount: Math.round(item.product.price * 80 * 100), // Convert USD to INR and to smallest currency unit (paise)
        },
        quantity: item.quantity,
      }))

      // Add shipping as a line item
      lineItems.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: shippingMethod === "express" ? "Express Shipping" : "Standard Shipping",
            description: shippingMethod === "express" ? "2-3 business days" : "5-7 business days",
            images: []
          },
          unit_amount: shippingCost * 100, // Convert to paise
        },
        quantity: 1,
      })

      // Add GST as a line item
      lineItems.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: "GST (18%)",
            description: "Goods and Services Tax",
            images: []
          },
          unit_amount: Math.round(gstAmount * 100), // Convert to paise
        },
        quantity: 1,
      })

      const { sessionId } = await createCheckoutSession(lineItems)

      const { error: redirectError } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (redirectError) {
        setError(redirectError.message || "Something went wrong with the checkout process")
        toast.error("Checkout failed. Please try again.")
      } else {
        clearCart()
        toast.success("Redirecting to checkout...")
      }
    } catch (error: any) {
      console.error("Error creating checkout session:", error)
      const errorMessage = error.message || "Something went wrong with the checkout process"
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (cart.length === 0) {
    return null
  }

  return (
    <div className="container px-4 py-12 md:py-24">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={handleCheckout}>
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" required />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State / Province</Label>
                      <Input id="state" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP / Postal Code</Label>
                      <Input id="zip" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" defaultValue="United States" required />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-xl font-bold mb-4">Shipping Method</h2>
                <RadioGroup
                  defaultValue="standard"
                  value={shippingMethod}
                  onValueChange={setShippingMethod}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between border rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="font-medium">
                        Standard Shipping
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">5-7 business days</span>
                      <span className="font-medium">₹400</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="font-medium">
                        Express Shipping
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">2-3 business days</span>
                      <span className="font-medium">₹1,200</span>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="md:hidden">
                <Separator className="mb-6" />
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotalInr.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>₹{shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (18%)</span>
                      <span>₹{gstAmount.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Pay with Stripe"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="hidden md:block bg-gray-50 dark:bg-gray-800 rounded-lg p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between">
                <div className="flex items-center">
                  <span className="bg-green-100 text-green-800 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 dark:bg-green-900 dark:text-green-200">
                    {item.quantity}
                  </span>
                  <span className="text-sm">{item.product.name}</span>
                </div>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <Separator className="mb-4" />

          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotalInr.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹{gstAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <Button
            type="submit"
            form="checkout-form"
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isLoading}
            onClick={handleCheckout}
          >
            {isLoading ? "Processing..." : "Pay with Stripe"}
          </Button>
        </div>
      </div>
    </div>
  )
}

