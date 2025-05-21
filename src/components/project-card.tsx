"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { GlassmorphicCard } from "./glassmorphic-card"

interface ProjectCardProps {
  project: any
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [selected, setSelected] = useState(false)
  const router = useRouter()
  const isEven = index % 2 === 0

  const handleClick = () => {
    setSelected(true)

    // Navigate AFTER animation completes (duration = 1.6s)
    setTimeout(() => {
      router.push(`/projects/${project._id}`)
    }, 600)
  }

  return (
    <>
      {/* Project Card */}
      <motion.div
        layoutId={`project-${project._id}`}
        className={`flex flex-col ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        } gap-8 items-center cursor-pointer relative z-10`}
      >
        <div className="w-full lg:w-1/2 z-10 ">
          <GlassmorphicCard className="overflow-visible p-0 group">
            <motion.div
              layoutId={`image-${project._id}`}
              className="relative aspect-video rounded-2xl overflow-hidden"
              onClick={handleClick}
            >
              <Image
                src={project.projectImage || "/placeholder.svg"}
                alt={project.projectName}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                <div className="flex gap-4">
                  <Link
                    href={project.frontendGitHubLink}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="size-10 rounded-full bg-[#0a0a0d]/80 backdrop-blur-sm flex items-center justify-center text-white hover:text-[#6c2bd9] transition-colors"
                  >
                    <Github size={20} />
                  </Link>
                  <Link
                    href={project.liveProjectLink}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="size-10 rounded-full bg-[#0a0a0d]/80 backdrop-blur-sm flex items-center justify-center text-white hover:text-[#6c2bd9] transition-colors"
                  >
                    <ArrowUpRight size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </GlassmorphicCard>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <h3 className="text-2xl font-bold">{project.projectName}</h3>
          <p className="text-muted-foreground text-base 2xl:text-lg">
            {project.projectDescription?.slice(0, 300)}...
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {project?.technologies?.map((tag: any) => (
              <span
                key={tag}
                className="bg-[#6c2bd9]/10 text-[#6c2bd9] text-xs px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleClick}
              className="group inline-flex cursor-pointer items-center gap-2 text-[#6c2bd9] hover:text-[#6c2bd9]/80 font-medium"
            >
              View Project
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </button>

            <Link
              href={project.frontendGitHubLink}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Source Code
              <Github size={16} />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Animate Zooming Image */}
      <AnimatePresence>
        {selected && (
          <motion.div
            layoutId={`image-${project._id}`}
            className="fixed inset-0  z-[50]   pt-16 px-6"
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <Image
              src={project.projectImage || "/placeholder.svg"}
              alt={project.projectName}
              fill
              className=" h-[100vh] hidden  rounded-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
