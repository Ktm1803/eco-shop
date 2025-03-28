"use client"

import { useLanguage } from "@/hooks/use-language"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

export function TranslationLoading() {
  const { isTranslating } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isTranslating) return null

  return (
    <div className="fixed bottom-4 right-4 bg-background border rounded-full shadow-lg p-2 flex items-center space-x-2 z-50">
      <Loader2 className="h-4 w-4 animate-spin text-primary" />
      <span className="text-xs font-medium">Loading translations...</span>
    </div>
  )
}

