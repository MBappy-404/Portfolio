"use client";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ProjectCard } from "../project-card";
import { useAllProjectsQuery } from "../redux/features/projects/adminApi";
import AllProjectsSkeleton from "./ProjectSPinner";

const AllProjects = () => {
  const targetRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Enhanced parallax effects
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const springY2 = useSpring(y2, { stiffness: 100, damping: 25 });
  const springY3 = useSpring(y3, { stiffness: 100, damping: 20 });

  const { data: projects, isLoading } = useAllProjectsQuery([]);

  // Get unique categories from projects
  const uniqueCategories =
    Array.from(
      new Set(projects?.data?.map((project: any) => project.category))
    ) || [];

  // Filter projects based on selected category
  const filteredProjects = projects?.data?.filter(
    (project: any) =>
      selectedCategory === "ALL" || project.category === selectedCategory
  );

  return (
    <div>
      <section id="projects" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            style={{ y: springY2 }}
            className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#6c2bd9]/10 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: springY3 }}
            className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#c957d1]/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-2 items-center text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold">My Projects</h2>
            <div className="w-16 h-1 bg-[#6c2bd9]/50 rounded-full mt-4" />
          </motion.div>

          {/* Category Tabs */}
          <div className="mb-16 ">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-wrap gap-4 justify-center font-medium"
            >
              {["ALL", ...uniqueCategories].map((category: any) => (
                <button
                  key={category?._id}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 uppercase cursor-pointer py-2 rounded-full transition-colors ${
                    selectedCategory === category
                      ? "bg-[#6c2bd9] text-white"
                      : "bg-[#6c2bd9]/10 dark:text-[#8046e5] text-[#6c2bd9] hover:bg-[#6c2bd9]/20"
                  }`}
                >
                  {category}
                </button>
              ))}

              {isLoading &&
                Array.from({ length: 4 }).map((_, i) => (
                  <div className="px-12 py-2 rounded-full animate-pulse bg-[#6c2bd9]/10 text-[#6c2bd9] hover:bg-[#6c2bd9]/20"></div>
                ))}
            </motion.div>
          </div>

          {isLoading ? (
            <AllProjectsSkeleton />
          ) : (
            <div className="grid grid-cols-1 gap-16 mb-20">
              {filteredProjects?.map((project: any, index: number) => (
                <motion.div
                  key={project?._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllProjects;
