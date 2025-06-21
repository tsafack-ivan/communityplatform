"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, DollarSign, Gift, Users, BarChart3, TrendingUp } from 'lucide-react';

interface Donation {
  id: string;
  amount: number;
  campaign: {
    title: string;
    organization: {
      name: string;
    };
  };
  createdAt: string;
}

export default function DonorDashboard() {
  const router = useRouter();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchDonations = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/donations/my-donations', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch donations');
        }

        const data = await response.json();
        setDonations(data);
      } catch (error) {
        console.error('Error fetching donations:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${donations.reduce((sum, donation) => sum + donation.amount, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campaigns Supported</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(donations.map(d => d.campaign.title)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Across different causes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              Top 15% of donors
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Impact Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Impact Overview</CardTitle>
          <CardDescription>Your donations are making a difference</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Lives Impacted</p>
                  <p className="text-2xl font-bold">1,250+</p>
                </div>
                <div className="rounded-full bg-green-100 p-3">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Growth Rate</p>
                  <p className="text-2xl font-bold">+15%</p>
                </div>
                <div className="rounded-full bg-blue-100 p-3">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Impact by Category</h3>
              {[
                { category: "Healthcare", percentage: 35, amount: "4,375 FCFA" },
                { category: "Education", percentage: 25, amount: "3,125 FCFA" },
                { category: "Environment", percentage: 20, amount: "2,500 FCFA" },
                { category: "Food Security", percentage: 15, amount: "1,875 FCFA" },
                { category: "Other", percentage: 5, amount: "625 FCFA" }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm text-gray-500">{item.amount}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Donations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
          <CardDescription>Your latest contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {donations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No donations yet. Start supporting causes you care about!
              </div>
            ) : (
              donations.map((donation) => (
                <div key={donation.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">{donation.campaign.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {donation.campaign.organization.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-blue-600">
                      ${donation.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Button 
          className="w-full" 
          onClick={() => router.push('/donor/explore')}
        >
          <Heart className="mr-2 h-4 w-4" />
          Explore New Causes
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => router.push('/donor/impact')}
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          View Detailed Impact
        </Button>
      </div>
    </div>
  );
}
