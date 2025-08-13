"use client";

import React, { ReactNode, useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
      opacity: 0,       // Start hidden for fade-in
      transform: "translateY(50px)", // Start slightly down
      transition: "opacity 0.8s ease, transform 0.8s ease",
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const updateCardTransforms = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length) return;

    const scrollTop = scroller.scrollTop;
    const containerHeight = scroller.clientHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);

    cardsRef.current.forEach((card, i) => {
      const cardTop = card.offsetTop;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - containerHeight / 2;

      // Fade + Slide animation
      const progress = Math.min(1, Math.max(0, (scrollTop - triggerStart) / (triggerEnd - triggerStart)));
      card.style.opacity = `${progress}`;
      card.style.transform = `translateY(${50 * (1 - progress)}px)`;

      // 3D stack transforms
      const scale = baseScale + i * itemScale * progress;
      const rotation = rotationAmount ? i * rotationAmount * progress : 0;
      let translateY = i * itemStackDistance * progress;

      card.style.transform += ` translateY(${translateY}px) scale(${scale}) rotate(${rotation}deg)`;

      // Optional blur
      if (blurAmount) {
        const topIndex = Math.floor(scrollTop / itemStackDistance);
        const depth = Math.max(0, topIndex - i);
        card.style.filter = depth > 0 ? `blur(${depth * blurAmount}px)` : "none";
      }
    });
  }, [itemStackDistance, itemScale, stackPosition, baseScale, rotationAmount, blurAmount, parsePercentage]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card")) as HTMLElement[];
    cardsRef.current = cards;

    // Lenis smooth scroll
    const lenis = new Lenis({
      wrapper: scroller,
      content: scroller.querySelector(".scroll-stack-inner") as HTMLElement,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on("scroll", updateCardTransforms);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    updateCardTransforms();

    lenisRef.current = lenis;

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (lenisRef.current) lenisRef.current.destroy();
      cardsRef.current = [];
    };
  }, [updateCardTransforms]);

  return (
    <div
      className={`relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim()}
      ref={scrollerRef}
      style={{
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
        scrollBehavior: "smooth",
        transform: "translateZ(0)",
        willChange: "scroll-position",
      }}
    >
      <div className="scroll-stack-inner pt-[20vh] px-20 pb-[50rem] min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default ScrollStack;
