"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { toast } from "sonner"
import { Plus, Calendar, MapPin, Users, Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

interface VolunteerOpportunity {
  id: string
  title: string
  description: string
  date: string
  location: string
  requiredSkills: string[]
  status: string
  applications: {
    id: string
    name: string
    email: string
    status: string
    appliedAt: string
  }[]
  createdAt: string
}

export default function VolunteerOpportunitiesPage() {
  const router = useRouter()
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchOpportunities()
  }, [])

  const fetchOpportunities = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }

      const response = await fetch('/api/organization/volunteer-opportunities', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'bg-green-100 text-green-800'
      case 'FILLED':
        return 'bg-blue-100 text-blue-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <DashboardHeader 
          heading="Volunteer Opportunities" 
          text="Manage your volunteer opportunities"
          userType="organization"
        />
        <div className="flex flex-1">
          <aside className="hidden w-64 border-r bg-gray-50 lg:block">
            <div className="flex h-full flex-col gap-2 p-4">
              <DashboardNav userType="ngo" />
            </div>
          </aside>
          <main className="flex-1 overflow-auto bg-gray-50 p-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading volunteer opportunities...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader 
        heading="Volunteer Opportunities" 
        text="Manage your volunteer opportunities"
        userType="organization"
      />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-gray-50 lg:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <DashboardNav userType="ngo" />
          </div>
        </aside>
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Volunteer Opportunities</h1>
                <p className="text-gray-500">Create and manage volunteer opportunities for your organization</p>
              </div>
              <Link href="/organization/volunteer-opportunities/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Opportunity
                </Button>
              </Link>
            </div>

            {opportunities.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No volunteer opportunities yet</h3>
                  <p className="text-gray-500 mb-6">
                    Create your first volunteer opportunity to start attracting volunteers to your organization.
                  </p>
                  <Link href="/organization/volunteer-opportunities/create">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Opportunity
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {opportunities.map((opportunity) => (
                  <Card key={opportunity.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>{format(new Date(opportunity.date), "MMM d, yyyy")}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin className="h-4 w-4" />
                            <span>{opportunity.location}</span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(opportunity.status)}>
                          {opportunity.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {opportunity.description}
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Required Skills:</p>
                          <div className="flex flex-wrap gap-1">
                            {opportunity.requiredSkills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {opportunity.requiredSkills.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{opportunity.requiredSkills.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">
                            {opportunity.applications.length} applications
                          </span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
} 