import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Building, Heart, HandHelping } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  name: string
  role: string
  avatarSrc: string
  type: "ngo" | "donor" | "volunteer"
}

export function TestimonialCard({ quote, name, role, avatarSrc, type }: TestimonialCardProps) {
  const typeConfig = {
    ngo: {
      icon: <Building className="h-4 w-4" />,
      label: "NGO",
      color: "bg-blue-100 text-blue-800",
    },
    donor: {
      icon: <Heart className="h-4 w-4" />,
      label: "Donor",
      color: "bg-green-100 text-green-800",
    },
    volunteer: {
      icon: <HandHelping className="h-4 w-4" />,
      label: "Volunteer",
      color: "bg-purple-100 text-purple-800",
    },
  }

  const { icon, label, color } = typeConfig[type]

  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex-1">
          <div className="mb-6">
            <svg className="h-8 w-8 text-blue-600 opacity-50" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
          </div>
          <p className="text-gray-600 mb-6">{quote}</p>
        </div>
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
          <div className="ml-auto">
            <Badge variant="outline" className={`flex items-center gap-1 ${color}`}>
              {icon}
              {label}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
