"use client"

import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { PlusCircle, Users, DollarSign, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Dynamically import components that use useLayoutEffect
const DynamicTabs = dynamic(() => import("@/components/ui/tabs").then(mod => mod.Tabs), { ssr: false })
const DynamicDialog = dynamic(() => import("@/components/ui/dialog").then(mod => mod.Dialog), { ssr: false })

interface Campaign {
  id: string
  title: string
  description: string
  goal: string
  category: string
  progress: number
  createdAt: Date
}

export default function NGODashboard() {
  const router = useRouter()
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false)
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      title: "Education for All",
      description: "Providing quality education to underprivileged children",
      goal: "1000000",
      category: "Education",
      progress: 75,
      createdAt: new Date("2024-01-01")
    }
  ])
  const [newCampaign, setNewCampaign] = useState({
    title: "",
    description: "",
    goal: "",
    category: ""
  })

  const handleCreateCampaign = () => {
    const campaign: Campaign = {
      id: Date.now().toString(),
      title: newCampaign.title,
      description: newCampaign.description,
      goal: newCampaign.goal,
      category: newCampaign.category,
      progress: 0,
      createdAt: new Date()
    }
    
    setCampaigns([...campaigns, campaign])
    setIsNewCampaignOpen(false)
    // Reset form
    setNewCampaign({
      title: "",
      description: "",
      goal: "",
      category: ""
    })
  }

  const handleGenerateReport = () => {
    router.push("/ngo/impact")
  }

  const handleViewAnalytics = () => {
    router.push("/ngo/analytics")
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <DashboardHeader
        heading="NGO Dashboard"
        text="Manage your campaigns and track your impact"
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,500 FCFA</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.length}</div>
            <p className="text-xs text-muted-foreground">
              +{campaigns.length - 1} new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              +5 new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campaign Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              +4% from last month
            </p>
          </CardContent>
        </Card>
            </div>

      <DynamicTabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
          <TabsTrigger value="donations">Recent Donations</TabsTrigger>
          <TabsTrigger value="impact">Impact Report</TabsTrigger>
        </TabsList>
        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <CardTitle>{campaign.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {campaign.description}
                  </p>
                  <div className="mt-4">
                    <div className="text-sm font-medium">Progress</div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                      <div 
                        className="h-2 rounded-full bg-primary" 
                        style={{ width: `${campaign.progress}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {campaign.progress}% of goal reached
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Goal: {parseInt(campaign.goal).toLocaleString()} FCFA
                  </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Category: {campaign.category}
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Created: {campaign.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="donations" className="space-y-4">
              <Card>
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">Education Campaign</p>
                    </div>
                  <div className="text-right">
                    <p className="font-medium">1,000 FCFA</p>
                    <p className="text-sm text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                  </div>
                </CardContent>
              </Card>
        </TabsContent>
        <TabsContent value="impact" className="space-y-4">
              <Card>
            <CardHeader>
              <CardTitle>Impact Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                    <p className="font-medium">Education</p>
                    <p className="text-sm text-muted-foreground">50 children supported</p>
                    </div>
                  <div className="text-right">
                    <p className="font-medium">4,375 FCFA</p>
                    <p className="text-sm text-muted-foreground">35% of total</p>
                  </div>
                </div>
                  </div>
                </CardContent>
              </Card>
        </TabsContent>
      </DynamicTabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
            <div className="space-y-4">
              <DynamicDialog open={isNewCampaignOpen} onOpenChange={setIsNewCampaignOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Campaign
                                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Campaign</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Campaign Title</Label>
                      <Input
                        id="title"
                        value={newCampaign.title}
                        onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                        placeholder="Enter campaign title"
                      />
                                </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newCampaign.description}
                        onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                        placeholder="Enter campaign description"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="goal">Fundraising Goal (FCFA)</Label>
                      <Input
                        id="goal"
                        type="number"
                        value={newCampaign.goal}
                        onChange={(e) => setNewCampaign({ ...newCampaign, goal: e.target.value })}
                        placeholder="Enter fundraising goal"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={newCampaign.category}
                        onChange={(e) => setNewCampaign({ ...newCampaign, category: e.target.value })}
                        placeholder="Enter campaign category"
                      />
                    </div>
                    <Button onClick={handleCreateCampaign}>Create Campaign</Button>
                  </div>
                </DialogContent>
              </DynamicDialog>
              <Button variant="outline" className="w-full" onClick={handleGenerateReport}>
                Generate Impact Report
              </Button>
              <Button variant="outline" className="w-full" onClick={handleViewAnalytics}>
                View Donor Analytics
              </Button>
                    </div>
                  </CardContent>
                </Card>
      </div>
    </div>
  )
}
