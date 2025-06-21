"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Wallet, Smartphone } from "lucide-react"

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  ngoName: string
  campaignName: string
}

export function DonationModal({ isOpen, onClose, ngoName, campaignName }: DonationModalProps) {
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [step, setStep] = useState(1)
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleDonate = () => {
    // Here you would typically handle the payment processing
    setStep(3)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make a Donation</DialogTitle>
        </DialogHeader>
        {step === 1 && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Donation Amount</Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-16"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">FCFA</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="card"
                    id="card"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <CreditCard className="mb-3 h-6 w-6" />
                    Credit Card
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="orange"
                    id="orange"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="orange"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Smartphone className="mb-3 h-6 w-6" />
                    Orange Money
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="mobile"
                    id="mobile"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="mobile"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Smartphone className="mb-3 h-6 w-6" />
                    Mobile Money
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="wallet"
                    id="wallet"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="wallet"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Wallet className="mb-3 h-6 w-6" />
                    Digital Wallet
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <Button className="w-full" onClick={() => setStep(2)}>
              Continue
            </Button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4 py-4">
            {paymentMethod === "card" ? (
              <>
                <div className="space-y-2">
                  <Label>Card Number</Label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label>CVV</Label>
                    <Input placeholder="123" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Name on Card</Label>
                  <Input placeholder="John Doe" />
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input 
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <p className="text-sm text-gray-500">
                  {paymentMethod === "orange" 
                    ? "You will receive an Orange Money confirmation message"
                    : "You will receive a Mobile Money confirmation message"}
                </p>
              </div>
            )}
            <Button className="w-full" onClick={handleDonate}>
              Donate {amount} FCFA
            </Button>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4 py-4 text-center">
            <div className="rounded-full bg-green-100 p-3 mx-auto w-fit">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Thank You!</h3>
            <p className="text-sm text-gray-500">
              Your donation of {amount} FCFA to {ngoName} for {campaignName} has been processed successfully.
            </p>
            <p className="text-sm text-gray-500">
              {paymentMethod === "card" 
                ? "A receipt will be sent to your email address."
                : "A confirmation message has been sent to your phone."}
            </p>
            <Button className="w-full" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 