"use client";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAllProjectsQuery } from "../redux/features/projects/adminApi";

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const techColors = [
    { bg: "rgba(147, 51, 234, 0.08)", text: "rgb(147, 51, 234)", border: "rgba(147, 51, 234, 0.2)" },
    { bg: "rgba(59, 130, 246, 0.08)", text: "rgb(59, 130, 246)", border: "rgba(59, 130, 246, 0.2)" },
    { bg: "rgba(34, 197, 94, 0.08)", text: "rgb(34, 197, 94)", border: "rgba(34, 197, 94, 0.2)" },
    { bg: "rgba(245, 158, 11, 0.08)", text: "rgb(245, 158, 11)", border: "rgba(245, 158, 11, 0.2)" },
  ];

  const projectTypes = ["Web Application", "Mobile App", "E-commerce", "Dashboard", "API Service"];

  return (
    <section id="projects" className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Professional Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-gray-300 dark:bg-gray-700"></div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-widest">
              Portfolio
            </span>
            <div className="w-8 h-px bg-gray-300 dark:bg-gray-700"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Projects
            
          </h2>

           
        </div>

        {/* Projects Grid */}
        <motion.div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects?.data?.slice(0, 4).map((project: any, index: number) => {
            const projectType = projectTypes[index % projectTypes.length];

            return (
              <motion.article
                key={project._id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group cursor-pointer"
                onClick={() => router.push(`/projects/${project._id}`)}
              >
                {/* Project Card */}
                <div className="h-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={project.projectImage || "/placeholder.svg"}
                      alt={project.projectName}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    {/* Project Header */}
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#6c2bd9] dark:group-hover:text-[#9333ea] transition-colors">
                        {project.projectName}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>2024</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>3 months</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
                      {project.projectDescription?.slice(0, 100)}
                      {project.projectDescription?.length > 100 && "..."}
                    </p>

                    {/* Technologies Stack */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.slice(0, 4).map((tech: string, techIndex: number) => {
                          const color = techColors[techIndex % techColors.length];
                          return (
                            <span
                              key={techIndex}
                              className="px-3 py-1 text-xs font-medium rounded-md transition-all duration-300 hover:scale-105"
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
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-3">
                        {project.frontendGitHubLink && (
                          <a
                            href={project.frontendGitHubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          >
                            <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                          </a>
                        )}
                        
                        {project.liveProjectLink && (
                          <a
                            href={project.liveProjectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 px-4 py-2 bg-[#6c2bd9] dark:bg-[#9333ea] text-white rounded-lg font-medium hover:bg-[#5a21b6] dark:hover:bg-[#7c3aed] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="text-sm">Live Demo</span>
                          </a>
                        )}
                      </div>

                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* View All Button */}
        {projects?.data?.length > 4 && (
          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;