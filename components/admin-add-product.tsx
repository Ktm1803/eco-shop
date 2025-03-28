"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/hooks/use-language"
import { X, Plus, Upload, Loader2 } from "lucide-react"
import { ClientSafeComponent } from "@/components/client-safe-component"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AddProductProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onProductAdded?: () => void
}

export function AdminAddProduct({ open, onOpenChange, onProductAdded }: AddProductProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [features, setFeatures] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    discount: "",
  })

  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Add feature
  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()])
      setNewFeature("")
    }
  }

  // Remove feature
  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)

    // Simulate upload delay
    setTimeout(() => {
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
        setUploadingImage(false)
      }
      reader.readAsDataURL(file)
    }, 1000)
  }

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = t("admin.required_field")
    if (!formData.description.trim()) newErrors.description = t("admin.required_field")
    if (!formData.price.trim() || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = t("admin.required_field")
    }
    if (!formData.stock.trim() || isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = t("admin.required_field")
    }
    if (!formData.category.trim()) newErrors.category = t("admin.required_field")
    if (!formData.brand.trim()) newErrors.brand = t("admin.required_field")
    if (
      formData.discount &&
      (isNaN(Number(formData.discount)) || Number(formData.discount) < 0 || Number(formData.discount) > 100)
    ) {
      newErrors.discount = "Discount must be between 0 and 100"
    }
    if (!imagePreview) newErrors.image = t("admin.required_field")

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would send this data to your API
      console.log("Product data:", {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        discount: formData.discount ? Number(formData.discount) : undefined,
        features,
        image: imagePreview,
      })

      toast({
        title: t("admin.product_added"),
        description: t("admin.product_added_message"),
      })

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        brand: "",
        discount: "",
      })
      setFeatures([])
      setImagePreview(null)
      setIsSubmitting(false)

      // Close dialog
      onOpenChange(false)

      // Callback
      if (onProductAdded) onProductAdded()
    }, 1500)
  }

  // Categories and brands for select options
  const categories = ["Electronics", "Fashion", "Home & Garden", "Beauty & Health"]
  const brands = ["Apple", "Samsung", "Sony", "Bose", "Nike", "Adidas", "Puma", "Ray-Ban"]

  return (
    <ClientSafeComponent>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("admin.add_product_title")}</DialogTitle>
            <DialogDescription>{t("admin.add_product_description")}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-right">
                    {t("admin.product_name")} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="description" className="text-right">
                    {t("admin.product_description")} <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    className={errors.description ? "border-destructive" : ""}
                  />
                  {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price" className="text-right">
                      {t("admin.product_price")} <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                      <Input
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        type="number"
                        min="0.01"
                        step="0.01"
                        className={`pl-7 ${errors.price ? "border-destructive" : ""}`}
                      />
                    </div>
                    {errors.price && <p className="text-sm text-destructive mt-1">{errors.price}</p>}
                  </div>

                  <div>
                    <Label htmlFor="stock" className="text-right">
                      {t("admin.product_stock")} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="stock"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      type="number"
                      min="0"
                      step="1"
                      className={errors.stock ? "border-destructive" : ""}
                    />
                    {errors.stock && <p className="text-sm text-destructive mt-1">{errors.stock}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category" className="text-right">
                      {t("admin.product_category")} <span className="text-destructive">*</span>
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-destructive mt-1">{errors.category}</p>}
                  </div>

                  <div>
                    <Label htmlFor="brand" className="text-right">
                      {t("admin.product_brand")} <span className="text-destructive">*</span>
                    </Label>
                    <Select value={formData.brand} onValueChange={(value) => handleSelectChange("brand", value)}>
                      <SelectTrigger className={errors.brand ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.brand && <p className="text-sm text-destructive mt-1">{errors.brand}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="discount" className="text-right">
                    {t("admin.product_discount")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="discount"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      type="number"
                      min="0"
                      max="100"
                      className={`pr-7 ${errors.discount ? "border-destructive" : ""}`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">%</span>
                  </div>
                  {errors.discount && <p className="text-sm text-destructive mt-1">{errors.discount}</p>}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-right">
                    {t("admin.product_image")} <span className="text-destructive">*</span>
                  </Label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors ${
                      errors.image ? "border-destructive" : "border-muted-foreground/25"
                    }`}
                    onClick={() => document.getElementById("image-upload")?.click()}
                  >
                    <input
                      type="file"
                      id="image-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />

                    {uploadingImage ? (
                      <div className="py-8 flex flex-col items-center">
                        <Loader2 className="h-10 w-10 text-muted-foreground animate-spin mb-2" />
                        <p className="text-sm text-muted-foreground">Uploading image...</p>
                      </div>
                    ) : imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Product preview"
                          className="max-h-[200px] mx-auto rounded-md object-contain"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation()
                            setImagePreview(null)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="py-8 flex flex-col items-center">
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="font-medium">{t("admin.upload_image")}</p>
                        <p className="text-sm text-muted-foreground mt-1">{t("admin.drag_drop")}</p>
                        <p className="text-xs text-muted-foreground mt-2">{t("admin.image_formats")}</p>
                      </div>
                    )}
                  </div>
                  {errors.image && <p className="text-sm text-destructive mt-1">{errors.image}</p>}
                </div>

                <div>
                  <Label className="text-right">{t("admin.product_features")}</Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        placeholder="Enter a product feature"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addFeature()
                          }
                        }}
                      />
                      <Button type="button" onClick={addFeature} size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {features.length > 0 && (
                      <div className="border rounded-md p-2 space-y-2">
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-center justify-between bg-muted/50 rounded-md p-2">
                            <span className="text-sm">{feature}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => removeFeature(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                {t("admin.cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("admin.saving")}...
                  </>
                ) : (
                  t("admin.save_product")
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </ClientSafeComponent>
  )
}

