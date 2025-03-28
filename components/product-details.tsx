"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/hooks/use-cart"
import { useLanguage } from "@/hooks/use-language"
import { useWishlist } from "@/hooks/use-wishlist"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Heart, ShoppingCart, Star, ChevronRight, Minus, Plus } from "lucide-react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Ensure client-side only rendering
import dynamic from "next/dynamic"

interface ProductDetailsProps {
  id: string
}

// Sample product data
const sampleProducts = [
  {
    id: "1",
    name: "Sony WH-1000XM4 Wireless Bluetooth Headphones",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    discount: 15,
    category: "Electronics",
    brand: "Sony",
    description:
      "Industry-leading noise cancellation with Dual Noise Sensor technology. Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo. Up to 30-hour battery life with quick charging (10 min charge for 5 hours of playback). Touch Sensor controls to pause/play/skip tracks, control volume, activate your voice assistant, and answer phone calls. Speak-to-chat technology automatically reduces volume during conversations.",
    features: [
      "Industry-leading noise cancellation",
      "30-hour battery life",
      "Touch sensor controls",
      "Speak-to-chat technology",
      "Wearing detection",
    ],
    specifications: {
      Brand: "Sony",
      Model: "WH-1000XM4",
      Color: "Black",
      Connectivity: "Bluetooth 5.0",
      "Battery Life": "Up to 30 hours",
      Weight: "254g",
    },
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?q=80&w=1000&auto=format&fit=crop",
    ],
  },
  {
    id: "2",
    name: "Samsung Galaxy S21 Ultra 5G",
    price: 1199.99,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    category: "Electronics",
    brand: "Samsung",
    description:
      "Pro-grade camera with 108MP high resolution and 8K video. 100x Space Zoom with dual telephoto lenses. Brightest screen with adaptive 120Hz refresh rate for smoother scrolling. S Pen compatible for the first time on an S series phone. All-day battery with intelligent power management.",
    features: [
      "108MP high resolution camera",
      "8K video recording",
      "100x Space Zoom",
      "120Hz adaptive display",
      "S Pen compatibility",
    ],
    specifications: {
      Brand: "Samsung",
      Model: "Galaxy S21 Ultra",
      Display: "6.8-inch Dynamic AMOLED 2X",
      Processor: "Exynos 2100 / Snapdragon 888",
      RAM: "12GB/16GB",
      Storage: "128GB/256GB/512GB",
      Battery: "5000mAh",
    },
    stock: 8,
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617997455403-41f333d44d5f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618478594486-c65b899c4936?q=80&w=1000&auto=format&fit=crop",
    ],
  },
]

// Prevent hydration errors by ensuring client-only rendering
const ProductDetails = ({ id }: ProductDetailsProps) => {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const { t, translateProductContent } = useLanguage()
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist()
  const { toast } = useToast()
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Find product by ID from sample data
        const foundProduct = sampleProducts.find((p) => p.id === id)

        if (foundProduct) {
          setProduct(foundProduct)
          setError(null)
        } else {
          setError("Product not found")
        }
      } catch (err) {
        setError("Failed to load product details")
        console.error("Error fetching product:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  // Get product name and description - either translated or original
  const productName = product
    ? translateProductContent
      ? t(`product.name.${product.id}`, { fallback: product.name })
      : product.name
    : ""

  const productDescription = product
    ? translateProductContent
      ? t(`product.description.${product.id}`, { fallback: product.description })
      : product.description
    : ""

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0 && value <= (product?.stock || 99)) {
      setQuantity(value)
    }
  }

  const incrementQuantity = () => {
    if (quantity < (product?.stock || 99)) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = () => {
    if (!product) return

    if (!user) {
      toast({
        title: t("cart.loginRequired"),
        description: t("cart.loginToAdd"),
        variant: "destructive",
      })
      router.push(`/login?redirectTo=/products/${id}`)
      return
    }

    const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

    // Đảm bảo quantity được truyền đúng
    addItem({
      id: product.id,
      name: product.name,
      price: discountedPrice,
      image: product.image,
      quantity: quantity,
    })

    toast({
      title: t("cart.itemAdded"),
      description: `${productName} ${t("cart.addedToCart")}`,
    })
  }

  const handleToggleWishlist = () => {
    if (!product) return

    if (!user) {
      toast({
        title: t("wishlist.login_required"),
        description: t("wishlist.login_message"),
        variant: "destructive",
      })
      router.push(`/login?redirectTo=/products/${id}`)
      return
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: t("wishlist.item_removed"),
        description: `${productName} ${t("wishlist.removed_from_wishlist")}`,
      })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        rating: product.rating,
        discount: product.discount,
        category: product.category || "Unknown",
        brand: product.brand || "Unknown",
      })
      toast({
        title: t("wishlist.item_added"),
        description: `${productName} ${t("wishlist.added_to_wishlist")}`,
      })
    }
  }

  const isWishlisted = product ? isInWishlist(product.id) : false
  const discountedPrice = product?.discount ? product.price * (1 - product.discount / 100) : product?.price

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-muted rounded-lg aspect-square"></div>
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-10 bg-muted rounded w-1/3"></div>
              <div className="h-12 bg-muted rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">{error || "Product not found"}</h2>
        <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <a href="/products">{t("buttons.browse_categories")}</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center text-sm text-muted-foreground mb-4">
        <a href="/" className="hover:text-foreground">
          {t("nav.home")}
        </a>
        <ChevronRight className="h-4 w-4 mx-1" />
        <a href="/products" className="hover:text-foreground">
          {t("nav.products")}
        </a>
        <ChevronRight className="h-4 w-4 mx-1" />
        <a href={`/categories/${product.category.toLowerCase()}`} className="hover:text-foreground">
          {product.category}
        </a>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="truncate max-w-[200px]">{productName}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[activeImageIndex] || product.image}
              alt={productName}
              fill
              className="object-cover"
            />
            {product.discount && (
              <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                {product.discount}% OFF
              </Badge>
            )}
          </div>

          <div className="flex gap-2 overflow-auto pb-2">
            {product.images.map((image: string, index: number) => (
              <button
                key={index}
                className={`relative aspect-square w-20 overflow-hidden rounded-md border ${
                  activeImageIndex === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${productName} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{productName}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : i < product.rating
                          ? "text-yellow-400 fill-current opacity-50"
                          : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">({product.rating})</span>
            </div>
          </div>

          <div className="flex items-baseline">
            {product.discount ? (
              <>
                <span className="text-3xl font-bold">${discountedPrice.toFixed(2)}</span>
                <span className="ml-2 text-lg text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                <Badge variant="outline" className="ml-4 text-destructive border-destructive">
                  {t("product.discount", { amount: `$${(product.price - discountedPrice).toFixed(2)}` })}
                </Badge>
              </>
            ) : (
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>

          <div className="flex items-center text-sm">
            <span className={product.stock > 0 ? "text-green-600" : "text-destructive"}>
              {product.stock > 0
                ? `${product.stock > 10 ? t("product.in_stock") : t("product.only_left", { count: product.stock })}`
                : t("product.out_of_stock")}
            </span>
            <span className="mx-2">•</span>
            <span>{product.brand}</span>
          </div>

          <p className="text-muted-foreground">{productDescription}</p>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">{t("product.features")}:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {product.features.map((feature: string, index: number) => (
                  <li key={index}>
                    {translateProductContent
                      ? t(`product.features.${product.id}.${index}`, { fallback: feature })
                      : feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center mb-4">
              <span className="font-medium mr-4">{t("product.quantity")}:</span>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="h-8 w-16 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-l-none"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1" size="lg" onClick={handleAddToCart} disabled={product.stock <= 0}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                {t("buttons.add_to_cart")}
              </Button>
              <Button variant={isWishlisted ? "destructive" : "outline"} size="lg" onClick={handleToggleWishlist}>
                <Heart className="mr-2 h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} />
                {isWishlisted ? t("wishlist.remove_from_wishlist") : t("product.add_to_wishlist")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="specifications" className="mb-16">
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
          <TabsTrigger
            value="specifications"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent px-4 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            {t("product.specifications")}
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent px-4 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            {t("product.reviews")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="specifications" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">{t("product.technical_specs")}</h3>
              <div className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2 py-2 border-b">
                    <span className="font-medium">{key}</span>
                    <span>{value as string}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">{t("product.package_contents")}</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>1 x {productName}</li>
                <li>1 x {t("product.package_contents")}</li>
                <li>1 x {t("product.warranty")}</li>
                {product.category === "Electronics" && (
                  <>
                    <li>1 x {t("product.package_contents")}</li>
                    <li>1 x {t("product.package_contents")}</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-6">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">{t("product.no_reviews")}</h3>
            <p className="text-muted-foreground mb-4">{t("product.be_first_review")}</p>
            <Button>{t("product.write_review")}</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Export with no SSR to prevent hydration issues
export default dynamic(() => Promise.resolve(ProductDetails), { ssr: false })

