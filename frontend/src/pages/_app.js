"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ToastContainer } from "react-toastify"
import { AuthProvider } from "../context/AuthContext"
import Layout from "../components/Layout"
import "react-toastify/dist/ReactToastify.css"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer position="top-right" autoClose={5000} />
        </Layout>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default MyApp

