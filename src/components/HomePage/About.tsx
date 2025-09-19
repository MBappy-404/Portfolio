"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { useEffect, useState } from "react";
import { GlassmorphicCard } from "../glassmorphic-card";
import aboutImage from "../../../public/hero_image2.webp";
import Image from "next/image";

const About = ({ scrollYProgress }: any) => {
  // ✅ Mounted check (SSR-safe)
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ✅ Safe motion value
  const safeScroll = scrollYProgress ?? useMotionValue(0);

  // ✅ Motion transforms
  const y1 = useTransform(safeScroll, [0, 1], [0, -100]);
  const y2 = useTransform(safeScroll, [0, 1], [0, -200]);
  const y3 = useTransform(safeScroll, [0, 1], [0, -300]);

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 25 });
  const springY3 = useSpring(y3, { stiffness: 100, damping: 20 });

  const scaleTransform = useTransform(safeScroll, [0, 1], [0.8, 1]);
  const opacityTransform = useTransform(safeScroll, [0, 1], [0.8, 1]);

  // ✅ Conditionally apply motion or static values
  const scale = mounted && isMobile === false ? scaleTransform : 1;
  const opacity = mounted && isMobile === false ? opacityTransform : 1;
  const circleY2 = mounted && isMobile === false ? springY2 : 0;
  const circleY3 = mounted && isMobile === false ? springY3 : 0;

  return (
    <section className="px-2">
      <motion.div
      style={{ scale, opacity }}
      className="mx-auto container shadow-xl  bg-gray-300/50 dark:bg-gray-800/50 md:mt-20 py-20 rounded-[50px]"
    >
      <div>
        {/* ✅ Background effects (animated only on desktop) */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            style={{ y: circleY2 }}
            className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#6c2bd9]/10 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: circleY3 }}
            className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-[#c957d1]/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-2 items-center text-center mb-16">
              <span className="text-[#6c2bd9] text-sm font-medium uppercase tracking-wider">
                About Me
              </span>
              <h2 className="text-4xl md:text-5xl font-bold">The Story So Far</h2>
              <div className="w-16 h-1 bg-[#6c2bd9]/50 rounded-full mt-4" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* ✅ Image side */}
              <div className="relative">
                <GlassmorphicCard className="p-4 md:p-5">
                  <div className="relative group bg-[#011329] dark:bg-[#04296829] overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={aboutImage}
                      alt="Saroar Jahan"
                      className="object-cover w-[99%] h-[50%] md:w-full md:max-h-[500px] rounded-lg"
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#042868] via-transparent to-transparent opacity-50" />
                  </div>
                </GlassmorphicCard>
              </div>

              {/* ✅ Text side */}
              <div className="flex flex-col gap-6">
                <h3 className="text-muted-[#0a0a0d] text-2xl font-bold">
                  Crafting Digital Experiences with Passion and Precision
                </h3>
                <p className="text-base 2xl:text-lg">
                  I'm a full-stack developer with a passion for creating
                  innovative digital solutions that solve real-world problems.
                  With over 2+ years of experience in the industry, I've
                  developed a deep understanding of both frontend and backend
                  technologies.
                </p>
                <p className="text-muted-[#0a0a0d] text-base 2xl:text-lg">
                  My approach combines technical excellence with creative
                  problem-solving, allowing me to build applications that are
                  not only functional but also visually stunning and intuitive
                  to use.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 mt-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[#6c2bd9] font-bold text-xl">20+</span>
                    <span className="text-muted-[#0a0a0d] text-sm">
                      Projects Completed
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#6c2bd9] font-bold text-xl">10+</span>
                    <span className="text-muted-[#0a0a0d] text-sm">
                      Happy Clients
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#6c2bd9] font-bold text-xl">2+</span>
                    <span className="text-muted-[#0a0a0d] text-sm">
                      Years Experience
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#6c2bd9] font-bold text-xl">15+</span>
                    <span className="text-muted-[#0a0a0d] text-sm">
                      Technologies Mastered
                    </span>
                  </div>
                </div>

                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-2 text-[#6c2bd9] hover:text-[#6c2bd9]/80 font-medium mt-4 w-fit"
                >
                  Let's Work Together
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    </section>
  );
};

export default About;
