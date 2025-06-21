"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Heart,
  Home,
  LogOut,
  Settings,
  Building,
  HandHelping,
  Calendar,
  FileText,
  DollarSign,
} from "lucide-react"

interface NavProps {
  userType: "admin" | "ngo" | "donor" | "volunteer"
}

export function DashboardNav({ userType }: NavProps) {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = {
    admin: [
      { href: "/admin/dashboard", label: "Dashboard", icon: Home },
      { href: "/admin/ngos", label: "NGOs", icon: Building },
      { href: "/admin/donors", label: "Donors", icon: Heart },
      { href: "/admin/volunteers", label: "Volunteers", icon: HandHelping },
      { href: "/admin/donations", label: "Donations", icon: DollarSign },
      { href: "/admin/reports", label: "Reports", icon: FileText },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
    ngo: [
      { href: "/ngo/dashboard", label: "Dashboard", icon: Home },
      { href: "/ngo/campaigns", label: "Campaigns", icon: Heart },
      { href: "/ngo/donations", label: "Donations", icon: DollarSign },
      { href: "/ngo/volunteers", label: "Volunteers", icon: HandHelping },
      { href: "/ngo/events", label: "Events", icon: Calendar },
      { href: "/ngo/reports", label: "Reports", icon: FileText },
      { href: "/ngo/settings", label: "Settings", icon: Settings },
    ],
    donor: [
      { href: "/donor/dashboard", label: "Dashboard", icon: Home },
      { href: "/donor/explore", label: "Explore", icon: Building },
      { href: "/donor/donations", label: "My Donations", icon: Heart },
      { href: "/donor/impact", label: "My Impact", icon: BarChart3 },
      { href: "/donor/settings", label: "Settings", icon: Settings },
    ],
    volunteer: [
      { href: "/volunteer/dashboard", label: "Dashboard", icon: Home },
      { href: "/volunteer/opportunities", label: "Opportunities", icon: HandHelping },
      { href: "/volunteer/schedule", label: "My Schedule", icon: Calendar },
      { href: "/volunteer/hours", label: "My Hours", icon: BarChart3 },
      { href: "/volunteer/settings", label: "Settings", icon: Settings },
    ],
  }

  const currentNavItems = navItems[userType]

  const handleLogout = () => {
    // Here you would typically clear any auth tokens/cookies
    // For now, we'll just redirect to the login page
    router.push("/login")
  }

  return (
    <nav className="space-y-1">
      {currentNavItems.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-blue-600",
              pathname === item.href ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-blue-50",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        )
      })}
      <Button 
        variant="ghost" 
        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
        onClick={handleLogout}
      >
        <LogOut className="mr-3 h-4 w-4" />
        Logout
      </Button>
    </nav>
  )
}
