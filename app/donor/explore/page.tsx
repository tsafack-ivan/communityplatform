"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Search, Filter } from "lucide-react"
import { DonationModal } from "@/components/donation-modal"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"

interface Campaign {
  id: string
  title: string
  description: string
  goal: number
  raised: number
  category: string
  image: string
  ngo: string
  ngoId: string
  startDate: string
  endDate: string
  progress: number
}

export default function ExplorePage() {
  const [selectedNGO, setSelectedNGO] = useState<{ name: string; campaign: string } | null>(null)
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false)
  const [userName, setUserName] = useState("")
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setUserName(localStorage.getItem("userName") || "")
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns')
      if (!response.ok) {
        throw new Error('Failed to fetch campaigns')
      }
      const data = await response.json()
      setCampaigns(data)
    } catch (error) {
      toast.error('Error loading campaigns')
      console.error('Error fetching campaigns:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLearnMore = (ngo: { name: string; campaign: string }) => {
    setSelectedNGO(ngo)
    setIsDonationModalOpen(true)
  }

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.ngo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <DashboardHeader heading="Explore Causes" text={`Welcome, ${userName || "Donor"}!`} />
        <div className="flex flex-1">
          <aside className="hidden w-64 border-r bg-gray-50 lg:block">
            <div className="flex h-full flex-col gap-2 p-4">
              <DashboardNav userType="donor" />
            </div>
          </aside>
          <main className="flex-1 overflow-auto bg-gray-50 p-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading campaigns...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader heading="Explore Causes" text={`Welcome, ${userName || "Donor"}!`} />
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            {filteredCampaigns.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {searchQuery ? "No campaigns found matching your search." : "No campaigns available at the moment."}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCampaigns.map((campaign) => (
                  <Card key={campaign.id}>
                    <CardHeader>
                      <CardTitle>{campaign.title}</CardTitle>
                      <CardDescription>{campaign.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Organization</span>
                          <span className="font-medium">{campaign.ngo}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Category</span>
                          <span className="font-medium">{campaign.category}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Progress</span>
                            <span className="font-medium">{campaign.progress}%</span>
                          </div>
                          <Progress value={campaign.progress} className="h-2" />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Raised</span>
                          <span className="font-medium">{campaign.raised.toLocaleString()} FCFA</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Goal</span>
                          <span className="font-medium">{campaign.goal.toLocaleString()} FCFA</span>
                        </div>
                        <Button 
                          className="w-full"
                          onClick={() => handleLearnMore({ name: campaign.ngo, campaign: campaign.title })}
                        >
                          Donate Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
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