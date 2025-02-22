import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      <form className="space-y-6 max-w-md">
        <div>
          <Label htmlFor="age">Age</Label>
          <Input type="number" id="age" name="age" />
        </div>
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select>
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
          <Input type="tel" id="emergencyContact" name="emergencyContact" />
        </div>
        <div>
          <Label htmlFor="healthConditions">Relevant Health Conditions</Label>
          <Textarea id="healthConditions" name="healthConditions" />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input type="text" id="country" name="country" />
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  )
}

