"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function EditCampaignPage() {
  const router = useRouter();
  const params = useParams();
  const campaignId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [campaign, setCampaign] = useState<any>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    targetAmount: "",
    endDate: "",
    image: ""
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/campaigns/${campaignId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch campaign");
        const data = await response.json();
        setCampaign(data);
        setForm({
          title: data.title || "",
          description: data.description || "",
          targetAmount: data.targetAmount?.toString() || "",
          endDate: data.endDate ? data.endDate.slice(0, 10) : "",
          image: data.image || ""
        });
      } catch (err: any) {
        setError(err.message || "Error loading campaign");
      } finally {
        setLoading(false);
      }
    };
    if (campaignId) fetchCampaign();
  }, [campaignId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/campaigns`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: campaignId,
          title: form.title,
          description: form.description,
          targetAmount: parseFloat(form.targetAmount),
          endDate: form.endDate,
          image: form.image
        }),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to update campaign");
      }
      toast.success("Campaign updated successfully!");
      router.push("/ngo/campaigns");
    } catch (err: any) {
      setError(err.message || "Error updating campaign");
      toast.error(err.message || "Error updating campaign");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <Input name="title" value={form.title} onChange={handleChange} required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <Textarea name="description" value={form.description} onChange={handleChange} required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Target Amount (FCFA)</label>
              <Input name="targetAmount" type="number" value={form.targetAmount} onChange={handleChange} required />
            </div>
            <div>
              <label className="block mb-1 font-medium">End Date</label>
              <Input name="endDate" type="date" value={form.endDate} onChange={handleChange} required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Image URL</label>
              <Input name="image" value={form.image} onChange={handleChange} />
            </div>
            <Button type="submit" disabled={saving} className="w-full">
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 