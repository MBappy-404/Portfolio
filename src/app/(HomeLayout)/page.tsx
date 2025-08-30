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
// import TestSection from "@/components/HomePage/test/TestSection";

export default function Home() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const LocomotiveScroll = (await import("locomotive-scroll")).default;
  //     const locomotiveScroll = new LocomotiveScroll();

  //     setTimeout(() => {
  //       setIsLoading(false);
  //       document.body.style.cursor = "default";
  //       window.scrollTo(0, 0);
  //     }, 2000);
  //   })();
  // }, []);

  return (
    <div
      // ref={targetRef}
      className="relative min-h-screen bg-gradient-to-b from-background via-background to-background/90 overflow-hidden"
    >
      <ParticleBackground />

      {/* Progress bar */}
      {/* <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#6c2bd9] z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      /> */}

      {/* <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" />
        ) : ( */}
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <main ref={targetRef} className="relative ">
              {/* Hero Section */}
              <HeroSection scrollYProgress={scrollYProgress} />
              {/* About Section */}
              <About scrollYProgress={scrollYProgress} />
            </main>
            {/* <TestSection/> */}
            {/* Experience Section */}
            <Experience />
            {/* Skills Section */}
            <Skills />
            {/* Projects Section */}
            <Projects />
            {/* Pricing Section */}
            <PricingSection />
            {/* Contact Section */}
            <Contact />
          </motion.div>
        {/* )} */}
      {/* </AnimatePresence> */}
    </div>
  );
}
