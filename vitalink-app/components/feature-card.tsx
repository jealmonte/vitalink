import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  imageSrc: string
}

export default function FeatureCard({ icon: Icon, title, description, imageSrc }: FeatureCardProps) {
  return (
    <Card className="bg-gray-800 border-gray-700 overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl group cursor-pointer h-64 relative">
      <CardHeader className="p-6 absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-in-out group-hover:opacity-0">
        <CardTitle className="flex flex-col items-center text-center space-y-4">
          <Icon className="text-purple-400 w-12 h-12" />
          <span className="text-lg font-semibold">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 absolute inset-0 flex flex-col items-start justify-start opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-500 ease-in-out"
          style={{
            backgroundImage: `url(${imageSrc})`,
          }}
        />
        <div className="relative z-10 flex flex-col items-start space-y-4 pt-4 px-4 w-full">
          <h3 className="text-xl font-medium text-white self-center">{title}</h3>
          <p className="text-gray-300 text-left">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
