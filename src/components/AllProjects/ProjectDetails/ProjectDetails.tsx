"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiCalendar, FiTag, FiExternalLink, FiGithub, FiCode, FiLayout, FiChevronRight } from "react-icons/fi";
import { useGetProjectQuery } from "@/components/redux/features/projects/adminApi";

const ProjectDetails = ({ id }: { id: any }) => {
  const { data: projectsData, isLoading } = useGetProjectQuery(id);
  const project = projectsData?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center pt-24 justify-center bg-white dark:bg-[#0F0F15]">
        <div className="space-y-4 w-full max-w-[1400px] px-4">
          <div className="h-[60vh] w-full rounded-2xl bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 dark:from-[#1A1A24] dark:via-[#2A2A34] dark:to-[#1A1A24] animate-pulse" />
          <div className="space-y-6 px-4">
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 dark:from-[#1A1A24] dark:via-[#2A2A34] dark:to-[#1A1A24] rounded-full w-1/2 animate-pulse" />
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 dark:from-[#1A1A24] dark:via-[#2A2A34] dark:to-[#1A1A24] rounded-full w-1/3 animate-pulse" />
            <div className="flex gap-4">
              <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 dark:from-[#1A1A24] dark:via-[#2A2A34] dark:to-[#1A1A24] rounded-full w-32 animate-pulse" />
              <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 dark:from-[#1A1A24] dark:via-[#2A2A34] dark:to-[#1A1A24] rounded-full w-32 animate-pulse" />
            </div>
            <div className="h-64 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 dark:from-[#1A1A24] dark:via-[#2A2A34] dark:to-[#1A1A24] rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0F0F15]">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-red-500">Project Not Found</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            The project you're looking for doesn't exist or may have been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F0F15] pt-24 text-[#1A1A24] dark:text-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-[90vh] w-full overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 dark:from-black/80 via-black/20 to-transparent z-10" />
        <Image
          src={project?.projectImage}
          alt={project?.projectName}
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4 z-20">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-2 text-sm text-white/80 font-medium">
              <span className="hover:text-white/95 transition-colors">Projects</span>
              <FiChevronRight className="text-xs" />
              <span className="hover:text-white/95 transition-colors">{project.category}</span>
              <FiChevronRight className="text-xs" />
              <span className="text-white/95">{project.projectName}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl tracking-tight">
              {project.projectName}
            </h1>
            
            <div className="flex flex-wrap gap-3">
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-lg text-white flex items-center gap-2 border border-white/20 hover:border-white/30 transition-all"
              >
                <FiTag className="text-[#B18AFF] text-opacity-90" />
                {project.category}
              </motion.span>
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-lg text-white flex items-center gap-2 border border-white/20 hover:border-white/30 transition-all"
              >
                <FiCalendar className="text-[#B18AFF] text-opacity-90" />
                {new Date(project.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </motion.span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16 space-y-16 max-w-6xl">
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-4"
        >
          {project.liveProjectLink && (
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={project.liveProjectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-gradient-to-r from-[#6c2bd9] to-[#8a3aff] hover:from-[#5a24b8] hover:to-[#7a32e6] dark:from-[#B18AFF] dark:to-[#C9A8FF] dark:hover:from-[#9c7ad9] dark:hover:to-[#B18AFF] text-white rounded-xl flex items-center gap-2 transition-all shadow-xl hover:shadow-2xl group"
            >
              <FiExternalLink className="text-lg transition-transform group-hover:translate-x-1" />
              Live Preview
            </motion.a>
          )}
          {project.frontendGitHubLink && (
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={project.frontendGitHubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 border-2 border-[#6c2bd9] dark:border-[#B18AFF] text-[#6c2bd9] dark:text-[#B18AFF] hover:bg-[#6c2bd9]/10 dark:hover:bg-[#B18AFF]/10 rounded-xl flex items-center gap-2 transition-all shadow-sm hover:shadow-md group"
            >
              <FiGithub className="text-lg transition-transform group-hover:scale-110" />
              View Code
            </motion.a>
          )}
        </motion.div>

        {/* Project Details */}
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          {/* Main Content */}
          <motion.article
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#6c2bd9] to-[#8a3aff] dark:from-[#B18AFF] dark:to-[#C9A8FF] bg-clip-text text-transparent inline-block tracking-tight">
                Project Overview
              </h2>
              <p className="text-xl leading-relaxed text-[#4A4A4A] dark:text-[#C0C0C0] font-medium">
                {project.projectDescription}
              </p>
            </div>

            {project.technologies?.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold flex items-center gap-3">
                  <div className="p-2 bg-[#6c2bd9]/10 dark:bg-[#B18AFF]/10 rounded-xl">
                    <FiCode className="text-[#6c2bd9] dark:text-[#B18AFF] text-xl" />
                  </div>
                  <span className="tracking-tight">Technology Stack</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech: string) => (
                    <motion.span
                      key={tech}
                      whileHover={{ y: -2 }}
                      className="px-4 py-2 rounded-xl bg-white dark:bg-[#1A1A24] border border-gray-200 dark:border-[#2A2A34] text-[#6c2bd9] dark:text-[#B18AFF] shadow-sm hover:shadow-md transition-all font-medium"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {project.features?.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold flex items-center gap-3">
                  <div className="p-2 bg-[#6c2bd9]/10 dark:bg-[#B18AFF]/10 rounded-xl">
                    <FiLayout className="text-[#6c2bd9] dark:text-[#B18AFF] text-xl" />
                  </div>
                  <span className="tracking-tight">Key Features</span>
                </h3>
                <ul className="space-y-4">
                  {project.features.map((feature: string, index: number) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start gap-3 p-4 bg-white dark:bg-[#1A1A24] rounded-xl shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="mt-1 h-2 w-2 rounded-full bg-[#6c2bd9] dark:bg-[#B18AFF] flex-shrink-0" />
                      <span className="text-lg text-[#4A4A4A] dark:text-[#C0C0C0] font-medium">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.article>

          {/* Project Metadata */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1A24] shadow-xl border border-gray-200 dark:border-[#2A2A34]">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <div className="p-2 bg-[#6c2bd9]/10 dark:bg-[#B18AFF]/10 rounded-xl">
                  <FiLayout className="text-[#6c2bd9] dark:text-[#B18AFF] text-xl" />
                </div>
                <span className="tracking-tight">Project Details</span>
              </h3>
              <dl className="space-y-4">
                <div className="pb-4 border-b border-gray-200 dark:border-[#2A2A34]">
                  <dt className="text-sm text-[#6A6A7A] dark:text-[#A0A0B0] uppercase tracking-wider font-medium">Category</dt>
                  <dd className="font-medium mt-1 text-lg">{project.category}</dd>
                </div>
                <div className="pb-4 border-b border-gray-200 dark:border-[#2A2A34]">
                  <dt className="text-sm text-[#6A6A7A] dark:text-[#A0A0B0] uppercase tracking-wider font-medium">Date Completed</dt>
                  <dd className="font-medium mt-1 text-lg">
                    {new Date(project.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </dd>
                </div>
                {project.client && (
                  <div>
                    <dt className="text-sm text-[#6A6A7A] dark:text-[#A0A0B0] uppercase tracking-wider font-medium">Client</dt>
                    <dd className="font-medium mt-1 text-lg">{project.client}</dd>
                  </div>
                )}
              </dl>
            </div>

            {project.additionalImages?.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-3">
                  <div className="p-2 bg-[#6c2bd9]/10 dark:bg-[#B18AFF]/10 rounded-xl">
                    <FiCode className="text-[#6c2bd9] dark:text-[#B18AFF] text-xl" />
                  </div>
                  <span className="tracking-tight">Project Gallery</span>
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {project.additionalImages.map((img: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.03 }}
                      className="aspect-square relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-zoom-in"
                    >
                      <Image
                        src={img}
                        alt={`Project preview ${index + 1}`}
                        fill
                        className="object-cover"
                        quality={90}
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;