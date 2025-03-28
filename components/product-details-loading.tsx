"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetailsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <Skeleton className="w-full aspect-square rounded-lg" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-10 w-1/2" />
      </div>
    </div>
  )
}

