"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // This would be replaced with your actual analytics implementation
    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
    console.log(`Page view: ${url}`)

    // Example of how you might send this to a real analytics service
    // sendAnalytics({ path: url, timestamp: new Date().toISOString() })
  }, [pathname, searchParams])

  return null
}
