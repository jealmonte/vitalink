"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Medication {
  id: string
  name: string
  dosage: string
}

export function MedicationSection() {
  const [medications, setMedications] = useState<Medication[]>([])
  const [newMedName, setNewMedName] = useState("")
  const [newMedDosage, setNewMedDosage] = useState("")

  const addMedication = () => {
    if (newMedName && newMedDosage) {
      const newMed: Medication = {
        id: Date.now().toString(),
        name: newMedName,
        dosage: newMedDosage,
      }
      setMedications([...medications, newMed])
      setNewMedName("")
      setNewMedDosage("")
    }
  }

  const removeMedication = (id: string) => {
    setMedications(medications.filter((med) => med.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Medications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medications.map((med) => (
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
      </CardContent>
    </Card>
  )
}

