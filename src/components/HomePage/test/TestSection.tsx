"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./style.module.css";

export default function TestSection() {
  const container = useRef(null);
  const stickyMask = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  const initialMaskSize = 0.8;
  const targetMaskSize = 30;
  const easing = 0.15;
  let easedScrollProgress = 0;
  let animationFrameId = null;

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      animationFrameId = requestAnimationFrame(animate);
    }
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isMounted]);

  const animate = () => {
    if (!container.current || !stickyMask.current) return;
    
    const maskSizeProgress = targetMaskSize * getScrollProgress();
    stickyMask.current.style.webkitMaskSize =
      (initialMaskSize + maskSizeProgress) * 100 + "%";
    animationFrameId = requestAnimationFrame(animate);
  };

  const getScrollProgress = () => {
    if (!container.current || !stickyMask.current) return 0;
    
    const scrollProgress =
      stickyMask.current.offsetTop /
      (container.current.getBoundingClientRect().height - window.innerHeight);
    const delta = scrollProgress - easedScrollProgress;
    easedScrollProgress += delta * easing;
    return Math.min(Math.max(easedScrollProgress, 0), 1);
  };

  return (
    <main className={styles.main}>
      <div className={styles.placeholderSection}>
        <h1>Scroll down to see the effect</h1>
        <p>The image will gradually reveal itself as you scroll</p>
      </div>
      
      <div ref={container} className={styles.container}>
        <div ref={stickyMask} className={styles.stickyMask}>
          <Image
            src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg"
            alt="Beautiful landscape with colorful trees and mountains"
            fill
            className={styles.image}
            priority
          />
        </div>
      </div>
      
      <div className={styles.placeholderSection}>
        <h2>Continue scrolling</h2>
        <p>Notice how the image reveal animation works</p>
      </div>
    </main>
  );
}