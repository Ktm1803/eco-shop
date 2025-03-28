"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/hooks/use-auth"
import { LanguageProvider } from "@/hooks/use-language"
import { Navbar } from "@/components/navbar"
import { TranslationLoading } from "@/components/translation-loading"
import { PageTransition } from "@/components/page-transition"
import { LoadingScreen } from "@/components/loading-screen"
import { Footer } from "@/components/footer"
import { QueryClient, QueryClientProvider } from "react-query"

const Providers = ({ children }: { children: React.ReactNode }) => {
  // Sử dụng useState để tạo QueryClient mới cho mỗi request
  const [queryClient] = useState(() => new QueryClient())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <SidebarProvider>
            {mounted && <LoadingScreen />}
            <div className="flex flex-col min-h-screen w-full">
              <Navbar />
              <div className="flex flex-1 w-full">
                <AppSidebar />
                <main className="flex-1 w-full">
                  <PageTransition>
                    <div className="min-h-[calc(100vh-4rem)] w-full">{children}</div>
                  </PageTransition>
                </main>
              </div>
              <Footer />
            </div>
            <Toaster />
            <TranslationLoading />
          </SidebarProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default Providers

