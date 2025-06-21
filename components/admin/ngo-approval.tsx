"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building, CheckCircle, Download, Eye, FileText, XCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface NGO {
  id: string
  name: string
  email: string
  phone: string
  location: string
  description: string
  registrationDate: string
  documents: {
    name: string
    type: string
    url: string
  }[]
  status: "Pending" | "Approved" | "Rejected"
}

export function NGOApproval() {
  const { toast } = useToast()
  const [ngos, setNgos] = useState<NGO[]>([
    {
      id: "1",
      name: "Health For All Cameroon",
      email: "contact@healthforall.cm",
      phone: "+237 655 123 456",
      location: "Yaoundé, Centre Region",
      description: "Providing healthcare services to underserved communities across Cameroon.",
      registrationDate: "2025-06-10",
      documents: [
        { name: "Registration Certificate", type: "PDF", url: "#" },
        { name: "Tax Clearance", type: "PDF", url: "#" },
        { name: "Annual Report", type: "PDF", url: "#" },
      ],
      status: "Pending",
    },
    {
      id: "2",
      name: "Education Access Cameroon",
      email: "info@educationaccess.cm",
      phone: "+237 655 789 012",
      location: "Douala, Littoral Region",
      description: "Working to improve access to quality education for children in Cameroon.",
      registrationDate: "2025-06-09",
      documents: [
        { name: "Registration Certificate", type: "PDF", url: "#" },
        { name: "Financial Statement", type: "Excel", url: "#" },
        { name: "Organization Structure", type: "PDF", url: "#" },
      ],
      status: "Pending",
    },
    {
      id: "3",
      name: "Clean Water Cameroon",
      email: "help@cleanwater.cm",
      phone: "+237 655 345 678",
      location: "Bamenda, Northwest Region",
      description: "Providing clean water solutions to rural communities in Cameroon.",
      registrationDate: "2025-06-08",
      documents: [
        { name: "Registration Certificate", type: "PDF", url: "#" },
        { name: "Project Portfolio", type: "PDF", url: "#" },
        { name: "Board Members", type: "PDF", url: "#" },
      ],
      status: "Pending",
    },
  ])

  const [selectedNGO, setSelectedNGO] = useState<NGO | null>(null)
  const [viewingNGO, setViewingNGO] = useState<NGO | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isRejectionDialogOpen, setIsRejectionDialogOpen] = useState(false)

  const handleApprove = (ngo: NGO) => {
    setNgos(ngos.map((item) => (item.id === ngo.id ? { ...item, status: "Approved" as const } : item)))
    toast({
      title: "NGO Approved",
      description: `${ngo.name} has been approved successfully.`,
    })
  }

  const openRejectionDialog = (ngo: NGO) => {
    setSelectedNGO(ngo)
    setRejectionReason("")
    setIsRejectionDialogOpen(true)
  }

  const handleReject = () => {
    if (!selectedNGO) return

    setNgos(ngos.map((item) => (item.id === selectedNGO.id ? { ...item, status: "Rejected" as const } : item)))
    setIsRejectionDialogOpen(false)
    toast({
      title: "NGO Rejected",
      description: `${selectedNGO.name} has been rejected.`,
      variant: "destructive",
    })
  }

  const viewNGODetails = (ngo: NGO) => {
    setViewingNGO(ngo)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>NGO Registration Approval</CardTitle>
          <CardDescription>Review and approve or reject NGO registration requests.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ngos.map((ngo) => (
              <div
                key={ngo.id}
                className="flex flex-col md:flex-row md:items-center justify-between rounded-lg border p-4 gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-blue-100 p-2">
                    <Building className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{ngo.name}</p>
                    <p className="text-sm text-gray-500">{ngo.location}</p>
                    <p className="text-sm text-gray-500">Submitted: {ngo.registrationDate}</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3 ml-11 md:ml-0">
                  <Badge
                    className={
                      ngo.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        : ngo.status === "Approved"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                    }
                  >
                    {ngo.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => viewNGODetails(ngo)}>
                      <Eye className="mr-2 h-4 w-4" /> View
                    </Button>
                    {ngo.status === "Pending" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200"
                          onClick={() => handleApprove(ngo)}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" /> Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                          onClick={() => openRejectionDialog(ngo)}
                        >
                          <XCircle className="mr-2 h-4 w-4" /> Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">View All Requests</Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export List
          </Button>
        </CardFooter>
      </Card>

      {/* NGO Details Dialog */}
      {viewingNGO && (
        <Dialog open={!!viewingNGO} onOpenChange={() => setViewingNGO(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>NGO Details</DialogTitle>
              <DialogDescription>Review the details and documents of this NGO.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Organization Name</h3>
                  <p className="mt-1">{viewingNGO.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1">{viewingNGO.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="mt-1">{viewingNGO.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="mt-1">{viewingNGO.location}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1">{viewingNGO.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Documents</h3>
                <div className="space-y-2">
                  {viewingNGO.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <FileText className={`h-5 w-5 ${doc.type === "PDF" ? "text-red-500" : "text-green-500"}`} />
                        <span>{doc.name}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              {viewingNGO.status === "Pending" && (
                <>
                  <Button
                    variant="outline"
                    className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                    onClick={() => {
                      setSelectedNGO(viewingNGO)
                      setViewingNGO(null)
                      setIsRejectionDialogOpen(true)
                    }}
                  >
                    <XCircle className="mr-2 h-4 w-4" /> Reject
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      handleApprove(viewingNGO)
                      setViewingNGO(null)
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" /> Approve
                  </Button>
                </>
              )}
              {viewingNGO.status !== "Pending" && <Button onClick={() => setViewingNGO(null)}>Close</Button>}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Rejection Dialog */}
      <Dialog open={isRejectionDialogOpen} onOpenChange={setIsRejectionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject NGO Registration</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this NGO registration. This will be sent to the organization.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectionDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectionReason.trim()}>
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
