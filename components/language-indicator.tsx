"use client"

import { useLanguage } from "@/hooks/use-language"
import { Badge } from "@/components/ui/badge"
import { ClientSafeComponent } from "@/components/client-safe-component"

export function LanguageIndicator() {
  const { language } = useLanguage()

  // Flag emoji mapping for supported languages
  const languageFlags: Record<string, string> = {
    en: "🇺🇸",
    fr: "🇫🇷",
    es: "🇪🇸",
    de: "🇩🇪",
    vi: "🇻🇳",
    zh: "🇨🇳",
    ja: "🇯🇵",
    ko: "🇰🇷",
    th: "🇹🇭",
  }

  return (
    <ClientSafeComponent>
      <Badge variant="outline" className="text-xs font-normal">
        {languageFlags[language] || "🌐"} {language.toUpperCase()}
      </Badge>
    </ClientSafeComponent>
  )
}

