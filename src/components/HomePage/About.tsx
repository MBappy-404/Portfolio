"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { GlassmorphicCard } from "../glassmorphic-card";
import aboutImage from "../../../public/hero_image2.webp";
import Image from "next/image";
const About = ({ scrollYProgress }: any) => {
  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 25 });
  const springY3 = useSpring(y3, { stiffness: 100, damping: 20 });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);
  return (
    <motion.div style={{ scale, rotate }} className=" bg-gray-800 py-40 rounded-[100px]">
      <div>
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            style={{ y: springY2 }}
            className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#6c2bd9]/10 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: springY3 }}
            className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-[#c957d1]/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div
               
              className="flex flex-col gap-2 items-center text-center mb-16"
            >
              <span className="text-[#6c2bd9] text-sm font-medium uppercase tracking-wider">
                About Me
              </span>
              <h2 className="text-4xl md:text-5xl font-bold">
                The Story So Far
              </h2>
              <div className="w-16 h-1 bg-[#6c2bd9]/50 rounded-full mt-4" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div
                 
                className="relative"
              >
                <GlassmorphicCard className="p-4 md:p-5">
                  <div className="relative group bg-[#011329] dark:bg-[#04296829] overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={aboutImage}
                      alt="Saroar Jahan"
                      className="object-cover w-[99%] h-[50%] md:w-full md:max-h-[500px] rounded-lg" // Fix image height and coverage
                    />

                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#042868] via-transparent to-transparent opacity-50"></div>
                  </div>

                  <div className="absolute -bottom-2 -right-2 p-4 bg-background/80 backdrop-blur-md rounded-xl border border-border/50 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="size-8 rounded-full bg-muted border-2 border-background overflow-hidden"
                          >
                            {/* <Image
                              src={`/placeholder.svg?height=100&width=100&text=${i}`}
                              alt={`Client ${i}`}
                              width={32}
                              height={32}
                              className="object-cover"
                            /> */}
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs text-muted-[#0a0a0d]">
                          Trusted by
                        </p>
                        <p className="text-sm font-medium">Global Clients</p>
                      </div>
                    </div>
                  </div>
                </GlassmorphicCard>
              </div>

              <div
                className="flex flex-col gap-6"
              >
                <h3 className="text-muted-[#0a0a0d]  text-2xl font-bold">
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

                <div className="grid grid-cols-2 gap-6 mt-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[#6c2bd9] font-bold text-xl">
                      20+
                    </span>
                    <span className="text-muted-[#0a0a0d] text-sm">
                      Projects Completed
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#6c2bd9] font-bold text-xl">
                      10+
                    </span>
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
                    <span className="text-[#6c2bd9] font-bold text-xl">
                      15+
                    </span>
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
  );
};

export default About;
