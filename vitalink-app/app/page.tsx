import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
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
        <p className="text-xl mb-12 text-gray-300">Advanced health monitoring for your well-being</p>
        <Button asChild>
          <Link href="/signup">Get Started</Link>
        </Button>
      </div>
    </div>
  )
}

