"use client"

import Link from "next/link"
import { Home, User } from "lucide-react"

interface DashboardHeaderProps {
  heading: string
  text?: string
  userType?: "admin" | "organization" | "donor" | "volunteer"
  userName?: string
}

export function DashboardHeader({
  heading,
  text,
  userType,
  userName
}: DashboardHeaderProps) {
  const userInitial = userName ? userName.charAt(0).toUpperCase() : ""

  const userTypeDisplay = {
    admin: "Administrator",
    ngo: "NGO",
    donor: "Donor"
  }

  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {userType && userName && (
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium">{userName}</span>
            <span className="text-xs text-muted-foreground capitalize">{userType}</span>
          </div>
          <div className="rounded-full bg-primary/10 p-2">
            <User className="h-5 w-5 text-primary" />
          </div>
        </div>
      )}
    </div>
  )
}
