"use client"

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Heart, Loader2 } from "lucide-react";
import { authService } from '@/lib/api';

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("donor");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic validation
    if (!name || !email || !password) {
      setError("Please fill in all required fields");
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      console.log('Attempting registration with:', { name, email, role: userType.toUpperCase() });
      
      const response = await authService.register({
        name,
        email,
        password,
        role: userType.toUpperCase() as 'DONOR' | 'ORGANIZATION' | 'ADMIN'
      });

      console.log('Registration response:', response);

      // Store the token and role
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userRole', response.user.role);
        
        toast({
          title: "Registration successful",
          description: "Your account has been created successfully!",
        });

        // Redirect to appropriate dashboard based on user type
        const dashboardPath = userType === 'organization' ? '/organization/dashboard' : 
                            userType === 'admin' ? '/admin/dashboard' : '/donor/dashboard';
        console.log('Redirecting to:', dashboardPath);
        router.push(dashboardPath);
      } else {
        throw new Error('No token received from server');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error instanceof Error ? error.message : 'Registration failed');
      toast({
        title: "Registration Error",
        description: error instanceof Error ? error.message : 'Registration failed',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
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

      <main className="flex-1 flex items-center justify-center p-6 bg-gray-50" style={{ backgroundImage: 'url(/images/registration.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-lg">
          <Card className="w-full max-w-md shadow-none bg-transparent">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-600">Create an Account</CardTitle>
              <CardDescription>Join our community to make a difference</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister}>
                <div className="grid gap-6">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                      {error}
                    </div>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Tsafack Ivan Marc"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>I am registering as a</Label>
                    <RadioGroup 
                      defaultValue={userType} 
                      onValueChange={setUserType} 
                      className="grid grid-cols-3 gap-4"
                      disabled={isLoading}
                    >
                      <div>
                        <RadioGroupItem value="donor" id="donor" className="peer sr-only" />
                        <Label
                          htmlFor="donor"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600"
                        >
                          <Heart className="mb-2 h-5 w-5" />
                          Donor
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="organization" id="organization" className="peer sr-only" />
                        <Label
                          htmlFor="organization"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600"
                        >
                          <Heart className="mb-2 h-5 w-5" />
                          NGO
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="admin" id="admin" className="peer sr-only" />
                        <Label
                          htmlFor="admin"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600"
                        >
                          <Heart className="mb-2 h-5 w-5" />
                          Admin
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-4">
              <div className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Sign in
                </Link>
              </div>
              <div className="text-xs text-gray-500 text-center">
                By registering, you agree to our{" "}
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
