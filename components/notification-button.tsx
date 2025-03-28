"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/hooks/use-language"
import { ClientSafeComponent } from "@/components/client-safe-component"

export function NotificationButton() {
  const [notifications, setNotifications] = useState<{ id: string; title: string; message: string; read: boolean }[]>(
    [],
  )
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()

  // Ensure component is mounted before rendering to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)

    // Mock notifications for demo
    setNotifications([
      {
        id: "1",
        title: "Order Shipped",
        message: "Your order #12345 has been shipped",
        read: false,
      },
      {
        id: "2",
        title: "New Product Available",
        message: "Check out our new summer collection",
        read: true,
      },
    ])
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <ClientSafeComponent>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 min-w-5 flex items-center justify-center rounded-full p-0 text-xs"
              >
                {unreadCount}
              </Badge>
            )}
            <span className="sr-only">{t("nav.notifications")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <div className="p-4">
            <h3 className="font-medium">{t("notifications.title")}</h3>
            {notifications.length === 0 ? (
              <p className="text-sm text-muted-foreground py-2">{t("notifications.empty")}</p>
            ) : (
              <div className="mt-2 space-y-2">
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`p-2 rounded-md ${notification.read ? "" : "bg-muted"}`}
                  >
                    <div>
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.message}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </ClientSafeComponent>
  )
}

