"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Heart } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Heart className="h-6 w-6 text-blue-600" />
        <span className="hidden font-bold sm:inline-block">Community Charity</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/about"
          className={cn(
            "transition-colors hover:text-blue-600",
            pathname === "/about" ? "text-blue-600" : "text-foreground",
          )}
        >
          About
        </Link>
        <Link
          href="/ngos"
          className={cn(
            "transition-colors hover:text-blue-600",
            pathname === "/ngos" ? "text-blue-600" : "text-foreground",
          )}
        >
          NGOs
        </Link>
        <Link
          href="/campaigns"
          className={cn(
            "transition-colors hover:text-blue-600",
            pathname === "/campaigns" ? "text-blue-600" : "text-foreground",
          )}
        >
          Campaigns
        </Link>
        <Link
          href="/volunteer"
          className={cn(
            "transition-colors hover:text-blue-600",
            pathname === "/volunteer" ? "text-blue-600" : "text-foreground",
          )}
        >
          Volunteer
        </Link>
      </nav>
    </div>
  )
}
