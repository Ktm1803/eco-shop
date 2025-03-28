import type React from "react"
/**
 * Utility functions for error handling throughout the application
 */

// Kiểm tra và xử lý lỗi API
export async function handleApiError(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `Error: ${response.status}`)
  }
  return response
}

// Xử lý lỗi trong các hàm async
export function withErrorHandling<T>(
  fn: (...args: any[]) => Promise<T>,
  fallback: T,
  errorCallback?: (error: Error) => void,
) {
  return async (...args: any[]): Promise<T> => {
    try {
      return await fn(...args)
    } catch (error) {
      if (errorCallback && error instanceof Error) {
        errorCallback(error)
      } else {
        console.error("An error occurred:", error)
      }
      return fallback
    }
  }
}

// Xử lý lỗi localStorage
export function safeLocalStorage() {
  const isLocalStorageAvailable = () => {
    try {
      const testKey = "__test__"
      localStorage.setItem(testKey, testKey)
      localStorage.removeItem(testKey)
      return true
    } catch (e) {
      return false
    }
  }

  const available = isLocalStorageAvailable()

  return {
    getItem: (key: string): string | null => {
      if (!available) return null
      try {
        return localStorage.getItem(key)
      } catch (e) {
        console.error("Error accessing localStorage:", e)
        return null
      }
    },
    setItem: (key: string, value: string): boolean => {
      if (!available) return false
      try {
        localStorage.setItem(key, value)
        return true
      } catch (e) {
        console.error("Error writing to localStorage:", e)
        return false
      }
    },
    removeItem: (key: string): boolean => {
      if (!available) return false
      try {
        localStorage.removeItem(key)
        return true
      } catch (e) {
        console.error("Error removing from localStorage:", e)
        return false
      }
    },
  }
}

// Xử lý lỗi form
export function validateForm(data: Record<string, any>, rules: Record<string, (value: any) => string | null>) {
  const errors: Record<string, string> = {}

  Object.entries(rules).forEach(([field, validator]) => {
    const error = validator(data[field])
    if (error) {
      errors[field] = error
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

// Xử lý lỗi image
export function handleImageError(event: React.SyntheticEvent<HTMLImageElement, Event>, fallbackSrc: string) {
  const img = event.currentTarget
  img.onerror = null // Prevent infinite loop
  img.src = fallbackSrc
}

