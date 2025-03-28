"use client"

import { useLanguage } from "@/hooks/use-language"
import { ClientSafeComponent } from "@/components/client-safe-component"
import { Shield, Database, Share2, UserCheck, Clock, FileText, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyClientPage() {
  const { t } = useLanguage()

  return (
    <ClientSafeComponent>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("policies.privacy.title")}</h1>
          <p className="text-muted-foreground">
            {t("policies.privacy.lastUpdated")}: {t("policies.privacy.date")}
          </p>
        </div>

        <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
          <div className="mb-12">
            <p className="lead text-lg">{t("policies.privacy.introduction")}</p>
          </div>

          <section id="information-collection" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.privacy.section1.title")}</h2>
            </div>
            <p>{t("policies.privacy.section1.content")}</p>

            <div className="my-6 space-y-4">
              <h3 className="font-bold text-xl">{t("policies.privacy.section1.personal_data.title")}</h3>
              <p>{t("policies.privacy.section1.personal_data.description")}</p>

              <div className="grid md:grid-cols-2 gap-4 my-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">{t("policies.privacy.section1.personal_data.account_info")}</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>{t("policies.privacy.section1.personal_data.name")}</li>
                    <li>{t("policies.privacy.section1.personal_data.email")}</li>
                    <li>{t("policies.privacy.section1.personal_data.phone")}</li>
                    <li>{t("policies.privacy.section1.personal_data.address")}</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">{t("policies.privacy.section1.personal_data.usage_info")}</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>{t("policies.privacy.section1.personal_data.ip")}</li>
                    <li>{t("policies.privacy.section1.personal_data.browser")}</li>
                    <li>{t("policies.privacy.section1.personal_data.device")}</li>
                    <li>{t("policies.privacy.section1.personal_data.cookies")}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="information-use" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.privacy.section2.title")}</h2>
            </div>
            <p>{t("policies.privacy.section2.content")}</p>

            <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 my-6">
              <h3 className="font-medium mb-2">{t("policies.privacy.section2.purposes.title")}</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("policies.privacy.section2.purposes.process_orders")}</li>
                <li>{t("policies.privacy.section2.purposes.improve_service")}</li>
                <li>{t("policies.privacy.section2.purposes.communication")}</li>
                <li>{t("policies.privacy.section2.purposes.security")}</li>
              </ul>
            </div>
          </section>

          <section id="information-sharing" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Share2 className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.privacy.section3.title")}</h2>
            </div>
            <p>{t("policies.privacy.section3.content")}</p>

            <div className="my-6">
              <h3 className="font-bold text-xl mb-4">{t("policies.privacy.section3.third_parties.title")}</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="font-medium">{t("policies.privacy.section3.third_parties.service_providers")}</h4>
                  <p className="text-muted-foreground">
                    {t("policies.privacy.section3.third_parties.service_description")}
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h4 className="font-medium">{t("policies.privacy.section3.third_parties.business_partners")}</h4>
                  <p className="text-muted-foreground">
                    {t("policies.privacy.section3.third_parties.partners_description")}
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h4 className="font-medium">{t("policies.privacy.section3.third_parties.legal")}</h4>
                  <p className="text-muted-foreground">
                    {t("policies.privacy.section3.third_parties.legal_description")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="your-rights" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <UserCheck className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.privacy.section4.title")}</h2>
            </div>
            <p>{t("policies.privacy.section4.content")}</p>

            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-bold mb-2">{t("policies.privacy.section4.rights.access")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("policies.privacy.section4.rights.access_description")}
                </p>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-bold mb-2">{t("policies.privacy.section4.rights.rectification")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("policies.privacy.section4.rights.rectification_description")}
                </p>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-bold mb-2">{t("policies.privacy.section4.rights.erasure")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("policies.privacy.section4.rights.erasure_description")}
                </p>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-bold mb-2">{t("policies.privacy.section4.rights.restriction")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("policies.privacy.section4.rights.restriction_description")}
                </p>
              </div>
            </div>
          </section>

          <section id="data-retention" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.privacy.section5.title")}</h2>
            </div>
            <p>{t("policies.privacy.section5.content")}</p>
          </section>

          <section id="cookies" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{t("policies.privacy.section6.title")}</h2>
            <p>{t("policies.privacy.section6.content")}</p>
            <div className="bg-muted p-4 rounded-lg my-4">
              <p>{t("policies.privacy.section6.cookie_policy")}</p>
            </div>
          </section>

          <section id="changes" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.privacy.section7.title")}</h2>
            </div>
            <p>{t("policies.privacy.section7.content")}</p>
          </section>

          <div className="border-t pt-6 mt-8">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.privacy.contact.title")}</h2>
            </div>
            <p>{t("policies.privacy.contact.description")}</p>
            <p className="mt-4">
              <Link href="/contact" className="text-primary hover:underline">
                {t("policies.privacy.contact.link")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </ClientSafeComponent>
  )
}

