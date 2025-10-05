"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAllProjectsQuery } from "../redux/features/projects/adminApi";
import { FiArrowRight } from "react-icons/fi";
import { ProjectCardSkeleton } from "./ProjectSPinner";

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const { data: projects, isLoading } = useAllProjectsQuery([]);

  // Fix: Reset visibility when component mounts
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    if (!projects?.data) return ["All"];
    const allCategories = projects.data.map((project: any) => project.category || "Uncategorized");
    return ["All", ...new Set(allCategories)];
  }, [projects?.data]);

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (!projects?.data) return [];
    if (activeFilter === "All") return projects.data;
    return projects.data.filter((project: any) => 
      project.category === activeFilter
    );
  }, [projects?.data, activeFilter]);

  const handleCardClick = async (id: string, e: React.MouseEvent) => {
    if (isAnimating || !containerRef.current) return;

    setIsAnimating(true);
    setSelectedId(id);

    setTimeout(() => {
      router.push(`/projects/${id}`);
      setIsAnimating(false);
    }, 800);
  };

  // Fixed animation variants
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

   

  const filterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <section id="projects" className="py-32 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#6c2bd9]/10 to-purple-400/10 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          ref={containerRef}
          className="container mx-auto px-4 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"} // Fix: Use animate instead of whileInView
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Section Header */}
          <motion.div
            className="flex flex-col gap-4 items-center text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Projects
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mt-4 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Discover my creative journey through various technologies and design approaches
            </motion.p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {categories.map((category:any, index) => (
              <motion.button
                key={category}
               
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => setActiveFilter(category)}
                className={`relative px-6 py-3 uppercase cursor-pointer rounded-2xl font-semibold text-sm md:text-base transition-all duration-300 border backdrop-blur-sm ${
                  activeFilter === category
                    ? "bg-gradient-to-r from-[#6c2bd9] to-purple-600 text-white shadow-2xl shadow-[#6c2bd9]/25 border-transparent"
                    : "bg-white/70 dark:bg-gray-800/70 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:shadow-lg"
                }`}
              >
                {category}
                {activeFilter === category && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#6c2bd9] to-purple-600 -z-10"
                    layoutId="activeFilter"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {[...Array(4)].map((_, index) => (
                <ProjectCardSkeleton key={index} />
              ))}
            </motion.div>
          )}

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeFilter}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProjects.map((project: any, index: number) => (
                <motion.div
                  key={project._id}
                   
                  onClick={(e) => handleCardClick(project._id, e)}
                  className="group cursor-pointer relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700 hover:shadow-3xl transition-all duration-500"
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Image Container */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.projectImage || "/placeholder.svg"}
                      alt={project.projectName}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      priority={index < 2}
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    {/* View Project Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <motion.div
                        className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-full px-8 py-4 text-white font-semibold flex items-center gap-3 shadow-2xl"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        View Project
                        <FiArrowRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="mb-4">
                      <span className="2xl:text-sm text-xs font-semibold px-3 py-1.5 rounded-full bg-[#6c2bd9]/10 text-gray-400 dark:bg-[#6c2bd9]/20 uppercase tracking-wide">
                        {project.category || "Web Development"}
                      </span>
                    </div>
                    
                    <motion.h3 
                      className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-[#6c2bd9] dark:group-hover:text-[#8c5af9] transition-colors duration-300 flex items-center gap-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {project.projectName}
                      <motion.span
                        className="opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <FiArrowRight className="w-6 h-6" />
                      </motion.span>
                    </motion.h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                      {project.projectDescription?.slice(0, 120)}
                      {project.projectDescription?.length > 120 && (
                        <span className="text-[#6c2bd9] font-medium">... Read more</span>
                      )}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.slice(0, 5).map((tech: string, i: number) => (
                        <motion.span
                          key={i}
                          className="text-xs font-medium px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          whileHover={{
                            scale: 1.05,
                            background: "linear-gradient(135deg, #6c2bd9, #8c5af9)",
                            color: "white"
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Accent Border */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#6c2bd9] to-purple-400 group-hover:w-full transition-all duration-700 ease-out" />
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#6c2bd9]/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Projects Message */}
          {!isLoading && filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                No projects available for the selected category.
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Add shimmer animation to CSS */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Projects;