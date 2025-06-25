"use client";

import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

function CampaignsList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/campaigns', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch campaigns');
        }
        const data = await response.json();
        setCampaigns(data);
      } catch (err) {
        setError('Failed to load campaigns');
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (campaigns.length === 0) return <div className="text-center py-12">No campaigns found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{campaign.title}</CardTitle>
            <CardDescription>
              Status: <span className="capitalize">{campaign.status?.toLowerCase() || 'active'}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">{campaign.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Target Amount:</span>
                <span>{campaign.targetAmount?.toLocaleString?.() || campaign.targetAmount} FCFA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Current Amount:</span>
                <span>{campaign.currentAmount?.toLocaleString?.() || campaign.currentAmount} FCFA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Progress:</span>
                <span>{campaign.targetAmount ? Math.round((campaign.currentAmount / campaign.targetAmount) * 100) : 0}%</span>
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
    </div>
  );
} 