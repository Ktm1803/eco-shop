"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus } from "lucide-react"
import { useCart, type CartItem as CartItemType } from "@/hooks/use-cart"
import { useLanguage } from "@/hooks/use-language"
import Image from "next/image"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()
  const [quantity, setQuantity] = useState(item.quantity)
  const { t } = useLanguage()

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number.parseInt(e.target.value)
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity)
      // Đảm bảo cập nhật số lượng ngay lập tức
      updateQuantity(item.id, newQuantity)
    }
  }

  const incrementQuantity = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    // Đảm bảo cập nhật số lượng ngay lập tức
    updateQuantity(item.id, newQuantity)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      // Đảm bảo cập nhật số lượng ngay lập tức
      updateQuantity(item.id, newQuantity)
    }
  }

  // Đảm bảo nút xóa hoạt động đúng
  const handleRemove = () => {
    // Gọi hàm removeItem để xóa sản phẩm khỏi giỏ hàng
    removeItem(item.id)
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg">
      <div className="relative h-20 w-20 rounded-md overflow-hidden">
        <Image
          src={item.image || "/placeholder.svg?height=80&width=80"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm sm:text-base line-clamp-1">{item.name}</h3>
        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={decrementQuantity} disabled={quantity <= 1}>
          <Minus className="h-3 w-3" />
          <span className="sr-only">{t("cart.decrease_quantity")}</span>
        </Button>

        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="h-8 w-16 text-center"
        />

        <Button variant="outline" size="icon" className="h-8 w-8" onClick={incrementQuantity}>
          <Plus className="h-3 w-3" />
          <span className="sr-only">{t("cart.increase_quantity")}</span>
        </Button>
      </div>

      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        <p className="font-medium">${(item.price * quantity).toFixed(2)}</p>

        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={handleRemove} type="button">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">{t("cart.remove_item")}</span>
        </Button>
      </div>
    </div>
  )
}

