"use client";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github, Sparkles, Eye, Calendar, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAllProjectsQuery } from "../redux/features/projects/adminApi";

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const router = useRouter();
  const { data: projects } = useAllProjectsQuery([]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const techColors = [
    { bg: "rgba(147, 51, 234, 0.08)", text: "rgb(147, 51, 234)", border: "rgba(147, 51, 234, 0.2)" },
    { bg: "rgba(59, 130, 246, 0.08)", text: "rgb(59, 130, 246)", border: "rgba(59, 130, 246, 0.2)" },
    { bg: "rgba(34, 197, 94, 0.08)", text: "rgb(34, 197, 94)", border: "rgba(34, 197, 94, 0.2)" },
  ];

  const projectTypes = ["Web Application", "Mobile App", "E-commerce", "Dashboard", "API Service"];

  return (
    <section id="projects" className="py-32 relative bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #6c2bd9 1px, transparent 0)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Professional Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#6c2bd9] to-transparent"></div>
            <span className="text-sm font-medium text-[#6c2bd9] uppercase tracking-widest">
              Portfolio
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#6c2bd9] to-transparent"></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Selected
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6c2bd9] to-[#9333ea]">
              Works
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            A collection of professional projects showcasing technical expertise, innovative solutions, and client success stories
          </motion.p>
        </div>

        {/* Projects Grid with Professional Layout */}
        <motion.div
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects?.data?.slice(0, 4).map((project: any, index: number) => {
            const isHovered = hoveredProject === project._id;
            const projectType = projectTypes[index % projectTypes.length];

            return (
              <motion.article
                key={project._id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -4 }}
                onMouseEnter={() => setHoveredProject(project._id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group cursor-pointer"
                onClick={() => router.push(`/projects/${project._id}`)}
              >
                {/* Project Card */}
                <div className="relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300">
                  {/* Image Container */}
                  <div className="relative  h-72 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                    <Image
                      src={project.projectImage || "/placeholder.svg"}
                      alt={project.projectName}
                      fill
                      className=" transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Project Type Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="px-3 py-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-xs font-semibold text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700">
                        {projectType}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    {/* Project Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex-1">
                          <motion.h3 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#6c2bd9] transition-colors"
                          >
                            {project.projectName}
                          </motion.h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>2024</span>
                            <span className="mx-2">•</span>
                            <Clock className="w-4 h-4" />
                            <span>3 months</span>
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 line-clamp-3">
                        {project.projectDescription?.slice(0, 120)}
                        {project.projectDescription?.length > 120 && "..."}
                      </p>
                    </div>

                    {/* Technologies Stack */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.slice(0, 4).map((tech: string, techIndex: number) => {
                          const color = techColors[techIndex % techColors.length];
                          return (
                            <span
                              key={techIndex}
                              className="px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-300 hover:scale-105"
                              style={{
                                backgroundColor: color.bg,
                                color: color.text,
                                borderColor: color.border
                              }}
                            >
                              {tech}
                            </span>
                          );
                        })}
                        {project.technologies?.length > 4 && (
                          <span className="px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Project Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                      {/* Stats */}
                      {/* <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Eye className="w-4 h-4" />
                          <span>2.5k+ views</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Users className="w-4 h-4" />
                          <span>Team of 4</span>
                        </div>
                      </div> */}

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        {project.frontendGitHubLink && (
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={project.frontendGitHubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          >
                            <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                          </motion.a>
                        )}
                        
                        {project.liveProjectLink && (
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={project.liveProjectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6c2bd9] to-[#9333ea] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="text-sm">Live Demo</span>
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>

                  
                </div>
              </motion.article>
            );
          })}
        </motion.div>

    
      </div>
    </section>
  );
};

export default Projects;