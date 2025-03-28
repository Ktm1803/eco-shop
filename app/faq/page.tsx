"use client"

import { useLanguage } from "@/hooks/use-language"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ClientSafeComponent } from "@/components/client-safe-component"

export default function FAQPage() {
  const { t } = useLanguage()

  const faqItems = [
    { id: "track_order", key: "faq.track_order" },
    { id: "payment_methods", key: "faq.payment_methods" },
    { id: "delivery_time", key: "faq.delivery_time" },
    { id: "return_policy", key: "faq.return_policy" },
    { id: "international_shipping", key: "faq.international_shipping" },
    { id: "change_order", key: "faq.change_order" },
    { id: "gift_wrapping", key: "faq.gift_wrapping" },
    { id: "contact_service", key: "faq.contact_service" },
  ]

  return (
    <ClientSafeComponent>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">{t("faq.title")}</h1>

        <div className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{t(`${item.key}.question`)}</AccordionTrigger>
                <AccordionContent>{t(`${item.key}.answer`)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </ClientSafeComponent>
  )
}

