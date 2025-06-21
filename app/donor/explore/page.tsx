"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Search, Filter } from "lucide-react"
import { DonationModal } from "@/components/donation-modal"

export default function ExplorePage() {
  const [selectedNGO, setSelectedNGO] = useState<{ name: string; campaign: string } | null>(null)
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false)

  const handleLearnMore = (ngo: { name: string; campaign: string }) => {
    setSelectedNGO(ngo)
    setIsDonationModalOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader heading="Explore Causes" text="Welcome, Tsafack Ivan Marc!" />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-gray-50 lg:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <DashboardNav userType="donor" />
          </div>
        </aside>
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Explore Causes</h1>
              <p className="text-gray-500">Discover and support meaningful causes that align with your values.</p>
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search causes, NGOs, or keywords..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Global Health Initiative",
                  description: "Providing healthcare access to underserved communities",
                  category: "Healthcare",
                  impact: "10,000+ lives impacted",
                  match: "95%",
                  campaign: "Clean Water Initiative"
                },
                {
                  name: "Education for All",
                  description: "Building schools and providing education in rural areas",
                  category: "Education",
                  impact: "5,000+ students supported",
                  match: "92%",
                  campaign: "School Building Project"
                },
                {
                  name: "Clean Energy Future",
                  description: "Promoting renewable energy and sustainable practices",
                  category: "Environment",
                  impact: "50+ communities served",
                  match: "88%",
                  campaign: "Solar Power Initiative"
                },
                {
                  name: "Food Security Alliance",
                  description: "Combating hunger and food insecurity",
                  category: "Food Security",
                  impact: "20,000+ meals provided",
                  match: "90%",
                  campaign: "Emergency Food Relief"
                },
                {
                  name: "Wildlife Conservation",
                  description: "Protecting endangered species and their habitats",
                  category: "Conservation",
                  impact: "100+ species protected",
                  match: "85%",
                  campaign: "Species Protection Program"
                },
                {
                  name: "Tech for Good",
                  description: "Bridging the digital divide in underserved communities",
                  category: "Technology",
                  impact: "1,000+ devices donated",
                  match: "87%",
                  campaign: "Digital Access Initiative"
                }
              ].map((ngo, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{ngo.name}</CardTitle>
                    <CardDescription>{ngo.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Category</span>
                        <span className="font-medium">{ngo.category}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Impact</span>
                        <span className="font-medium">{ngo.impact}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Match Score</span>
                        <span className="font-medium text-blue-600">{ngo.match}</span>
                      </div>
                      <Button 
                        className="w-full"
                        onClick={() => handleLearnMore({ name: ngo.name, campaign: ngo.campaign })}
                      >
                        Donate Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>

      {selectedNGO && (
        <DonationModal
          isOpen={isDonationModalOpen}
          onClose={() => {
            setIsDonationModalOpen(false)
            setSelectedNGO(null)
          }}
          ngoName={selectedNGO.name}
          campaignName={selectedNGO.campaign}
        />
      )}
    </div>
  )
} 