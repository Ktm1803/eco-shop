"use client"
import { useLanguage } from "@/hooks/use-language"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Globe } from "lucide-react"
import { ClientSafeComponent } from "@/components/client-safe-component"

export function LanguageSettings() {
  const { language, setLanguage, supportedLanguages, translateProductContent, setTranslateProductContent, t } =
    useLanguage()

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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {t("settings.language_preferences")}
          </CardTitle>
          <CardDescription>{t("settings.language_description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">{t("settings.select_language")}</h3>
            <RadioGroup value={language} onValueChange={setLanguage} className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {supportedLanguages.map((lang) => (
                <div key={lang.code} className="flex items-center space-x-2">
                  <RadioGroupItem value={lang.code} id={`lang-${lang.code}`} />
                  <Label htmlFor={`lang-${lang.code}`} className="flex items-center gap-2 cursor-pointer">
                    <span className="text-base">{languageFlags[lang.code] || "🌐"}</span>
                    {lang.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-sm font-medium">{t("settings.translate_product_content")}</h3>
                <p className="text-xs text-muted-foreground">{t("settings.translate_product_content_description")}</p>
              </div>
              <Switch checked={translateProductContent} onCheckedChange={setTranslateProductContent} />
            </div>
          </div>
        </CardContent>
      </Card>
    </ClientSafeComponent>
  )
}

