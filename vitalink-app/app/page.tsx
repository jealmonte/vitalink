"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Activity, AlertTriangle, Compass, Zap, Mail, Phone, MapPin } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FakeRecaptcha } from "@/components/fake-recaptcha"
import { toast } from "@/hooks/use-toast"

const featureImages = {
  "Health Metrics": "https://example.com/health-metrics.jpg",
  "Fall Detection": "https://example.com/fall-detection.jpg",
  Explore: "https://example.com/explore.jpg",
  "Adaptive Pace Support": "https://example.com/adaptive-support.jpg",
}

export default function LandingPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isRecaptchaVerified) {
      alert("Please verify that you're not a robot")
      return
    }
    setFormStatus("submitting")

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const formDataObject = Object.fromEntries(formData.entries())

      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataObject),
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      setFormStatus("success")
      toast({ title: "Success", description: "Your message has been sent successfully." })
      ;(e.target as HTMLFormElement).reset()
      setIsRecaptchaVerified(false)
    } catch (error) {
      setFormStatus("error")
      toast({ title: "Error", description: "Failed to send your message.", variant: "destructive" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="snap-start min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 pt-16">
        <div className="text-center space-y-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VITALINK-4u0TE2MZGxt4HMbnVocwACxQan4bXz.png"
            alt="Vitalink Logo"
            width={300}
            height={80}
            className="animate-fade-in mx-auto"
          />
          <p className="text-xl text-gray-300">Stay Adventurous. Stay in Control.</p>
          <div className="flex justify-center gap-6">
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="snap-start min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 py-20">
        <h2 className="text-4xl font-bold text-white mb-12">Our Features</h2>
        <div className="grid grid-cols-2 gap-8 px-4 max-w-5xl mx-auto w-full">
          <FeatureCard
            icon={Activity}
            title="Health Metrics"
            description="Track your vital signs in real-time. Monitor heart rate, blood pressure, and more with precision and ease."
            imageSrc={featureImages["Health Metrics"]}
          />
          <FeatureCard
            icon={AlertTriangle}
            title="Fall Detection"
            description="Advanced sensors detect falls and unusual movements, providing an extra layer of safety for you or your loved ones."
            imageSrc={featureImages["Fall Detection"]}
          />
          <FeatureCard
            icon={Compass}
            title="Explore"
            description="Find local attractions and social hubs effortlessly. Adjust activity intensity to match your heart rate goals."
            imageSrc={featureImages["Explore"]}
          />
          <FeatureCard
            icon={Zap}
            title="Adaptive Pace Support"
            description="Intelligent system that adjusts to your activity level, providing personalized insights and tips."
            imageSrc={featureImages["Adaptive Pace Support"]}
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="snap-start min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 py-20">
        <h2 className="text-4xl font-bold text-white mb-12">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto w-full px-4">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input type="text" name="name" placeholder="Your Name" required />
            <Input type="email" name="email" placeholder="Your Email" required />
            <Textarea name="message" placeholder="Your Message" rows={4} required />
            <FakeRecaptcha onVerify={() => setIsRecaptchaVerified(true)} />
            <Button type="submit" disabled={!isRecaptchaVerified || formStatus === "submitting"}>
              {formStatus === "submitting" ? "Sending..." : "Send Message"}
            </Button>
          </form>

          {/* Contact Information */}
          <div className="space-y-6 text-white">
            <h3 className="text-xl font-semibold">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="text-purple-500" />
                <span>info@vitalink.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-purple-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="text-purple-500" />
                <span>123 Health Street, Wellness City</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
