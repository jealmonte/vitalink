"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Activity, AlertTriangle, Compass, Zap, Mail, Phone, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ReCaptchaReplica } from "@/components/recaptcha-replica"
import { TopBar } from "@/components/top-bar"
import { StarryBackground } from "@/components/starry-background"
import { useState, useEffect, useRef } from "react"

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let lastScrollTime = 0
    const scrollCooldown = 1000 // 1 second cooldown between scroll actions

    const handleScroll = (e: WheelEvent) => {
      const now = Date.now()
      if (now - lastScrollTime < scrollCooldown) return

      const direction = e.deltaY > 0 ? 1 : -1
      const newSection = Math.max(0, Math.min(2, currentSection + direction))

      if (newSection !== currentSection) {
        e.preventDefault()
        setCurrentSection(newSection)
        container.scrollTo({
          top: newSection * window.innerHeight,
          behavior: "smooth",
        })
        lastScrollTime = now
      }
    }

    container.addEventListener("wheel", handleScroll, { passive: false })

    return () => {
      container.removeEventListener("wheel", handleScroll)
    }
  }, [currentSection])

  return (
    <div
      ref={containerRef}
      className="min-h-screen text-white overflow-y-auto relative"
      style={{ scrollSnapType: "y mandatory", scrollBehavior: "smooth" }}
    >
      <StarryBackground />
      <TopBar />
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
        <section
          className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden snap-start scroll-snap-align-start bg-gradient-to-b from-purple-900/50 to-indigo-900/50"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="z-10 text-center space-y-8">
            <div className="flex justify-center mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VITALINK-4u0TE2MZGxt4HMbnVocwACxQan4bXz.png"
                alt="Vitalink Logo"
                width={300}
                height={80}
                className="animate-fade-in"
                style={{ filter: "brightness(1.2)" }}
              />
            </div>
            <p className="text-xl mb-12 text-gray-300">Stay Adventurous. Stay in Control.</p>
            <div className="flex justify-center space-x-8">
              <div className="inline-block border-2 border-[#c48aed] rounded-2xl transition-colors duration-300 hover:bg-[#c48aed] group shadow-xl p-3">
                <Button
                  asChild
                  size="lg"
                  className="relative text-2xl px-12 py-6 bg-transparent border-2 border-transparent transition-colors duration-300 group-hover:bg-black group-hover:text-[#c48aed] font-bold"
                >
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
              <div className="inline-block border-2 border-[#c48aed] rounded-2xl transition-colors duration-300 hover:bg-[#c48aed] group shadow-xl p-3">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="relative text-2xl px-12 py-6 bg-transparent border-2 border-transparent transition-colors duration-300 group-hover:bg-black group-hover:text-[#c48aed] font-bold"
                >
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="min-h-screen py-24 flex flex-col items-center justify-center bg-gradient-to-b from-indigo-900/50 to-black/50 snap-start scroll-snap-align-start"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="w-full max-w-[1800px] mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card className="bg-[#171b23] border-[#2a2f38] rounded-lg overflow-hidden relative flex flex-col aspect-[4/3] group transition-all duration-300 hover:scale-105 hover:z-10">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hypertension-867855_1280.jpg-cvz7nIJZtrWDiRQtehrb7mFmnE1wwq.jpeg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="flex flex-col items-start justify-center h-full p-5 relative z-10 transition-all duration-300">
                  <div className="flex flex-col items-center w-full mb-4 transition-all duration-500 group-hover:mb-2">
                    <Activity className="w-6 h-6 text-[#c48aed] transition-all duration-300 group-hover:scale-105" />
                    <h3 className="text-base font-semibold text-white text-center mt-2 transition-all duration-300 group-hover:scale-105">
                      Health Metrics
                    </h3>
                  </div>
                  <p className="text-gray-300 text-left text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-full overflow-hidden mt-2 ml-2">
                    Track your vital signs in real-time. Monitor heart rate, blood pressure, and more with precision and
                    ease.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#171b23] border-[#2a2f38] rounded-lg overflow-hidden relative flex flex-col aspect-[4/3] group transition-all duration-300 hover:scale-105 hover:z-10">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ambulance-8277351_1280.jpg-N2vCpQrNSKA8RpZrkOu3j1JAq1ougK.jpeg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="flex flex-col items-start justify-center h-full p-5 relative z-10 transition-all duration-300">
                  <div className="flex flex-col items-center w-full mb-4 transition-all duration-500 group-hover:mb-2">
                    <AlertTriangle className="w-6 h-6 text-[#c48aed] transition-all duration-300 group-hover:scale-105" />
                    <h3 className="text-base font-semibold text-white text-center mt-2 transition-all duration-300 group-hover:scale-105">
                      Fall Detection
                    </h3>
                  </div>
                  <p className="text-gray-300 text-left text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-full overflow-hidden mt-2">
                    Advanced sensors detect falls and unusual movements, providing an extra layer of safety for you or
                    your loved ones.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#171b23] border-[#2a2f38] rounded-lg overflow-hidden relative flex flex-col aspect-[4/3] group transition-all duration-300 hover:scale-105 hover:z-10">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/team-spirit-2447163_1280.jpg-WTttslFMfGubTmmeugaiuqsC6MDtpN.jpeg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="flex flex-col items-start justify-center h-full p-5 relative z-10 transition-all duration-300">
                  <div className="flex flex-col items-center w-full mb-4 transition-all duration-500 group-hover:mb-2">
                    <Compass className="w-6 h-6 text-[#c48aed] transition-all duration-300 group-hover:scale-105" />
                    <h3 className="text-base font-semibold text-white text-center mt-2 transition-all duration-300 group-hover:scale-105">
                      Explore
                    </h3>
                  </div>
                  <p className="text-gray-300 text-left text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-full overflow-hidden mt-2">
                    Find local attractions and social hubs effortlessly. Adjust activity intensity to match your heart
                    rate goals.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#171b23] border-[#2a2f38] rounded-lg overflow-hidden relative flex flex-col aspect-[4/3] group transition-all duration-300 hover:scale-105 hover:z-10">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/senior-3336451_1280.jpg-rEZ2UqWPKf5PNOh313BCcpqttVYMgs.jpeg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="flex flex-col items-start justify-center h-full p-5 relative z-10 transition-all duration-300">
                  <div className="flex flex-col items-center w-full mb-4 transition-all duration-500 group-hover:mb-2">
                    <Zap className="w-6 h-6 text-[#c48aed] transition-all duration-300 group-hover:scale-105" />
                    <h3 className="text-base font-semibold text-white text-center mt-2 transition-all duration-300 group-hover:scale-105">
                      Adaptive Pace Support
                    </h3>
                  </div>
                  <p className="text-gray-300 text-left text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-full overflow-hidden mt-2">
                    Intelligent system that adjusts to your activity level, providing personalized insights and tips.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="min-h-screen py-24 flex flex-col items-center justify-center bg-transparent relative snap-start scroll-snap-align-start"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 text-primary" />
                  <span>info@vitalink.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-primary" />
                  <span>123 Health Street, Wellness City, 12345</span>
                </div>
              </div>
              <form className="space-y-4">
                <Input type="text" placeholder="Your Name" />
                <Input type="email" placeholder="Your Email" />
                <Textarea placeholder="Your Message" />
                <ReCaptchaReplica />
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

