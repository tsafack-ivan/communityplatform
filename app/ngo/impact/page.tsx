"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Heart, BookOpen, Home } from "lucide-react"

export default function NGOImpact() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <DashboardHeader
        heading="Impact Report"
        text="Track and measure your organization's impact"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Beneficiaries</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +12% from last quarter
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Impact</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              Improved health outcomes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Education Impact</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              Improved literacy rates
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Housing Impact</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              Improved living conditions
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="housing">Housing</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Impact Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Key Achievements</h3>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Provided healthcare to 500+ individuals</li>
                      <li>Built 3 new schools in rural areas</li>
                      <li>Renovated 25 homes for families in need</li>
                      <li>Distributed 1,000+ educational materials</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Community Impact</h3>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>85% improvement in community health</li>
                      <li>92% increase in school attendance</li>
                      <li>78% improvement in living conditions</li>
                      <li>95% community satisfaction rate</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="health" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Healthcare Services</h3>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>500+ medical consultations</li>
                      <li>200+ vaccinations administered</li>
                      <li>50+ health awareness campaigns</li>
                      <li>25+ mobile health clinics</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Health Outcomes</h3>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>85% reduction in preventable diseases</li>
                      <li>90% increase in health awareness</li>
                      <li>75% improvement in maternal health</li>
                      <li>80% increase in child vaccination rates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Education Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Educational Programs</h3>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>3 new schools built</li>
                      <li>1,000+ students enrolled</li>
                      <li>50+ teachers trained</li>
                      <li>1,000+ educational materials distributed</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Learning Outcomes</h3>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>92% increase in literacy rates</li>
                      <li>85% improvement in test scores</li>
                      <li>90% increase in school attendance</li>
                      <li>88% parent satisfaction rate</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="housing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Housing Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Housing Projects</h3>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>25 homes renovated</li>
                      <li>10 new homes built</li>
                      <li>50+ families assisted</li>
                      <li>100+ volunteers engaged</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Living Conditions</h3>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>78% improvement in living conditions</li>
                      <li>85% increase in safety standards</li>
                      <li>90% improvement in sanitation</li>
                      <li>82% family satisfaction rate</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 