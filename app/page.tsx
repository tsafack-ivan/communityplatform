import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { Heart, Users, Target, ArrowRight } from "lucide-react"

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
                  <Button  variant="secondary" className="font-semibold">
                    Register as NGO
                  </Button>
                </Link>
                <Link href="/register?type=donor">
                  <Button
                   
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

        {/* Featured NGOs Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured NGOs Making a Difference
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover verified organizations working tirelessly to create positive change in communities across Cameroon.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Organizations</h3>
                <p className="text-gray-600">
                  All NGOs on our platform are thoroughly vetted and approved to ensure transparency and trust.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Impact Tracking</h3>
                <p className="text-gray-600">
                  Monitor the real impact of your donations with detailed progress reports and success stories.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Support</h3>
                <p className="text-gray-600">
                  Join a community of donors and volunteers working together to create lasting positive change.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <Link href="/ngos">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  Browse All NGOs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Whether you want to support existing causes or start your own campaign, we're here to help you create positive change.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/campaigns">
                <Button variant="secondary" className="font-semibold">
                  Explore Campaigns
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" className="text-white border-white hover:bg-blue-700 font-semibold">
                  Get Started Today
                </Button>
              </Link>
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
