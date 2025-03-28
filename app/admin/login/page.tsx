"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { AdminLogin } from "@/components/admin-login"
import { useLanguage } from "@/hooks/use-language"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AdminLoginPage() {
  const { user, isAdmin } = useAuth()
  const router = useRouter()
  const { t } = useLanguage()

  // If user is already logged in as admin, redirect to admin dashboard
  useEffect(() => {
    if (user && isAdmin) {
      router.push("/admin")
    }
  }, [user, isAdmin, router])

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-16">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("buttons.back_to_home")}
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-center">{t("admin.admin_login_title")}</h1>
      </div>

      <div className="max-w-md mx-auto">
        <AdminLogin />

        {user && !isAdmin && (
          <div className="mt-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <h2 className="text-lg font-semibold text-destructive mb-2">{t("admin.access_denied")}</h2>
            <p className="text-sm mb-4">{t("admin.current_user_not_admin")}</p>
            <Button variant="outline" onClick={() => router.push("/")}>
              {t("admin.return_home")}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

