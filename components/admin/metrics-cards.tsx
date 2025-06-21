import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Building, DollarSign, TrendingUp, Users } from "lucide-react"

export function AdminMetricsCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total NGOs</p>
              <p className="text-3xl font-bold text-gray-900">79</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-500">
            <TrendingUp className="mr-1 h-4 w-4" />
            <span>12% increase this month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Donors</p>
              <p className="text-3xl font-bold text-gray-900">845</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-500">
            <TrendingUp className="mr-1 h-4 w-4" />
            <span>18% increase this month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Donations</p>
              <p className="text-3xl font-bold text-gray-900">$265K</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-500">
            <TrendingUp className="mr-1 h-4 w-4" />
            <span>24% increase this month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Campaigns</p>
              <p className="text-3xl font-bold text-gray-900">42</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-500">
            <TrendingUp className="mr-1 h-4 w-4" />
            <span>8% increase this month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
