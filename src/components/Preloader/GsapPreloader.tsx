"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface GsapPreloaderProps {
  visible: boolean;
}

export default function GsapPreloader({ visible }: GsapPreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [loadingStage, setLoadingStage] = useState(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Loading stages: 0%, 33%, 66%, 100%
  const stages = [
    { label: "initializing", value: 0 },
    { label: "loading assets", value: 33 },
    { label: "rendering", value: 66 },
    { label: "ready", value: 100 },
  ];

  useEffect(() => {
    if (!svgRef.current || !textRef.current || !progressRef.current) return;

    // Kill existing timeline if any
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline();
    timelineRef.current = tl;

    // Initial clip-path polygon (hidden)
    gsap.set(svgRef.current, {
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
    });

    // Stage 1: Expand into diamond shape
    tl.to(
      svgRef.current,
      {
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        duration: 0.8,
        ease: "power2.out",
      },
      0
    );

    // Update loading stage
    tl.call(() => setLoadingStage(1), [], 0.3);
    tl.to(progressRef.current, { width: "33%", duration: 0.6, ease: "power1.out" }, 0.2);

    // Stage 2: Morph to hexagon
    tl.to(
      svgRef.current,
      {
        clipPath:
          "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
        duration: 1,
        ease: "power2.inOut",
      },
      0.5
    );

    tl.call(() => setLoadingStage(2), [], 1.2);
    tl.to(progressRef.current, { width: "66%", duration: 0.8, ease: "power1.out" }, 0.7);

    // Stage 3: Morph to star/complex shape
    tl.to(
      svgRef.current,
      {
        clipPath:
          "polygon(50% 5%, 65% 35%, 95% 35%, 72% 55%, 85% 85%, 50% 68%, 15% 85%, 28% 55%, 5% 35%, 35% 35%)",
        duration: 1.2,
        ease: "power2.inOut",
      },
      1.3
    );

    tl.call(() => setLoadingStage(3), [], 2.2);
    tl.to(progressRef.current, { width: "100%", duration: 0.6, ease: "power1.out" }, 1.5);

    // Final: Collapse back to center (completion effect)
    tl.to(
      svgRef.current,
      {
        clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
        duration: 0.6,
        ease: "back.in",
      },
      2.8
    );

    tl.call(() => setLoadingStage(4), [], 3.3);

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [visible]);

  // Fade out when not visible
  useEffect(() => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [visible]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-white dark:bg-[#0b0b0f] flex items-center justify-center"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Animated SVG with clip-path */}
      <div className="relative w-32 h-32 mb-12">
        <svg
          ref={svgRef}
          width="128"
          height="128"
          viewBox="0 0 128 128"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="preloadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6c2bd9" />
              <stop offset="50%" stopColor="#8857dc" />
              <stop offset="100%" stopColor="#c957d1" />
            </linearGradient>
          </defs>

          {/* Background circles */}
          <circle
            cx="64"
            cy="64"
            r="50"
            fill="url(#preloadGrad)"
            opacity="0.8"
          />
          <circle
            cx="64"
            cy="64"
            r="40"
            fill="none"
            stroke="#6c2bd9"
            strokeWidth="2"
            opacity="0.3"
          />

          {/* Rotating inner element */}
          <g style={{ animation: "spin 3s linear infinite" }}>
            <path
              d="M 64 20 L 80 40 L 100 30 L 85 50 L 100 70 L 80 60 L 64 80 L 48 60 L 28 70 L 43 50 L 28 30 L 48 40 Z"
              fill="none"
              stroke="#fff"
              strokeWidth="1.5"
              opacity="0.7"
            />
          </g>
        </svg>

        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>

      {/* Loading text and progress */}
      <div className="absolute bottom-32 text-center">
        <div
          ref={textRef}
          className="text-sm font-medium text-[#333] dark:text-[#ccc] uppercase tracking-widest mb-4"
        >
          {stages[Math.min(loadingStage, 3)].label}
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-[#6c2bd9] to-[#c957d1] rounded-full"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
}
