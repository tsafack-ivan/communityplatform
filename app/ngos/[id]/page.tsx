"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Users, Target, Award, Calendar, MapPin, Globe, Mail, Phone } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { toast } from "sonner"

interface NGO {
  id: string
  name: string
  description: string
  email: string
  website?: string
  logo?: string
  impact: {
    beneficiaries: number
    projects: number
    successRate: number
  }
  currentProjects: {
    name: string
    description: string
    status: "active" | "completed" | "planned"
    progress: number
  }[]
}

export default function NGOViewPage() {
  const router = useRouter()
  const params = useParams()
  const ngoId = params.id as string
  const [ngo, setNgo] = useState<NGO | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNGO = async () => {
      try {
        const response = await fetch(`/api/ngos/${ngoId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch NGO details')
        }
        const data = await response.json()
        setNgo(data)
      } catch (error) {
        toast.error('Error loading NGO details')
        console.error('Error fetching NGO:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNGO()
  }, [ngoId])

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to NGOs
        </Button>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading NGO details...</p>
        </div>
      </div>
    )
  }

  if (!ngo) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to NGOs
        </Button>
        <div className="text-center py-8">
          <p className="text-muted-foreground">NGO not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to NGOs
      </Button>

      <div 
        className="relative h-[300px] rounded-lg overflow-hidden"
        style={{
          backgroundImage: ngo.logo ? `url(${ngo.logo})` : 'none',
          backgroundColor: '#f3f4f6',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">{ngo.name}</h1>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{ngo.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Impact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Success Rate</span>
                <span>{ngo.impact.successRate}%</span>
              </div>
              <Progress value={ngo.impact.successRate} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <div>
                  <p className="text-2xl font-bold">{ngo.impact.beneficiaries.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Beneficiaries</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <div>
                  <p className="text-2xl font-bold">{ngo.impact.projects}</p>
                  <p className="text-sm text-muted-foreground">Projects</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ngo.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${ngo.email}`} className="text-blue-500 hover:underline">
                  {ngo.email}
                </a>
              </div>
            )}
            {ngo.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {ngo.website}
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Current Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ngo.currentProjects.map((project) => (
                <div key={project.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{project.name}</h3>
                    <Badge variant={project.status === "active" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  {project.status === "active" && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 