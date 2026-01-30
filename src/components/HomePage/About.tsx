"use client";
import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { ArrowDownRight, Code2, Rocket, ArrowRight } from "lucide-react";
import { Orbitron, Inter } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroMe from "../../../public/heroBappy.png";

// --- Font Config ---
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// --- Register GSAP ---
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const containerRef = useRef(null);
  const textTrackRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Horizontal Text Scroll
      gsap.to(textTrackRef.current, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // 2. Image Reveal
      gsap.from(imageRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
        },
      });

      // 3. Content Stagger
      gsap.from(".reveal-text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      // FIX: Added 'orbitron.className' here so the font is applied globally to the section
      className={`w-full py-24 md:py-40 px-4 md:px-8 relative overflow-hidden transition-colors duration-300 ${orbitron.className} ${inter.variable}`}
      style={{ backgroundColor: "var(--page-bg)" }}
    >
      {/* --- CSS Variables --- */}
      <style jsx global>{`
        :root {
          --page-bg: #e5e7eb;
          --card-bg: #050505;
          --curve-size: 40px;
          --tab-height: 60px;
        }

        .dark {
          --page-bg: #020617;
          --card-bg: #050505;
        }

        /* Ensure font-orbitron class works if Tailwind config is missing */
        .font-orbitron {
          font-family: var(--font-orbitron), sans-serif;
        }
        .font-inter {
          font-family: var(--font-inter), sans-serif;
        }
      `}</style>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="relative w-full container mx-auto">
        {/* ================= TOP CENTER TAB (Black - BIO_DATA) ================= */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-30 w-[200px] flex justify-center transition-colors duration-300"
          style={{
            top: 0,
            marginTop: "calc(var(--tab-height) * -1)",
            height: "var(--tab-height)",
          }}
        >
          <div className="w-full h-full bg-[#050505] flex items-center justify-center rounded-t-3xl relative">
            {/* Left Connector */}
            <div
              className="absolute bottom-0 -left-[40px] w-[40px] h-[40px]"
              style={{
                backgroundImage: `radial-gradient(circle at 0 0, transparent 40px, #050505 40.5px)`,
              }}
            />
            {/* Right Connector */}
            <div
              className="absolute bottom-0 -right-[40px] w-[40px] h-[40px]"
              style={{
                backgroundImage: `radial-gradient(circle at 100% 0, transparent 40px, #050505 40.5px)`,
              }}
            />

            <span className="text-purple-500 font-bold tracking-[0.2em] text-sm ">
              ABOUT ME
            </span>
          </div>
        </div>

        {/* ================= THE CARD BODY ================= */}
        <div className="relative w-full bg-[#050505] min-h-[700px] rounded-[40px] z-20  flex flex-col items-center">
          {/* Background Wrapper */}
          <div className="absolute inset-0 overflow-hidden rounded-[40px] pointer-events-none">
            {/* --- PARALLAX TEXT --- */}
            <div className="absolute top-[5%] left-0 w-full select-none opacity-[0.03] z-0">
              <div
                ref={textTrackRef}
                className="whitespace-nowrap uppercase font-black text-[100px] md:text-[100px] leading-[0.8] text-white"
              >
                Developer & UI Enthusiast
              </div>
            </div>
            {/* --- GLOWS --- */}
            <div className="absolute hidden md:block top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
          </div>

          {/* ================= CONTENT GRID ================= */}
          <div
            ref={contentRef}
            className="relative z-10 w-full mt-20 md:mt-5  max-w-7xl px-6 md:px-12 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* --- LEFT SIDE: IMAGE --- */}
            <div
              ref={imageRef}
              className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] max-w-md mx-auto lg:mx-0"
            >
              <div className="absolute inset-0 border border-white/10 rounded-2xl transform translate-x-4 translate-y-4 z-0"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-2xl z-20 mix-blend-overlay pointer-events-none"></div>
              <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/5 bg-[#0a0a0a] z-10 md:not-only:grayscale hover:grayscale-0 transition-all duration-700 ease-out">
                <Image
                  src={heroMe}
                  alt="Profile"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* --- RIGHT SIDE: TEXT --- */}
            <div className="flex flex-col justify-center text-left space-y-8">
              <div className="reveal-text space-y-2">
                <div className="flex items-center gap-2 text-purple-400 text-xs tracking-[0.2em] uppercase mb-2">
                  <span className="w-8 h-[1px] bg-purple-400"></span>
                  Who I Am
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                  Crafting Digital <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    Excellence.
                  </span>
                </h2>
              </div>

              <div className="reveal-text space-y-6 text-gray-400 font-inter text-base md:text-lg leading-relaxed">
                <p>
                  {" "}
                  I am a frontend-focused web developer with over two years of
                  experience building clean, responsive, and user-friendly
                  interfaces. I specialize in UI development, focusing on
                  performance, accessibility, and maintainable code.
                </p>
                <p>
                  I work with modern JavaScript frameworks to deliver
                  production-ready frontend solutions and collaborate
                  effectively with backend systems when needed. I prioritize
                  clear, well-structured code and long-term quality in user
                  experience.
                </p>
              </div>

              {/* Metrics */}
              <div className="reveal-text grid grid-cols-2 gap-6 pt-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors group">
                  <Code2 className="text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-bold">Development</h4>
                  <p className="text-xs text-gray-500 mt-1 font-inter">
                    Clean, Scalable Code
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors group">
                  <Rocket className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-bold">Performance</h4>
                  <p className="text-xs text-gray-500 mt-1 font-inter">
                    Optimized & Fast
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM CENTER TAB (WHITE BUTTON) ================= */}
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
              View My Works
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
