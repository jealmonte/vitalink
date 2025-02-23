"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function TopBar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VITALINK-4u0TE2MZGxt4HMbnVocwACxQan4bXz.png"
            alt="Vitalink Logo"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
        </Link>
        <nav className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => scrollTo("features")}
            className="text-sm font-normal hover:bg-gray-700 transition-colors"
          >
            About
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollTo("contact")}
            className="text-sm font-normal hover:bg-gray-700 transition-colors"
          >
            Contact
          </Button>
          <Button
            variant="ghost"
            asChild
            className="text-sm font-medium hover:bg-gray-700 transition-colors relative overflow-hidden group"
          >
            <Link href="/signup" className="text-sm">
              <span className="relative z-10">Signup</span>
              <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </Link>
          </Button>
          <Button variant="ghost" className="text-sm font-normal hover:bg-gray-700 transition-colors">
            Login
          </Button>
        </nav>
      </div>
    </header>
  )
}

