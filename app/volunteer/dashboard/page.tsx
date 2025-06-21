'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Clock, AlertCircle } from 'lucide-react';

interface VolunteerOpportunity {
  id: string;
  title: string;
  organization: {
    name: string;
  };
  date: string;
  status: string;
}

export default function VolunteerDashboard() {
  const router = useRouter();
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Debug token

        if (!token) {
          console.log('No token found, redirecting to login');
          router.push('/login');
          return;
        }

        const response = await fetch('/api/volunteer/opportunities', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log('Response status:', response.status); // Debug response status
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error response:', errorData); // Debug error response
          throw new Error(errorData.error || 'Failed to fetch opportunities');
        }
        
        const data = await response.json();
        console.log('Fetched data:', data); // Debug fetched data
        setOpportunities(data);
      } catch (err) {
        console.error('Detailed error:', err); // Debug detailed error
        setError('Failed to load volunteer opportunities');
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Volunteer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Upcoming Events</p>
              <p className="text-2xl font-bold">{opportunities.filter(o => o.status === 'upcoming').length}</p>
            </div>
            <Calendar className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Organizations</p>
              <p className="text-2xl font-bold">
                {new Set(opportunities.map(o => o.organization.name)).size}
              </p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Hours Volunteered</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <Clock className="h-8 w-8 text-primary" />
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Upcoming Opportunities</h2>
          <Button onClick={() => router.push('/volunteer/opportunities')}>
            View All
          </Button>
        </div>

        {opportunities.length === 0 ? (
          <Card className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No upcoming volunteer opportunities</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => router.push('/volunteer/opportunities')}
            >
              Find Opportunities
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4">
            {opportunities.slice(0, 5).map((opportunity) => (
              <Card key={opportunity.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{opportunity.title}</h3>
                    <p className="text-sm text-gray-500">
                      {opportunity.organization.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{opportunity.date}</p>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {opportunity.status}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 