'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    // Redirect based on user role
    switch (userRole?.toLowerCase()) {
      case 'organization':
        router.push('/organization/dashboard');
        break;
      case 'donor':
        router.push('/donor/dashboard');
        break;
      case 'volunteer':
        router.push('/volunteer/dashboard');
        break;
      case 'admin':
        router.push('/admin/dashboard');
        break;
      default:
        router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-lg">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
} 