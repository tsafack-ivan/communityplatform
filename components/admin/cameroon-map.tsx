"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CameroonMap() {
  const [mapView, setMapView] = useState("ngos")
  const [region, setRegion] = useState("all")

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
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="centre">Centre</SelectItem>
            <SelectItem value="littoral">Littoral</SelectItem>
            <SelectItem value="northwest">Northwest</SelectItem>
            <SelectItem value="southwest">Southwest</SelectItem>
            <SelectItem value="west">West</SelectItem>
            <SelectItem value="east">East</SelectItem>
            <SelectItem value="adamawa">Adamawa</SelectItem>
            <SelectItem value="north">North</SelectItem>
            <SelectItem value="farNorth">Far North</SelectItem>
            <SelectItem value="south">South</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative h-[300px] w-full rounded-md border bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=300&width=600')] opacity-50 bg-cover bg-center"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-4 bg-white/80 rounded-lg shadow-sm">
            <p className="font-medium text-gray-900">Cameroon Map</p>
            <p className="text-sm text-gray-500">
              Showing{" "}
              {mapView === "ngos"
                ? "NGO distribution"
                : mapView === "donations"
                  ? "donation amounts"
                  : "impact metrics"}
              {region !== "all" ? ` in ${getRegionName(region)} region` : " across Cameroon"}
            </p>
          </div>
        </div>

        {/* Map markers - these would be positioned based on real data */}
        <div className="absolute top-[30%] left-[40%] h-3 w-3 rounded-full bg-blue-600 shadow-md"></div>
        <div className="absolute top-[40%] left-[50%] h-4 w-4 rounded-full bg-blue-600 shadow-md"></div>
        <div className="absolute top-[25%] left-[45%] h-5 w-5 rounded-full bg-blue-600 shadow-md"></div>
        <div className="absolute top-[60%] left-[35%] h-3 w-3 rounded-full bg-blue-600 shadow-md"></div>
        <div className="absolute top-[45%] left-[30%] h-4 w-4 rounded-full bg-blue-600 shadow-md"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="rounded-md border p-3 text-center">
          <div className="text-sm text-gray-500">Centre</div>
          <div className="text-lg font-medium text-blue-600">
            {mapView === "ngos" ? "24 NGOs" : mapView === "donations" ? "$85K" : "12K people"}
          </div>
        </div>
        <div className="rounded-md border p-3 text-center">
          <div className="text-sm text-gray-500">Littoral</div>
          <div className="text-lg font-medium text-blue-600">
            {mapView === "ngos" ? "18 NGOs" : mapView === "donations" ? "$65K" : "9K people"}
          </div>
        </div>
        <div className="rounded-md border p-3 text-center">
          <div className="text-sm text-gray-500">Northwest</div>
          <div className="text-lg font-medium text-blue-600">
            {mapView === "ngos" ? "15 NGOs" : mapView === "donations" ? "$42K" : "7K people"}
          </div>
        </div>
        <div className="rounded-md border p-3 text-center">
          <div className="text-sm text-gray-500">Southwest</div>
          <div className="text-lg font-medium text-blue-600">
            {mapView === "ngos" ? "12 NGOs" : mapView === "donations" ? "$38K" : "6K people"}
          </div>
        </div>
        <div className="rounded-md border p-3 text-center">
          <div className="text-sm text-gray-500">West</div>
          <div className="text-lg font-medium text-blue-600">
            {mapView === "ngos" ? "10 NGOs" : mapView === "donations" ? "$35K" : "5K people"}
          </div>
        </div>
      </div>
    </div>
  )
}

function getRegionName(region: string): string {
  switch (region) {
    case "centre":
      return "Centre"
    case "littoral":
      return "Littoral"
    case "northwest":
      return "Northwest"
    case "southwest":
      return "Southwest"
    case "west":
      return "West"
    case "east":
      return "East"
    case "adamawa":
      return "Adamawa"
    case "north":
      return "North"
    case "farNorth":
      return "Far North"
    case "south":
      return "South"
    default:
      return "All Regions"
  }
}
