"use client"

import React from "react"
import {
  MapPin,
  Users,
  Play,
  MessageCircle,
  Clock,
  LocateIcon as LocationIcon,
  TrendingUp,
  Map,
  Send,
  ArrowLeft,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Image from "next/image"
import { useEffect } from "react"
import { useState } from "react"
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"


const GOOGLE_MAPS_API_KEY = "AIzaSyAGoHoDm7rPzg9nq6eqWrqCvJkEHSNcEAk" // Replace with your actual API key

interface ChatMessage {
  id: number
  user: string
  avatar: string
  message: string
  timestamp: Date
}

interface ChatThread {
  id: number
  title: string
  messages: ChatMessage[]
  location: string
  popularity: number
  coordinates: { lat: number; lng: number }
  peoplePresent: number
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem'
}

const defaultCenter = {
  lat: 38.0293, // Charlottesville coordinates
  lng: -78.4767
}

export default function ExplorePage() {
  // Use React.useState instead of useState directly
  const [walkingMode, setWalkingMode] = React.useState(false)
  const [intensity, setIntensity] = React.useState(50)
  const [sortBy, setSortBy] = React.useState("recent")
  const [selectedThread, setSelectedThread] = React.useState<ChatThread | null>(null)
  const [newMessage, setNewMessage] = React.useState("")
  const [newThreadTitle, setNewThreadTitle] = React.useState("")
  const [showNewThreadDialog, setShowNewThreadDialog] = React.useState(false)
  const [showDirectMessageDialog, setShowDirectMessageDialog] = React.useState(false)
  const [directMessageRecipient, setDirectMessageRecipient] = React.useState("")
  const [directMessage, setDirectMessage] = React.useState("")
  const [showMapDialog, setShowMapDialog] = React.useState(false)
  const [selectedMapThread, setSelectedMapThread] = React.useState<ChatThread | null>(null)
  
  // New state for Google Maps
  const [selectedMapLocation, setSelectedMapLocation] = React.useState<ChatThread | null>(null)
  const [userLocation, setUserLocation] = React.useState<{ lat: number; lng: number } | null>(null)

  // Load Google Maps
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  })

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        }
      )
    }
  }, [])

  // Existing helper functions
  const toggleWalkingMode = () => {
    setWalkingMode(!walkingMode)
    console.log(`Walking mode ${walkingMode ? "deactivated" : "activated"} with intensity: ${intensity}`)
  }

  const sortThreads = (threads: ChatThread[]) => {
    switch (sortBy) {
      case "recent":
        return [...threads].sort(
          (a, b) =>
            b.messages[b.messages.length - 1].timestamp.getTime() -
            a.messages[a.messages.length - 1].timestamp.getTime()
        )
      case "popular":
        return [...threads].sort((a, b) => b.popularity - a.popularity)
      case "location":
        return [...threads].sort((a, b) => a.location.localeCompare(b.location))
      default:
        return threads
    }
  }

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleSendMessage = () => {
    if (selectedThread && newMessage.trim()) {
      const newMsg: ChatMessage = {
        id: selectedThread.messages.length + 1,
        user: "You",
        avatar: "Y",
        message: newMessage.trim(),
        timestamp: new Date(),
      }
      setSelectedThread({
        ...selectedThread,
        messages: [...selectedThread.messages, newMsg],
      })
      setNewMessage("")
    }
  }

  const handleCreateNewThread = () => {
    if (newThreadTitle.trim()) {
      const newThread: ChatThread = {
        id: chatThreads.length + 1,
        title: newThreadTitle.trim(),
        messages: [],
        location: "New Location",
        popularity: 0,
        coordinates: userLocation || defaultCenter,
        peoplePresent: 1,
      }
      chatThreads.push(newThread)
      setNewThreadTitle("")
      setShowNewThreadDialog(false)
      setSelectedThread(newThread)
    }
  }

  const handleDirectMessage = (user: string) => {
    setDirectMessageRecipient(user)
    setShowDirectMessageDialog(true)
  }

  const handleSendDirectMessage = () => {
    if (directMessageRecipient.trim() && directMessage.trim()) {
      console.log(`Sending direct message to ${directMessageRecipient}: ${directMessage}`)
      setDirectMessageRecipient("")
      setDirectMessage("")
      setShowDirectMessageDialog(false)
    }
  }

  const handleViewOnMap = (thread: ChatThread) => {
    setSelectedMapThread(thread)
    setShowMapDialog(true)
  }

  const handleBackToThreads = () => {
    setSelectedThread(null)
  }

  const chatThreads: ChatThread[] = [
    {
      id: 1,
      title: "Downtown Walking Group",
      messages: [
        {
          id: 1,
          user: "Sarah",
          avatar: "S",
          message: "Beautiful day for a walk downtown! Anyone want to join?",
          timestamp: new Date("2025-02-23T09:00:00"),
        },
        {
          id: 2,
          user: "Mike",
          avatar: "M",
          message: "I'm in! Where should we meet?",
          timestamp: new Date("2025-02-23T09:05:00"),
        },
      ],
      location: "Downtown Mall",
      popularity: 12,
      coordinates: { lat: 38.0293, lng: -78.4767 }, // Charlottesville coordinates
      peoplePresent: 4,
    },
    {
      id: 2,
      title: "UVA Gardens Group",
      messages: [
        {
          id: 1,
          user: "Emily",
          avatar: "E",
          message: "Morning walk through the gardens?",
          timestamp: new Date("2025-02-23T08:30:00"),
        },
      ],
      location: "UVA Gardens",
      popularity: 8,
      coordinates: { lat: 38.0356, lng: -78.5070 },
      peoplePresent: 2,
    },
    {
      id: 3,
      title: "Rivanna Trail Hikers",
      messages: [
        {
          id: 1,
          user: "David",
          avatar: "D",
          message: "Starting a trail walk in 30 minutes",
          timestamp: new Date("2025-02-23T07:45:00"),
        },
        {
          id: 2,
          user: "Lisa",
          avatar: "L",
          message: "Perfect timing! I'll be there",
          timestamp: new Date("2025-02-23T07:50:00"),
        },
      ],
      location: "Rivanna Trail",
      popularity: 15,
      coordinates: { lat: 38.0401, lng: -78.4712 },
      peoplePresent: 6,
    },
    {
      id: 4,
      title: "IX Art Park Social",
      messages: [
        {
          id: 1,
          user: "Alex",
          avatar: "A",
          message: "Art walk and light exercise at IX Art Park",
          timestamp: new Date("2025-02-23T10:00:00"),
        },
      ],
      location: "IX Art Park",
      popularity: 10,
      coordinates: { lat: 38.0279, lng: -78.4849 },
      peoplePresent: 3,
    },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">City Exploration</h1>
  
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-card border-secondary">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2" /> Nearby Points of Interest
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-accent rounded-md">
              {loadError ? (
                <div className="h-full flex items-center justify-center text-red-500">
                  Error loading maps: {loadError.message}
                </div>
              ) : !isLoaded ? (
                <div className="h-full flex items-center justify-center">
                  Loading maps...
                </div>
              ) : (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={userLocation || defaultCenter}
                  zoom={13}
                  options={{
                    styles: [
                      {
                        elementType: "geometry",
                        stylers: [{ color: "#242f3e" }]
                      },
                      {
                        elementType: "labels.text.stroke",
                        stylers: [{ color: "#242f3e" }]
                      },
                      {
                        elementType: "labels.text.fill",
                        stylers: [{ color: "#746855" }]
                      }
                    ],
                    streetViewControl: false,
                    mapTypeControl: false
                  }}
                >
                  {userLocation && (
                    <Marker
                      position={userLocation}
                      icon={{
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 7,
                        fillColor: "#4285F4",
                        fillOpacity: 1,
                        strokeColor: "#ffffff",
                        strokeWeight: 2,
                      }}
                    />
                  )}
                  
                  {chatThreads.map((thread) => (
                    <Marker
                      key={thread.id}
                      position={thread.coordinates}
                      onClick={() => setSelectedMapLocation(thread)}
                    />
                  ))}
  
                  {selectedMapLocation && (
                    <InfoWindow
                      position={selectedMapLocation.coordinates}
                      onCloseClick={() => setSelectedMapLocation(null)}
                    >
                      <div className="text-black p-2">
                        <h3 className="font-bold">{selectedMapLocation.title}</h3>
                        <p>{selectedMapLocation.location}</p>
                        <p className="text-sm text-gray-600">
                          {selectedMapLocation.peoplePresent} people here
                        </p>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              )}
            </div>
          </CardContent>
        </Card>
  
        <Card className="bg-card border-secondary">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2" /> Social Spots
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Local Café - 0.3 miles</li>
              <li>Community Center - 0.5 miles</li>
              <li>Park Meetup Spot - 0.7 miles</li>
              <li>Book Club at Library - 1.0 mile</li>
            </ul>
          </CardContent>
        </Card>
      </div>
  
      <Card className="bg-card border-secondary">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Play className="mr-2" /> Walking Mode
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch id="walking-mode" checked={walkingMode} onCheckedChange={toggleWalkingMode} />
            <Label htmlFor="walking-mode">Activate Walking Mode</Label>
          </div>
  
          <div className="space-y-2">
            <Label htmlFor="intensity">Intensity</Label>
            <Slider
              id="intensity"
              min={0}
              max={100}
              step={1}
              value={[intensity]}
              onValueChange={(value) => setIntensity(value[0])}
              disabled={!walkingMode}
            />
            <div className="text-sm text-muted-foreground">Current Intensity: {intensity}%</div>
          </div>
  
          <Button onClick={toggleWalkingMode} className="w-full">
            {walkingMode ? "Stop" : "Go"}
          </Button>
        </CardContent>
      </Card>
  
      <Card className="bg-card border-secondary">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <MessageCircle className="mr-2" /> Chat Threads
            </div>
            {!selectedThread && (
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      Most Recent
                    </div>
                  </SelectItem>
                  <SelectItem value="popular">
                    <div className="flex items-center">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Most Popular
                    </div>
                  </SelectItem>
                  <SelectItem value="location">
                    <div className="flex items-center">
                      <LocationIcon className="mr-2 h-4 w-4" />
                      Location
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
            {selectedThread && (
              <Button variant="ghost" size="sm" onClick={handleBackToThreads}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Threads
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!selectedThread && (
            <ScrollArea className="h-[400px] w-full pr-4">
              {sortThreads(chatThreads).map((thread) => (
                <Card
                  key={thread.id}
                  className="mb-4 bg-accent hover:bg-accent/90 transition-colors cursor-pointer transform hover:scale-[1.02] transition-transform duration-200 ease-in-out"
                >
                  <CardHeader>
                    <CardTitle className="text-lg flex justify-between items-center">
                      <span onClick={() => setSelectedThread(thread)}>{thread.title}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleViewOnMap(thread)
                        }}
                      >
                        <Map className="h-4 w-4 mr-2" />
                        View on Map
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent onClick={() => setSelectedThread(thread)}>
                    <p className="text-sm text-muted-foreground">
                      {thread.messages.length} messages • {thread.location}
                    </p>
                    <p className="text-sm font-medium flex items-center mt-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      <Users className="inline-block mr-1 h-4 w-4" />
                      {thread.peoplePresent} people here now
                    </p>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          )}
          {selectedThread && (
            <div>
              <ScrollArea className="h-[300px] w-full pr-4 mb-4">
                {selectedThread.messages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-2 mb-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Avatar className="w-8 h-8 cursor-pointer">
                          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.avatar}`} />
                          <AvatarFallback>{message.avatar}</AvatarFallback>
                        </Avatar>
                      </PopoverTrigger>
                      <PopoverContent className="w-40">
                        <Button className="w-full" variant="ghost" onClick={() => handleDirectMessage(message.user)}>
                          Direct Message
                        </Button>
                      </PopoverContent>
                    </Popover>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{message.user}</p>
                        <p className="text-xs text-muted-foreground">{formatTimestamp(message.timestamp)}</p>
                      </div>
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex items-center mt-4">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow mr-2"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          {!selectedThread && (
            <div className="flex space-x-2 mt-4">
              <Button className="flex-1" onClick={() => setShowNewThreadDialog(true)}>
                Start a New Thread
              </Button>
              <Button className="flex-1" onClick={() => setShowDirectMessageDialog(true)}>
                Direct Message
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
  
      <Dialog open={showMapDialog} onOpenChange={setShowMapDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{selectedMapThread?.title} Location</DialogTitle>
    </DialogHeader>
    {selectedMapThread && (
      <>
        <div className="h-[300px] bg-accent rounded-md overflow-hidden mb-4">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={selectedMapThread.coordinates}
              zoom={15}
              options={{
                styles: [
                  {
                    elementType: "geometry",
                    stylers: [{ color: "#242f3e" }]
                  },
                  {
                    elementType: "labels.text.stroke",
                    stylers: [{ color: "#242f3e" }]
                  },
                  {
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#746855" }]
                  }
                ],
                streetViewControl: false,
                mapTypeControl: false
              }}
            >
              <Marker
                position={selectedMapThread.coordinates}
                onClick={() => setSelectedMapLocation(selectedMapThread)}
              />
            </GoogleMap>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">{selectedMapThread.location}</p>
          <p className="text-sm font-medium flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            <Users className="inline-block mr-1 h-4 w-4" />
            {selectedMapThread.peoplePresent} people here now
          </p>
        </div>
      </>
    )}
  </DialogContent>
</Dialog>
    </div>
  )
}

