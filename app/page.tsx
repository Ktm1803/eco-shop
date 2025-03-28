"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/product-grid"
import { useLanguage } from "@/hooks/use-language"
import { FeaturedCategories } from "@/components/featured-categories"
import { Newsletter } from "@/components/newsletter"
import { ShoppingBag, ArrowRight, Truck, Shield, CreditCard, Clock } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

// Sample product data
const featuredProducts = [
  {
    id: "1",
    name: "Sony WH-1000XM4 Wireless Bluetooth Headphones",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    discount: 15,
    category: "Electronics",
    brand: "Sony",
  },
  {
    id: "2",
    name: "Samsung Galaxy S21 Ultra 5G",
    price: 1199.99,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    category: "Electronics",
    brand: "Samsung",
  },
  {
    id: "3",
    name: "Apple MacBook Pro 16-inch",
    price: 2399.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    category: "Electronics",
    brand: "Apple",
  },
  {
    id: "4",
    name: "Bose QuietComfort Earbuds",
    price: 279.99,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1000&auto=format&fit=crop",
    rating: 4.6,
    discount: 10,
    category: "Electronics",
    brand: "Bose",
  },
  {
    id: "5",
    name: "Anker Wireless Charging Pad",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1633269540827-728aabbb7646?q=80&w=1000&auto=format&fit=crop",
    rating: 4.5,
    category: "Electronics",
    brand: "Anker",
  },
  {
    id: "6",
    name: "Fitbit Versa 3 Smartwatch",
    price: 229.99,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=1000&auto=format&fit=crop",
    rating: 4.4,
    discount: 20,
    category: "Electronics",
    brand: "Fitbit",
  },
  {
    id: "7",
    name: "Amazon Echo Dot (4th Gen)",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=1000&auto=format&fit=crop",
    rating: 4.6,
    category: "Electronics",
    brand: "Amazon",
  },
  {
    id: "8",
    name: "Logitech MX Master 3 Mouse",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    category: "Electronics",
    brand: "Logitech",
  },
]

const newArrivals = [
  {
    id: "9",
    name: "Nike Air Max 270",
    price: 150.0,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    rating: 4.5,
    category: "Fashion",
    brand: "Nike",
  },
  {
    id: "10",
    name: "Adidas Ultraboost 21",
    price: 180.0,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    category: "Fashion",
    brand: "Adidas",
  },
  {
    id: "11",
    name: "Puma RS-X Sneakers",
    price: 110.0,
    image: "https://images.unsplash.com/photo-1608379743498-63e07f345a6b?q=80&w=1000&auto=format&fit=crop",
    rating: 4.3,
    discount: 15,
    category: "Fashion",
    brand: "Puma",
  },
  {
    id: "12",
    name: "Ray-Ban Aviator Sunglasses",
    price: 154.0,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    category: "Fashion",
    brand: "Ray-Ban",
  },
]

export default function HomePage() {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{t("home.hero_title")}</h1>
              <p className="text-lg text-muted-foreground">{t("home.hero_subtitle")}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/products">
                    {t("buttons.shop_now")} <ShoppingBag className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/categories">
                    {t("buttons.browse_categories")} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1000&auto=format&fit=crop"
                alt="Hero"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-background rounded-lg p-4 shadow-lg hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Summer Sale</p>
                    <p className="text-sm text-muted-foreground">Up to 50% off</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 bg-background rounded-lg shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{t("home.features.free_shipping")}</h3>
                <p className="text-sm text-muted-foreground">{t("home.features.free_shipping_description")}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-background rounded-lg shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{t("home.features.secure_payment")}</h3>
                <p className="text-sm text-muted-foreground">{t("home.features.secure_payment_description")}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-background rounded-lg shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{t("home.features.easy_returns")}</h3>
                <p className="text-sm text-muted-foreground">{t("home.features.easy_returns_description")}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-background rounded-lg shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{t("home.features.support")}</h3>
                <p className="text-sm text-muted-foreground">{t("home.features.support_description")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">{t("home.featured_products")}</h2>
            <Button variant="ghost" asChild>
              <Link href="/products">
                {t("buttons.view_all")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ProductGrid products={featuredProducts} isHorizontalSlider={true} />
        </div>
      </section>

      {/* Categories */}
      <FeaturedCategories />

      {/* New Arrivals */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">{t("home.new_arrivals")}</h2>
            <Button variant="ghost" asChild>
              <Link href="/products?sort=newest">
                {t("buttons.view_all")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}

