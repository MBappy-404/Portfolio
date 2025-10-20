"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MarqueSkills from "../MarqueSkills";
import Paragraph from "./Charector";

gsap.registerPlugin(ScrollTrigger);

export default function LeonardoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [animationComplete, setAnimationComplete] = useState(false);

  const text = "DEV_BAPPY";

  // GSAP Scroll Animations
  useEffect(() => {
    if (textRef.current && imageRef.current && contentRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=3000",
            scrub: 1.5,
            pin: true,
          },
        });

        // Text scale-out
        tl.to(
          textRef.current,
          {
            scale: 25,
            opacity: 0,
            ease: "power2.inOut",
            duration: 3,
          },
          0
        );

        // Video fade-in after text scale
        tl.to(
          imageRef.current,
          {
            opacity: 1,
            duration: 1.5,
            ease: "power1.inOut",
            onStart: () => {
              const videoEl = imageRef.current?.querySelector("video") as HTMLVideoElement;
              if (videoEl) videoEl.play();
            },
          },
           // starts after 80% of the previous animation
        );

        // Image movement
        gsap.to(imageRef.current, {
          y: -400,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top+=1500 top",
            end: "+=1500",
            scrub: 1,
          },
        });

        // Next content fade-in
        gsap.fromTo(
          contentRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top bottom",
              end: "top center",
              scrub: 1,
            },
          }
        );

        // Set animation complete when timeline finishes
        tl.call(() => setAnimationComplete(true));
      });

      return () => ctx.revert();
    }
  }, [animationComplete]);

  return (
    <div className="relative w-full bg-black dark:bg-transparent mt-20 overflow-hidden rounded-[50px] lg:rounded-[100px]">
      <div ref={containerRef} className="relative min-h-screen w-full">
        {/* Background Video */}
         <div
          ref={imageRef}
          className="fixed inset-0 h-[90vh] mt-[80px] -z-10 opacity-0    "
        >
          <video
            ref={(el) => {
              if (el && animationComplete) el.play();
            }}
            muted
            playsInline
            className="w-full h-full   "
          >
            <source src="/myVedio.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* <div className="absolute inset-0 bg-black/40"></div> */}
        </div>

        {/* Text with scroll-based letter opacity */}
        <div className="h-screen w-full flex justify-center items-center pointer-events-none">
          <h2
            ref={textRef}
            className="text-[15vw] md:text-[15vw] lg:text-[10vw] font-bold text-center text-white"
          >
            <Paragraph paragraph={text} />
          </h2>
        </div>
      </div>

      {/* Next Content */}
      <div ref={contentRef} className="relative z-10 pb-8 opacity-0">
        <MarqueSkills />
      </div>
    </div>
  );
}
