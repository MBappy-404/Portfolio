"use client";
import React, { useRef, useLayoutEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, Sparkles, Layers } from "lucide-react";
import { Orbitron, Inter } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAllProjectsQuery } from "../redux/features/projects/adminApi";

// 1. Font Configuration
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// 2. Register GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 3. Data Fetching
  const { data: projects, isLoading } = useAllProjectsQuery([]);
  const [activeFilter, setActiveFilter] = useState("All");

  // 4. Filter Logic
  const categories = useMemo(() => {
    if (!projects?.data) return ["All"];
    const allCategories = projects.data.map(
      (project: any) => project.category || "Uncategorized",
    );
    return ["All", ...new Set(allCategories)] as string[];
  }, [projects?.data]);

  const filteredProjects = useMemo(() => {
    if (!projects?.data) return [];
    if (activeFilter === "All") return projects.data;
    return projects.data.filter(
      (project: any) => project.category === activeFilter,
    );
  }, [projects?.data, activeFilter]);

  // 5. GSAP Animation Effect
  useLayoutEffect(() => {
    if (isLoading || !filteredProjects.length) return;

    // Small delay to allow DOM to render before GSAP calculates positions
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const ctx = gsap.context(() => {
      // Animate Items
      const projectItems = gsap.utils.toArray(".project-item-wrapper");

      projectItems.forEach((item: any) => {
        const image = item.querySelector(".project-image");
        const textContent = item.querySelectorAll(".reveal-text");

        // Image Zoom on Scroll
        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.2 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom center",
                scrub: true,
              },
            },
          );
        }

        // Text Reveal
        gsap.fromTo(
          textContent,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [filteredProjects, isLoading, activeFilter]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className={`min-h-screen w-full py-32 md:py-40 px-4 md:px-8 relative bg-gray-50 dark:bg-[#020617] transition-colors duration-300 ${orbitron.variable} ${inter.variable}`}
    >
      {/* Global Styles for this component */}
      <style jsx global>{`
        :root {
          --card-bg: #ffffff;
        }
        .dark {
          --card-bg: #050505;
        }
        .font-inter {
          font-family: var(--font-inter), sans-serif;
        }
        .font-orbitron {
          font-family: var(--font-orbitron), sans-serif;
        }
      `}</style>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* --- HEADER --- */}
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-purple-600 animate-pulse" />
            <span className="text-sm font-bold tracking-[0.3em] text-gray-500 dark:text-gray-400 uppercase font-orbitron">
              Portfolio
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-tight font-orbitron">
            Selected <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              Works.
            </span>
          </h2>

          {/* --- FILTER TABS --- */}
          <div className="mt-12 flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 border font-orbitron ${
                  activeFilter === category
                    ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black dark:border-white shadow-lg scale-105"
                    : "bg-transparent text-gray-500 border-gray-300 dark:border-gray-800 dark:text-gray-400 hover:border-purple-500 hover:text-purple-500"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* --- LOADING SKELETON --- */}
        {isLoading && (
          <div className="space-y-32">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-[400px] w-full bg-gray-200 dark:bg-gray-900 rounded-[40px] animate-pulse"
              />
            ))}
          </div>
        )}

        {/* --- NO RESULTS --- */}
        {!isLoading && filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <Layers className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
            <h3 className="text-xl font-orbitron text-gray-500">
              No projects found in this category.
            </h3>
          </div>
        )}

        {/* --- PROJECTS LIST --- */}
        <div className="flex flex-col gap-32 md:gap-48 pb-20">
          {filteredProjects.map((project: any, index: number) => {
            // Determine layout direction (Zig Zag)
            const isImageLeft = index % 2 === 0;

            return (
              <div
                key={project._id}
                className="project-item-wrapper grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center group/item"
              >
                {/* === IMAGE SECTION === */}
                <div
                  className={`w-full relative order-1 ${isImageLeft ? "lg:col-span-7 lg:order-1" : "lg:col-span-7 lg:order-2"}`}
                >
                  {/* Click to Navigate */}
                  <div
                    className="relative w-full cursor-pointer perspective-1000"
                    onClick={() => router.push(`/projects/${project._id}`)}
                  >
                    {/* Main Image Container */}
                    <div className="relative w-full h-[300px] md:h-[500px] bg-gray-100 dark:bg-[#0A0A0A] rounded-[30px] md:rounded-[50px] overflow-hidden z-10 shadow-2xl shadow-gray-200/50 dark:shadow-purple-900/10 border border-gray-200 dark:border-gray-800">
                      <Image
                        src={project.projectImage || "/placeholder.svg"}
                        alt={project.projectName}
                        fill
                        className="project-image object-cover object-center will-change-transform"
                      />
                      {/* Dark Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/20 transition-colors duration-500" />
                    </div>

                    {/* === HANGING LIVE TAB === */}
                    {project.liveProjectLink && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 z-30 w-[240px] md:w-[280px] rotate-180 -translate-y-[60px] flex justify-center hidden md:flex"
                        style={{ top: "100%", height: "60px" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.liveProjectLink, "_blank");
                        }}
                      >
                        <button className="w-full h-full bg-white dark:bg-[#e2e4e8] flex items-center justify-center rounded-b-3xl relative group cursor-pointer shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]">
                          {/* Connectors to simulate organic curve */}
                          <div className="absolute top-0 -left-[40px] w-[40px] h-[40px] bg-[radial-gradient(circle_at_0_100%,transparent_40px,#ffffff_40.5px)] dark:bg-[radial-gradient(circle_at_0_100%,transparent_40px,#e2e4e8_40.5px)]" />
                          <div className="absolute top-0 -right-[40px] w-[40px] h-[40px] bg-[radial-gradient(circle_at_100%_100%,transparent_40px,#ffffff_40.5px)] dark:bg-[radial-gradient(circle_at_100%_100%,transparent_40px,#e2e4e8_40.5px)]" />

                          {/* Content (Rotated back) */}
                          <div className="-rotate-180 flex items-center gap-2">
                            <div className="bg-black/5 p-2 rounded-full group-hover:bg-purple-600 group-hover:text-white text-black transition-all duration-300">
                              <ArrowRight
                                size={16}
                                className="group-hover:-rotate-45 transition-transform duration-300"
                              />
                            </div>
                            <span className="text-gray-900 font-extrabold tracking-widest text-xs uppercase group-hover:text-purple-600 transition-colors font-orbitron">
                              Live Preview
                            </span>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* === TEXT CONTENT SECTION === */}
                <div
                  className={`flex flex-col justify-center order-2 ${isImageLeft ? "lg:col-span-5 lg:order-2 lg:text-left lg:items-start" : "lg:col-span-5 lg:order-1 lg:text-right lg:items-end"}`}
                >
                  {/* Index Number */}
                  <div className="reveal-text mb-4 overflow-hidden">
                    <span className="text-purple-600 font-orbitron font-bold text-sm tracking-[0.2em] flex items-center gap-2">
                      {isImageLeft ? (
                        ""
                      ) : (
                        <span className="h-[1px] w-8 bg-purple-600"></span>
                      )}
                      0{index + 1}
                      {isImageLeft ? (
                        <span className="h-[1px] w-8 bg-purple-600"></span>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="reveal-text text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-6 font-orbitron leading-[1.1]">
                    {project.projectName}
                  </h3>

                  {/* Description */}
                  <p className="reveal-text font-inter text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                    {project.projectDescription
                      ? project.projectDescription.length > 150
                        ? project.projectDescription.slice(0, 150) + "..."
                        : project.projectDescription
                      : "A premium digital experience focusing on performance and modern aesthetics."}
                  </p>

                  {/* Technologies */}
                  <div
                    className={`reveal-text flex flex-wrap gap-2 mb-10 ${isImageLeft ? "lg:justify-start" : "lg:justify-end"}`}
                  >
                    {project.technologies
                      ?.slice(0, 4)
                      .map((tech: string, i: number) => (
                        <span
                          key={i}
                          className="px-4 py-1.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 font-orbitron"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>

                  {/* Case Study Button */}
                  <div className="reveal-text">
                    <Link
                      href={`/projects/${project._id}`}
                      className="group inline-flex items-center gap-2 text-gray-900 dark:text-white font-bold uppercase tracking-widest text-sm relative overflow-hidden font-orbitron"
                    >
                      <span className="border-b-2 border-transparent group-hover:border-purple-500 transition-all pb-1">
                        Case Study
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="text-purple-500 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
