"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store user name in localStorage
      localStorage.setItem('userName', data.user.name || '');

      await login(data.token);
      
      // Redirect based on user role
      switch (data.user.role) {
        case 'ORGANIZATION':
          router.push('/organization/dashboard');
          break;
        case 'DONOR':
          router.push('/donor/dashboard');
          break;
        case 'VOLUNTEER':
          router.push('/volunteer/dashboard');
          break;
        case 'ADMIN':
          router.push('/admin/dashboard');
          break;
        default:
          router.push('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6" />
            <h1 className="text-xl font-bold">Community Charity Platform</h1>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 bg-gray-50" style={{ backgroundImage: 'url(/images/charity-background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-lg">
          <Card className="w-full max-w-md shadow-none bg-transparent">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-600">Welcome Back</CardTitle>
              <CardDescription>Sign in to your account to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Login
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-4">
              <div className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link href="/register" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </div>
              <div className="text-xs text-gray-500 text-center">
                By signing in, you agree to our{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
                .
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
