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

export default function Home() {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [scrollReady, setScrollReady] = useState(false);

  // we create scroll only when ready
  const { scrollYProgress } = useScroll({
    target: scrollReady ? targetRef : undefined,
    offset: ["start start", "end end"],
  });

   useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      new LocomotiveScroll();

      // preloader timeout
      setTimeout(() => {
        setIsLoading(false);

        // ensure next tick ref is mounted
        setTimeout(() => {
          setScrollReady(true);
        }, 50);

        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-background to-background/90 overflow-hidden">
      <ParticleBackground />

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
            <main ref={targetRef} className="relative">
              {/* Hero Section */}
              <HeroSection scrollYProgress={scrollYProgress} />
              {/* About Section */}
              <About scrollYProgress={scrollYProgress} />
            </main>

            {/* Other Sections */}
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
