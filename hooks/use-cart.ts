"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useLanguage } from "./use-language"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

// Mock data with real product images
// const initialItems: CartItem[] = [
//   {
//     id: "1",
//     name: "Sony WH-1000XM4 Wireless Bluetooth Headphones",
//     price: 349.99,
//     image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
//     quantity: 1,
//   },
//   {
//     id: "2",
//     name: "Samsung Galaxy S21 Ultra 5G",
//     price: 1199.99,
//     image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000&auto=format&fit=crop",
//     quantity: 1,
//   },
//   {
//     id: "5",
//     name: "Anker Wireless Charging Pad",
//     price: 29.99,
//     image: "https://images.unsplash.com/photo-1633269540827-728aabbb7646?q=80&w=1000&auto=format&fit=crop",
//     quantity: 2,
//   },
// ]

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const { toast } = useToast()
  const { user } = useAuth() // Add user auth check
  const { t } = useLanguage()

  // At the beginning of the useCart function
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // References to track actions for toast notifications
  const itemAddedRef = useRef<CartItem | null>(null)
  const itemRemovedRef = useRef<CartItem | null>(null)
  const itemUpdatedRef = useRef<{ item: CartItem; quantity: number } | null>(null)
  const cartClearedRef = useRef(false)
  const notLoggedInRef = useRef(false)

  // Load cart from localStorage on mount - only if user is logged in
  useEffect(() => {
    if (typeof window === "undefined" || !mounted) return

    if (user) {
      try {
        const storedCart = localStorage.getItem(`cart-${user.id}`)
        if (storedCart) {
          try {
            const parsedCart = JSON.parse(storedCart)
            if (Array.isArray(parsedCart)) {
              setItems(parsedCart)
            } else {
              console.error("Invalid cart format in localStorage")
              setItems([])
            }
          } catch (error) {
            console.error("Error parsing stored cart:", error)
            setItems([])
          }
        } else {
          // For demo purposes, we'll load initial items if cart is empty
          // In a real app, we would start with an empty cart
          // setItems(initialItems)
          // localStorage.setItem(`cart-${user.id}`, JSON.stringify(initialItems))
          // Start with an empty cart
          setItems([])
          localStorage.setItem(`cart-${user.id}`, JSON.stringify([]))
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error)
        setItems([])
      }
    } else {
      // Clear cart if user is not logged in
      setItems([])
    }
  }, [user, mounted])

  // Save cart to localStorage when it changes - only if user is logged in
  useEffect(() => {
    if (!mounted || !user) return

    try {
      localStorage.setItem(`cart-${user.id}`, JSON.stringify(items))
    } catch (error) {
      console.error("Error saving cart to localStorage:", error)
    }
  }, [items, user, mounted])

  // Handle toast notifications separately from state updates
  useEffect(() => {
    if (!mounted) return

    // Item added toast
    if (itemAddedRef.current) {
      const item = itemAddedRef.current
      toast({
        title: t("cart.itemAdded"),
        description: `${item.name} ${t("cart.addedToCart")}`,
      })
      itemAddedRef.current = null
    }

    // Item removed toast
    if (itemRemovedRef.current) {
      const item = itemRemovedRef.current
      toast({
        title: t("cart.itemRemoved"),
        description: t("cart.itemRemovedFromCart"),
      })
      itemRemovedRef.current = null
    }

    // Item quantity updated toast
    if (itemUpdatedRef.current) {
      const { item, quantity } = itemUpdatedRef.current
      toast({
        title: t("cart.quantityUpdated"),
        description: `${item.name} ${t("cart.quantityUpdatedTo")} ${quantity}`,
      })
      itemUpdatedRef.current = null
    }

    // Cart cleared toast
    if (cartClearedRef.current) {
      toast({
        title: t("cart.cartCleared"),
        description: t("cart.allItemRemoved"),
      })
      cartClearedRef.current = false
    }

    // Not logged in toast
    if (notLoggedInRef.current) {
      toast({
        title: t("cart.loginRequired"),
        description: t("cart.loginToAdd"),
        variant: "destructive",
      })
      notLoggedInRef.current = false
    }
  }, [toast, t, mounted])

  // Sửa lại hàm addItem để đảm bảo thêm sản phẩm đúng cách
  const addItem = useCallback(
    (item: CartItem | Omit<CartItem, "quantity">) => {
      // Check if user is logged in
      if (!user) {
        notLoggedInRef.current = true
        return
      }

      setItems((prevItems) => {
        // Make sure prevItems is an array before operations
        const currentItems = Array.isArray(prevItems) ? [...prevItems] : []

        const existingItemIndex = currentItems.findIndex((i) => i.id === item.id)

        if (existingItemIndex !== -1) {
          // Create a new array with the updated item
          const updatedItems = [...currentItems]
          const existingItem = updatedItems[existingItemIndex]
          const newQuantity = existingItem.quantity + ("quantity" in item ? item.quantity : 1)

          const updatedItem = {
            ...existingItem,
            quantity: newQuantity,
          }

          updatedItems[existingItemIndex] = updatedItem
          itemUpdatedRef.current = { item: updatedItem, quantity: newQuantity }

          return updatedItems
        } else {
          // Add new item
          const newItem = "quantity" in item ? item : ({ ...item, quantity: 1 } as CartItem)
          itemAddedRef.current = newItem

          return [...currentItems, newItem]
        }
      })
    },
    [user],
  )

  // Sửa lại hàm removeItem để đảm bảo xóa sản phẩm đúng cách
  const removeItem = useCallback(
    (id: string) => {
      // Check if user is logged in
      if (!user) return

      setItems((prevItems) => {
        const itemToRemove = prevItems.find((item) => item.id === id)
        if (itemToRemove) {
          itemRemovedRef.current = itemToRemove
        }
        return prevItems.filter((item) => item.id !== id)
      })
    },
    [user],
  )

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      // Check if user is logged in
      if (!user) return
      if (!id || quantity < 1) return

      setItems((prevItems) => {
        // Create a new array with the updated item
        return prevItems.map((item) => {
          if (item.id === id) {
            const updatedItem = { ...item, quantity }
            itemUpdatedRef.current = { item: updatedItem, quantity }
            return updatedItem
          }
          return item
        })
      })
    },
    [user],
  )

  const clearCart = useCallback(() => {
    // Check if user is logged in
    if (!user) return

    cartClearedRef.current = true
    setItems([])
    if (user) {
      try {
        localStorage.removeItem(`cart-${user.id}`)
      } catch (error) {
        console.error("Error removing cart from localStorage:", error)
      }
    }
  }, [user])

  const subtotal = Array.isArray(items) ? items.reduce((total, item) => total + item.price * item.quantity, 0) : 0

  // Sửa lại cách tính totalItems để đảm bảo chính xác
  const totalItems = Array.isArray(items)
    ? items.reduce((total, item) => {
        // Đảm bảo quantity là số và lớn hơn 0
        const itemQuantity = typeof item?.quantity === "number" && item.quantity > 0 ? item.quantity : 0
        return total + itemQuantity
      }, 0)
    : 0

  // Modify the return statement to handle non-mounted state
  return {
    items: mounted ? items : [],
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal: mounted ? subtotal : 0,
    isEmpty: mounted ? items.length === 0 : true,
    totalItems: mounted ? totalItems : 0,
    isLoggedIn: mounted ? !!user : false,
  }
}

