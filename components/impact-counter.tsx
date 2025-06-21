"use client"

import { useEffect, useState, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ImpactCounterProps {
  icon: ReactNode
  value: number
  label: string
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function ImpactCounter({
  icon,
  value,
  label,
  prefix = "",
  suffix = "",
  duration = 2000,
  className,
}: ImpactCounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    startTimeRef.current = null
    countRef.current = 0
    setCount(0)

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const progress = timestamp - startTimeRef.current

      if (progress < duration) {
        const nextCount = Math.floor((progress / duration) * value)
        if (nextCount !== countRef.current) {
          countRef.current = nextCount
          setCount(nextCount)
        }
        requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    requestAnimationFrame(animate)

    return () => {
      startTimeRef.current = null
    }
  }, [value, duration])

  return (
    <div className={cn("text-center", className)}>
      <div className="inline-flex items-center justify-center rounded-full bg-blue-100 p-4 mb-4">{icon}</div>
      <div className="text-4xl font-bold text-gray-900 mb-2">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  )
}
