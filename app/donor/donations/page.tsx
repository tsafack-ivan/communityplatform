import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Download, Filter } from "lucide-react"

export default function DonationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader heading="My Donations" text="Welcome, John Smith!" />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-gray-50 lg:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <DashboardNav userType="donor" />
          </div>
        </aside>
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Donations</h1>
              <p className="text-gray-500">View your donation history and download receipts.</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline">Export</Button>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Donated</p>
                <p className="text-2xl font-bold text-gray-900">12,500 FCFA</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  ngo: "Global Health Initiative",
                  campaign: "Clean Water Initiative",
                  amount: "1,000 FCFA",
                  date: "2025-06-01",
                  status: "Processed",
                  receipt: true
                },
                {
                  ngo: "Education for All",
                  campaign: "School Building Project",
                  amount: "750 FCFA",
                  date: "2025-05-15",
                  status: "Processed",
                  receipt: true
                },
                {
                  ngo: "Global Health Initiative",
                  campaign: "Medical Supplies for Rural Clinics",
                  amount: "500 FCFA",
                  date: "2025-04-22",
                  status: "Processed",
                  receipt: true
                },
                {
                  ngo: "Food Security Alliance",
                  campaign: "Emergency Food Relief",
                  amount: "2,000 FCFA",
                  date: "2025-03-10",
                  status: "Processed",
                  receipt: true
                },
                {
                  ngo: "Wildlife Conservation",
                  campaign: "Species Protection Program",
                  amount: "1,500 FCFA",
                  date: "2025-02-28",
                  status: "Processed",
                  receipt: true
                }
              ].map((donation, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{donation.ngo}</p>
                        <p className="text-sm text-gray-500">{donation.campaign}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-blue-600">{donation.amount}</p>
                        <p className="text-sm text-gray-500">{donation.date}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Badge variant="outline" className="text-green-600 bg-green-50">
                        {donation.status}
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-blue-600">
                        <Download className="mr-2 h-4 w-4" />
                        Download Receipt
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 