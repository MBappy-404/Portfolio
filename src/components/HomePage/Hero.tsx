"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Palette,
  Download,
  Github,
  Linkedin,
  Mail,
  Compass, // Added Compass Icon
  ArrowUp
} from "lucide-react";
import heroMe from "../../../public/heroBappy.png";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  const pathName = usePathname();
  const sections = [
    { name: "home", pathname: "/" },
    { name: "projects", pathname: "/projects" },
    { name: "blogs", pathname: "/blogs" },
    { name: "contact", pathname: "/contact" },
  ];
  return (
    <section
      className="w-full flex items-center justify-center p-4 md:p-8 relative overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: 'var(--page-bg)',
        color: 'var(--text-main)'
      } as React.CSSProperties}
    >
      {/* --- CSS VARIABLES FOR THEME & RESPONSIVE SIZING --- */}
      <style jsx global>{`
        :root {
          /* Theme Colors */
          --page-bg: #F3F4F6;
          --card-bg: black;
          --text-main: #111827;
          --text-muted: #4B5563;
          --border-color: rgba(0,0,0,0.1);

          /* --- MOBILE CONFIGURATION (Default) --- */
          --curve-size: 30px;    /* ছোট কার্ভ মোবাইলের জন্য */
          --tab-height: 50px;    /* ট্যাবের উচ্চতা */
        }

        .dark {
          --page-bg: #030014;
          --card-bg: #101828;
          --text-main: #FFFFFF;
          --text-muted: #9CA3AF;
          --border-color: rgba(255,255,255,0.1);
        }

        /* --- DESKTOP CONFIGURATION (md screens and up) --- */
        @media (min-width: 768px) {
          :root {
            --curve-size: 50px;  /* বড় কার্ভ ডেস্কটপের জন্য */
            --tab-height: 70px;  /* বড় ট্যাব */
          }
        }
      `}</style>

      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-color)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full container mx-auto mt-16 mb-20 md:my-20 "
      >

        {/* ================= TOP LEFT TAB ================= */}
        <div
          className="absolute z-20 w-[50%] sm:w-[350px] md:w-[55%]  flex items-center justify-start pl-6 md:pl-10 pr-6 transition-colors duration-300"
          style={{
            backgroundColor: 'var(--card-bg)',
            top: 'calc(var(--tab-height) * -1)',
            height: 'var(--tab-height)',
            left: "0px",
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
          }}
        >
          <div className="flex items-center h-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 text-xs font-medium border border-purple-500/20 whitespace-nowrap">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Founder of Ame Max
            </div>
          </div>

          {/* TOP TAB INVERTED CORNER */}
          <div
            className="absolute bottom-0 pointer-events-none"
            style={{
              right: 'calc(var(--curve-size) * -1)',
              width: 'var(--curve-size)',
              height: 'var(--curve-size)',
              backgroundImage: `radial-gradient(circle at 100% 0, transparent var(--curve-size), var(--card-bg) calc(var(--curve-size) + 0.5px))`,
            }}
          />

          {/* Top Navigation (Floating) */}
          <nav className="hidden md:flex items-center gap-2 absolute  left-1/2 translate-x-[70%]  -translate-y-[5px] bg-black dark:bg-gray-800 backdrop-blur-md rounded-full p-2 border border-border/40 shadow-lg">
            {sections.map((section) => {
              const isActive = pathName === section.pathname;
              return (
                <Link
                  key={section.pathname}
                  href={section.pathname}
                  className={cn(
                    "relative px-6 py-2.5 text-base font-medium transition-colors rounded-full duration-300",
                    isActive
                      ? "text-black "
                      : "text-muted-foreground hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-gray-300 rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 capitalize">{section.name}</span>
                </Link>
              );
            })}
            <div className="w-[1px] h-6 bg-border/50 mx-2"></div>
            <Link
              href="/resume.pdf"
              target="_blank"
              className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground rounded-full transition-all duration-300 font-medium text-sm border border-border/50"
            >
              Resume <Download size={16} />
            </Link>
            <ThemeToggle />
          </nav>
        </div>

        {/* ================= MAIN CARD ================= */}
        <div
          className="relative w-full overflow-hidden z-10 shadow-2xl transition-colors duration-300"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderTopRightRadius: "40px",
            borderBottomLeftRadius: "40px",
            minHeight: "550px",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 md:p-16">
            {/* LEFT CONTENT */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 order-2 lg:order-1"
            >
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                style={{ color: 'var(--text-main)' }}
              >
                Hi, I'm <br />
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                  Bappy
                </span>
              </motion.h1>
              <motion.h2
                variants={itemVariants}
                className="text-xl md:text-2xl font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                Full Stack Developer &{" "}
                <span className="border-b-2 border-purple-500 text-purple-600 dark:text-white">
                  UI Enthusiast
                </span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="max-w-lg text-base md:text-lg leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                I build modern web apps where{" "}
                <span className="text-purple-600 dark:text-purple-300 font-medium">
                  code meets creativity
                </span>, crafting pixel-perfect digital experiences.
              </motion.p>

              <motion.div variants={itemVariants} className="flex items-center gap-6 pt-6 border-t border-gray-200 dark:border-white/10">
                <Link href="#" className="text-gray-400 hover:text-purple-500 transition-colors"><Github size={20} /></Link>
                <Link href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><Linkedin size={20} /></Link>
                <Link href="#" className="text-gray-400 hover:text-pink-500 transition-colors"><Mail size={20} /></Link>
              </motion.div>
            </motion.div>
            {/* RIGHT IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center lg:justify-end order-1 lg:order-2"
            >
              <div className="relative w-[260px] sm:w-[300px] md:w-[380px] aspect-square">
                <div className="absolute inset-0 rotate-6 rounded-[40px] bg-purple-600/20" />
                <div className="absolute inset-0 -rotate-3 rounded-[40px] border border-purple-500/20" />
                <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-gray-900 border border-white/10 shadow-2xl">
                  <Image
                    src={heroMe}
                    alt="Bappy"
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-4 left-4 bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20"
                  >
                    <Code2 className="text-purple-400" size={20} />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20"
                  >
                    <Palette className="text-pink-400" size={20} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ================= BOTTOM RIGHT TAB ================= */}
        <div
          className="absolute z-20 w-[42%] sm:w-[300px] md:w-[83%] flex items-center justify-between pr-6 pl-6 transition-colors duration-300"
          style={{
            backgroundColor: 'var(--card-bg)',
            top: '100%',
            height: 'var(--tab-height)',
            right: "0px",
            borderBottomLeftRadius: "24px",
            borderBottomRightRadius: "24px",
          }}
        >

          {/* LEFT SIDE: Explore Button (Added) */}





          {/* BOTTOM TAB INVERTED CORNER */}
          <div
            className="absolute top-0 pointer-events-none"
            style={{
              left: 'calc(var(--curve-size) * -1)',
              width: 'var(--curve-size)',
              height: 'var(--curve-size)',
              backgroundImage: `radial-gradient(circle at 0 100%, transparent var(--curve-size), var(--card-bg) calc(var(--curve-size) + 0.5px))`,
            }}
          />

        </div>
        <Link
          href="#projects"
          className="  md:flex  absolute bg-black dark:bg-gray-800 w-[55%] md:w-[16%] py-3 md:py-4 translate-y-2 flex  justify-center text-base md:text-lg rounded-full text-white items-center gap-2  font-medium  transition-colors group"
        >
          Explore Portfolio
          <span className="bg-purple-500/10 p-1.5 rounded-full group-hover:bg-purple-500 group-hover:text-white transition-all">
            <ArrowUp size={16} className="group-hover:rotate-45 transition-transform" />
          </span>

        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;