"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function VitachatPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm Vitachat, your personal health assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }])
      // Here you would typically send the message to your backend for processing
      // For now, we'll just simulate a response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I'm sorry, I'm just a demo at the moment. In the future, I'll be able to help you with various health-related tasks and queries!",
          },
        ])
      }, 1000)
      setInput("")
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Vitachat</h1>

      <Card className="bg-card border-secondary">
        <CardHeader>
          <CardTitle>Chat with Vitachat</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] mb-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
                <span
                  className={`inline-block p-2 rounded-lg ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
                >
                  {message.content}
                </span>
              </div>
            ))}
          </ScrollArea>
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

