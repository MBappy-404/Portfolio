"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  ArrowBigRight,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

interface ProjectCardProps {
  project: any;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [selected, setSelected] = useState(false);
  const router = useRouter();
  const isEven = index % 2 === 0;

  const handleClick = () => {
    setSelected(true);
    // Navigate AFTER animation completes
    setTimeout(() => {
      router.push(`/projects/${project._id}`);
    }, 800);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(false);
  };

  return (
    <>
      {/* Project Card */}
  <motion.div className="group cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black border border-gray-200 dark:border-gray-800 shadow-xl">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.projectImage || "/placeholder.svg"}
            alt={project.projectName}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority={index < 3}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Hover Actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleClick}
              className="px-6 py-3 bg-[#6c2bd9] text-white dark:bg-white dark:text-black cursor-pointer rounded-full font-medium flex items-center gap-2 hover:bg-[#8857dc] dark:hover:bg-gray-100 transition-colors"
            >
              View Details
              <ArrowUpRight size={16} />
            </button>

            <Link
              href={project.frontendGitHubLink}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="p-3 bg-gray-200/80 text-[#232336] dark:bg-gray-800/80 dark:text-white backdrop-blur-sm rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <Github size={18} />
            </Link>

            <Link
              href={project.liveProjectLink}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="p-3 bg-gray-200/80 text-[#232336] dark:bg-gray-800/80 dark:text-white backdrop-blur-sm rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <ExternalLink size={18} />
            </Link>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6">
          <div className="mb-3">
            <span className="text-sm px-2 py-1 rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400 font-medium uppercase tracking-wider">
              {project.category || "WEB • DESIGN • DEVELOPMENT"}
            </span>
          </div>

          <h3 className="group relative flex items-center text-3xl font-bold text-[#232336] dark:text-white py-4 overflow-hidden">
            {/* Icon */}
            <span
              className="
      absolute left-0 
      -translate-x-12 opacity-0
      group-hover:translate-x-0 group-hover:opacity-100
      transition-all duration-300 ease-out
    "
            >
              <FiArrowRight className="w-10 h-10" />
            </span>

            {/* Text */}
            <span
              className="
      relative 
      transition-all duration-300 ease-out
      group-hover:ml-14
    "
            >
              {project.projectName}
            </span>
          </h3>

          <p className="text-gray-600 dark:text-gray-300 lg:text-base 2xl:text-xl mb-4 line-clamp-2">
            {project.projectDescription?.slice(0, 100)}
            {project.projectDescription?.length > 100 ? "..." : ""}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project?.technologies?.slice(0, 3).map((tag: any) => (
              <span
                key={tag}
                className="bg-purple-100 text-purple-700 dark:bg-purple-600/20 dark:text-purple-400 text-xs 2xl:text-sm px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {project?.technologies?.length > 3 && (
              <span className="bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400 text-xs 2xl:text-sm px-2.5 py-1 rounded-full">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Illusion Animation Overlay */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 container mx-auto z-50 bg-black/90 backdrop-blur-md flex items-center justify-center"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative w-full max-w-full mt-[70px] aspect-[3/2] sm:aspect-[16/9] md:aspect-[2/1] lg:aspect-[17/8]   overflow-hidden"
            >
              <Image
                src={project.projectImage || "/placeholder.svg"}
                alt={project.projectName}
                fill
                className="object-cover"
              />

              {/* Loading indicator */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
