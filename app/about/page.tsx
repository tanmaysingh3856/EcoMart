import { Leaf, Recycle, ShieldCheck, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container px-4 py-12 md:py-24">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-6">
          About <span className="text-green-600 dark:text-green-400">EcoMart</span>
        </h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          We're on a mission to make sustainable shopping accessible to everyone.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            EcoMart was founded in 2025 by a group of environmental enthusiasts who were frustrated by the lack of
            accessible eco-friendly products in the market. What started as a small online store with just a handful of
            products has grown into a comprehensive marketplace for sustainable goods.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our founders believed that making sustainable choices shouldn't be difficult or expensive. With this vision
            in mind, we've curated a selection of high-quality, environmentally friendly products that make it easy for
            everyone to reduce their ecological footprint.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
          </p>
        </div>
        <div className="rounded-lg overflow-hidden">
          <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop" alt="EcoMart team" className="w-full h-auto object-cover" />
        </div>
      </div>

      {/* Our Values Section */}
      <div className="mb-24">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg">
            <div className="bg-green-100 dark:bg-green-800 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-bold text-xl mb-2">Sustainability</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We carefully vet all products to ensure they meet our strict environmental standards.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg">
            <div className="bg-green-100 dark:bg-green-800 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-bold text-xl mb-2">Quality</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We believe sustainable products should be durable and built to last.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg">
            <div className="bg-green-100 dark:bg-green-800 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-bold text-xl mb-2">Community</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We support small businesses and artisans who share our commitment to the planet.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg">
            <div className="bg-green-100 dark:bg-green-800 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Recycle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-bold text-xl mb-2">Circularity</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We promote products designed with their entire lifecycle in mind.
            </p>
          </div>
        </div>
      </div>

      {/* Our Commitment Section */}
      <div className="bg-green-50 dark:bg-green-900/30 p-8 rounded-lg mb-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Our Commitment to the Planet</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Beyond just selling eco-friendly products, we're committed to minimizing our own environmental impact:
          </p>
          <ul className="text-left space-y-2 mb-6">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-gray-600 dark:text-gray-300">Carbon-neutral shipping for all orders</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-gray-600 dark:text-gray-300">
                Plastic-free packaging made from recycled materials
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-gray-600 dark:text-gray-300">
                1% of all sales donated to environmental nonprofits
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-gray-600 dark:text-gray-300">
                Remote-first company with minimal office footprint
              </span>
            </li>
          </ul>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/sustainability">Learn More About Our Practices</Link>
          </Button>
        </div>
      </div>

      {/* Team Section */}
      <div>
        <h2 className="text-2xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {[
            { name: "Tanmay Singh", role: "Founder & CEO", image: "/placeholder.svg?height=300&width=300" },
            { name: "Pranjal Saini", role: "Head of Sustainability", image: "/placeholder.svg?height=300&width=300" },
            { name: "Harshit Saini", role: "Product Curator", image: "/placeholder.svg?height=300&width=300" },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
        <p className="max-w-[700px] mx-auto text-gray-500 dark:text-gray-400 mb-6">
          Ready to make a positive impact with your purchases? Explore our collection of sustainable products today.
        </p>
        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
          <Link href="/products">Shop Now</Link>
        </Button>
      </div>
    </div>
  )
}

