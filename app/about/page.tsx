"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Users, Globe, Shield } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">About MyCharityApp</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Connecting donors with impactful causes and empowering NGOs to make a difference in communities worldwide.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <Heart className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To create a world where every act of kindness is amplified through technology, making charitable giving accessible, transparent, and impactful.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Users className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To be the leading platform that connects donors with verified NGOs, fostering sustainable social impact and community development.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Globe className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Global Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Supporting causes across education, healthcare, environmental conservation, and community development worldwide.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Trust & Transparency</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Ensuring every donation is tracked, verified, and making a real difference in the lives of those in need.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mt-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">For Donors</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 mr-2 text-primary" />
              Discover verified and impactful causes
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 mr-2 text-primary" />
              Track your donations and impact
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 mr-2 text-primary" />
              Receive regular updates on your contributions
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 mr-2 text-primary" />
              Access detailed impact reports
            </li>
          </ul>
          <Button asChild className="mt-4">
            <Link href="/campaigns">Explore Campaigns</Link>
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">For NGOs</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 mr-2 text-primary" />
              Create and manage fundraising campaigns
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 mr-2 text-primary" />
              Access a global network of donors
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 mr-2 text-primary" />
              Track and report impact metrics
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 mr-2 text-primary" />
              Build trust through transparency
            </li>
          </ul>
          <Button asChild className="mt-4">
            <Link href="/ngo/register">Register Your NGO</Link>
          </Button>
        </div>
      </div>

      <div className="mt-12 text-center space-y-4">
        <h2 className="text-2xl font-bold">Join Our Community</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Be part of a global movement to create positive change. Whether you're a donor looking to make an impact or an NGO seeking support, we're here to help you achieve your goals.
        </p>
        <div className="flex gap-4 justify-center mt-6">
          <Button asChild variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 