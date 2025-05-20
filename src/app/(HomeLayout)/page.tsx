"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

import ParticleBackground from "@/components/particle-background";

import HeroSection from "@/components/HomePage/Hero";
import About from "@/components/HomePage/About";
import Skills from "@/components/HomePage/Skills";
import Projects from "@/components/HomePage/Projects";
import Contact from "@/components/HomePage/Contact";

export default function Home() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <div
        ref={targetRef}
        className="relative min-h-screen bg-gradient-to-b from-background via-background to-background/90 overflow-hidden"
      >
        <ParticleBackground />

        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#6c2bd9] z-50"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />

        {/* Hero Section */}

        <HeroSection />

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Projects Section */}
        <Projects />
        {/* Contact Section */}
        <Contact />
      </div>
    </>
  );
}
