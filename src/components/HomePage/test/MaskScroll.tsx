"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MarqueSkills from "../MarqueSkills";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function LeonardoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState("");
  const [animationComplete, setAnimationComplete] = useState(false);

  const targetText = "DEV_BAPPY";

  // Decrypting effect on scroll into view
  useEffect(() => {
    let triggered = false;
    let interval: NodeJS.Timeout | null = null;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const startDecrypt = () => {
      if (triggered) return;
      triggered = true;
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText(() =>
          targetText
            .split("")
            .map((char, i) => {
              if (i < iteration) return targetText[i];
              if (char === " ") return " ";
              return letters[Math.floor(Math.random() * 26)];
            })
            .join("")
        );
        iteration += 0.5;
        if (iteration >= targetText.length) {
          if (interval) clearInterval(interval);
          setDisplayText(targetText);
          setAnimationComplete(true);
        }
      }, 100);
    };

    let st: ScrollTrigger | undefined;
    if (containerRef.current) {
      st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        once: true,
        onEnter: startDecrypt,
      });
    }
    return () => {
      if (interval) clearInterval(interval);
      if (st) st.kill();
    };
    // eslint-disable-next-line
  }, []);

  // GSAP Scroll Animations
  useEffect(() => {
    if (animationComplete && textRef.current && imageRef.current && contentRef.current) {
      const ctx = gsap.context(() => {
        // Text scaling animation - acts as mask
        gsap.to(textRef.current, {
          scale: 30,
          opacity: 0,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=2000",
            scrub: 1,
            pin: true,
          }
        });

        // Image scroll up after text scaling
        gsap.to(imageRef.current, {
          y: -300,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top+=1000 top",
            end: "+=1000",
            scrub: 1,
          }
        });

        // Next content entrance
        gsap.fromTo(contentRef.current, 
          {
            y: 100,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top bottom",
              end: "top center",
              scrub: 1,
            }
          }
        );
      });

      return () => ctx.revert();
    }
  }, [animationComplete]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Section */}
      <div
        ref={containerRef}
        className="relative min-h-screen w-full"
      >
        {/* Background Image */}
        <div
          ref={imageRef}
          className="fixed inset-0 w-full h-full -z-10"
        >
          {/* <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b4/La_Belle_Ferronnière.jpg"
            alt="La Belle Ferronnière by Leonardo da Vinci"
            className="w-full h-full object-cover"
          /> */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Text Mask */}
        <div className="h-screen w-full flex justify-center items-center pointer-events-none">
          <h2
            ref={textRef}
            className="text-[15vw] md:text-[15vw] lg:text-[10vw] font-bold text-center text-white"
          >
            {displayText}
          </h2>
        </div>
      </div>

      {/* Next Content */}
      <div
        ref={contentRef}
        className="relative z-10 opacity-0"
      >
        <MarqueSkills/>
      </div>
    </div>
  );
}