"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/hooks/use-language"
import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import Link from "next/link"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: t("footer.subscribe_success"),
        description: t("footer.subscribe_message"),
      })

      setEmail("")
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("errors.title"),
        description: t("errors.unknown"),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">{t("home.stay_updated")}</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t("home.newsletter_description")}</p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t("footer.email_placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t("buttons.subscribing") : t("buttons.subscribe")}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-4">
              {t("auth.terms_agreement")}{" "}
              <Link href="/policies/terms" className="underline">
                {t("auth.terms_of_service")}
              </Link>{" "}
              {t("auth.and")}{" "}
              <Link href="/policies/privacy" className="underline">
                {t("auth.privacy_policy")}
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

