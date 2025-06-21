"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Home } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import Link from "next/link"

interface VolunteerOpportunity {
  id: string
  title: string
  organization: string
  description: string
  location: string
  duration: string
  requirements: string[]
  category: string
  image: string
}

export default function VolunteerPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOpportunity, setSelectedOpportunity] = useState<VolunteerOpportunity | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    motivation: ""
  })

  const opportunities: VolunteerOpportunity[] = [
    {
      id: "1",
      title: "Teaching Assistant",
      organization: "Hope Foundation",
      description: "Help children with their studies and provide additional support in classrooms.",
      location: "Yaounde, Cameroon",
      duration: "3-6 months",
      requirements: ["Teaching experience", "Patience", "Good communication skills"],
      category: "Education",
      image: "/images/education.jfif"
    },
    {
      id: "2",
      title: "Community Health Worker",
      organization: "Water for Life",
      description: "Assist in health awareness campaigns and basic health check-ups.",
      location: "Douala, Cameroon",
      duration: "6-12 months",
      requirements: ["Basic health knowledge", "Community engagement", "First aid training"],
      category: "Healthcare",
      image: "/images/water.jfif"
    },
    {
      id: "3",
      title: "Food Distribution Volunteer",
      organization: "Food Bank",
      description: "Help in organizing and distributing food supplies to needy families.",
      location: "Bamenda, Cameroon",
      duration: "Flexible",
      requirements: ["Physical fitness", "Team player", "Organizational skills"],
      category: "Food Security",
      image: "/images/food.avif"
    }
  ]

  const filteredOpportunities = opportunities.filter(opp =>
    opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opp.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleApply = (opportunity: VolunteerOpportunity) => {
    setSelectedOpportunity(opportunity)
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the application to your backend
    toast.success("Application submitted successfully!")
    setIsDialogOpen(false)
    setFormData({
      name: "",
      email: "",
      phone: "",
      experience: "",
      motivation: ""
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <DashboardHeader
          heading="Volunteer Opportunities"
          text="Make a difference by volunteering with our partner organizations"
        />
        <Link href="/">
          <Button variant="ghost" size="icon">
            <Home className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search opportunities by title, organization, or category..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredOpportunities.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No opportunities found matching your search.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredOpportunities.map((opportunity) => (
            <Card key={opportunity.id} className="overflow-hidden">
              <div 
                className="aspect-video relative bg-cover bg-center"
                style={{
                  backgroundImage: `url(${opportunity.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{opportunity.title}</h3>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">{opportunity.organization}</p>
                    <p className="text-sm text-muted-foreground">{opportunity.location}</p>
                  </div>
                  <Badge>{opportunity.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{opportunity.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Duration: {opportunity.duration}</p>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.requirements.map((req) => (
                        <Badge key={req} variant="secondary">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => handleApply(opportunity)}
                  >
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for {selectedOpportunity?.title}</DialogTitle>
            <DialogDescription>
              Please fill out the form below to apply for this volunteer position.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Relevant Experience</Label>
              <Textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="motivation">Why do you want to volunteer?</Label>
              <Textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">Submit Application</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
} 