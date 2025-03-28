"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"
import { ShoppingBag, CreditCard } from "lucide-react"
import { useState } from "react"
import { ClientSafeComponent } from "@/components/client-safe-component"

interface CheckoutSummaryProps {
  shippingCost?: number
}

export function CheckoutSummary({ shippingCost = 0 }: CheckoutSummaryProps) {
  const { subtotal, isEmpty } = useCart()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Calculate tax (10%)
  const tax = subtotal * 0.1

  // Calculate total
  const total = subtotal + tax + shippingCost

  return (
    <ClientSafeComponent>
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t("cart.summary")}</h3>

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>{t("cart.subtotal")}</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>{t("cart.tax")}</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>{t("cart.shipping")}</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>

          <div className="border-t pt-2">
            <div className="flex justify-between font-medium">
              <span>{t("cart.total")}</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button asChild className="w-full" disabled={isEmpty}>
            <Link href="/checkout">
              <CreditCard className="mr-2 h-4 w-4" />
              {t("cart.checkout")}
            </Link>
          </Button>

          <Button variant="outline" asChild className="w-full mt-2">
            <Link href="/products">
              <ShoppingBag className="mr-2 h-4 w-4" />
              {t("cart.continue_shopping")}
            </Link>
          </Button>
        </div>
      </div>
    </ClientSafeComponent>
  )
}

