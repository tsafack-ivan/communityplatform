'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardNav } from '@/components/dashboard-nav';
import { Home, Plus, Users, DollarSign, Target, Heart, CheckCircle2, XCircle, BarChart3, Calendar, Settings, Bell, FileText, UserPlus } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Campaign {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  endDate: string;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  image?: string;
}

interface Analytics {
  totalDonations: number;
  totalDonors: number;
  activeCampaigns: number;
  totalRaised: number;
}

interface OrganizationData {
  id: string;
  name: string;
  description: string;
  logo?: string;
  website?: string;
}

interface Donation {
  id: string;
  amount: number;
  message?: string;
  createdAt: string;
  donor: {
    name: string;
  };
  campaign: {
    title: string;
  };
}

interface VolunteerApplication {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
  opportunity: {
    title: string;
  };
}

export default function OrganizationDashboard() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalDonations: 0,
    totalDonors: 0,
    activeCampaigns: 0,
    totalRaised: 0,
  });
  const [organization, setOrganization] = useState<OrganizationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentDonations, setRecentDonations] = useState<Donation[]>([]);
  const [volunteerApplications, setVolunteerApplications] = useState<VolunteerApplication[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch organization data
        const orgResponse = await fetch('/api/organization', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!orgResponse.ok) {
          if (orgResponse.status === 404) {
            router.push('/organization/setup');
            return;
          }
          throw new Error('Failed to fetch organization data');
        }

        const orgData = await orgResponse.json();
        setOrganization(orgData);

        // Fetch campaigns
        const campaignsResponse = await fetch('/api/organization/campaigns', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (campaignsResponse.ok) {
          const campaignsData = await campaignsResponse.json();
          setCampaigns(campaignsData);
        }

        // Fetch analytics
        const analyticsResponse = await fetch('/api/organization/analytics', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (analyticsResponse.ok) {
          const analyticsData = await analyticsResponse.json();
          setAnalytics(analyticsData);
        }

        // Fetch recent donations
        const donationsResponse = await fetch('/api/organization/donations', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (donationsResponse.ok) {
          const donationsData = await donationsResponse.json();
          setRecentDonations(donationsData.slice(0, 5)); // Get only 5 most recent donations
        }

        // Fetch volunteer applications
        const applicationsResponse = await fetch('/api/organization/volunteer-applications', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (applicationsResponse.ok) {
          const applicationsData = await applicationsResponse.json();
          setVolunteerApplications(applicationsData.slice(0, 5)); // Get only 5 most recent applications
        }

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <DashboardHeader heading="Organization Dashboard" text="Loading..." />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <DashboardHeader heading="Organization Dashboard" text="Error" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="flex min-h-screen flex-col">
        <DashboardHeader heading="Organization Dashboard" text="Setup Required" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Complete Your Organization Profile</h2>
            <p className="text-gray-600 mb-6">Please set up your organization profile to access the dashboard.</p>
            <Button onClick={() => router.push('/organization/setup')}>
              Set Up Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader 
        heading="Organization Dashboard" 
        text="Manage your campaigns and track your impact"
        userType="organization"
        userName={organization.name}
      />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-gray-50 lg:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <DashboardNav userType="ngo" />
          </div>
        </aside>
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => router.push('/campaigns/new')}>
                <Plus className="h-6 w-6" />
                <span>New Campaign</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => router.push('/organization/volunteers')}>
                <UserPlus className="h-6 w-6" />
                <span>Manage Volunteers</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => router.push('/organization/settings')}>
                <Settings className="h-6 w-6" />
                <span>Organization Settings</span>
              </Button>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${typeof analytics.totalRaised === 'number' ? analytics.totalRaised.toLocaleString() : '0'}</div>
                  <p className="text-xs text-muted-foreground">Across all campaigns</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.activeCampaigns}</div>
                  <p className="text-xs text-muted-foreground">Currently running</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalDonors}</div>
                  <p className="text-xs text-muted-foreground">Unique contributors</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalDonations}</div>
                  <p className="text-xs text-muted-foreground">All time donations</p>
                </CardContent>
              </Card>
            </div>

            {/* Campaign Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Monthly donation trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                    <p>Campaign performance data will be displayed here</p>
                    <p className="text-sm">Coming soon: Interactive charts and analytics</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Active Campaigns */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Active Campaigns</CardTitle>
                      <CardDescription>Your currently running campaigns</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => router.push('/campaigns/new')}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Campaign
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaigns.filter(c => c.status === 'ACTIVE').map((campaign) => (
                      <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <h3 className="font-medium">{campaign.title}</h3>
                          <p className="text-sm text-gray-500">{campaign.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              ${typeof campaign.currentAmount === 'number' ? campaign.currentAmount.toLocaleString() : '0'} raised
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Target: ${typeof campaign.targetAmount === 'number' ? campaign.targetAmount.toLocaleString() : '0'}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Ends: {format(new Date(campaign.endDate), 'MMM d, yyyy')}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => router.push(`/campaigns/${campaign.id}`)}>
                            View Details
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => router.push(`/campaigns/${campaign.id}/edit`)}>
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                    {campaigns.filter(c => c.status === 'ACTIVE').length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        No active campaigns
                        <Button variant="link" onClick={() => router.push('/campaigns/new')}>
                          Create your first campaign
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Donations */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Donations</CardTitle>
                      <CardDescription>Latest contributions to your campaigns</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => router.push('/organization/donations')}>
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentDonations.map((donation) => (
                      <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">${typeof donation.amount === 'number' ? donation.amount.toLocaleString() : '0'}</span>
                            <span className="text-sm text-gray-500">by {donation.donor.name}</span>
                          </div>
                          <p className="text-sm text-gray-500">{donation.campaign.title}</p>
                          {donation.message && (
                            <p className="text-sm text-gray-500 italic">"{donation.message}"</p>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {format(new Date(donation.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                    ))}
                    {recentDonations.length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        No recent donations
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Volunteer Applications */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Volunteer Applications</CardTitle>
                      <CardDescription>Recent volunteer applications</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => router.push('/organization/volunteers')}>
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {volunteerApplications.map((application) => (
                      <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <h3 className="font-medium">{application.name}</h3>
                          <p className="text-sm text-gray-500">{application.opportunity.title}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant={application.status === 'pending' ? 'outline' : 
                                          application.status === 'approved' ? 'success' : 'destructive'}>
                              {application.status}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {format(new Date(application.appliedAt), 'MMM d, yyyy')}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleApplicationAction(application.id, 'approve')}>
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleApplicationAction(application.id, 'reject')}>
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {volunteerApplications.length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        No pending applications
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Impact Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Impact Metrics</CardTitle>
                  <CardDescription>Your organization's impact on the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">500+</div>
                        <p className="text-sm text-gray-500">People Helped</p>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">25</div>
                        <p className="text-sm text-gray-500">Communities Served</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Recent Impact Stories</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm">"Your clean water campaign has provided safe drinking water to 200 families in rural areas."</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm">"The education fund has helped 50 children return to school this year."</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => router.push('/organization/impact')}>
                      View Full Impact Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper function to handle volunteer application actions
async function handleApplicationAction(applicationId: string, action: 'approve' | 'reject') {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    const response = await fetch(`/api/organization/volunteer-applications/${applicationId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: action === 'approve' ? 'approved' : 'rejected' }),
    });

    if (!response.ok) {
      throw new Error('Failed to update application status');
    }

    toast.success(`Application ${action}ed successfully`);
    // Refresh the page to show updated data
    window.location.reload();
  } catch (error) {
    console.error('Error updating application:', error);
    toast.error('Failed to update application status');
  }
} 