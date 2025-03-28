"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { useLanguage } from "@/hooks/use-language"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

interface Product {
  id: string
  name: string
  price: number
  image: string
  rating: number
  discount?: number
  category?: string
  brand?: string
}

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
  isHorizontalSlider?: boolean
  title?: string
}

export function ProductGrid({ products, isLoading = false, isHorizontalSlider = false, title }: ProductGridProps) {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)")
  const isDesktop = useMediaQuery("(min-width: 1025px)")

  // Determine how many items to show based on screen size
  const getItemsToShow = () => {
    if (isMobile) return 1
    if (isTablet) return 2
    return 4 // desktop
  }

  const itemsToShow = getItemsToShow()
  const canScrollLeft = currentIndex > 0
  const canScrollRight = currentIndex < products.length - itemsToShow

  const handlePrevious = () => {
    if (canScrollLeft) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (canScrollRight) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  // Reset index when screen size changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [isMobile, isTablet, isDesktop])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">{t("products.no_products_found")}</h3>
        <p className="text-muted-foreground mt-2">{t("products.try_different_filters")}</p>
      </div>
    )
  }

  if (isHorizontalSlider) {
    return (
      <div className="space-y-4">
        {title && <h2 className="text-2xl font-bold">{title}</h2>}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              initial={false}
              animate={{
                x: `calc(-${currentIndex * 100}% / ${itemsToShow})`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ width: `calc(${products.length * 100}% / ${itemsToShow})` }}
            >
              {products.map((product) => (
                <div key={product.id} className="px-2" style={{ width: `calc(100% / ${products.length})` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </motion.div>
          </div>

          <AnimatePresence>
            {canScrollLeft && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">{t("common.previous")}</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {canScrollRight && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">{t("common.next")}</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

