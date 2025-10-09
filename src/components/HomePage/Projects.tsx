"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAllProjectsQuery } from "../redux/features/projects/adminApi";
import { FiArrowRight } from "react-icons/fi";

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();
  const { data: projects } = useAllProjectsQuery([]);

  const handleCardClick = async (id: string, e: React.MouseEvent) => {
    if (isAnimating || !containerRef.current) return;

    setIsAnimating(true);
    


    setSelectedId(id);

    // Navigate after animation completes
    setTimeout(() => {
      router.push(`/projects/${id}`);
      setIsAnimating(false);
    }, 800);
  };

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

 

 

  return (
    <div className="min-h-screen  ">
      <section id="projects" className="py-32 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          ref={containerRef}
          className="container mx-auto px-4 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Section Header */}
          <motion.div
            className="flex flex-col gap-4 items-center text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span 
              className="text-[#6c2bd9] text-sm font-semibold uppercase tracking-wider bg-[#6c2bd9]/10 px-4 py-1.5 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Portfolio Showcase
            </motion.span>
            <motion.h2 
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Featured Projects
            </motion.h2>
          
           
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 relative"
            variants={containerVariants}
          >
            {projects?.data?.map((project: any, index: number) => (
              <motion.div
                key={project._id}
                // variants={cardVariants}
                onClick={(e) => handleCardClick(project._id, e)}
                className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-800 hover:shadow-3xl transition-all duration-500"
              >
                {/* Image Container */}
                <motion.div 
                  className="relative aspect-video overflow-hidden"
                  // variants={imageVariants}
                >
                  <Image
                    src={project.projectImage || "/placeholder.svg"}
                    alt={project.projectName}
                    fill
                    className="object-cover"
                    priority={index < 2}
                  />
                  
                  {/* Overlay Gradient */}
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" /> */}
                  
                  {/* View Project Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <motion.div
                      className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-8 py-4 text-white font-semibold flex items-center gap-3"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      View Project
                      <FiArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="p-8">
                  <div className="mb-4">
                    <span className="text-sm font-semibold px-3 py-1.5 rounded-full bg-[#6c2bd9]/10 text-gray-400 dark:bg-[#6c2bd9]/20 uppercase tracking-wide">
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
                  
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    {project.projectDescription?.slice(0, 120)}
                    {project.projectDescription?.length > 120 && (
                      <span className="text-[#6c2bd9] font-medium">... Read more</span>
                    )}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.technologies?.slice(0, 4).map((tech: string, i: number) => (
                      <motion.span
                        key={i}
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 * i }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Accent Border */}
                {/* <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#6c2bd9] to-purple-400 group-hover:w-full transition-all duration-700 ease-out" /> */}
              </motion.div>
            ))}
          </motion.div>

          {/* View All Projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <Link href="projects" className="group relative overflow-hidden rounded-full bg-[#6c2bd9] px-8 py-3 text-white font-medium shadow-lg">
                <span className="relative z-10 flex items-center gap-2">
                  Explore All Projects
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Projects;