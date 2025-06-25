"use client"

import { useState, useEffect } from "react"
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
import { format } from "date-fns"

interface VolunteerOpportunity {
  id: string
  title: string
  description: string
  date: string
  location: string
  requiredSkills: string[]
  status: string
  organization: {
    id: string
    name: string
    logo: string | null
    description: string
  }
  createdAt: string
}

export default function VolunteerPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOpportunity, setSelectedOpportunity] = useState<VolunteerOpportunity | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    motivation: ""
  })

  useEffect(() => {
    fetchOpportunities()
  }, [])

  const fetchOpportunities = async () => {
    try {
      const response = await fetch('/api/volunteer/opportunities/public')
      if (!response.ok) {
        throw new Error('Failed to fetch volunteer opportunities')
      }
      const data = await response.json()
      setOpportunities(data)
    } catch (error) {
      toast.error('Error loading volunteer opportunities')
      console.error('Error fetching volunteer opportunities:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredOpportunities = opportunities.filter(opp =>
    opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opp.organization.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opp.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleApply = (opportunity: VolunteerOpportunity) => {
    setSelectedOpportunity(opportunity)
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedOpportunity) return

    try {
      const response = await fetch('/api/volunteer/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          opportunityId: selectedOpportunity.id,
          organizationId: selectedOpportunity.organization.id,
          name: formData.name,
          email: formData.email,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit application')
      }

      toast.success("Application submitted successfully!")
      setIsDialogOpen(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        experience: "",
        motivation: ""
      })
    } catch (error) {
      toast.error("Failed to submit application")
      console.error('Error submitting application:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (isLoading) {
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
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading volunteer opportunities...</p>
        </div>
      </div>
    )
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
          <p className="text-muted-foreground">
            {searchQuery ? "No opportunities found matching your search." : "No volunteer opportunities available at the moment."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredOpportunities.map((opportunity) => (
            <Card key={opportunity.id} className="overflow-hidden">
              <div 
                className="aspect-video relative bg-cover bg-center"
                style={{
                  backgroundImage: `url(${opportunity.organization.logo || '/images/charity-background.png'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white text-center px-4">{opportunity.title}</h3>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">{opportunity.organization.name}</p>
                    <p className="text-sm text-muted-foreground">{opportunity.location}</p>
                  </div>
                  <Badge>{opportunity.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{opportunity.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Date: {format(new Date(opportunity.date), "MMM d, yyyy")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.requiredSkills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
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
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
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
                rows={3}
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
                rows={3}
                required
              />
            </div>
            <DialogFooter className="sticky bottom-0 bg-background pt-4 border-t">
              <Button type="submit" className="w-full">Submit Application</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
} 