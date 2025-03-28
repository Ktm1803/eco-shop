"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Globe } from "lucide-react"
import { ClientSafeComponent } from "@/components/client-safe-component"

export function LanguagePreferencesModal({ trigger }: { trigger: React.ReactNode }) {
  const { language, setLanguage, supportedLanguages, translateProductContent, setTranslateProductContent, t } =
    useLanguage()

  const [open, setOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const [translateProducts, setTranslateProducts] = useState(translateProductContent)

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

  const handleSave = () => {
    setLanguage(selectedLanguage)
    setTranslateProductContent(translateProducts)
    setOpen(false)
  }

  return (
    <ClientSafeComponent>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t("language.title")}
            </DialogTitle>
            <DialogDescription>{t("language.select")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <RadioGroup
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            >
              {supportedLanguages.map((lang) => (
                <div key={lang.code} className="flex items-center space-x-2">
                  <RadioGroupItem value={lang.code} id={`modal-lang-${lang.code}`} />
                  <Label htmlFor={`modal-lang-${lang.code}`} className="flex items-center gap-2 cursor-pointer">
                    <span className="text-base">{languageFlags[lang.code] || "🌐"}</span>
                    {lang.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="translate-products">{t("language.product_content")}</Label>
                <p className="text-xs text-muted-foreground">{t("language.translate_products")}</p>
              </div>
              <Switch id="translate-products" checked={translateProducts} onCheckedChange={setTranslateProducts} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={handleSave}>{t("language.save_preferences")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ClientSafeComponent>
  )
}

