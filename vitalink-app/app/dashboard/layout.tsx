import type React from "react"
import { TopBar } from "@/components/top-bar"
import { DirectMessagesPopup } from "@/components/direct-messages-popup"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen bg-background">
      <TopBar />
      <main className="flex-1 p-8 overflow-y-auto bg-background">{children}</main>
      <DirectMessagesPopup />
    </div>
  )
}

