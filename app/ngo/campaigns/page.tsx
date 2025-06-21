import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

// This will be replaced with actual data fetching from your database
const mockCampaigns = [
  {
    id: '1',
    title: 'Education for All',
    description: 'Help provide education to underprivileged children',
    targetAmount: 50000,
    currentAmount: 25000,
    startDate: '2024-03-01',
    endDate: '2024-06-01',
    status: 'active'
  },
  {
    id: '2',
    title: 'Clean Water Initiative',
    description: 'Bringing clean water to rural communities',
    targetAmount: 75000,
    currentAmount: 15000,
    startDate: '2024-03-15',
    endDate: '2024-07-15',
    status: 'active'
  }
];

function CampaignsList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockCampaigns.map((campaign) => (
        <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{campaign.title}</CardTitle>
            <CardDescription>
              Status: <span className="capitalize">{campaign.status}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">{campaign.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Target Amount:</span>
                <span>${campaign.targetAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Current Amount:</span>
                <span>${campaign.currentAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Progress:</span>
                <span>{Math.round((campaign.currentAmount / campaign.targetAmount) * 100)}%</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href={`/ngo/campaigns/${campaign.id}`}>View Details</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href={`/ngo/campaigns/${campaign.id}/edit`}>Edit</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="h-10 bg-gray-200 rounded w-24"></div>
            <div className="h-10 bg-gray-200 rounded w-20"></div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default function NGOCampaignsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <Button asChild>
          <Link href="/ngo/campaigns/create">Create New Campaign</Link>
        </Button>
      </div>

      <Suspense fallback={<LoadingState />}>
        <CampaignsList />
      </Suspense>

      {mockCampaigns.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
          <p className="text-gray-500 mb-4">Create your first campaign to start raising funds</p>
          <Button asChild>
            <Link href="/ngo/campaigns/create">Create Campaign</Link>
          </Button>
        </div>
      )}
    </div>
  );
} 