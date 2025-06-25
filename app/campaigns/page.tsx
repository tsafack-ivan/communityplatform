"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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

type PaymentMethod = "mobile-money" | "credit-card" | "bank-transfer"

export default function CampaignsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [donationAmount, setDonationAmount] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mobile-money")
  const [mobileMoneyNumber, setMobileMoneyNumber] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [bankAccount, setBankAccount] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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

  const filteredCampaigns = useMemo(() => {
    if (!searchQuery.trim()) return campaigns

    const query = searchQuery.toLowerCase().trim()
    return campaigns.filter(campaign => 
      campaign.title.toLowerCase().includes(query) ||
      campaign.description.toLowerCase().includes(query) ||
      campaign.ngo.toLowerCase().includes(query) ||
      campaign.category.toLowerCase().includes(query)
    )
  }, [searchQuery, campaigns])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The filtering is already handled by the useMemo hook
    // This function is just to prevent form submission
  }

  const handleDonate = (campaign: Campaign) => {
    setSelectedCampaign(campaign)
    setIsDialogOpen(true)
  }

  const validatePaymentDetails = () => {
    if (!donationAmount || isNaN(Number(donationAmount)) || Number(donationAmount) <= 0) {
      toast.error("Please enter a valid donation amount")
      return false
    }

    switch (paymentMethod) {
      case "mobile-money":
        if (!mobileMoneyNumber) {
          toast.error("Please enter your mobile money number")
          return false
        }
        break
      case "credit-card":
        if (!cardNumber) {
          toast.error("Please enter your card number")
          return false
        }
        break
      case "bank-transfer":
        if (!bankAccount) {
          toast.error("Please enter your bank account number")
          return false
        }
        break
    }
    return true
  }

  const processDonation = () => {
    if (!validatePaymentDetails()) return

    // Here you would typically make an API call to process the payment
    // For now, we'll just show a success message
    toast.success(`Thank you for your donation of ${Number(donationAmount).toLocaleString()} FCFA to ${selectedCampaign?.title}!`)
    
    // Reset form and close dialog
    setDonationAmount("")
    setMobileMoneyNumber("")
    setCardNumber("")
    setBankAccount("")
    setIsDialogOpen(false)
    setSelectedCampaign(null)
  }

  const renderPaymentFields = () => {
    switch (paymentMethod) {
      case "mobile-money":
        return (
          <div className="grid gap-2">
            <Label htmlFor="mobile-money">Mobile Money Number</Label>
            <Input
              id="mobile-money"
              placeholder="Enter your mobile money number"
              value={mobileMoneyNumber}
              onChange={(e) => setMobileMoneyNumber(e.target.value)}
            />
          </div>
        )
      case "credit-card":
        return (
          <div className="grid gap-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input
              id="card-number"
              placeholder="Enter your card number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
        )
      case "bank-transfer":
        return (
          <div className="grid gap-2">
            <Label htmlFor="bank-account">Bank Account Number</Label>
            <Input
              id="bank-account"
              placeholder="Enter your bank account number"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
            />
          </div>
        )
    }
  }

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DashboardHeader
          heading="Active Campaigns"
          text="Support causes that matter to you"
        />
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading campaigns...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <DashboardHeader
        heading="Active Campaigns"
        text="Support causes that matter to you"
      />

      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search campaigns by title, description, NGO, or category..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {searchQuery ? "No campaigns found matching your search." : "No active campaigns available at the moment."}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden">
              <div 
                className="aspect-video relative bg-cover bg-center"
                style={{
                  backgroundImage: `url(${campaign.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-2">{campaign.title}</h3>
                  <p className="text-sm text-gray-200">{campaign.ngo}</p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {campaign.description}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{campaign.progress}%</span>
                    </div>
                    <Progress value={campaign.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">{campaign.raised.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Raised (FCFA)</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{campaign.goal.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Goal (FCFA)</p>
                    </div>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => handleDonate(campaign)}
                  >
                    Donate Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Donation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Make a Donation</DialogTitle>
            <DialogDescription>
              Support {selectedCampaign?.title} by making a donation.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Donation Amount (FCFA)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={(value: PaymentMethod) => setPaymentMethod(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mobile-money" id="mobile-money" />
                  <Label htmlFor="mobile-money">Mobile Money</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card">Credit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                  <Label htmlFor="bank-transfer">Bank Transfer</Label>
                </div>
              </RadioGroup>
            </div>

            {renderPaymentFields()}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={processDonation}>
              Donate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 