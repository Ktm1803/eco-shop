"use client"

// Function to log client-side errors to the server
export async function logErrorToServer(error: Error, additionalInfo: Record<string, any> = {}) {
  try {
    const errorData = {
      message: error.message,
      stack: error.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      ...additionalInfo,
    }

    await fetch("/api/error-logger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(errorData),
    })
  } catch (e) {
    // Fallback to console if the API call fails
    console.error("Failed to log error to server:", e)
    console.error("Original error:", error)
  }
}

// Setup global error handler
export function setupGlobalErrorHandling() {
  if (typeof window !== "undefined") {
    // Handle unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason))

      logErrorToServer(error, { type: "unhandledRejection" })
    })

    // Handle uncaught errors
    window.addEventListener("error", (event) => {
      const error = event.error || new Error(event.message)
      logErrorToServer(error, {
        type: "uncaughtError",
        lineNo: event.lineno,
        colNo: event.colno,
        fileName: event.filename,
      })
    })

    // Override console.error to log to server
    const originalConsoleError = console.error
    console.error = (...args) => {
      originalConsoleError.apply(console, args)

      // Only log Error objects
      const errors = args.filter((arg) => arg instanceof Error)
      if (errors.length > 0) {
        errors.forEach((error) => {
          logErrorToServer(error, { source: "consoleError" })
        })
      }
    }
  }
}

