# 🌿 Ecomart

A modern e-commerce platform built with Next.js, focusing on sustainable and eco-friendly products.

## ✨ Features

- 🛍️ Modern e-commerce interface
- 🌓 Dark/Light mode support
- 🛒 Shopping cart functionality
- 💳 Secure checkout with Stripe
- 📱 Fully responsive design
- 🎨 Customizable UI components
- 🔍 Product search and filtering
- 📝 Contact form with validation

## 🚀 Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - UI primitives
- [Stripe](https://stripe.com/) - Payment processing
- [React Hook Form](https://react-hook-form.com/) - Form handling

## 🛠️ Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ecomart.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with required environment variables:
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= # Your Stripe publishable key
STRIPE_SECRET_KEY= # Your Stripe secret key
NEXT_PUBLIC_BASE_URL= #your base url
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
app/                # Next.js app router pages
components/         # Reusable UI components
hooks/             # Custom React hooks
lib/               # Utility functions and configurations
public/            # Static assets
styles/            # Global styles
```

## 🔧 Configuration

- `components.json` - UI component configurations
- `tailwind.config.js` - Tailwind CSS settings
- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript settings

## 📝 License

MIT License - feel free to use this project for your own purposes.