"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardHeader } from "@/components/dashboard-header";
import { toast } from "sonner";
import { Users, DollarSign, Target, Heart, CheckCircle2, XCircle, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface NGO {
  id: string;
  name: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  registrationDate: Date;
  description: string;
}

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ngos, setNgos] = useState<NGO[]>([
    {
      id: "1",
      name: "Education for All",
      email: "contact@educationforall.org",
      status: "pending",
      registrationDate: new Date("2024-02-01"),
      description: "Providing quality education to underprivileged children"
    },
    {
      id: "2",
      name: "Clean Water Initiative",
      email: "info@cleanwater.org",
      status: "approved",
      registrationDate: new Date("2024-01-15"),
      description: "Bringing clean water to rural communities"
    },
    {
      id: "3",
      name: "Food Security Program",
      email: "contact@foodsecurity.org",
      status: "rejected",
      registrationDate: new Date("2024-02-10"),
      description: "Combating hunger through sustainable food programs"
    }
  ]);

  const handleNGOStatus = (ngoId: string, newStatus: "approved" | "rejected") => {
    setNgos(ngos.map(ngo => 
      ngo.id === ngoId ? { ...ngo, status: newStatus } : ngo
    ));
    toast.success(`NGO ${newStatus === "approved" ? "approved" : "rejected"} successfully`);
  };

  const filteredNGOs = ngos.filter(ngo =>
    ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ngo.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ngo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <DashboardHeader
        heading="Admin Dashboard"
        text="Manage your charity platform"
        userType="admin"
        userName="Admin"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <DollarSign className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-blue-100">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Target className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-green-100">+2 new this week</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered NGOs</CardTitle>
            <Heart className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-purple-100">+4 new this month</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Volunteers</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-orange-100">+12 new this week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>NGO Applications</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search NGOs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNGOs.map((ngo) => (
              <div key={ngo.id} className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-purple-100 p-2">
                    <Heart className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">{ngo.name}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-muted-foreground">{ngo.email}</p>
                      <span className="text-muted-foreground">•</span>
                      <p className="text-sm text-muted-foreground">{format(ngo.registrationDate, "MMM d, yyyy")}</p>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{ngo.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {ngo.status === "pending" ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-green-50 text-green-600 hover:bg-green-100"
                        onClick={() => handleNGOStatus(ngo.id, "approved")}
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-50 text-red-600 hover:bg-red-100"
                        onClick={() => handleNGOStatus(ngo.id, "rejected")}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </>
                  ) : (
                    <Badge
                      variant={ngo.status === "approved" ? "default" : "destructive"}
                      className={cn(
                        "px-2 py-1",
                        ngo.status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      )}
                    >
                      {ngo.status === "approved" ? (
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                      ) : (
                        <XCircle className="mr-2 h-4 w-4" />
                      )}
                      {ngo.status}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
