"use client"

import { useState, useEffect } from "react"
import { ProductGrid } from "@/components/product-grid"
import { useLanguage } from "@/hooks/use-language"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ClientSafeComponent } from "@/components/client-safe-component"

// Sample product data
const allProducts = [
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

// Categories and brands for filters
const categories = ["Electronics", "Fashion", "Home & Garden", "Beauty & Health"]
const brands = [
  "Apple",
  "Samsung",
  "Sony",
  "Bose",
  "Anker",
  "Fitbit",
  "Amazon",
  "Logitech",
  "Nike",
  "Adidas",
  "Puma",
  "Ray-Ban",
]

export default function ProductsPage() {
  const { t } = useLanguage()
  const [products, setProducts] = useState(allProducts)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 2500])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sortOption, setSortOption] = useState("featured")
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter products based on search, price, categories, and brands
  useEffect(() => {
    let filteredProducts = [...allProducts]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
    }

    // Filter by price range
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1],
    )

    // Filter by categories
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) => selectedCategories.includes(product.category))
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) => selectedBrands.includes(product.brand))
    }

    // Sort products
    switch (sortOption) {
      case "price-low-high":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "newest":
        // For demo purposes, we'll just reverse the array to simulate "newest"
        filteredProducts.reverse()
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      default:
        // Default sorting (featured) - no change
        break
    }

    setProducts(filteredProducts)
  }, [searchQuery, priceRange, selectedCategories, selectedBrands, sortOption])

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setPriceRange([0, 2500])
    setSelectedCategories([])
    setSelectedBrands([])
    setSortOption("featured")
  }

  const FiltersContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
          Clear All
        </Button>
      </div>

      <div className="space-y-4">
        <Accordion type="single" collapsible defaultValue="price">
          <AccordionItem value="price">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <Slider value={priceRange} min={0} max={2500} step={10} onValueChange={setPriceRange} />
                <div className="flex items-center justify-between">
                  <div className="border rounded-md px-2 py-1 w-20">${priceRange[0]}</div>
                  <div className="border rounded-md px-2 py-1 w-20 text-right">${priceRange[1]}</div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="categories">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    />
                    <Label htmlFor={`category-${category}`}>{category}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="brands">
            <AccordionTrigger>Brands</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                    />
                    <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <ClientSafeComponent>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">All Products</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="w-full md:w-64 hidden md:block">
            <FiltersContent />
          </div>

          {/* Filters - Mobile */}
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <FiltersContent />
            </SheetContent>
          </Sheet>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear search</span>
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                <Sheet>
                  <SheetTrigger asChild className="md:hidden">
                    <Button variant="outline" className="flex items-center gap-2" onClick={() => setFiltersOpen(true)}>
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                </Sheet>

                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active filters */}
            {(selectedCategories.length > 0 || selectedBrands.length > 0 || searchQuery) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {searchQuery && (
                  <div className="bg-muted text-sm rounded-full px-3 py-1 flex items-center">
                    Search: {searchQuery}
                    <Button variant="ghost" size="icon" className="h-5 w-5 ml-1" onClick={() => setSearchQuery("")}>
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                )}

                {selectedCategories.map((category) => (
                  <div key={category} className="bg-muted text-sm rounded-full px-3 py-1 flex items-center">
                    {category}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 ml-1"
                      onClick={() => handleCategoryChange(category, false)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}

                {selectedBrands.map((brand) => (
                  <div key={brand} className="bg-muted text-sm rounded-full px-3 py-1 flex items-center">
                    {brand}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 ml-1"
                      onClick={() => handleBrandChange(brand, false)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}

                <Button variant="ghost" size="sm" className="text-xs h-7" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            )}

            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {products.length} of {allProducts.length} products
              </p>
            </div>

            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </ClientSafeComponent>
  )
}

