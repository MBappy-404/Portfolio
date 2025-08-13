"use client";
import Link from "next/link";
import { TextReveal } from "../text-reveal";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import heroMe from "../../../public/heroBappy.png";
import Image from "next/image";

const HeroSection = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });

  return (
    <div>
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-36"
      >
        <div className="absolute  inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#6c2bd9]/22 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#6c2bd9]/22 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6c2bd9]/10 text-[#6c2bd9] dark:text-[#8857dc] text-sm md:text-base font-medium w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6c2bd9] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6c2bd9]"></span>
                </span>
                Available for freelance work
              </div>
              <TextReveal
                text="Hi, Im Bappy"
                className="text-4xl md:text-5xl lg:text-6xl font-bold"
              />
              <TextReveal
                text="Full Stack Developer & UI Enthusiast."
                className="text-xl md:text-2xl"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl text-muted-[#0a0a0d] max-w-xl"
              >
              I build modern web apps where code meets creativity, and every experience is crafted for speed, usability, and impact.

              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-wrap gap-4 mt-4"
              >
                <Link
                  href="#projects"
                  className="group relative overflow-hidden rounded-full bg-[#6c2bd9] px-8 py-3 text-white"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore My Work{" "}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>

                <Link
                  href="#contact"
                  className="group relative overflow-hidden rounded-full bg-transparent border border-border px-8 py-3 text-[#0a0a0d] dark:text-white hover:text-[#6c2bd9] transition-colors"
                >
                  <span className="relative z-10">Contact Me</span>
                  <span className="absolute inset-0 bg-[#6c2bd9]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex gap-6 mt-8"
              >
                <Link href="#" className="group">
                  <Github className="size-5 text-muted-[#0a0a0d] group-hover:text-[#6c2bd9] transition-colors" />
                </Link>
                <Link href="#" className="group">
                  <Linkedin className="size-5 text-muted-[#0a0a0d] group-hover:text-[#6c2bd9] transition-colors" />
                </Link>
                <Link href="#" className="group">
                  <Mail className="size-5 text-muted-[#0a0a0d] group-hover:text-[#6c2bd9] transition-colors" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ y: springY1 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6c2bd9]/20 to-[#c957d1]/20 rounded-full blur-3xl opacity-50" />
                <div className="relative dark:bg-[#bda0ef] z-10 w-[95%] h-[95%] rounded-full overflow-hidden border-4 border-[#6c2bd9]/50 shadow-2xl">
                  <Image
                    src={heroMe}
                    alt="Developer Portrait"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-0 p-4 bg-background/80 backdrop-blur-md rounded-xl border border-border/50 shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="size-10 rounded-full bg-[#6c2bd9]/20 flex items-center justify-center">
                      <span className="text-[#6c2bd9] text-xl font-bold">
                        2+
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-[#0a0a0d]">Years of</p>
                      <p className="text-sm font-medium">Experience</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-0  p-4 bg-background/80 backdrop-blur-md rounded-xl border border-border/50 shadow-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="size-13 rounded-full bg-[#c957d1]/20 flex items-center justify-center">
                      <span className="text-[#c957d1]-[#0a0a0d] text-xl font-bold">
                        20+
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-[#0a0a0d]">Completed</p>
                      <p className="text-base font-medium">Projects</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
