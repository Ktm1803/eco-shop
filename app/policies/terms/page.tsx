import type { Metadata } from "next"
import TermsOfServicePageClient from "./TermsOfServicePageClient"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read our terms and conditions for using our website and services.",
}

export default function TermsOfServicePage() {
  return <TermsOfServicePageClient />
}

