"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTransform, useScroll, motion } from "framer-motion";

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
];

export default function OverView() {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;

  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="relative bg-white dark:bg-neutral-900">
      {/* Overlay Title (stays inside section, scrolls with it) */}
      <div className="absolute inset-0 w-ful h-full flex items-center justify-center z-50 pointer-events-none">
        <div className="bg-black/30 backdrop-blur-sm   px-6 py-4 rounded-xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wide">
            Some of my works
          </h2>
        </div>
      </div>

      {/* Gallery */}
      <div
        ref={gallery}
        className="relative flex gap-[2vw] p-[2vw] h-[175vh] box-border overflow-hidden"
      >
        <Column images={[images[0], images[1], images[2]]} y={y} className="-top-[45%]" />
        <Column images={[images[3], images[4], images[5]]} y={y2} className="-top-[95%]" />
        <Column images={[images[6], images[7], images[8]]} y={y3} className="-top-[45%]" />
        <Column images={[images[9], images[10], images[11]]} y={y4} className="-top-[75%]" />
      </div>
      <div className="absolute inset-0 bg-black/70 w-ful h-full flex items-center justify-center z-20 pointer-events-none"/>
      
    </main>
    
  );
}

type ColumnProps = {
  images: string[];
  y: any;
  className?: string;
};

const Column = ({ images, y, className }: ColumnProps) => {
  return (
    <motion.div
      style={{ y }}
      className={`relative flex flex-col gap-[2vw] w-1/4 min-w-[250px] ${className}`}
    >
      {images.map((src, i) => (
        <div key={i} className="relative w-full h-full rounded-[1vw] overflow-hidden">
          <Image
            src={`/${src}`}
            alt="gallery image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
            priority={i < 2}
          />
        </div>
      ))}
    </motion.div>
  );
};
