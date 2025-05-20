"use client"

import { useCallback, useEffect, useRef } from "react"
import { useTheme } from "next-themes"

type Particle = {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  const drawParticles = useCallback(
    (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle =
          theme === "dark" ? `rgba(217, 217, 255, ${particle.opacity})` : `rgba(0, 0, 50, ${particle.opacity})`
        ctx.fill()
      })
    },
    [theme],
  )

  const updateParticles = useCallback((particles: Particle[], width: number, height: number) => {
    return particles.map((particle) => {
      // Update position
      let x = particle.x + particle.speedX
      let y = particle.y + particle.speedY

      // Bounce off edges
      if (x < 0 || x > width) {
        particle.speedX *= -1
        x = particle.x + particle.speedX
      }

      if (y < 0 || y > height) {
        particle.speedY *= -1
        y = particle.y + particle.speedY
      }

      return {
        ...particle,
        x,
        y,
      }
    })
  }, [])

  const createParticles = useCallback((width: number, height: number, count: number): Particle[] => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Create particles
    const particleCount = Math.min(Math.floor(window.innerWidth * 0.05), 100)
    let particles = createParticles(canvas.width, canvas.height, particleCount)

    // Animation loop
    let animationId: number
    const animate = () => {
      particles = updateParticles(particles, canvas.width, canvas.height)
      drawParticles(ctx, particles)
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [createParticles, drawParticles, updateParticles])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />
}

