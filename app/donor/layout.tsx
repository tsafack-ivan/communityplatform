"use client";

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { useEffect, useState } from "react"

export default function DonorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("userName") || "");
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader 
        heading="Donor Dashboard" 
        text={`Welcome, ${userName || "Donor"}!`}
        userType="donor"
        userName={userName}
      />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-gray-50 lg:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <DashboardNav userType="donor" />
          </div>
        </aside>
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 