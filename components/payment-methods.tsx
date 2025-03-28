"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/hooks/use-language"
import { CreditCard, Wallet, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

interface PaymentMethodsProps {
  onComplete: (method: string) => void
  onBack: () => void
  isProcessing: boolean
}

export function PaymentMethods({ onComplete, onBack, isProcessing }: PaymentMethodsProps) {
  const { t } = useLanguage()
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card")

  // Define form schema with Zod
  const formSchema = z.object({
    cardNumber: z.string().regex(/^\d{16}$/, {
      message: "Card number must be 16 digits.",
    }),
    cardName: z.string().min(2, {
      message: "Cardholder name must be at least 2 characters.",
    }),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
      message: "Expiry date must be in MM/YY format.",
    }),
    cvv: z.string().regex(/^\d{3,4}$/, {
      message: "CVV must be 3 or 4 digits.",
    }),
  })

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
  })

  // Handle form submission
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onComplete(paymentMethod)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
        <div
          className={`flex items-start space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
            paymentMethod === "credit-card" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
          }`}
          onClick={() => setPaymentMethod("credit-card")}
        >
          <RadioGroupItem value="credit-card" id="credit-card" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center">
              <Label htmlFor="credit-card" className="font-medium cursor-pointer">
                {t("checkout.credit_card")}
              </Label>
              <CreditCard className="ml-2 h-4 w-4 text-muted-foreground" />
            </div>

            {paymentMethod === "credit-card" && (
              <div className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="cardNumber">{t("checkout.card_number")}</Label>
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    {...form.register("cardNumber")}
                  />
                  {form.formState.errors.cardNumber && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.cardNumber.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="cardName">{t("checkout.cardholder_name")}</Label>
                  <Input id="cardName" type="text" placeholder="John Doe" {...form.register("cardName")} />
                  {form.formState.errors.cardName && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.cardName.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">{t("checkout.expiry_date")}</Label>
                    <Input id="expiryDate" type="text" placeholder="MM/YY" {...form.register("expiryDate")} />
                    {form.formState.errors.expiryDate && (
                      <p className="text-sm text-destructive mt-1">{form.formState.errors.expiryDate.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="cvv">{t("checkout.cvv")}</Label>
                    <Input id="cvv" type="text" placeholder="123" {...form.register("cvv")} />
                    {form.formState.errors.cvv && (
                      <p className="text-sm text-destructive mt-1">{form.formState.errors.cvv.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className={`flex items-start space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
            paymentMethod === "paypal" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
          }`}
          onClick={() => setPaymentMethod("paypal")}
        >
          <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center">
              <Label htmlFor="paypal" className="font-medium cursor-pointer">
                PayPal
              </Label>
              <Wallet className="ml-2 h-4 w-4 text-muted-foreground" />
            </div>

            {paymentMethod === "paypal" && (
              <p className="text-sm text-muted-foreground mt-2">{t("checkout.paypal_description")}</p>
            )}
          </div>
        </div>
      </RadioGroup>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} type="button">
          {t("checkout.back")}
        </Button>

        <Button type="submit" disabled={isProcessing}>
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("checkout.processing")}
            </>
          ) : (
            t("checkout.place_order")
          )}
        </Button>
      </div>
    </form>
  )
}

