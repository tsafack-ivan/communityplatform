"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubscribed(true)
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      })
    }, 1000)
  }

  if (isSubscribed) {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-blue-700 rounded-lg">
        <CheckCircle className="h-12 w-12 text-white mb-2" />
        <h3 className="text-xl font-bold">Thank You!</h3>
        <p className="text-blue-100">You've successfully subscribed to our newsletter.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-white text-gray-900"
      />
      <Button type="submit" disabled={isLoading} className="bg-white text-blue-600 hover:bg-blue-50">
        {isLoading ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  )
}
