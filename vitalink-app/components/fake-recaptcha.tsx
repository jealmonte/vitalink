"use client"

import { useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface FakeRecaptchaProps {
  onVerify: () => void
}

export function FakeRecaptcha({ onVerify }: FakeRecaptchaProps) {
  const [isChecked, setIsChecked] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const handleCheck = (checked: boolean) => {
    setIsChecked(checked)
  }

  const handleVerify = () => {
    if (!isChecked) return
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)
      onVerify()
    }, 1500) // Simulate a delay for verification
  }

  return (
    <div className="flex items-center space-x-2 my-4">
      <Checkbox id="recaptcha" checked={isChecked} onCheckedChange={handleCheck} disabled={isVerifying || isVerified} />
      <label htmlFor="recaptcha" className="text-sm text-gray-300 flex items-center space-x-2">
        <span>I'm not a robot</span>
        {isVerified && <Check className="w-4 h-4 text-green-500" />}
      </label>
      {isChecked && !isVerified && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleVerify}
          disabled={isVerifying}
          className="ml-2"
        >
          {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify"}
        </Button>
      )}
      <div className="flex items-center space-x-1">
        <img src="/placeholder.svg?height=32&width=32" alt="reCAPTCHA logo" className="w-8 h-8" />
        <span className="text-xs text-gray-400">Protected by reCAPTCHA</span>
      </div>
    </div>
  )
}
