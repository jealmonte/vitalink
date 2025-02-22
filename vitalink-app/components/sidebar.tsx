"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, Settings, Map } from "lucide-react"

const menuItems = [
  { icon: Activity, label: "Dashboard", href: "/dashboard" },
  { icon: Map, label: "Explore", href: "/dashboard/explore" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full w-64 bg-accent text-white">
      <div className="p-4">
        <h2 className="text-2xl font-bold">HealthGuard</h2>
      </div>
      <nav className="flex-1">
        <ul>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 hover:bg-[#a66ed4] transition-colors ${
                  pathname === item.href ? "bg-[#c48aed]" : ""
                }`}
              >
                <item.icon className="h-5 w-5 text-white" />
                <span className="text-white">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

