import type { Metadata } from "next"
import ReturnsClientPage from "./ReturnsClientPage"

export const metadata: Metadata = {
  title: "Returns & Refunds Policy",
  description: "Learn about our return policy, eligibility requirements, and refund process for your purchases.",
}

export default function ReturnsPage() {
  return <ReturnsClientPage />
}

