"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { t } = useLanguage()

  useEffect(() => {
    // Ghi log lỗi vào console
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 py-16 text-center">
      <div className="mb-6">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
      </div>

      <h2 className="text-2xl font-bold mb-4">{t("error.title")}</h2>

      <p className="text-muted-foreground mb-8 max-w-md mx-auto">{t("error.message")}</p>

      {error.message && process.env.NODE_ENV === "development" && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm max-w-md mx-auto">
          <p className="font-medium mb-1">{t("error.details")}:</p>
          <p className="font-mono">{error.message}</p>
          {error.digest && (
            <p className="mt-2 text-xs text-red-600">
              {t("error.errorId")}: {error.digest}
            </p>
          )}
        </div>
      )}

      <div className="flex gap-4">
        <Button onClick={reset} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          {t("error.tryAgain")}
        </Button>

        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          {t("error.backToHome")}
        </Button>
      </div>
    </div>
  )
}

