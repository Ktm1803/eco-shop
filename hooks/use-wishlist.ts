"use client"

import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useLanguage } from "@/hooks/use-language"

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  rating: number
  discount?: number
  category: string
  brand: string
}

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([])
  const { toast } = useToast()
  const { user } = useAuth()
  const { t } = useLanguage()

  // Load wishlist from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return

    if (user) {
      try {
        const storedWishlist = localStorage.getItem(`wishlist-${user.id}`)
        if (storedWishlist) {
          const parsedWishlist = JSON.parse(storedWishlist)
          if (Array.isArray(parsedWishlist)) {
            setItems(parsedWishlist)
          } else {
            console.error("Invalid wishlist format in localStorage")
            setItems([])
          }
        }
      } catch (error) {
        console.error("Error loading wishlist from localStorage:", error)
        setItems([])
      }
    } else {
      // Clear wishlist if user is not logged in
      setItems([])
    }
  }, [user])

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem(`wishlist-${user.id}`, JSON.stringify(items))
      } catch (error) {
        console.error("Error saving wishlist to localStorage:", error)
      }
    }
  }, [items, user])

  const addItem = useCallback(
    (item: WishlistItem) => {
      if (!user) {
        toast({
          variant: "destructive",
          title: t("wishlist.login_required"),
          description: t("wishlist.login_message"),
        })
        return
      }

      setItems((prevItems) => {
        // Check if item already exists
        if (prevItems.some((i) => i.id === item.id)) {
          return prevItems
        }
        return [...prevItems, item]
      })

      toast({
        title: t("wishlist.item_added"),
        description: `${item.name} ${t("wishlist.added_to_wishlist")}`,
      })
    },
    [user, toast, t],
  )

  const removeItem = useCallback(
    (id: string) => {
      if (!user) return

      setItems((prevItems) => {
        const itemToRemove = prevItems.find((item) => item.id === id)
        if (itemToRemove) {
          toast({
            title: t("wishlist.item_removed"),
            description: `${itemToRemove.name} ${t("wishlist.removed_from_wishlist")}`,
          })
        }
        return prevItems.filter((item) => item.id !== id)
      })
    },
    [user, toast, t],
  )

  const clearWishlist = useCallback(() => {
    if (!user) return

    setItems([])
    try {
      localStorage.removeItem(`wishlist-${user.id}`)
    } catch (error) {
      console.error("Error clearing wishlist from localStorage:", error)
    }

    toast({
      title: t("wishlist.cleared"),
      description: t("wishlist.cleared_message"),
    })
  }, [user, toast, t])

  const isInWishlist = useCallback(
    (id: string) => {
      return items.some((item) => item.id === id)
    },
    [items],
  )

  return {
    items,
    addItem,
    removeItem,
    clearWishlist,
    isInWishlist,
    isEmpty: items.length === 0,
  }
}

