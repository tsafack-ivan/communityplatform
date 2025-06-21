'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface Report {
  donations: {
    totalAmount: number;
    totalDonations: number;
  };
  campaigns: {
    totalCampaigns: number;
  };
  volunteers: {
    totalApplications: number;
  };
  events: {
    totalEvents: number;
  };
}

export default function ReportsPage() {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/organization/reports', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setReport(data);
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!report) {
    return <div>No data available</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Organization Reports</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(report.donations.totalAmount)}</p>
            <p className="text-sm text-gray-500">Total Donations: {report.donations.totalDonations}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{report.campaigns.totalCampaigns}</p>
            <p className="text-sm text-gray-500">Active Campaigns</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Volunteers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{report.volunteers.totalApplications}</p>
            <p className="text-sm text-gray-500">Total Applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{report.events.totalEvents}</p>
            <p className="text-sm text-gray-500">Total Events</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Donation Performance</h3>
                <p>Average donation amount: {formatCurrency(report.donations.totalAmount / (report.donations.totalDonations || 1))}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Campaign Engagement</h3>
                <p>Average donations per campaign: {(report.donations.totalDonations / (report.campaigns.totalCampaigns || 1)).toFixed(1)}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Volunteer Engagement</h3>
                <p>Average applications per campaign: {(report.volunteers.totalApplications / (report.campaigns.totalCampaigns || 1)).toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 