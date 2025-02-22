"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Settings, Bell, User, LayoutDashboard, Compass, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Explore", href: "/dashboard/explore", icon: Compass },
  { label: "Vitachat", href: "/dashboard/vitachat", icon: MessageSquare },
]

export function TopBar() {
  const pathname = usePathname()

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-accent text-white">
      <div className="flex items-center">
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VITALINK-M362MO4bhUbjzCOWAfCoe6UkfJzDvG.png"
            alt="Vitalink Logo"
            width={150}
            height={50}
            className="h-10 w-auto"
          />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <nav>
          <ul className="flex space-x-4">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-[#a66ed4] transition-colors ${
                    pathname === item.href ? "bg-[#c48aed]" : ""
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

