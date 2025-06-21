"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AdminMap() {
  const [mapView, setMapView] = useState("ngos")
  const [region, setRegion] = useState("global")

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs defaultValue="ngos" onValueChange={setMapView} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="ngos">NGOs</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
          </TabsList>
        </Tabs>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="global">Global</SelectItem>
            <SelectItem value="africa">Africa</SelectItem>
            <SelectItem value="asia">Asia</SelectItem>
            <SelectItem value="europe">Europe</SelectItem>
            <SelectItem value="namerica">North America</SelectItem>
            <SelectItem value="samerica">South America</SelectItem>
            <SelectItem value="oceania">Oceania</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative h-[300px] w-full rounded-md border bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=300&width=600')] opacity-50 bg-cover bg-center"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-4 bg-white/80 rounded-lg shadow-sm">
            <p className="font-medium text-gray-900">Interactive Map</p>
            <p className="text-sm text-gray-500">
              Showing{" "}
              {mapView === "ngos"
                ? "NGO distribution"
                : mapView === "donations"
                  ? "donation amounts"
                  : "impact metrics"}
              {region !== "global" ? ` in ${getRegionName(region)}` : " globally"}
            </p>
          </div>
        </div>

        {/* Map markers - these would be positioned based on real data */}
        <div className="absolute top-[30%] left-[20%] h-3 w-3 rounded-full bg-blue-600 shadow-md"></div>
        <div className="absolute top-[40%] left-[30%] h-4 w-4 rounded-full bg-blue-600 shadow-md"></div>
        <div className="absolute top-[25%] left-[50%] h-5 w-5 rounded-full bg-blue-600 shadow-md"></div>
        <div className="absolute top-[60%] left-[70%] h-3 w-3 rounded-full bg-blue-600 shadow-md"></div>
        <div className="absolute top-[45%] left-[80%] h-4 w-4 rounded-full bg-blue-600 shadow-md"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-md border p-3 text-center">
          <div className="text-sm text-gray-500">Africa</div>
          <div className="text-lg font-medium text-blue-600">
            {mapView === "ngos" ? "78 NGOs" : mapView === "donations" ? "$245K" : "12K people"}
          </div>
        </div>
        <div className="rounded-md border p-3 text-center">
          <div className="text-sm text-gray-500">Asia</div>
          <div className="text-lg font-medium text-blue-600">
            {mapView === "ngos" ? "156 NGOs" : mapView === "donations" ? "$680K" : "45K people"}
          </div>
        </div>
        <div className="rounded-md border p-3 text-center">
          <div className="text-sm text-gray-500">Europe</div>
          <div className="text-lg font-medium text-blue-600">
            {mapView === "ngos" ? "124 NGOs" : mapView === "donations" ? "$520K" : "28K people"}
          </div>
        </div>
        <div className="rounded-md border p-3 text-center">
          <div className="text-sm text-gray-500">Americas</div>
          <div className="text-lg font-medium text-blue-600">
            {mapView === "ngos" ? "154 NGOs" : mapView === "donations" ? "$655K" : "32K people"}
          </div>
        </div>
      </div>
    </div>
  )
}

function getRegionName(region: string): string {
  switch (region) {
    case "africa":
      return "Africa"
    case "asia":
      return "Asia"
    case "europe":
      return "Europe"
    case "namerica":
      return "North America"
    case "samerica":
      return "South America"
    case "oceania":
      return "Oceania"
    default:
      return "Global"
  }
}
