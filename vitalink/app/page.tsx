"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Activity, AlertTriangle, Compass, Zap, Mail, Phone, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ReCaptchaReplica } from "@/components/recaptcha-replica"
import { LandingTopBar } from "@/components/landing-top-bar"
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
      className="min-h-screen bg-black text-white overflow-y-auto"
      style={{ scrollSnapType: "y mandatory", scrollBehavior: "smooth" }}
    >
      <LandingTopBar />
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
        <section
          className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black snap-start scroll-snap-align-start"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-900 animate-gradient-xy"></div>
            <div className="absolute inset-0 opacity-20">
              <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMjAiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzAwMDAwMDQwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] animate-pulse"></div>
            </div>
          </div>
          <div className="z-10 text-center space-y-8">
            <div className="flex justify-center mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VITALINK-4u0TE2MZGxt4HMbnVocwACxQan4bXz.png"
                alt="Vitalink Logo"
                width={300}
                height={80}
                className="animate-fade-in"
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
          className="min-h-screen py-24 flex flex-col items-center justify-center bg-[#0f1218] text-white snap-start scroll-snap-align-start"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="w-full max-w-[1800px] mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="bg-[#171b23] border-[#2a2f38] rounded-lg overflow-hidden relative flex flex-col aspect-[4/3] group transition-all duration-300 hover:scale-105 hover:z-10">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hypertension-867855_1280.jpg-cvz7nIJZtrWDiRQtehrb7mFmnE1wwq.jpeg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="flex flex-col items-start justify-center h-full p-6 relative z-10 transition-all duration-300">
                  <div className="flex flex-col items-center w-full mb-4 transition-all duration-500 group-hover:mb-2">
                    <Activity className="w-10 h-10 text-[#c48aed] transition-all duration-300 group-hover:scale-105" />
                    <h3 className="text-lg font-semibold text-white text-center mt-2 transition-all duration-300 group-hover:scale-105">
                      Health Metrics
                    </h3>
                  </div>
                  <p className="text-gray-300 text-left opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-full overflow-hidden">
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
                <CardContent className="flex flex-col items-start justify-center h-full p-6 relative z-10 transition-all duration-300">
                  <div className="flex flex-col items-center w-full mb-4 transition-all duration-500 group-hover:mb-2">
                    <AlertTriangle className="w-10 h-10 text-[#c48aed] transition-all duration-300 group-hover:scale-105" />
                    <h3 className="text-lg font-semibold text-white text-center mt-2 transition-all duration-300 group-hover:scale-105">
                      Fall Detection
                    </h3>
                  </div>
                  <p className="text-gray-300 text-left opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-full overflow-hidden">
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
                <CardContent className="flex flex-col items-start justify-center h-full p-6 relative z-10 transition-all duration-300">
                  <div className="flex flex-col items-center w-full mb-4 transition-all duration-500 group-hover:mb-2">
                    <Compass className="w-10 h-10 text-[#c48aed] transition-all duration-300 group-hover:scale-105" />
                    <h3 className="text-lg font-semibold text-white text-center mt-2 transition-all duration-300 group-hover:scale-105">
                      Explore
                    </h3>
                  </div>
                  <p className="text-gray-300 text-left opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-full overflow-hidden">
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
                <CardContent className="flex flex-col items-start justify-center h-full p-6 relative z-10 transition-all duration-300">
                  <div className="flex flex-col items-center w-full mb-4 transition-all duration-500 group-hover:mb-2">
                    <Zap className="w-10 h-10 text-[#c48aed] transition-all duration-300 group-hover:scale-105" />
                    <h3 className="text-lg font-semibold text-white text-center mt-2 transition-all duration-300 group-hover:scale-105">
                      Adaptive Pace Support
                    </h3>
                  </div>
                  <p className="text-gray-300 text-left opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-full overflow-hidden">
                    Intelligent system that adjusts to your activity level, providing personalized insights and tips.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="min-h-screen py-24 flex flex-col items-center justify-center bg-black text-white snap-start scroll-snap-align-start"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <style jsx global>{`
        .scroll-snap-align-start {
          scroll-snap-align: start;
          transition: none;
        }
      `}</style>
    </div>
  )
}

