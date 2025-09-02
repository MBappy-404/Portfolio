"use client";
import Link from "next/link";
import { TextReveal } from "../text-reveal";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import heroMe from "../../../public/heroBappy.png";
import Image from "next/image";

const HeroSection = ({ scrollYProgress }: any) => {
  // Parallax
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]); // আগে -100 ছিল, এখন আরও strong
  const springY1 = useSpring(y1, { stiffness: 120, damping: 30 });

  // Scale + rotate effect
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex px-4 items-center pt-20"
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#6c2bd9]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#6c2bd9]/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }} // শুরুতে নিচে + invisible
        animate={{ opacity: 1, y: 0 }} // উপরে উঠে এসে fade-in
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ scale, rotate }}
        className="container mx-auto relative z-10 max-h-[700px] bg-gray-300/50 dark:bg-gray-800/40 rounded-[50px] backdrop-blur-md shadow-xl 2xl:px-20 md:px-12 py-10 px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-6"
           
          >
            <TextReveal
              text="Hi, I'm Bappy"
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
            />
            <TextReveal
              text="Full Stack Developer & UI Enthusiast."
              className="text-xl md:text-2xl"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl"
            >
              I build modern web apps where code meets creativity, and every
              experience is crafted for speed, usability, and impact.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4 mt-4"
            >
              <Link
                href="#projects"
                className="group relative overflow-hidden rounded-full bg-[#6c2bd9] px-8 py-3 text-white font-medium shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore My Work
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>

              <Link
                href="#contact"
                className="group relative overflow-hidden rounded-full border border-border px-8 py-3 text-foreground hover:text-[#6c2bd9] transition-colors"
              >
                <span className="relative z-10">Contact Me</span>
                <span className="absolute inset-0 bg-[#6c2bd9]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex gap-6 mt-8"
            >
              <Link href="#" className="group">
                <Github className="size-6 text-muted-foreground group-hover:text-[#6c2bd9] transition-colors" />
              </Link>
              <Link href="#" className="group">
                <Linkedin className="size-6 text-muted-foreground group-hover:text-[#6c2bd9] transition-colors" />
              </Link>
              <Link href="#" className="group">
                <Mail className="size-6 text-muted-foreground group-hover:text-[#6c2bd9] transition-colors" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ y: springY1 }}
            className="relative hidden lg:flex justify-end"
          >
            <div className="relative w-[75%] aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6c2bd9]/20 to-[#c957d1]/20 rounded-full blur-3xl opacity-50" />
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-[#6c2bd9]/50 shadow-2xl">
                <Image
                  src={heroMe}
                  alt="Developer Portrait"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
