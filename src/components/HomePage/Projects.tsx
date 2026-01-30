"use client";
import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Orbitron, Inter } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAllProjectsQuery } from "../redux/features/projects/adminApi";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Projects = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const router = useRouter();
  const { data: projects, isLoading } = useAllProjectsQuery([]);

  useLayoutEffect(() => {
    if (isLoading || !projects?.data || projects.data.length === 0) return;

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Project Items Animation
      const projectItems = gsap.utils.toArray(".project-item-wrapper");

      projectItems.forEach((item: any) => {
        const image = item.querySelector(".project-image");
        const textContent = item.querySelectorAll(".reveal-text");

        // Scroll Zoom Animation
        gsap.fromTo(
          image,
          { scale: 1.3 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom center",
              scrub: true,
            },
          }
        );

        // Text Animation
        gsap.from(textContent, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects, isLoading]);

  if (isLoading) return null;

  return (
    <section
      id="projects"
      ref={containerRef}
      className={`w-full py-24 md:py-40 px-2 md:px-8 relative overflow-visible transition-colors duration-300 ${orbitron.className} ${inter.variable}`}
      style={{ backgroundColor: "var(--page-bg)" }}
    >
      <style jsx global>{`
        :root {
          --page-bg: #E5E7EB;
          --card-bg: #050505;
          --curve-size: 40px; /* কার্ভ সাইজ */
        }
        .dark {
          --page-bg: #020617;
          --card-bg: #050505;
        }
        .font-inter {
          font-family: var(--font-inter), sans-serif;
        }
      `}</style>

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* HEADER */}
        <div ref={headerRef} className="mb-24 md:mb-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-purple-500 animate-pulse" />
            <span className="text-sm font-bold tracking-[0.3em] text-gray-500 dark:text-gray-400 uppercase font-orbitron">
              Portfolio
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-[0.9]">
            Selected <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
              Works.
            </span>
          </h2>
        </div>

        {/* PROJECTS GRID */}
        <div className="flex flex-col gap-32 md:gap-40">
          {projects?.data?.slice(0, 4).map((project: any, index: number) => {
            const isImageLeft = index % 2 === 0;

            return (
              <div
                key={project._id}
                className="project-item-wrapper grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
              >

                {/* --- IMAGE AREA --- */}
                <div className={`w-full relative order-1 ${isImageLeft ? 'lg:col-span-7 lg:order-1' : 'lg:col-span-7 lg:order-2'}`}>

                  {/* MASTER WRAPPER (Relative, No Overflow Hidden) */}
                  <div
                    className="relative w-full group cursor-pointer"
                    onClick={() => router.push(`/projects/${project._id}`)}
                  >

                    {/* 1. IMAGE CONTAINER (Rounded, Overflow Hidden) */}
                    <div className="relative w-full h-[300px] md:h-[450px] bg-[var(--card-bg)] rounded-[40px]  overflow-hidden z-10">
                      <Image
                        src={project.projectImage || "/placeholder.svg"}
                        alt={project.projectName}
                        fill
                        className="project-image object-cover object-center will-change-transform"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
                    </div>

                    {/* 2. THE HANGING TAB (Absolute, Outside Image Container) */}
                    {project.liveProjectLink && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 z-30 w-[280px] rotate-180 -translate-y-[60px] flex justify-center"
                        style={{
                          top: "100%",
                          height: "var(--tab-height)",
                        }}
                      >
                        {/* Button Background is WHITE */}
                        <button className="w-full h-full bg-[#e2e4e8] flex items-center justify-center rounded-b-3xl relative group cursor-pointer shadow-[0_10px_40px_-10px_rgba(255,255,255,0.2)]">

                          {/* Left Connector (Gradient to WHITE) */}
                          <div
                            className="absolute top-0 -left-[40px] w-[40px] h-[40px]"
                            style={{
                              backgroundImage: `radial-gradient(circle at 0 100%, transparent 40px, #e2e4e8 40.5px)`,
                            }}
                          />

                          {/* Right Connector (Gradient to WHITE) */}
                          <div
                            className="absolute top-0 -right-[40px] w-[40px] h-[40px]"
                            style={{
                              backgroundImage: `radial-gradient(circle at 100% 100%, transparent 40px, #e2e4e8 40.5px)`,
                            }}
                          />

                          {/* Icon Circle */}
                          <div className="bg-black/10 p-2 mr-2 -rotate-180 rounded-full group-hover:bg-purple-600 group-hover:text-white text-black transition-all duration-300">
                            <ArrowRight
                              size={18}
                              className="group-hover:-rotate-45 transition-transform duration-300"
                            />
                          </div>

                          {/* TEXT is BLACK */}
                          <span className="text-black font-extrabold tracking-widest text-sm uppercase group-hover:text-purple-600 transition-colors mr-3 -rotate-180">
                            Live Preview
                          </span>
                        </button>
                      </div>
                    )}

                  </div>
                </div>

                {/* --- TEXT AREA --- */}
                <div className={`flex flex-col justify-center order-2 ${isImageLeft ? 'lg:col-span-5 lg:order-2 lg:text-left lg:items-start' : 'lg:col-span-5 lg:order-1 lg:text-right lg:items-end'}`}>

                  <div className="reveal-text mb-4">
                    <span className="text-purple-500 font-orbitron font-bold text-sm tracking-[0.2em]">0{index + 1}</span>
                  </div>

                  <h3 className="reveal-text text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-6">
                    {project.projectName}
                  </h3>

                  <p className="reveal-text font-inter text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                    {project.projectDescription
                      ? project.projectDescription.slice(0, 120) + "..."
                      : "A premium digital experience focusing on performance and modern aesthetics."}
                  </p>

                  <div className={`reveal-text flex flex-wrap gap-2 mb-8 ${isImageLeft ? 'lg:justify-start' : 'lg:justify-end'}`}>
                    {project.technologies?.slice(0, 3).map((tech: string, i: number) => (
                      <span key={i} className="px-4 py-2 bg-gray-200 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="reveal-text">
                    <Link
                      href={`/projects/${project._id}`}
                      className="group inline-flex items-center gap-2 text-gray-900 dark:text-white font-bold uppercase tracking-widest border-b-2 border-transparent hover:border-purple-500 transition-all pb-1"
                    >
                      View Details <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* VIEW ALL BUTTON */}
        {projects?.data?.length > 4 && (
          <div className="flex justify-center mt-40">
            <Link
              href="/projects"
              className="group relative px-10 py-4 bg-transparent border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-full font-black tracking-[0.2em] uppercase hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 flex items-center gap-3"
            >
              All Projects <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;