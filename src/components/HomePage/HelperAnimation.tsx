"use client";
import { useScroll } from "framer-motion";
import React, { useRef, useState } from "react";
import HeroSection from "./Hero";
import About from "./About";

const HelperAnimation = ({
  scrollReady,
  setScrollReady,
}: {
  scrollReady: boolean;
  setScrollReady: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  // we create scroll only when ready
  const { scrollYProgress } = useScroll({
    // target: scrollReady ? targetRef : undefined,
    target: targetRef,
    offset: ["start start", "end end"],
  });
  return (
    <div>
      <main ref={targetRef} className="relative">
        {/* Hero Section */}
        <HeroSection scrollYProgress={scrollYProgress} />
        {/* About Section */}
        <About scrollYProgress={scrollYProgress} />
      </main>
    </div>
  );
};

export default HelperAnimation;
