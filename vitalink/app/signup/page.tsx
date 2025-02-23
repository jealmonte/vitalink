"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HealthQuestionnaire } from "@/components/health-questionnaire"

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    emergencyContact: "",
    healthConditions: "",
    country: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    setStep(2) // Move to the health questionnaire
  }

  const handleSkip = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-xl shadow-lg">
        {step === 1 ? (
          <>
            <h2 className="text-3xl font-bold text-center text-white">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value) => handleSelectChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  type="tel"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="healthConditions">Relevant Health Conditions</Label>
                <Textarea
                  id="healthConditions"
                  name="healthConditions"
                  value={formData.healthConditions}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex space-x-4">
                <Button type="submit" className="flex-1">
                  Continue to Health Questionnaire
                </Button>
                <Button type="button" variant="outline" onClick={handleSkip} className="flex-1">
                  Skip
                </Button>
              </div>
            </form>
          </>
        ) : (
          <HealthQuestionnaire />
        )}
      </div>
    </div>
  )
}

