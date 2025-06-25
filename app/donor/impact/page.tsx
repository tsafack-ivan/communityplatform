"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { BarChart3, Users, Globe, Heart } from "lucide-react"
import { useEffect, useState } from "react"

export default function ImpactPage() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserName(localStorage.getItem("userName") || "");
  }, []);
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader heading="My Impact" text={`Welcome, ${userName || "Donor"}!`} />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-gray-50 lg:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <DashboardNav userType="donor" />
          </div>
        </aside>
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Impact</h1>
              <p className="text-gray-500">See how your donations are making a difference.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Impact</p>
                      <p className="text-3xl font-bold text-gray-900">85%</p>
                    </div>
                    <div className="rounded-full bg-blue-100 p-3">
                      <BarChart3 className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    Top 15% of donors
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Lives Impacted</p>
                      <p className="text-3xl font-bold text-gray-900">1,250+</p>
                    </div>
                    <div className="rounded-full bg-green-100 p-3">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    Through your donations
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Communities</p>
                      <p className="text-3xl font-bold text-gray-900">15</p>
                    </div>
                    <div className="rounded-full bg-purple-100 p-3">
                      <Globe className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    Across different regions
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Causes</p>
                      <p className="text-3xl font-bold text-gray-900">8</p>
                    </div>
                    <div className="rounded-full bg-red-100 p-3">
                      <Heart className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    Different causes supported
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Impact by Category</CardTitle>
                  <CardDescription>
                    Distribution of your impact across different causes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: "Healthcare", percentage: 35, amount: "4,375 FCFA" },
                      { category: "Education", percentage: 25, amount: "3,125 FCFA" },
                      { category: "Environment", percentage: 20, amount: "2,500 FCFA" },
                      { category: "Food Security", percentage: 15, amount: "1,875 FCFA" },
                      { category: "Other", percentage: 5, amount: "625 FCFA" }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.category}</span>
                          <span className="text-sm text-gray-500">{item.amount}</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-100">
                          <div
                            className="h-2 rounded-full bg-blue-600"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Impact Stories</CardTitle>
                  <CardDescription>
                    How your donations are making a difference
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Clean Water Access",
                        description: "Provided clean water to 500 families in rural communities",
                        date: "June 2025"
                      },
                      {
                        title: "School Building",
                        description: "Helped build 2 new classrooms serving 100 students",
                        date: "May 2025"
                      },
                      {
                        title: "Medical Supplies",
                        description: "Delivered essential medical supplies to 3 rural clinics",
                        date: "April 2025"
                      }
                    ].map((story, index) => (
                      <div key={index} className="border-b pb-4 last:border-0">
                        <h3 className="font-medium">{story.title}</h3>
                        <p className="text-sm text-gray-500">{story.description}</p>
                        <p className="mt-1 text-xs text-gray-400">{story.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 