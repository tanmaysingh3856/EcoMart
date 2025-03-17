import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"
import Link from "next/link"

export default function CancelPage() {
  return (
    <div className="container px-4 py-12 md:py-24 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="max-w-md w-full text-center">
        <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Payment Cancelled</h1>
        <p className="text-gray-500 mb-6">
          Your payment was cancelled. Your cart items are still saved, and you can try again whenever you're ready.
        </p>
        <div className="space-x-4">
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/checkout">Try Again</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/cart">Return to Cart</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

