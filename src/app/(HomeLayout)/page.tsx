"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";

import ParticleBackground from "@/components/particle-background";
import HeroSection from "@/components/HomePage/Hero";
import About from "@/components/HomePage/About";
import Skills from "@/components/HomePage/Skills";
import Projects from "@/components/HomePage/Projects";
import Contact from "@/components/HomePage/Contact";
import Experience from "@/components/HomePage/Experience";
import PricingSection from "@/components/HomePage/Pricing";
import Preloader from "@/components/Preloader";
import HelperAnimation from "@/components/HomePage/HelperAnimation";
import { ThreeDScrollTriggerContainer, ThreeDScrollTriggerRow } from "@/components/HomePage/test/TestSection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollReady, setScrollReady] = useState(false);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        setScrollReady(true);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-background to-background/90 overflow-hidden">
      {/* <ParticleBackground /> */}

      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <HelperAnimation
              scrollReady={scrollReady}
              setScrollReady={setScrollReady}
            />
            {/* Other Sections */}

<ThreeDScrollTriggerContainer className="my-20 ">
  {/* Row 1 - Frontend */}
  <ThreeDScrollTriggerRow baseVelocity={5} direction={1}>
    <div className="flex items-center mx-5 justify-center w-28 h-28 gap-5 rounded-2xl shadow-lg bg-[#61DAFB]/10 border border-[#61DAFB]/40">
      <span className="text-[#61DAFB] font-bold">React</span>
    </div>
    <div className="flex items-center mx-5 justify-center w-28 h-28 rounded-2xl shadow-lg bg-gray-900/80 border border-gray-800/70">
      <span className="text-gray-200 font-bold">Next.js</span>
    </div>
    <div className="flex items-center mx-5 justify-center w-28 h-28 rounded-2xl shadow-lg bg-[#38BDF8]/10 border border-[#38BDF8]/40">
      <span className="text-[#38BDF8] font-bold">Tailwind</span>
    </div>
    <div className="flex items-center mx-5 justify-center w-28 h-28 rounded-2xl shadow-lg bg-[#3178C6]/10 border border-[#3178C6]/40">
      <span className="text-[#3178C6] font-bold">TypeScript</span>
    </div>
  </ThreeDScrollTriggerRow>

  {/* Row 2 - Backend & DB */}
  <ThreeDScrollTriggerRow baseVelocity={3} direction={-1} className="my-12">
    <div className="flex items-center mx-5 justify-center w-28 h-28 rounded-2xl shadow-lg bg-[#68A063]/10 border border-[#68A063]/40">
      <span className="text-[#68A063] font-bold">Node.js</span>
    </div>
    <div className="flex items-center mx-5 justify-center w-28 h-28 rounded-2xl shadow-lg bg-gray-900/80 border border-gray-800/70">
      <span className="text-gray-200 font-bold">Express</span>
    </div>
    <div className="flex items-center mx-5 justify-center w-28 h-28 rounded-2xl shadow-lg bg-[#47A248]/10 border border-[#47A248]/40">
      <span className="text-[#47A248] font-bold">MongoDB</span>
    </div>
    <div className="flex items-center mx-5 justify-center w-28 h-28 rounded-2xl shadow-lg bg-[#0C344B]/10 border border-[#0C344B]/40">
      <span className="text-[#0C344B] font-bold">Prisma</span>
    </div>
    <div className="flex items-center mx-5 justify-center w-28 h-28 rounded-2xl shadow-lg bg-[#336791]/10 border border-[#336791]/40">
      <span className="text-[#336791] font-bold">PostgreSQL</span>
    </div>
    <div className="flex items-center mx-5 justify-center w-28 h-28 rounded-2xl shadow-lg bg-[#EF4444]/10 border border-[#EF4444]/40">
      <span className="text-[#EF4444] font-bold">JWT</span>
    </div>
  </ThreeDScrollTriggerRow>

  {/* Row 3 - Tools */}
  <ThreeDScrollTriggerRow baseVelocity={6} direction={1}>
    <div className="flex items-center mx-5 justify-center w-28 h-28 rounded-2xl shadow-lg bg-[#181717]/10 border border-[#181717]/40">
      <span className="text-gray-200 font-bold">GitHub</span>
    </div>
    <div className="flex items-center mx-5 justify-center w-28 h-28 rounded-2xl shadow-lg bg-[#007ACC]/10 border border-[#007ACC]/40">
      <span className="text-[#007ACC] font-bold">VS Code</span>
    </div>
    <div className="flex items-center mx-5 justify-center w-28 h-28 rounded-2xl shadow-lg bg-gray-900/80 border border-gray-800/70">
      <span className="text-gray-200 font-bold">Vercel</span>
    </div>
    <div className="flex items-center mx-5 justify-center w-28 h-28 rounded-2xl shadow-lg bg-[#FF6C37]/10 border border-[#FF6C37]/40">
      <span className="text-[#FF6C37] font-bold">Postman</span>
    </div>
    <div className="flex items-center mx-5 justify-center w-28 h-28 rounded-2xl shadow-lg bg-[#E34F26]/10 border border-[#E34F26]/40">
      <span className="text-[#E34F26] font-bold">HTML5</span>
    </div>
    <div className="flex items-center mx-5 justify-center w-28 h-28 rounded-2xl shadow-lg bg-[#1572B6]/10 border border-[#1572B6]/40">
      <span className="text-[#1572B6] font-bold">CSS3</span>
    </div>
  </ThreeDScrollTriggerRow>
</ThreeDScrollTriggerContainer>


            <Experience />
            <Skills />
            <Projects />
            <PricingSection />
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
