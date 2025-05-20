"use client";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { ProjectCard } from "../project-card";
import { GlassmorphicCard } from "../glassmorphic-card";
import { useAllProjectsQuery } from "../redux/features/projects/adminApi";
const Projects = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  // Parallax effects

  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const springY2 = useSpring(y2, { stiffness: 100, damping: 25 });
  const springY3 = useSpring(y3, { stiffness: 100, damping: 20 });

  

  const {data: projects}= useAllProjectsQuery([])
  console.log(projects);
  
  
  return (
    <div>
      <section id="projects" className="py-32 relative">
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
            <span className="text-[#6c2bd9] text-sm font-medium uppercase tracking-wider">
              My Work
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Featured Projects
            </h2>
            <div className="w-16 h-1 bg-[#6c2bd9]/50 rounded-full mt-4" />
          </motion.div>

          {/* Featured Projects */}
          <div className="grid grid-cols-1 gap-16 mb-20">
            {projects?.data?.map((project: any, index: number) => (
                <motion.div
                  key={project?._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
          </div>

          {/* Other Projects */}
          {/* <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-center mb-12"
          >
            Other Noteworthy Projects
          </motion.h3> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* {projects?.data?.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassmorphicCard className="h-full p-6 hover:border-[#6c2bd9]/50 transition-colors group">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className="size-12 rounded-xl bg-[#6c2bd9]/10 flex items-center justify-center">
                          <span className="text-[#6c2bd9] text-xl font-bold">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex gap-3">
                          <Link
                            href={project.github}
                            className="text-muted-[#0a0a0d] hover:text-[#6c2bd9] transition-colors"
                          >
                            <Github size={20} />
                          </Link>
                          <Link
                            href={project.link}
                            className="text-muted-[#0a0a0d] hover:text-[#6c2bd9] transition-colors"
                          >
                            <ExternalLink size={20} />
                          </Link>
                        </div>
                      </div>

                      <h4 className="text-xl font-bold mb-2 group-hover:text-[#6c2bd9] transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-muted-[#0a0a0d] mb-6">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-[#6c2bd9]/10 text-[#6c2bd9] text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlassmorphicCard>
                </motion.div>
              ))} */}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
        </div>
      </section>
    </div>
  );
};

export default Projects;
