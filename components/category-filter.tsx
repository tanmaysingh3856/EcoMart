"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function CategoryFilter() {
  // Get unique categories from products
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const uniqueCategories = Array.from(new Set(products.map((product) => product.category)))
    setCategories(uniqueCategories.sort())
  }, [])

  return (
    <div className="mb-8">
      <h2 className="font-medium mb-3">Categories</h2>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-1">
          <Button asChild variant="ghost" className="justify-start w-full font-normal hover:text-green-600">
            <Link href="/products">All Products</Link>
          </Button>

          {categories.map((category) => (
            <Button
              key={category}
              asChild
              variant="ghost"
              className="justify-start w-full font-normal hover:text-green-600"
            >
              <Link href={`/products/category/${encodeURIComponent(category)}`}>{category}</Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

