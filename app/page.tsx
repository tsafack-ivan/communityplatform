import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { Heart } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section with the charity image as background */}
        <section className="relative min-h-[90vh] flex items-center">
          {/* Background image with overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage: "url('/images/charity-donation.png')",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-blue-900/70"></div>
          </div>

          {/* Content */}
          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-3xl text-center mx-auto text-white">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl mb-6">
                Connecting Hearts, Changing Lives
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Our platform brings together NGOs, donors, and volunteers to make a meaningful impact in communities
                across Cameroon.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/register?type=ngo">
                  <Button size="lg" variant="secondary" className="font-semibold">
                    Register as NGO
                  </Button>
                </Link>
                <Link href="/register?type=donor">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white border-white hover:bg-blue-700 font-semibold"
                  >
                    Become a Donor
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center gap-8 pt-8">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-white">500+</span>
                  <span className="text-blue-100">NGOs</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-white">$2M+</span>
                  <span className="text-blue-100">Donations</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-white">10K+</span>
                  <span className="text-blue-100">Volunteers</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Heart className="h-6 w-6 text-blue-400" />
              <h3 className="font-bold text-lg">Community Charity Platform</h3>
            </div>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">© 2025 Community Charity Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
