import type { Metadata } from "next"
import PrivacyPolicyClientPage from "./PrivacyPolicyClientPage"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how we collect, use, and protect your personal information when you use our services.",
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClientPage />
}

