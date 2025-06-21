"use client"

import { useState, useMemo } from "react"
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

interface Campaign {
  id: string
  title: string
  description: string
  goal: number
  raised: number
  category: string
  image: string
  ngo: string
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

  const campaigns: Campaign[] = [
    {
      id: "1",
      title: "Education for All",
      description: "Providing quality education to underprivileged children in rural areas",
      goal: 1000000,
      raised: 750000,
      category: "Education",
      image: "/images/education.jfif",
      ngo: "Hope Foundation"
    },
    {
      id: "2",
      title: "Clean Water Initiative",
      description: "Bringing clean drinking water to communities in need",
      goal: 500000,
      raised: 300000,
      category: "Health",
      image: "/images/water.jfif",
      ngo: "Water for Life"
    },
    {
      id: "3",
      title: "Food Security Program",
      description: "Ensuring food security for vulnerable families",
      goal: 800000,
      raised: 450000,
      category: "Food",
      image: "/images/food.avif",
      ngo: "Food Bank"
    }
  ]

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
        <Button type="submit">Search</Button>
      </form>

      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No campaigns found matching your search.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden">
              <div 
                className="aspect-video relative bg-cover bg-center"
                style={{
                  backgroundImage: `url(${campaign.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{campaign.title}</h3>
                </div>
              </div>
              <CardHeader>
                <p className="text-sm text-muted-foreground">
                  by {campaign.ngo}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{campaign.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Raised</span>
                    <span className="font-medium">
                      {campaign.raised.toLocaleString()} FCFA
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${(campaign.raised / campaign.goal) * 100}%`
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Goal</span>
                    <span className="font-medium">
                      {campaign.goal.toLocaleString()} FCFA
                    </span>
                  </div>
                  <Button 
                    className="w-full mt-4"
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Make a Donation</DialogTitle>
            <DialogDescription>
              Support {selectedCampaign?.title} by making a donation
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
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                className="grid grid-cols-3 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="mobile-money"
                    id="mobile-money"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="mobile-money"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span>Mobile Money</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="credit-card"
                    id="credit-card"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="credit-card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span>Credit Card</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="bank-transfer"
                    id="bank-transfer"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="bank-transfer"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span>Bank Transfer</span>
                  </Label>
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
              Confirm Donation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 