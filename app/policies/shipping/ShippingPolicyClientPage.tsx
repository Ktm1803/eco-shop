"use client"

import { useLanguage } from "@/hooks/use-language"
import { ClientSafeComponent } from "@/components/client-safe-component"
import { Truck, Clock, Globe, CreditCard, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function ShippingPolicyClientPage() {
  const { t } = useLanguage()

  return (
    <ClientSafeComponent>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("policies.shipping.title")}</h1>
          <p className="text-muted-foreground">
            {t("policies.shipping.lastUpdated")}: {t("policies.shipping.date")}
          </p>
        </div>

        <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
          <div className="mb-12">
            <p className="lead text-lg">{t("policies.shipping.introduction")}</p>
          </div>

          <section id="shipping-methods" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.shipping.methods.title")}</h2>
            </div>
            <p>{t("policies.shipping.methods.description")}</p>

            <div className="grid md:grid-cols-3 gap-6 my-6">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2">{t("policies.shipping.methods.standard.name")}</h3>
                <p className="text-muted-foreground">{t("policies.shipping.methods.standard.description")}</p>
                <p className="mt-2 font-medium">$5.99</p>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2">{t("policies.shipping.methods.express.name")}</h3>
                <p className="text-muted-foreground">{t("policies.shipping.methods.express.description")}</p>
                <p className="mt-2 font-medium">$12.99</p>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2">{t("policies.shipping.methods.overnight.name")}</h3>
                <p className="text-muted-foreground">{t("policies.shipping.methods.overnight.description")}</p>
                <p className="mt-2 font-medium">$24.99</p>
              </div>
            </div>
          </section>

          <section id="shipping-costs" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.shipping.costs.title")}</h2>
            </div>
            <p>{t("policies.shipping.costs.description")}</p>
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 my-4">
              <p className="font-medium">{t("policies.shipping.costs.freeShipping")}</p>
            </div>
          </section>

          <section id="processing-time" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.shipping.processing.title")}</h2>
            </div>
            <p>{t("policies.shipping.processing.description")}</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>{t("policies.shipping.processing.point1")}</li>
              <li>{t("policies.shipping.processing.point2")}</li>
              <li>{t("policies.shipping.processing.point3")}</li>
            </ul>
          </section>

          <section id="tracking" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.shipping.tracking.title")}</h2>
            </div>
            <p>{t("policies.shipping.tracking.description")}</p>
            <p className="mt-4">{t("policies.shipping.tracking.additional")}</p>
          </section>

          <section id="international-shipping" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.shipping.international.title")}</h2>
            </div>
            <p>{t("policies.shipping.international.description")}</p>
            <div className="bg-muted p-4 rounded-lg my-4">
              <h4 className="font-medium mb-2">{t("policies.shipping.international.important")}</h4>
              <p>{t("policies.shipping.international.duties")}</p>
            </div>
          </section>

          <section id="delivery-issues" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{t("policies.shipping.issues.title")}</h2>
            <p>{t("policies.shipping.issues.description")}</p>
            <p className="mt-4">{t("policies.shipping.issues.contact")}</p>
          </section>

          <section id="policy-changes" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{t("policies.shipping.changes.title")}</h2>
            <p>{t("policies.shipping.changes.description")}</p>
          </section>

          <div className="border-t pt-6 mt-8">
            <p className="text-muted-foreground">{t("policies.shipping.questions")}</p>
            <p className="mt-2">
              <Link href="/contact" className="text-primary hover:underline">
                {t("policies.shipping.contact_us")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </ClientSafeComponent>
  )
}

