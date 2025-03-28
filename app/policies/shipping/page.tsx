import type { Metadata } from "next"
import ShippingPolicyClientPage from "./ShippingPolicyClientPage"

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description: "Learn about our shipping methods, delivery times, and policies for domestic and international orders.",
}

export default function ShippingPolicyPage() {
  return <ShippingPolicyClientPage />
}

