import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import { AuthProvider } from "@/lib/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Community Charity Platform",
  description: "A cloud-based platform connecting NGOs, donors, and volunteers",
   
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Suspense fallback={null}>
            {children}
            <Toaster />
            <Analytics />
            <TailwindIndicator />
          </Suspense>
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
