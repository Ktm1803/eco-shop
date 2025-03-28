"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Check, Globe } from "lucide-react"
import { ClientSafeComponent } from "@/components/client-safe-component"

export function LanguageSwitcher() {
  const { language, setLanguage, isTranslating, supportedLanguages } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Flag emoji mapping for supported languages
  const languageFlags: Record<string, string> = {
    en: "🇺🇸",
    vi: "🇻🇳",
    zh: "🇨🇳",
    ja: "🇯🇵",
    ko: "🇰🇷",
    th: "🇹🇭",
    fr: "🇫🇷",
    es: "🇪🇸",
    de: "🇩🇪",
  }

  if (!mounted) return null

  return (
    <ClientSafeComponent>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="relative flex items-center gap-1 h-9 px-2"
            disabled={isTranslating}
          >
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium hidden sm:inline-block">
              {supportedLanguages.find((lang) => lang.code === language)?.name || "English"}
            </span>
            <span className="text-sm sm:hidden">{languageFlags[language] || "🌐"}</span>
            {isTranslating && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Select Language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {supportedLanguages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{languageFlags[lang.code] || "🌐"}</span>
                <span>{lang.name}</span>
              </div>
              {language === lang.code && <Check className="h-4 w-4 ml-2" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </ClientSafeComponent>
  )
}

