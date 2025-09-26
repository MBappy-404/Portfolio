"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
 
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAllProjectsQuery } from "../redux/features/projects/adminApi";

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [navigateAfter, setNavigateAfter] = useState<string | null>(null);
  const [blurStart, setBlurStart] = useState(false);
  const router = useRouter();
  const { data: projects } = useAllProjectsQuery([]);

  const handleCardClick = (id: string, e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const cardRect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    const offsetX =
      containerRect.left + containerRect.width / 2 - (cardRect.left + cardRect.width / 2);
    const offsetY =
      containerRect.top + containerRect.height / 2 - (cardRect.top + cardRect.height / 2);

    setTransform({ x: offsetX, y: offsetY });
    setSelectedId(id);
    setNavigateAfter(id); // track which page to navigate after animations
    setBlurStart(false); // reset blur state
  };

  const resetZoom = () => {
    setSelectedId(null);
    setTransform({ x: 0, y: 0 });
    setBlurStart(false);
    setNavigateAfter(null);
  };

  return (
    <div>
      <section id="projects" className="py-32 relative">
        {/* Grid Container */}
        <motion.div
          ref={containerRef}
          animate={{
            scale: selectedId ? 1.3 : 1,
            x: selectedId ? transform.x : 0,
            y: selectedId ? transform.y : 0,
          }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          onAnimationComplete={() => {
            if (selectedId && !blurStart) {
              setBlurStart(true); // start blur after scale animation
            }
          }}
          className="container mx-auto px-4 relative z-10"
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-2 items-center text-center mb-16"
          >
            <span className="text-[#6c2bd9] text-sm font-medium uppercase tracking-wider">
              My Work
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">Featured Projects</h2>
            <div className="w-16 h-1 bg-[#6c2bd9]/50 rounded-full mt-4" />
          </motion.div>

          {/* Projects Grid */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20 relative">
            {projects?.data?.map((project: any, index: number) => (
              <motion.div
                key={project._id}
                onClick={(e) =>
                  selectedId === project._id
                    ? resetZoom()
                    : handleCardClick(project._id, e)
                }
                className="group cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black border border-gray-200 dark:border-gray-800 shadow-xl"
                style={{ transformOrigin: "center center" }}
                animate={{
                  scale: selectedId === project._id ? 2.5 : 1,
                  zIndex: selectedId === project._id ? 30 : 1,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <motion.div
                    className="relative w-full h-full"
                    animate={{
                      filter: blurStart && selectedId === project._id ? "blur(50px)" : "blur(0px)",
                    }}
                    transition={{ duration: 0.8 }}
                    onAnimationComplete={() => {
                      // navigate after blur animation finishes
                      if (blurStart && navigateAfter === project._id) {
                        router.push(`/projects/${project._id}`);
                      }
                    }}
                  >
                    <Image
                      src={project.projectImage || "/placeholder.svg"}
                      alt={project.projectName}
                      fill
                      className="object-cover"
                      priority={index < 3}
                    />
                  </motion.div>

                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/40"
                    animate={{
                      opacity: selectedId === project._id ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Close button */}
                  {selectedId === project._id && (
                    <motion.button
                      className="absolute top-4 right-4 z-40 p-2 bg-black/50 text-white rounded-full backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        resetZoom();
                      }}
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
                    >
                      ✕
                    </motion.button>
                  )}
                </div>

                {/* Content */}
                <motion.div
                  className="p-6 flex items-center gap-2"
                  animate={{
                    opacity: selectedId === project._id ? 0 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-[#232336] dark:text-white">
                    {project.projectName}
                  </h3>
                  <span className="text-[#6c2bd9] ml-2 opacity-100">➝</span>
                </motion.div>

                <p className="px-6 pb-6 text-gray-600 dark:text-gray-300">
                  {project.projectDescription?.slice(0, 100)}...
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* View all */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            animate={{ opacity: selectedId ? 0 : 1 }}
            className="flex justify-center mt-16"
          >
            <Link
              href={"/projects"}
              className="group inline-flex items-center gap-2 text-[#6c2bd9] hover:text-[#6c2bd9]/80 font-medium"
            >
              View All Projects
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Projects;
