"use client"

import { useEffect, useState, type ReactNode } from "react"

/**
 * Wrapper component to safely render client components
 * Prevents hydration errors by only rendering children after component is mounted
 */
export function ClientSafeComponent({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a minimal placeholder during server-side rendering
    return <div className="min-h-[50px]"></div>
  }

  return <>{children}</>
}

