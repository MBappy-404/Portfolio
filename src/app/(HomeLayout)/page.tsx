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
import { ThreeDScrollTriggerContainer, ThreeDScrollTriggerRow } from "@/components/HomePage/test/MarqueOnScroll";
import MarqueSkills from "@/components/HomePage/MarqueSkills";
import MaskScroll from "@/components/HomePage/test/MaskScroll";
import OverView from "@/components/HomePage/test/Overview";

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
             <MaskScroll />
            {/* Other Sections */}
            {/* <MarqueSkills/> */}
            <Experience />
            {/* <Skills /> */}
            <OverView/>
            <Projects />
            {/* <PricingSection /> */}
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
