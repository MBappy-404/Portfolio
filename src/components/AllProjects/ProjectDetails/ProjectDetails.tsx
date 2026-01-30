"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  FiExternalLink,
  FiGithub,
  FiCode,
  FiLayout,
  FiClock,
  FiStar,
  FiX,
} from "react-icons/fi";
import { useState, useRef } from "react";
import { useGetProjectQuery } from "@/components/redux/features/projects/adminApi";


const ProjectDetails = ({ id }: { id: any }) => {
  const { data: projectsData, isLoading } = useGetProjectQuery(id);
  const project = projectsData?.data;

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900 flex items-center justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-full" />
        </div>
      </div>
    );

  if (!project)
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-4xl font-bold text-rose-500">Not Found</div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Requested project doesn't exist
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100">
      {/* Hero Section */}
      <section className="relative w-full container mx-auto px-4   aspect-[3/2] sm:aspect-[16/9] md:aspect-[2/1] lg:aspect-[17/8] mt-[75px] overflow-hidden">
        <motion.div

          className="absolute inset-0"
        >
          <Image
            src={project.projectImage}
            alt={project.projectName}
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t to-transparent dark:from-neutral-900 dark:via-neutral-900/40" />
        </motion.div>
      </section>

      {/* Content Grid */}
      <div className="container mx-auto px-4 lg:px-8 py-16 grid lg:grid-cols-[1fr_400px] gap-12  ">
        {/* Main Content */}
        <div className="space-y-16">
          <div className="   flex flex-col justify-end container mx-auto ">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl font-bold max-w-4xl">
                {project.projectName}
              </h1>
              <div className="flex gap-4">
                {project.liveProjectLink && (
                  <motion.a
                    target="_blank"
                    whileHover={{ y: -2 }}
                    href={project.liveProjectLink}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#6c2bd9] "
                  >
                    <FiExternalLink className="text-white" />
                    <span className=" text-neutral-200">Live Demo</span>
                  </motion.a>
                )}
                {project.frontendGitHubLink && (
                  <motion.a
                    target="_blank"
                    whileHover={{ y: -2 }}
                    href={project.frontendGitHubLink}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#6c2bd9] "
                  >
                    <FiGithub className="text-white" />
                    <span className=" text-neutral-200">Source Code</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>
          {/* Project Overview */}
          <section className="space-y-8">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-2 h-8 bg-[#6c2bd9] rounded-full" />
              <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
                Project Overview
              </h2>
            </div>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl dark:text-neutral-300">
              {project.projectDescription}
            </p>
          </section>

          {/* Key Features */}
          {/* {project.features?.length > 0 && (
            <section className="space-y-8">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full" />
                <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
                  Core Features
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {project.features.map((feature: string, index: number) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -4 }}
                    className="p-6 bg-neutral-50 rounded-xl border border-neutral-200 hover:border-cyan-400/30 transition-colors dark:bg-neutral-800 dark:border-neutral-700"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-cyan-500 pt-1 dark:text-cyan-400">
                        <FiStar className="text-xl" />
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-200">
                        {feature}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )} */}

          {/* Gallery */}
          {/* {project.additionalImages?.length > 0 && (
            <section className="space-y-8">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full" />
                <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
                  Gallery
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.additionalImages.map((img: string, index: number) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="aspect-square relative rounded-xl overflow-hidden cursor-pointer shadow-sm dark:shadow-none"
                    onClick={() => setSelectedImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors dark:bg-black/20" />
                  </motion.div>
                ))}
              </div>
            </section>
          )} */}
        </div>

        {/* Sidebar */}
        <div className="space-y-8 lg:sticky lg:top-20 lg:h-fit">
          {/* Project Meta */}
          <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
            <div className="space-y-6">
              {/* <div className="flex items-center gap-4">
                <FiClock className="text-cyan-500 dark:text-cyan-400 text-xl" />
                <div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    Completed
                  </div>
                  <div className="font-medium text-neutral-700 dark:text-neutral-200">
                    {formatDate(project.createdAt)}
                  </div>
                </div>
              </div> */}
              <div className="flex items-center gap-4">
                <FiLayout className="text-purple-500 dark:text-purple-400 text-xl" />
                <div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    Category
                  </div>
                  <div className="font-medium  capitalize text-neutral-700 dark:text-neutral-200">
                    {project.category}
                  </div>
                </div>
              </div>
              {project.client && (
                <div className="flex items-center gap-4">
                  <FiStar className="text-cyan-500 dark:text-cyan-400 text-xl" />
                  <div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      Client
                    </div>
                    <div className="font-medium text-neutral-700 dark:text-neutral-200">
                      {project.client}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tech Stack */}
          {project.technologies?.length > 0 && (
            <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
              <div className="flex items-center gap-4 mb-6">
                <FiCode className="text-purple-500 dark:text-purple-400 text-xl" />
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Technology Stack
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech: string) => (
                  <motion.div
                    key={tech}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-2 bg-neutral-100 rounded-lg text-sm font-medium text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
