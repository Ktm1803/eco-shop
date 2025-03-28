"use client"

import type React from "react"

import { useCart } from "@/hooks/use-cart"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

export function CartBadge({ children }: { children?: React.ReactNode }) {
  const { totalItems } = useCart()
  const [mounted, setMounted] = useState(false)
  const [animateCount, setAnimateCount] = useState(false)
  const [displayCount, setDisplayCount] = useState(0)

  // Only show badge after component mounts to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update display count when totalItems changes
  useEffect(() => {
    if (mounted) {
      // Cập nhật displayCount khi totalItems thay đổi
      setDisplayCount(totalItems)

      if (totalItems > 0) {
        setAnimateCount(true)
        const timer = setTimeout(() => setAnimateCount(false), 500)
        return () => clearTimeout(timer)
      }
    }
  }, [totalItems, mounted])

  return (
    <div className="relative inline-flex">
      {children}
      {mounted && displayCount > 0 && (
        <Badge
          variant="destructive"
          className={`absolute -top-2 -right-2 h-5 min-w-5 flex items-center justify-center rounded-full p-0 text-xs transition-transform ${
            animateCount ? "scale-125" : "scale-100"
          }`}
        >
          {displayCount}
        </Badge>
      )}
    </div>
  )
}

