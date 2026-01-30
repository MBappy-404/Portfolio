"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  Sparkles,
} from "lucide-react";
import heroMe from "../../../public/heroBappy.png";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";
import { Orbitron } from "next/font/google";

// --- Font Configuration ---
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
});

const HeroSection = () => {
  // --- Animation Variants ---
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
      className={`w-full min-h-screen flex items-center justify-center p-2 md:p-4 py-30 lg:p-8 relative overflow-hidden transition-colors duration-300 ${orbitron.className}`}
      style={{
        backgroundColor: 'var(--page-bg)',
      } as React.CSSProperties}
    >
      {/* --- CSS VARIABLES (STRICTLY ENFORCED BLACK CARD) --- */}
      <style jsx global>{`
        :root {
          /* Page Background changes, but CARD stays BLACK (#050505) */
          --page-bg: #E5E7EB; 
          --card-bg: #050505; 
          --text-main: #FFFFFF;
          --text-muted: #9CA3AF;
          
          /* --- MOBILE CONFIGURATION --- */
          --curve-size: 30px;    
          --tab-height: 50px;    
        }

        .dark {
          --page-bg: #020617; 
          --card-bg: #050505; 
        }

        @media (min-width: 768px) {
          :root {
            --curve-size: 50px;  
            --tab-height: 70px;  
          }
        }
      `}</style>


      {/* ================= MAIN CONTAINER ================= */}
      {/* Height is dynamic but constrained to fit viewport nicely */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full container mx-auto "
      >

        {/* ================= TOP LEFT TAB ================= */}
        <div
          className="absolute z-30 w-[60%] md:w-[50%] lg:w-[44%] 2xl:w-[53%] flex items-center justify-start pl-4 md:pl-10 pr-6 transition-colors duration-300"
          style={{
            backgroundColor: 'var(--card-bg)',
            top: 0,
            marginTop: 'calc(var(--tab-height) * -1)',
            height: 'var(--tab-height)',
            left: "0px",
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
          }}
        >


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

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2 absolute  left-1/2 lg:translate-x-[43%] 2xl:translate-x-[61%]  -translate-y-[5px] bg-black dark:bg-gray-800 backdrop-blur-md rounded-full p-2 border border-border/40 shadow-lg">

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

        {/* ================= MAIN CARD BODY ================= */}
        <div
          className="relative w-full h-full overflow-hidden py-10 z-20 shadow-2xl transition-colors duration-300 flex"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderTopRightRadius: "40px",
            borderBottomLeftRadius: "40px",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 w-full h-full">

            {/* --- LEFT CONTENT (Replaced with Code A Orbitron Content) --- */}
            {/* Spans 7 columns */}
            <div className="lg:col-span-7 flex flex-col justify-center px-6 md:px-16 py-12 lg:py-0 relative z-10 order-2 lg:order-1 h-full">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6 md:space-y-8"
              >
                {/* 1. Badge */}
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-sm w-fit">
                  <Sparkles size={14} className="text-purple-400" />
                  <span className="text-[10px] md:text-xs text-gray-300 tracking-[0.2em] font-medium uppercase">Co-Founder at AmeMaxIT</span>
                </motion.div>

                {/* 2. Name (Gradient & Font) */}
                <motion.div variants={itemVariants} className="relative">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 tracking-tighter leading-[0.9] select-none">
                    BAPPY
                  </h1>
                </motion.div>

                {/* 3. Role & Bio */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="w-12 h-1 bg-purple-500 rounded-full"></span>
                    Full Stack Developer
                  </h2>
                  <p className="font-sans text-base md:text-xl 2xl:text-2xl text-gray-400 leading-relaxed max-w-2xl border-l-2 border-white/10 pl-6">
                    I build modern web apps where code meets creativity, and every experience is crafted for speed, usability, and impact.
                  </p>
                </motion.div>

                {/* 4. Buttons */}
                {/* <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
                  <Link href="#projects" className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-80 transition duration-500"></div>
                    <button className="relative px-6 md:px-8 py-3 md:py-4 bg-[#0a0a0a] rounded-lg border border-white/10 flex items-center gap-3 text-white font-bold tracking-widest uppercase hover:bg-black transition-all text-sm md:text-base">
                      Explore <ArrowRight size={18} className="text-purple-500 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>

                  <Link href="/resume.pdf" className="px-6 md:px-8 py-3 md:py-4 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all font-bold tracking-widest uppercase flex items-center gap-2 text-sm md:text-base">
                    Resume <Download size={18} />
                  </Link>
                </motion.div> */}

                {/* 5. Socials */}
                <motion.div variants={itemVariants} className="flex items-center gap-6 pt-4 opacity-70">
                  <div className="h-[1px] w-12 bg-white/20"></div>
                  <div className="flex gap-6 text-gray-400">
                    <Link href="#" className="hover:text-purple-400 hover:scale-110 transition-all"><Github size={20} /></Link>
                    <Link href="#" className="hover:text-blue-400 hover:scale-110 transition-all"><Linkedin size={20} /></Link>
                    <Link href="#" className="hover:text-pink-400 hover:scale-110 transition-all"><Mail size={20} /></Link>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* --- RIGHT CONTENT (Image) - Spans 5 columns & Full Height --- */}
            <div className="lg:col-span-5 relative w-full h-[70vh] md:h-[60vh]  2xl:h-[70vh]  order-1 lg:order-2 overflow-hidden">
              {/* Full Cover Image */}
              <Image
                src={heroMe}
                alt="Bappy"
                fill
                className="object-cover object-center  "
                priority
              />

              {/* 1. Nebula Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent mix-blend-overlay" />

              {/* 2. Bottom Gradient (Black to Transparent) for blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent lg:via-[#050505]/20" />

              {/* 3. Left Gradient (Desktop blending) */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent hidden lg:block" />
            </div>

          </div>
        </div>

        {/* ================= BOTTOM RIGHT TAB ================= */}
        <div
          className="absolute z-20 w-[42%] sm:w-[300px] lg:w-[80%] 2xl:w-[80%] flex items-center justify-between pr-6 pl-6 transition-colors duration-300"
          style={{
            backgroundColor: 'var(--card-bg)',
            top: '100%',
            height: 'var(--tab-height)',
            right: "0px",
            borderBottomLeftRadius: "24px",
            borderBottomRightRadius: "24px",
          }}
        >
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

          className="md:flex absolute bg-black dark:bg-gray-800 w-[55%] md:w-[19%] py-3 md:py-4 translate-y-2 flex justify-center text-base md:text-lg rounded-full text-white items-center gap-2 font-medium transition-colors group"

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