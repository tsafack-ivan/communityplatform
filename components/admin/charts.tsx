"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AdminCharts() {
  const [timeRange, setTimeRange] = useState("30days")
  const [chartType, setChartType] = useState("donations")

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs defaultValue="donations" onValueChange={setChartType} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>
        </Tabs>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[350px] w-full rounded-md border p-4">
        {chartType === "donations" && <DonationsChart timeRange={timeRange} />}
        {chartType === "users" && <UsersChart timeRange={timeRange} />}
        {chartType === "campaigns" && <CampaignsChart timeRange={timeRange} />}
      </div>
    </div>
  )
}

function DonationsChart({ timeRange }: { timeRange: string }) {
  // In a real application, this would be a chart component using a library like recharts
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">Donation Trends</div>
        <p className="text-gray-500">Showing donation data for {getTimeRangeLabel(timeRange)}</p>
      </div>
      <div className="mt-8 h-[200px] w-full bg-gradient-to-r from-blue-100 to-blue-50 rounded-md relative">
        {/* This would be replaced with an actual chart */}
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-blue-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-[10%] w-[5px] h-[30%] bg-blue-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[20%] w-[5px] h-[45%] bg-blue-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[30%] w-[5px] h-[25%] bg-blue-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[40%] w-[5px] h-[60%] bg-blue-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[50%] w-[5px] h-[40%] bg-blue-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[60%] w-[5px] h-[70%] bg-blue-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[70%] w-[5px] h-[50%] bg-blue-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[80%] w-[5px] h-[65%] bg-blue-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[90%] w-[5px] h-[80%] bg-blue-600 rounded-t-md"></div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 w-full">
        <Card className="p-4 text-center">
          <div className="text-sm text-gray-500">Total Donations</div>
          <div className="text-xl font-bold text-blue-600">$2.1M</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-sm text-gray-500">Average Donation</div>
          <div className="text-xl font-bold text-blue-600">$85</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-sm text-gray-500">Donation Growth</div>
          <div className="text-xl font-bold text-green-600">+24%</div>
        </Card>
      </div>
    </div>
  )
}

function UsersChart({ timeRange }: { timeRange: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">User Growth</div>
        <p className="text-gray-500">Showing user data for {getTimeRangeLabel(timeRange)}</p>
      </div>
      <div className="mt-8 h-[200px] w-full bg-gradient-to-r from-blue-100 to-blue-50 rounded-md relative">
        {/* This would be replaced with an actual chart */}
        <div className="absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-green-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-[10%] w-[5px] h-[20%] bg-green-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[20%] w-[5px] h-[25%] bg-green-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[30%] w-[5px] h-[30%] bg-green-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[40%] w-[5px] h-[35%] bg-green-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[50%] w-[5px] h-[40%] bg-green-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[60%] w-[5px] h-[45%] bg-green-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[70%] w-[5px] h-[50%] bg-green-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[80%] w-[5px] h-[55%] bg-green-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[90%] w-[5px] h-[60%] bg-green-600 rounded-t-md"></div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 w-full">
        <Card className="p-4 text-center">
          <div className="text-sm text-gray-500">Total Users</div>
          <div className="text-xl font-bold text-blue-600">4,612</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-sm text-gray-500">New Users</div>
          <div className="text-xl font-bold text-blue-600">342</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-sm text-gray-500">User Growth</div>
          <div className="text-xl font-bold text-green-600">+18%</div>
        </Card>
      </div>
    </div>
  )
}

function CampaignsChart({ timeRange }: { timeRange: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">Campaign Performance</div>
        <p className="text-gray-500">Showing campaign data for {getTimeRangeLabel(timeRange)}</p>
      </div>
      <div className="mt-8 h-[200px] w-full bg-gradient-to-r from-blue-100 to-blue-50 rounded-md relative">
        {/* This would be replaced with an actual chart */}
        <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-purple-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-[10%] w-[5px] h-[40%] bg-purple-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[20%] w-[5px] h-[30%] bg-purple-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[30%] w-[5px] h-[50%] bg-purple-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[40%] w-[5px] h-[20%] bg-purple-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[50%] w-[5px] h-[60%] bg-purple-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[60%] w-[5px] h-[45%] bg-purple-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[70%] w-[5px] h-[35%] bg-purple-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[80%] w-[5px] h-[55%] bg-purple-600 rounded-t-md"></div>
        <div className="absolute bottom-0 left-[90%] w-[5px] h-[40%] bg-purple-600 rounded-t-md"></div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 w-full">
        <Card className="p-4 text-center">
          <div className="text-sm text-gray-500">Active Campaigns</div>
          <div className="text-xl font-bold text-blue-600">187</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-sm text-gray-500">Success Rate</div>
          <div className="text-xl font-bold text-blue-600">76%</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-sm text-gray-500">Avg. Funding</div>
          <div className="text-xl font-bold text-blue-600">$11,250</div>
        </Card>
      </div>
    </div>
  )
}

function getTimeRangeLabel(timeRange: string): string {
  switch (timeRange) {
    case "7days":
      return "the last 7 days"
    case "30days":
      return "the last 30 days"
    case "90days":
      return "the last 90 days"
    case "year":
      return "the last year"
    default:
      return "the selected period"
  }
}
