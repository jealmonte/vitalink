"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ThermometerSun, AlertTriangle, Pill, Info, Zap } from "lucide-react"
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar"
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import subDays from "date-fns/subDays"
import enUS from "date-fns/locale/en-US"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface DrugInfo {
  id: string
  name: string
  generic_name: string
  dosage_forms: string
  manufacturer: string
  warnings: string
  indications_and_usage: string
}

export default function DashboardPage() {
  const [events, setEvents] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [comment, setComment] = useState("")
  const [prescription, setPrescription] = useState("")
  const [selectedDrug, setSelectedDrug] = useState<DrugInfo | null>(null)
  const [prescriptionAmount, setPrescriptionAmount] = useState("")
  const [incidentCount, setIncidentCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<DrugInfo[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [activityMinutes, setActivityMinutes] = useState(0)

  useEffect(() => {
    const simulateIncidents = () => {
      const today = new Date()
      const thirtyDaysAgo = subDays(today, 30)
      let count = 0
      for (let d = thirtyDaysAgo; d <= today; d.setDate(d.getDate() + 1)) {
        if (Math.random() < 0.2) {
          count++
        }
      }
      setIncidentCount(count)
    }

    // Simulate some activity minutes (this would come from your actual activity tracking)
    const simulateActivityMinutes = () => {
      setActivityMinutes(Math.floor(Math.random() * 45) + 15) // Random number between 15-60 minutes
    }

    simulateIncidents()
    simulateActivityMinutes()
  }, [])

  const searchDrugs = useCallback(async (query: string) => {
    if (!query) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(`/api/drugs/search?query=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error("Failed to fetch drug information")
      }
      const data = await response.json()
      setSearchResults(data.results || [])
    } catch (error) {
      console.error("Failed to search drugs:", error)
      toast({
        title: "Error",
        description: "Failed to search for drugs. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }, [])

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchQuery) {
        searchDrugs(searchQuery)
      }
    }, 300)

    return () => clearTimeout(debounce)
  }, [searchQuery, searchDrugs])

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start)
  }

  const handleSaveEvent = () => {
    if (selectedDate && selectedDrug) {
      const newEvent = {
        start: selectedDate,
        end: selectedDate,
        title: `${selectedDrug.name} ${prescriptionAmount} - ${comment}`.trim(),
        prescription: selectedDrug,
        amount: prescriptionAmount,
        comment: comment,
      }
      setEvents([...events, newEvent])
      setSelectedDate(null)
      setPrescription("")
      setSelectedDrug(null)
      setPrescriptionAmount("")
      setComment("")
      toast({
        title: "Prescription Added",
        description: `${selectedDrug.name} has been added to your calendar.`,
      })
    }
  }

  return (
    <div className="space-y-8 p-8 bg-background">
      <h1 className="text-3xl font-bold text-white">Welcome to Your Health Dashboard</h1>
      <div className="text-xl text-gray-300">Current Date and Time: {new Date().toLocaleString()}</div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72 BPM</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SpO2</CardTitle>
            <ThermometerSun className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incidents (Last 30 Days)</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{incidentCount}</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activity Today</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityMinutes} min</div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 bg-card p-4 rounded-lg">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectSlot={handleSelectSlot}
          selectable
          className="text-white"
          defaultView={Views.WEEK}
          views={["week", "day", "month"]}
        />
      </div>
      <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(null)}>
        <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle>Add Prescription for {selectedDate?.toDateString()}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label className="text-muted-foreground">Search Prescription</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-secondary text-secondary-foreground border-muted"
                  >
                    {selectedDrug?.name || "Search for a medication..."}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 bg-popover" side="bottom" align="start">
                  <Command className="bg-popover">
                    <CommandInput
                      placeholder="Search medications..."
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                      className="bg-popover text-popover-foreground"
                    />
                    <CommandList className="bg-popover">
                      <CommandEmpty className="text-muted-foreground">
                        {isSearching ? "Searching..." : "No results found."}
                      </CommandEmpty>
                      <CommandGroup>
                        {searchResults.map((drug) => (
                          <CommandItem
                            key={drug.id}
                            value={drug.name}
                            onSelect={() => {
                              setSelectedDrug(drug)
                              setPrescription(drug.name)
                              setSearchQuery("")
                            }}
                            className="text-popover-foreground hover:bg-accent"
                          >
                            <Pill className="mr-2 h-4 w-4" />
                            <span className="flex-1">{drug.name}</span>
                            {drug.generic_name && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-popover text-popover-foreground">
                                    <p>Generic: {drug.generic_name}</p>
                                    <p>Manufacturer: {drug.manufacturer}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            {selectedDrug && (
              <div className="bg-muted p-3 rounded-md text-sm text-muted-foreground">
                <p>
                  <strong>Generic Name:</strong> {selectedDrug.generic_name}
                </p>
                {selectedDrug.dosage_forms && (
                  <p>
                    <strong>Available Forms:</strong> {selectedDrug.dosage_forms}
                  </p>
                )}
                {selectedDrug.indications_and_usage && (
                  <p>
                    <strong>Indications:</strong> {selectedDrug.indications_and_usage}
                  </p>
                )}
                {selectedDrug.warnings && (
                  <p className="text-red-400">
                    <strong>Warnings:</strong> {selectedDrug.warnings}
                  </p>
                )}
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="amount" className="text-muted-foreground">
                Amount/Dosage
              </Label>
              <Input
                id="amount"
                value={prescriptionAmount}
                onChange={(e) => setPrescriptionAmount(e.target.value)}
                placeholder="e.g., 50mg twice daily"
                className="bg-secondary text-secondary-foreground border-muted"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="comment" className="text-muted-foreground">
                Notes
              </Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add any additional notes..."
                className="bg-secondary text-secondary-foreground border-muted"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSaveEvent} disabled={!selectedDrug} className="w-full">
              Save Prescription
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

