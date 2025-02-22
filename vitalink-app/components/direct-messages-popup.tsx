"use client"

import { useState, useEffect } from "react"
import { X, MessageCircle, ChevronDown, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: number
  sender: string
  content: string
  timestamp: Date
}

interface Conversation {
  id: number
  user: string
  avatar: string
  messages: Message[]
}

export function DirectMessagesPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      user: "Alice",
      avatar: "A",
      messages: [
        { id: 1, sender: "Alice", content: "Hey, how are you?", timestamp: new Date() },
        { id: 2, sender: "You", content: "I'm good, thanks! How about you?", timestamp: new Date() },
      ],
    },
    {
      id: 2,
      user: "Bob",
      avatar: "B",
      messages: [
        { id: 1, sender: "Bob", content: "Did you see the new health app?", timestamp: new Date() },
        { id: 2, sender: "You", content: "Not yet, is it good?", timestamp: new Date() },
      ],
    },
  ])
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    const currentPath = window.location.pathname
    const hiddenPaths = ["/profile", "/notifications", "/settings"]
    if (hiddenPaths.some((path) => currentPath.startsWith(path))) {
      setIsOpen(false)
    }
  }, [])

  const toggleOpen = () => setIsOpen(!isOpen)

  const handleSendMessage = () => {
    if (activeConversation && newMessage.trim()) {
      const updatedConversations = conversations.map((conv) => {
        if (conv.id === activeConversation.id) {
          return {
            ...conv,
            messages: [
              ...conv.messages,
              { id: conv.messages.length + 1, sender: "You", content: newMessage.trim(), timestamp: new Date() },
            ],
          }
        }
        return conv
      })
      setConversations(updatedConversations)
      setActiveConversation(updatedConversations.find((conv) => conv.id === activeConversation.id) || null)
      setNewMessage("")
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {isOpen && (
        <Card className="w-80 mb-2">
          <CardHeader className="p-3">
            <CardTitle className="text-lg flex justify-between items-center">
              Direct Messages
              <Button variant="ghost" size="sm" onClick={toggleOpen}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            {activeConversation ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => setActiveConversation(null)} className="mb-2">
                  Back to conversations
                </Button>
                <ScrollArea className="h-60 w-full mb-2">
                  {activeConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"} mb-2`}
                    >
                      <div
                        className={`max-w-[70%] p-2 rounded-lg ${message.sender === "You" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
                <div className="flex items-center mt-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow mr-2"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <ScrollArea className="h-60 w-full">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="flex items-center p-3 bg-secondary/50 hover:bg-accent rounded-lg cursor-pointer border-b border-secondary/30 mb-2"
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <Avatar className="w-10 h-10 mr-3 flex-shrink-0">
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.avatar}`} />
                      <AvatarFallback>{conversation.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="w-[160px] overflow-hidden">
                      <p className="font-medium text-sm">{conversation.user}</p>
                      <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                        {conversation.messages[conversation.messages.length - 1].content}
                      </p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      )}
      <Button onClick={toggleOpen} className="rounded-full w-12 h-12 flex items-center justify-center">
        {isOpen ? <ChevronDown className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  )
}

