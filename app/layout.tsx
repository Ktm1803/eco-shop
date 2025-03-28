import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ErrorBoundary from "@/lib/error-boundary"
import Providers from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "ShopName - Your One-Stop E-commerce Solution",
    template: "%s | ShopName",
  },
  description:
    "ShopName offers a wide range of high-quality products. Find the best deals on electronics, fashion, home goods, and more.",
  keywords: ["e-commerce", "online shopping", "electronics", "fashion", "home goods"],
  authors: [{ name: "ShopName Team" }],
  creator: "ShopName",
  publisher: "ShopName Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.shopname.com/",
    siteName: "ShopName",
    title: "ShopName - Your One-Stop E-commerce Solution",
    description: "Find the best deals on electronics, fashion, home goods, and more at ShopName.",
    images: [
      {
        url: "https://www.shopname.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ShopName - Your One-Stop E-commerce Solution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@shopname",
    creator: "@shopname",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://www.shopname.com",
    languages: {
      "en-US": "https://www.shopname.com/en-US",
      "es-ES": "https://www.shopname.com/es-ES",
      "fr-FR": "https://www.shopname.com/fr-FR",
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-gradient-to-b from-background to-background/80`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ErrorBoundary>
            <Providers>{children}</Providers>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'