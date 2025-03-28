"use client"

import { useState, useCallback } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "./use-language"

export function useErrorHandler() {
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { t } = useLanguage()

  const handleError = useCallback(
    (error: Error, showToast = true) => {
      setError(error)
      console.error("Error:", error)

      if (showToast) {
        toast({
          title: t("errors.title"),
          description: error.message || t("errors.unknown"),
          variant: "destructive",
        })
      }

      return error
    },
    [toast, t],
  )

  const withErrorHandling = useCallback(
    <T,>(
      fn: (...args: any[]) => Promise<T>,
      options: {
        loadingState?: boolean
        showToast?: boolean
        fallbackValue?: T
      } = {},
    ) => {
      const { loadingState = true, showToast = true, fallbackValue } = options

      return async (...args: any[]): Promise<T> => {
        if (loadingState) setIsLoading(true)
        setError(null)

        try {
          const result = await fn(...args)
          return result
        } catch (err) {
          const error = err instanceof Error ? err : new Error(String(err))
          handleError(error, showToast)

          if (fallbackValue !== undefined) {
            return fallbackValue
          }
          throw error
        } finally {
          if (loadingState) setIsLoading(false)
        }
      }
    },
    [handleError],
  )

  return {
    error,
    isLoading,
    handleError,
    withErrorHandling,
    clearError: () => setError(null),
  }
}

