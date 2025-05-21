"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function SkillSphere() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!containerRef.current) return

    // Skills to display
    const skills = [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Tailwind",
      "Framer Motion",
      "PostgreSQL",
      "MongoDB",
      "Mongoose",
      "Prisma",
      "Express",
      "Redux",
      "Firebase",
      "Vercel",
      "Git",
      "CI/CD",
    ]

    // Clear previous content
    containerRef.current.innerHTML = ""

    // Create sphere
    const radius = Math.min(containerRef.current.offsetWidth, containerRef.current.offsetHeight) / 2.5
    const tags: HTMLDivElement[] = []

    skills.forEach((skill, i) => {
      const tag = document.createElement("div")
      tag.className = "absolute text-sm font-medium transition-all duration-300 cursor-default"
      tag.textContent = skill
      tag.style.color = theme === "dark" ? "hsl(var(--primary))" : "hsl(var(--primary))"
      tag.style.opacity = "0.8"
      tag.style.userSelect = "none"
      containerRef.current?.appendChild(tag)
      tags.push(tag)
    })

    // Position tags in 3D sphere
    const positionTags = () => {
      const sin = Math.sin
      const cos = Math.cos

      tags.forEach((tag, i) => {
        const phi = Math.acos(-1 + (2 * i) / skills.length)
        const theta = Math.sqrt(skills.length * Math.PI) * phi

        // Convert spherical to Cartesian coordinates
        const x = radius * cos(theta) * sin(phi)
        const y = radius * sin(theta) * sin(phi)
        const z = radius * cos(phi)

        // Calculate opacity based on z position (front to back)
        const opacity = (z + radius) / (2 * radius)
        const scale = 0.8 + opacity * 0.4

        // Apply position and styles
        tag.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`
        tag.style.opacity = String(0.4 + opacity * 0.6)
      })
    }

    positionTags()

    // Animate the sphere
    let animationId: number
    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0

    const animate = () => {
      // Ease towards mouse position
      currentX += (mouseX - currentX) * 0.05
      currentY += (mouseY - currentY) * 0.05

      // Rotate the container
      if (containerRef.current) {
        containerRef.current.style.transform = `rotateX(${currentY * 0.2}deg) rotateY(${currentX * 0.2}deg)`
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      // Calculate mouse position relative to center of container
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 30
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 30
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [theme])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300px] flex items-center justify-center perspective-[1000px] transform-style-preserve-3d"
    />
  )
}

