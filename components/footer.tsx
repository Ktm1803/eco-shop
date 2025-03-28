"use client"

import type React from "react"

import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ClientSafeComponent } from "@/components/client-safe-component"

export function Footer() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    // In a real app, you would send this to your API
    console.log("Subscribing email:", email)

    toast({
      title: t("footer.subscribe_success"),
      description: t("footer.subscribe_message"),
    })

    setEmail("")
  }

  return (
    <ClientSafeComponent>
      <footer className="bg-muted/40 border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t("footer.about_us")}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t("footer.about_description")}</p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Youtube className="h-4 w-4" />
                  <span className="sr-only">YouTube</span>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t("footer.quick_links")}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t("nav.home")}
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t("nav.products")}
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t("nav.categories")}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t("nav.about")}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t("nav.contact")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t("footer.customer_service")}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t("footer.faq")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/policies/shipping"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t("footer.shipping")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/policies/returns"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t("footer.returns")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/policies/privacy"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t("footer.privacy_policy")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/policies/terms"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t("footer.terms_conditions")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t("footer.newsletter")}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t("footer.newsletter_description")}</p>
              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <Input
                  type="email"
                  placeholder={t("footer.email_placeholder")}
                  className="flex-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit">{t("buttons.subscribe")}</Button>
              </form>

              <div className="mt-6 space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>support@example.com</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>123 Commerce St, New York, NY</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t mt-12 pt-6 text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} {t("site.name")}. {t("footer.all_rights_reserved")}
            </p>
          </div>
        </div>
      </footer>
    </ClientSafeComponent>
  )
}

