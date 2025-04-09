import Link from "next/link"
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { CartProvider } from "@/lib/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EcoMart - Sustainable Shopping",
  description: "Shop eco-friendly and sustainable products",
    generator: 'Tanmaysingh3856'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  © 2025 EcoMart. All rights reserved.
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <Link href="/terms">Terms</Link>
                  <Link href="/privacy">Privacy</Link>
                  <Link href="/sustainability">Sustainability</Link>
                </div>
              </div>
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  )
}



import './globals.css'