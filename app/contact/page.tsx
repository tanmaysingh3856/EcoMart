"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="container px-4 py-12 md:py-24">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-6">Get in Touch</h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Have questions about our products or sustainability practices? We'd love to hear from you.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-24">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

          {isSubmitted ? (
            <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg text-center">
              <div className="bg-green-100 dark:bg-green-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Thank you for reaching out. We'll get back to you as soon as possible.
              </p>
              <Button onClick={() => setIsSubmitted(false)} className="bg-green-600 hover:bg-green-700">
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" name="name" value={formState.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" value={formState.email} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" value={formState.subject} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

          <div className="space-y-6 mb-12">
            <div className="flex items-start">
              <div className="bg-green-100 dark:bg-green-800 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600 dark:text-gray-300">support@ecomart.com</p>
                <p className="text-gray-500 text-sm">We aim to respond within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-100 dark:bg-green-800 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-gray-600 dark:text-gray-300">(555) 123-4567</p>
                <p className="text-gray-500 text-sm">Mon-Fri, 9am-5pm EST</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-100 dark:bg-green-800 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">Office</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  123 Green Street
                  <br />
                  Portland, OR 97204
                </p>
                <p className="text-gray-500 text-sm">By appointment only</p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="rounded-lg overflow-hidden h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <MapPin className="h-8 w-8 text-gray-400" />
            <span className="ml-2 text-gray-500">Map Placeholder</span>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-24">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>

        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do you verify products are eco-friendly?</AccordionTrigger>
            <AccordionContent>
              We have a rigorous vetting process for all products. We evaluate materials, manufacturing processes,
              packaging, and the overall environmental impact. We prioritize products with certifications like GOTS,
              FSC, and B Corp, and we regularly review our product catalog to ensure continued compliance with our
              sustainability standards.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>What is your shipping policy?</AccordionTrigger>
            <AccordionContent>
              We offer carbon-neutral shipping on all orders. Standard shipping typically takes 5-7 business days, while
              express shipping takes 2-3 business days. We use plastic-free packaging made from recycled materials. For
              orders over $50, standard shipping is free.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
            <AccordionContent>
              Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days,
              depending on the destination. Please note that customers are responsible for any import duties or taxes
              that may apply.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent>
              We accept returns within 30 days of delivery for unused items in their original packaging. To initiate a
              return, please contact our customer service team. Please note that customers are responsible for return
              shipping costs unless the item is defective or was sent in error.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>How can I track my order?</AccordionTrigger>
            <AccordionContent>
              Once your order ships, you'll receive a confirmation email with tracking information. You can also log
              into your account on our website to view your order status and tracking details.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Newsletter Section */}
      <div className="bg-green-50 dark:bg-green-900/30 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
          Subscribe to our newsletter for updates on new products, sustainability tips, and exclusive offers.
        </p>
        <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <Input type="email" placeholder="Your email address" className="flex-grow" required />
          <Button type="submit" className="bg-green-600 hover:bg-green-700 whitespace-nowrap">
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  )
}

