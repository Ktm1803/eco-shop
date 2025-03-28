"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/hooks/use-language"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import type { CustomerInfo } from "@/app/checkout/page"

interface CheckoutFormProps {
  onComplete: (data: CustomerInfo) => void
}

export function CheckoutForm({ onComplete }: CheckoutFormProps) {
  const { t } = useLanguage()
  const [saveInfo, setSaveInfo] = useState(true)

  // Define form schema with Zod
  const formSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    address: z.string().min(5, {
      message: "Address must be at least 5 characters.",
    }),
    apartment: z.string().optional(),
    city: z.string().min(2, {
      message: "City must be at least 2 characters.",
    }),
    state: z.string().min(2, {
      message: "State must be at least 2 characters.",
    }),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, {
      message: "Please enter a valid ZIP code.",
    }),
    country: z.string().min(2, {
      message: "Country must be at least 2 characters.",
    }),
    phone: z.string().regex(/^\+?[0-9]{10,15}$/, {
      message: "Please enter a valid phone number.",
    }),
  })

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
    },
  })

  // Handle form submission
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onComplete({
      ...data,
      saveInfo,
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">{t("checkout.contact_information")}</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">{t("checkout.email")}</Label>
            <Input id="email" type="email" placeholder="email@example.com" {...form.register("email")} />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">{t("checkout.phone")}</Label>
            <Input id="phone" type="tel" placeholder="(123) 456-7890" {...form.register("phone")} />
            {form.formState.errors.phone && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">{t("checkout.shipping_address")}</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">{t("checkout.first_name")}</Label>
              <Input id="firstName" type="text" {...form.register("firstName")} />
              {form.formState.errors.firstName && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.firstName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="lastName">{t("checkout.last_name")}</Label>
              <Input id="lastName" type="text" {...form.register("lastName")} />
              {form.formState.errors.lastName && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="address">{t("checkout.address")}</Label>
            <Input id="address" type="text" {...form.register("address")} />
            {form.formState.errors.address && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.address.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="apartment">{t("checkout.apartment")}</Label>
            <Input
              id="apartment"
              type="text"
              placeholder={t("checkout.apartment_placeholder")}
              {...form.register("apartment")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">{t("checkout.city")}</Label>
              <Input id="city" type="text" {...form.register("city")} />
              {form.formState.errors.city && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.city.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="state">{t("checkout.state")}</Label>
              <Input id="state" type="text" {...form.register("state")} />
              {form.formState.errors.state && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.state.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="zipCode">{t("checkout.zip_code")}</Label>
              <Input id="zipCode" type="text" {...form.register("zipCode")} />
              {form.formState.errors.zipCode && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.zipCode.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="country">{t("checkout.country")}</Label>
            <Input id="country" type="text" {...form.register("country")} />
            {form.formState.errors.country && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.country.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="saveInfo" checked={saveInfo} onCheckedChange={(checked) => setSaveInfo(checked as boolean)} />
        <Label htmlFor="saveInfo" className="text-sm font-normal">
          {t("checkout.save_information")}
        </Label>
      </div>

      <Button type="submit" className="w-full">
        {t("checkout.continue_to_shipping")}
      </Button>
    </form>
  )
}

