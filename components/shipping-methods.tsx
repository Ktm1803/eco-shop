"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/hooks/use-language"
import type { ShippingMethod } from "@/app/checkout/page"

interface ShippingMethodsProps {
  onSelect: (method: ShippingMethod) => void
  onBack: () => void
}

export function ShippingMethods({ onSelect, onBack }: ShippingMethodsProps) {
  const { t } = useLanguage()
  const [selectedMethod, setSelectedMethod] = useState<string>("standard")

  // Shipping methods
  const shippingMethods: ShippingMethod[] = [
    {
      id: "standard",
      name: t("checkout.shipping_standard"),
      description: t("checkout.shipping_standard_description"),
      price: 5.99,
      estimatedDelivery: "3-5 business days",
    },
    {
      id: "express",
      name: t("checkout.shipping_express"),
      description: t("checkout.shipping_express_description"),
      price: 12.99,
      estimatedDelivery: "1-2 business days",
    },
    {
      id: "overnight",
      name: t("checkout.shipping_overnight"),
      description: t("checkout.shipping_overnight_description"),
      price: 24.99,
      estimatedDelivery: "Next business day",
    },
  ]

  const handleContinue = () => {
    const method = shippingMethods.find((m) => m.id === selectedMethod)
    if (method) {
      onSelect(method)
    }
  }

  return (
    <div className="space-y-6">
      <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-4">
        {shippingMethods.map((method) => (
          <div
            key={method.id}
            className={`flex items-start space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedMethod === method.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
            }`}
            onClick={() => setSelectedMethod(method.id)}
          >
            <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
            <div className="flex-1">
              <div className="flex justify-between">
                <Label htmlFor={method.id} className="font-medium cursor-pointer">
                  {method.name}
                </Label>
                <span className="font-medium">${method.price.toFixed(2)}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
              <p className="text-sm mt-1">
                <span className="font-medium">{t("checkout.estimated_delivery")}:</span> {method.estimatedDelivery}
              </p>
            </div>
          </div>
        ))}
      </RadioGroup>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          {t("checkout.back")}
        </Button>

        <Button onClick={handleContinue}>{t("checkout.continue_to_payment")}</Button>
      </div>
    </div>
  )
}

