"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X } from "lucide-react"

interface Medication {
  id: string
  name: string
  dosage: string
}

interface QuestionnaireData {
  medicalConditions: string
  smoking: string
  smokingFrequency: string
  drinking: string
  drinkingFrequency: string
  activityLevel: string
  restingHeartRate: string
  medications: Medication[]
}

export function HealthQuestionnaire() {
  const router = useRouter()
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData>({
    medicalConditions: "",
    smoking: "",
    smokingFrequency: "",
    drinking: "",
    drinkingFrequency: "",
    activityLevel: "",
    restingHeartRate: "",
    medications: [],
  })
  const [newMedName, setNewMedName] = useState("")
  const [newMedDosage, setNewMedDosage] = useState("")

  const handleChange = (field: keyof QuestionnaireData, value: string) => {
    setQuestionnaireData((prev) => ({ ...prev, [field]: value }))
  }

  const addMedication = () => {
    if (newMedName && newMedDosage) {
      const newMed: Medication = {
        id: Date.now().toString(),
        name: newMedName,
        dosage: newMedDosage,
      }
      setQuestionnaireData((prev) => ({
        ...prev,
        medications: [...prev.medications, newMed],
      }))
      setNewMedName("")
      setNewMedDosage("")
    }
  }

  const removeMedication = (id: string) => {
    setQuestionnaireData((prev) => ({
      ...prev,
      medications: prev.medications.filter((med) => med.id !== id),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Questionnaire data:", questionnaireData)
    // Here you would typically send this data to your backend
    // For now, we'll just redirect to the dashboard
    router.push("/dashboard")
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Health Questionnaire</CardTitle>
        <CardDescription>Please answer the following questions about your health and lifestyle.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="medicalConditions">What are your current medical conditions?</Label>
            <Textarea
              id="medicalConditions"
              placeholder="E.g., Diabetes, Hypertension, Asthma..."
              value={questionnaireData.medicalConditions}
              onChange={(e) => handleChange("medicalConditions", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Do you smoke?</Label>
            <RadioGroup value={questionnaireData.smoking} onValueChange={(value) => handleChange("smoking", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="smoking-yes" />
                <Label htmlFor="smoking-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="smoking-no" />
                <Label htmlFor="smoking-no">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="former" id="smoking-former" />
                <Label htmlFor="smoking-former">Former smoker</Label>
              </div>
            </RadioGroup>
          </div>

          {questionnaireData.smoking === "yes" && (
            <div className="space-y-2">
              <Label htmlFor="smokingFrequency">How many times do you smoke per week?</Label>
              <Input
                id="smokingFrequency"
                type="number"
                placeholder="E.g., 7"
                value={questionnaireData.smokingFrequency}
                onChange={(e) => handleChange("smokingFrequency", e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Do you drink alcohol?</Label>
            <RadioGroup value={questionnaireData.drinking} onValueChange={(value) => handleChange("drinking", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="drinking-yes" />
                <Label htmlFor="drinking-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="drinking-no" />
                <Label htmlFor="drinking-no">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="occasionally" id="drinking-occasionally" />
                <Label htmlFor="drinking-occasionally">Occasionally</Label>
              </div>
            </RadioGroup>
          </div>

          {(questionnaireData.drinking === "yes" || questionnaireData.drinking === "occasionally") && (
            <div className="space-y-2">
              <Label htmlFor="drinkingFrequency">How many times do you drink per week?</Label>
              <Input
                id="drinkingFrequency"
                type="number"
                placeholder="E.g., 2"
                value={questionnaireData.drinkingFrequency}
                onChange={(e) => handleChange("drinkingFrequency", e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="activityLevel">How active are you?</Label>
            <Select
              value={questionnaireData.activityLevel}
              onValueChange={(value) => handleChange("activityLevel", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                <SelectItem value="light">Lightly active (light exercise 1-3 days/week)</SelectItem>
                <SelectItem value="moderate">Moderately active (moderate exercise 3-5 days/week)</SelectItem>
                <SelectItem value="very">Very active (hard exercise 6-7 days/week)</SelectItem>
                <SelectItem value="extra">
                  Extra active (very hard exercise & physical job or training twice a day)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="restingHeartRate">What is your resting heart rate? (beats per minute)</Label>
            <Input
              id="restingHeartRate"
              type="number"
              placeholder="E.g., 70"
              value={questionnaireData.restingHeartRate}
              onChange={(e) => handleChange("restingHeartRate", e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <Label>Current Medications</Label>
            {questionnaireData.medications.map((med) => (
              <div key={med.id} className="flex items-center justify-between bg-secondary p-2 rounded-md">
                <span>
                  {med.name} - {med.dosage}mg
                </span>
                <Button variant="ghost" size="icon" onClick={() => removeMedication(med.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex space-x-2">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="medication">Medication</Label>
                <Input
                  type="text"
                  id="medication"
                  placeholder="Enter medication name"
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="dosage">Dosage (mg)</Label>
                <Input
                  type="number"
                  id="dosage"
                  placeholder="Enter dosage"
                  value={newMedDosage}
                  onChange={(e) => setNewMedDosage(e.target.value)}
                />
              </div>
              <Button className="mt-auto" onClick={addMedication}>
                <Plus className="h-4 w-4 mr-2" /> Add
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">
          Submit and Continue to Dashboard
        </Button>
      </CardFooter>
    </Card>
  )
}

