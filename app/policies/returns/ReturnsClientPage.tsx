"use client"

import { useLanguage } from "@/hooks/use-language"
import { ClientSafeComponent } from "@/components/client-safe-component"
import { RefreshCw, AlertCircle, Truck, CreditCard, Clock, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function ReturnsClientPage() {
  const { t } = useLanguage()

  return (
    <ClientSafeComponent>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("policies.returns.title")}</h1>
          <p className="text-muted-foreground">
            {t("policies.returns.lastUpdated")}: {t("policies.returns.date")}
          </p>
        </div>

        <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
          <div className="mb-12">
            <p className="lead text-lg">{t("policies.returns.policy.description")}</p>
          </div>

          <section id="return-eligibility" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <RefreshCw className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.returns.eligibility.title")}</h2>
            </div>
            <p>{t("policies.returns.eligibility.description1")}</p>
            <p className="mt-4">{t("policies.returns.eligibility.description2")}</p>

            <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 my-6">
              <h3 className="font-medium mb-2">{t("policies.returns.eligibility.timeframes")}</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t("policies.returns.eligibility.new_items")}</li>
                <li>{t("policies.returns.eligibility.defective_items")}</li>
              </ul>
            </div>
          </section>

          <section id="non-returnable-items" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.returns.nonReturnable.title")}</h2>
            </div>
            <p>{t("policies.returns.nonReturnable.description")}</p>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("policies.returns.nonReturnable.item1")}</li>
                <li>{t("policies.returns.nonReturnable.item2")}</li>
                <li>{t("policies.returns.nonReturnable.item3")}</li>
              </ul>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("policies.returns.nonReturnable.item4")}</li>
                <li>{t("policies.returns.nonReturnable.item5")}</li>
              </ul>
            </div>
          </section>

          <section id="return-process" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.returns.process.title")}</h2>
            </div>
            <p>{t("policies.returns.process.description")}</p>

            <div className="my-6 space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium">{t("policies.returns.process.step1_title")}</h4>
                  <p className="text-muted-foreground">{t("policies.returns.process.step1")}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium">{t("policies.returns.process.step2_title")}</h4>
                  <p className="text-muted-foreground">{t("policies.returns.process.step2")}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-medium">{t("policies.returns.process.step3_title")}</h4>
                  <p className="text-muted-foreground">{t("policies.returns.process.step3")}</p>
                </div>
              </div>
            </div>
          </section>

          <section id="refunds" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.returns.refunds.title")}</h2>
            </div>
            <p>{t("policies.returns.refunds.description")}</p>
            <p className="mt-4">{t("policies.returns.refunds.timeline")}</p>
          </section>

          <section id="late-refunds" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.returns.late.title")}</h2>
            </div>
            <p>{t("policies.returns.late.description")}</p>
          </section>

          <section id="exchanges" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{t("policies.returns.exchanges.title")}</h2>
            <p>{t("policies.returns.exchanges.description")}</p>
          </section>

          <section id="shipping-costs" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{t("policies.returns.shipping.title")}</h2>
            <p>{t("policies.returns.shipping.description")}</p>
            <div className="bg-muted p-4 rounded-lg my-4">
              <p className="font-medium">{t("policies.returns.shipping.note")}</p>
            </div>
          </section>

          <div className="border-t pt-6 mt-8">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.returns.questions.title")}</h2>
            </div>
            <p>{t("policies.returns.questions.description")}</p>
            <p className="mt-4">
              <Link href="/contact" className="text-primary hover:underline">
                {t("policies.returns.questions.contact_us")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </ClientSafeComponent>
  )
}

