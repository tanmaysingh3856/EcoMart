"use server"

import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
  typescript: true,
  telemetry: false,
  maxNetworkRetries: 2,
});

export async function createCheckoutSession(lineItems: any[]) {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing Stripe secret key");
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/checkout/cancel`,
      currency: "inr",
      submit_type: "pay",
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      customer_creation: "always",
      allow_promotion_codes: true,
      tax_id_collection: {
        enabled: true,
      },
      automatic_tax: {
        enabled: false,
      },
    })

    return { sessionId: session.id }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw error
  }
}

