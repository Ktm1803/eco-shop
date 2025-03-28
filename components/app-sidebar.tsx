"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSidebar } from "@/components/ui/sidebar"
import { useLanguage } from "@/hooks/use-language"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBag, Heart, User, Settings, LogOut, ChevronRight, ChevronLeft } from "lucide-react"
import { ClientSafeComponent } from "@/components/client-safe-component"

export function AppSidebar() {
  const { isOpen, toggle } = useSidebar()
  const { t } = useLanguage()
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  // Only show sidebar on certain pages and when user is logged in
  const shouldShowSidebar =
    user && ["/profile", "/orders", "/wishlist", "/settings"].some((path) => pathname?.startsWith(path))

  if (!shouldShowSidebar) return null

  const menuItems = [
    {
      href: "/profile",
      label: t("nav.profile"),
      icon: <User className="h-5 w-5" />,
    },
    {
      href: "/orders",
      label: t("nav.orders"),
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      href: "/wishlist",
      label: t("nav.wishlist"),
      icon: <Heart className="h-5 w-5" />,
    },
    {
      href: "/settings",
      label: t("nav.settings"),
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <ClientSafeComponent>
      <div
        className={`relative h-[calc(100vh-4rem)] border-r bg-background transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border bg-background shadow-md"
          onClick={toggle}
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>

        <ScrollArea className="h-full py-6">
          <div className="px-3 py-2">
            <div className="mb-10 flex h-10 items-center px-2">
              {isOpen ? (
                <span className="text-lg font-semibold">{t("nav.account")}</span>
              ) : (
                <User className="h-6 w-6 text-primary mx-auto" />
              )}
            </div>

            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className={`w-full justify-start ${isOpen ? "" : "justify-center px-0"}`}
                  >
                    {item.icon}
                    {isOpen && <span className="ml-2">{item.label}</span>}
                  </Button>
                </Link>
              ))}

              <Button
                variant="ghost"
                className={`w-full justify-start text-destructive hover:text-destructive ${isOpen ? "" : "justify-center px-0"}`}
                onClick={logout}
              >
                <LogOut className="h-5 w-5" />
                {isOpen && <span className="ml-2">{t("nav.logout")}</span>}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </ClientSafeComponent>
  )
}

