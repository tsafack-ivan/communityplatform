"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, Share2 } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface CampaignCardProps {
  title: string
  ngo: string
  description: string
  imageSrc: string
  raised: number
  goal: number
  daysLeft: number
  category: string
}

export function CampaignCard({
  title,
  ngo,
  description,
  imageSrc,
  raised,
  goal,
  daysLeft,
  category,
}: CampaignCardProps) {
  const [isSaved, setIsSaved] = useState(false)
  const progress = Math.round((raised / goal) * 100)

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <img src={imageSrc || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
        <Badge className="absolute top-3 left-3 bg-blue-600">{category}</Badge>
      </div>
      <CardContent className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-bold mb-1 line-clamp-1">{title}</h3>
          <p className="text-sm text-gray-500">by {ngo}</p>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">${raised.toLocaleString()}</span>
            <span className="text-gray-500">of ${goal.toLocaleString()}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="text-blue-600 font-medium">{progress}% funded</span>
            <span className="text-gray-500">{daysLeft} days left</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 flex justify-between">
        <Link href={`/campaigns/${encodeURIComponent(title.toLowerCase().replace(/ /g, "-"))}`}>
          <Button className="bg-blue-600 hover:bg-blue-700">Donate Now</Button>
        </Link>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSaved(!isSaved)}
            className={isSaved ? "text-red-500" : "text-gray-500"}
          >
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
