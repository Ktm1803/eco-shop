"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { LanguageSettings } from "@/components/language-settings"
import { ClientSafeComponent } from "@/components/client-safe-component"
import { Loader2, Settings, Globe, User, Bell, Shield, LogIn } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>{t("settings.loading")}</span>
      </div>
    )
  }

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <LogIn className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-6 text-3xl font-bold">{t("settings.login_required")}</h1>
        <p className="mt-2 text-muted-foreground">{t("settings.login_message")}</p>
        <div className="mt-8 flex justify-center">
          <Button asChild>
            <Link href="/login?redirectTo=/settings">
              <LogIn className="mr-2 h-4 w-4" />
              {t("settings.login_now")}
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <ClientSafeComponent>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Settings className="h-6 w-6 mr-2" />
          <h1 className="text-3xl font-bold">{t("settings.title")}</h1>
        </div>

        <Tabs defaultValue="language" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{t("settings.profile")}</span>
            </TabsTrigger>
            <TabsTrigger value="language" className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span>{t("settings.language")}</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-1">
              <Bell className="h-4 w-4" />
              <span>{t("settings.notifications")}</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span>{t("settings.security")}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>{t("settings.profile_settings")}</CardTitle>
                <CardDescription>{t("settings.profile_description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{t("settings.profile_content")}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="language">
            <LanguageSettings />
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>{t("settings.notification_settings")}</CardTitle>
                <CardDescription>{t("settings.notification_description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{t("settings.notification_content")}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>{t("settings.security_settings")}</CardTitle>
                <CardDescription>{t("settings.security_description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{t("settings.security_content")}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClientSafeComponent>
  )
}

