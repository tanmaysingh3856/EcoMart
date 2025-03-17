"use client"

import Link from "next/link"
import { ShoppingBag, Menu, Leaf, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import { useState, useEffect } from "react"

export function SiteHeader() {
  const { cart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    // Check if user prefers dark mode
    const isDark =
      localStorage.getItem("darkMode") === "true" ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)

    setIsDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("darkMode", (!isDarkMode).toString())
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col space-y-4 py-4">
                <Link href="/" className="flex items-center text-lg font-bold" onClick={() => setIsOpen(false)}>
                  <Leaf className="mr-2 h-5 w-5 text-green-600" />
                  EcoMart
                </Link>
                <nav className="flex flex-col space-y-2">
                  <Link href="/" className="hover:text-green-600 transition-colors" onClick={() => setIsOpen(false)}>
                    Home
                  </Link>
                  <Link
                    href="/products"
                    className="hover:text-green-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Products
                  </Link>
                  <Link
                    href="/about"
                    className="hover:text-green-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="hover:text-green-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center">
            <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
            <span className="ml-2 text-xl font-bold">EcoMart</span>
          </Link>
        </div>
        <nav className="hidden lg:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-green-600 transition-colors">
            Home
          </Link>
          <Link href="/products" className="text-sm font-medium hover:text-green-600 transition-colors">
            Products
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-green-600 transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-green-600 transition-colors">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

