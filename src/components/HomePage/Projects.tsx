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
    <div className="min-h-screen">
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

          {/* Projects Grid with Corner Design */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20 relative"
            variants={containerVariants}
          >
            {projects?.data?.map((project: any, index: number) => {
                const lightModeColor = "#ffffff";
              const darkModeColor = "#0a0a0a";
              
              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={(e) => handleCardClick(project._id, e)}
                >
                  {/* Card Container */}
                  <div className="      transition-all duration-300">
                    
                    {/* Card Inner with CSS Styled Corner */}
                    <div 
                      className="card-inner bg-white dark:bg-[#0a0a0a] relative h-72   overflow-hidden"
                      style={{ 
                        '--clr': lightModeColor,
                        '--clr-dark': darkModeColor,
                         
                      } as React.CSSProperties}
                    >
                      <div className="box w-full h-full    overflow-hidden relative">
                        
                        {/* Image Box */}
                        <div className="imgBox absolute inset-0 ">
                          <Image
                            src={project.projectImage || "/placeholder.svg"}
                            alt={project.projectName}
                            fill
                            className="object-cover"
                            priority={index < 2}
                          />
                        </div>
                        
                        {/* Icon with CSS Styled Corner */}
                        <div className="icon absolute bottom-[-6px] right-[-6px] w-24 h-24">
                          
                          {/* Icon Box */}
                          <div 
                            className="iconBox absolute inset-2.5 bg-gray-700 dark:bg-gray-600 rounded-full flex items-center justify-center group-hover:scale-90 transition-transform duration-300"
                          >
                            <FiArrowRight className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="content p-6">
                      <h3 className="project-title text-2xl font-bold text-gray-900 dark:text-white mb-4 capitalize">
                        {project.projectName}
                      </h3>
                      
                      <p className="project-description text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {project.projectDescription?.slice(0, 100)}
                        {project.projectDescription?.length > 100 && (
                          <span className="text-[#6c2bd9] font-medium">... Read more</span>
                        )}
                      </p>

                      {/* Tags */}
                      {/* <ul className="tags-list">
                        {project.technologies?.slice(0, 3).map((tech: string, i: number) => {
                          const tagColors = ["#d3b19a", "#70b3b1", "#d05fa2"];
                          const tagColor = tagColors[i % tagColors.length];
                          
                          return (
                            <li
                              key={i}
                              style={{ 
                                '--clr-tag': tagColor
                              } as React.CSSProperties}
                              className={`tag-item ${i === 0 ? 'branding' : i === 1 ? 'packaging' : 'marketing'}`}
                            >
                              {tech}
                            </li>
                          );
                        })}
                      </ul> */}
                    </div>
                  </div>
                </motion.div>
              );
            })}
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

        {/* CSS Styles for Corner Design - Fixed for Dark/Light Mode */}
        <style jsx global>{`
         .card-inner {
            border-radius: 1.25rem;
            border-bottom-right-radius: 50px;
            overflow: hidden;
            background: white;
            border: none;  
          }

          .dark .card-inner {
            background: #0a0a0a;  
          }

          .box {
            border-radius: 1.25rem;
            overflow: hidden;
          }

          .icon {
            border-top-left-radius: 50%;
            background:  white;
          }
        
           .dark .icon{
           background: #0a0a0a;
           }

          .icon::before {
            content: "";
            position: absolute;
            bottom: 6px;
            left: -20px;
            width: 20px;
            height: 20px;
            border-bottom-right-radius: 20px;
            background: transparent;
            box-shadow: 5px 5px 0 5px #fff;
          }

          .icon::after {
            content: "";
            position: absolute;
            top: -20px;
            right: 6px;
            width: 20px;
            height: 20px;
            background: transparent;
            border-bottom-right-radius: 20px;
            box-shadow: 5px 5px 0 5px var(--clr);
          }

          /* Dark mode styles */
          .dark .icon::before {
            box-shadow: 5px 5px 0 5px #0a0a0a;
          }

          .dark .icon::after {
            box-shadow: 5px 5px 0 5px #0a0a0a;
          }

          .imgBox img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .iconBox {
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.3s;
          }

          .icon:hover .iconBox {
            transform: scale(1.1);
          }

          .tags-list {
            margin: 0;
            padding: 0;
            list-style: none;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
          }

          .tag-item {
            text-transform: uppercase;
            background: var(--clr-tag);
            color: #282828;
            font-weight: 700;
            font-size: 0.8rem;
            padding: 6px 10px;
            border-radius: 3px;
          }

          .branding {
            color: #5c4038;
          }

          .packaging {
            color: #2a5554;
          }

          .marketing {
            color: #6d2f54;
          }

          .project-title {
            font-size: clamp(1.5rem, 1.3909rem + 0.4364vw, 1.8rem);
          }

          .project-description {
            margin: 10px 0 20px;
            color: #565656;
          }

          .dark .project-description {
            color: #a0a0a0;
          }
        `}</style>
      </section>
    </div>
  );
};

export default Projects;