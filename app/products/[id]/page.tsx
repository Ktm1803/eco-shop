import ProductDetails from "@/components/product-details"
import { notFound } from "next/navigation"

export default function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  if (!params.id) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetails id={params.id} />
    </div>
  )
}

