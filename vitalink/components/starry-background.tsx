"use client"

import type React from "react"
import { useEffect, useRef } from "react"

export const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars: Star[] = []
    const shootingStars: ShootingStar[] = []

    class Star {
      x: number
      y: number
      radius: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 1.5
        this.color = `rgba(255, 255, 255, ${Math.random()})`
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    class ShootingStar {
      x: number
      y: number
      length: number
      speed: number
      angle: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = 0
        this.length = Math.random() * 80 + 10
        this.speed = Math.random() * 10 + 10
        this.angle = (Math.random() * Math.PI) / 4 - Math.PI / 8
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x + Math.cos(this.angle) * this.length, this.y + Math.sin(this.angle) * this.length)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
        ctx.lineWidth = 2
        ctx.stroke()
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed
      }
    }

    for (let i = 0; i < 200; i++) {
      stars.push(new Star())
    }

    function createShootingStar() {
      if (Math.random() < 0.1) {
        shootingStars.push(new ShootingStar())
      }
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => star.draw())

      shootingStars.forEach((star, index) => {
        star.draw()
        star.update()
        if (star.y > canvas.height || star.x > canvas.width) {
          shootingStars.splice(index, 1)
        }
      })

      createShootingStar()

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }} />
  )
}

