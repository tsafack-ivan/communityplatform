"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { toast } from "sonner"
import { ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"

export default function CreateVolunteerOpportunity() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    requiredSkills: [] as string[]
  })
  const [newSkill, setNewSkill] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }

      const response = await fetch('/api/organization/volunteer-opportunities', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create volunteer opportunity')
      }

      toast.success('Volunteer opportunity created successfully!')
      router.push('/organization/volunteer-opportunities')
    } catch (error) {
      console.error('Error creating volunteer opportunity:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to create volunteer opportunity')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.requiredSkills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, newSkill.trim()]
      }))
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(skill => skill !== skillToRemove)
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader 
        heading="Create Volunteer Opportunity" 
        text="Create a new volunteer opportunity for your organization"
        userType="organization"
      />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-gray-50 lg:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <DashboardNav userType="ngo" />
          </div>
        </aside>
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="flex items-center gap-4">
              <Link href="/organization/volunteer-opportunities">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Create Volunteer Opportunity</h1>
                <p className="text-gray-500">Fill out the form below to create a new volunteer opportunity</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Opportunity Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., Teaching Assistant, Community Health Worker"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe the volunteer opportunity, what volunteers will do, and the impact they'll make..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        name="date"
                        type="datetime-local"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g., Yaounde, Cameroon"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Required Skills *</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="e.g., Teaching experience"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleAddSkill()
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleAddSkill}
                        disabled={!newSkill.trim()}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {formData.requiredSkills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.requiredSkills.map((skill, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                          >
                            <span>{skill}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(skill)}
                              className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push('/organization/volunteer-opportunities')}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Creating..." : "Create Opportunity"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
} 