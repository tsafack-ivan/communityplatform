"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
}

export default function NGOPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [ngos, setNgos] = useState<NGO[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNGOs = async () => {
      try {
        const response = await fetch('/api/ngos')
        if (!response.ok) {
          throw new Error('Failed to fetch NGOs')
        }
        const data = await response.json()
        setNgos(data)
      } catch (error) {
        toast.error('Error loading NGOs')
        console.error('Error fetching NGOs:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNGOs()
  }, [])

  const filteredNGOs = ngos.filter(ngo =>
    ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ngo.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DashboardHeader
          heading="Verified NGOs"
          text="Discover and support trusted organizations making a difference"
        />
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading NGOs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <DashboardHeader
        heading="Verified NGOs"
        text="Discover and support trusted organizations making a difference"
      />

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search NGOs by name or description..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredNGOs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No NGOs found matching your search.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredNGOs.map((ngo) => (
            <Card key={ngo.id} className="overflow-hidden">
              <div 
                className="aspect-video relative bg-cover bg-center"
                style={{
                  backgroundImage: ngo.logo ? `url(${ngo.logo})` : 'none',
                  backgroundColor: '#f3f4f6'
                }}
              >
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{ngo.name}</h3>
                </div>
              </div>
              <CardHeader>
                <p className="text-sm text-muted-foreground">
                  {ngo.email}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{ngo.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Impact Score</span>
                      <span>{ngo.impact.successRate}%</span>
                    </div>
                    <Progress value={ngo.impact.successRate} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">{ngo.impact.beneficiaries.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Beneficiaries</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{ngo.impact.projects}</p>
                      <p className="text-sm text-muted-foreground">Projects</p>
                    </div>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => router.push(`/ngos/${ngo.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 