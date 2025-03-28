"use client"

import { useLanguage } from "@/hooks/use-language"
import { ClientSafeComponent } from "@/components/client-safe-component"
import { FileText, User, ShieldCheck, Bookmark, AlertTriangle, XCircle, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function TermsOfServicePageClient() {
  const { t } = useLanguage()

  return (
    <ClientSafeComponent>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("policies.terms.title")}</h1>
          <p className="text-muted-foreground">
            {t("policies.terms.lastUpdated")}: {t("policies.terms.date")}
          </p>
        </div>

        <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
          <div className="mb-12">
            <p className="lead text-lg">{t("policies.terms.introduction")}</p>
          </div>

          <section id="definitions" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.terms.section1.title")}</h2>
            </div>
            <p>{t("policies.terms.section1.content")}</p>

            <div className="my-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">{t("policies.terms.section1.definitions.service")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("policies.terms.section1.definitions.service_description")}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">{t("policies.terms.section1.definitions.user")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("policies.terms.section1.definitions.user_description")}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">{t("policies.terms.section1.definitions.company")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("policies.terms.section1.definitions.company_description")}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">{t("policies.terms.section1.definitions.content")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("policies.terms.section1.definitions.content_description")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="account-registration" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.terms.section2.title")}</h2>
            </div>
            <p>{t("policies.terms.section2.content")}</p>

            <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 my-6">
              <h3 className="font-medium mb-2">{t("policies.terms.section2.requirements.title")}</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("policies.terms.section2.requirements.accurate")}</li>
                <li>{t("policies.terms.section2.requirements.age")}</li>
                <li>{t("policies.terms.section2.requirements.one_account")}</li>
                <li>{t("policies.terms.section2.requirements.security")}</li>
              </ul>
            </div>
          </section>

          <section id="user-responsibilities" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.terms.section3.title")}</h2>
            </div>
            <p>{t("policies.terms.section3.content")}</p>

            <div className="my-6 space-y-4">
              <h3 className="font-bold text-xl">{t("policies.terms.section3.prohibited.title")}</h3>
              <p>{t("policies.terms.section3.prohibited.description")}</p>

              <div className="space-y-2">
                <div className="flex gap-2 items-start">
                  <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p>{t("policies.terms.section3.prohibited.illegal")}</p>
                </div>

                <div className="flex gap-2 items-start">
                  <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p>{t("policies.terms.section3.prohibited.harmful")}</p>
                </div>

                <div className="flex gap-2 items-start">
                  <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p>{t("policies.terms.section3.prohibited.impersonation")}</p>
                </div>

                <div className="flex gap-2 items-start">
                  <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p>{t("policies.terms.section3.prohibited.infringement")}</p>
                </div>
              </div>
            </div>
          </section>

          <section id="intellectual-property" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Bookmark className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.terms.section4.title")}</h2>
            </div>
            <p>{t("policies.terms.section4.content")}</p>

            <div className="bg-muted p-4 rounded-lg my-4">
              <p className="font-medium">{t("policies.terms.section4.ownership")}</p>
            </div>
          </section>

          <section id="termination" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.terms.section5.title")}</h2>
            </div>
            <p>{t("policies.terms.section5.content")}</p>

            <div className="my-6">
              <h3 className="font-bold text-xl mb-4">{t("policies.terms.section5.reasons.title")}</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("policies.terms.section5.reasons.violation")}</li>
                <li>{t("policies.terms.section5.reasons.illegal")}</li>
                <li>{t("policies.terms.section5.reasons.risk")}</li>
                <li>{t("policies.terms.section5.reasons.extended_inactivity")}</li>
              </ul>
            </div>
          </section>

          <section id="limitation-of-liability" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{t("policies.terms.section6.title")}</h2>
            <p>{t("policies.terms.section6.content")}</p>
            <div className="bg-muted p-4 rounded-lg my-4">
              <p className="font-medium">{t("policies.terms.section6.disclaimer")}</p>
            </div>
          </section>

          <section id="governing-law" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{t("policies.terms.section7.title")}</h2>
            <p>{t("policies.terms.section7.content")}</p>
          </section>

          <div className="border-t pt-6 mt-8">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("policies.terms.questions.title")}</h2>
            </div>
            <p>{t("policies.terms.questions.description")}</p>
            <p className="mt-4">
              <Link href="/contact" className="text-primary hover:underline">
                {t("policies.terms.questions.contact_us")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </ClientSafeComponent>
  )
}

