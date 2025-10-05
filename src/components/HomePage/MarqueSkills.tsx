"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from "./test/MarqueOnScroll";

const MarqueSkills = () => {
  return (
    <div className="mb-20 mt-10 ">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-2 items-center text-center mb-16"
        >
          <span className="text-[#6c2bd9]   text-sm font-medium uppercase tracking-wider">
            My Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            Technical Proficiency
          </h2>
          <div className="w-16 h-1 bg-[#6c2bd9]/50 rounded-full mt-4" />
        </motion.div>
      </div>
      <ThreeDScrollTriggerContainer>
        {/* Row 1 - Frontend */}
        <ThreeDScrollTriggerRow baseVelocity={5} direction={1} className="py-2">
          <div className="flex items-center mx-5 justify-center w-20 h-20 md:w-28 md:h-28  rounded-2xl shadow-lg bg-[#61DAFB]/10 border border-[#61DAFB]/40">
            <span className="text-[#61DAFB] text-sm md:text-base font-bold">React</span>
          </div>
          <div className="flex items-center mx-5 justify-center w-20 h-20 md:w-28 md:h-28 rounded-2xl shadow-lg bg-gray-900/80 border border-gray-800/70">
            <span className="text-gray-200  text-sm md:text-basefont-bold">Next.js</span>
          </div>
          <div className="flex items-center mx-5 justify-center w-20 h-20 md:w-28 md:h-28 rounded-2xl shadow-lg bg-[#38BDF8]/10 border border-[#38BDF8]/40">
            <span className="text-[#38BDF8] text-sm md:text-base font-bold">Tailwind</span>
          </div>
          <div className="flex items-center mx-5 justify-center w-20 h-20 md:w-28 md:h-28 rounded-2xl shadow-lg bg-[#3178C6]/10 border border-[#3178C6]/40">
            <span className="text-[#3178C6] text-sm md:text-base font-bold">TypeScript</span>
          </div>
        </ThreeDScrollTriggerRow>

        {/* Row 2 - Backend & DB */}
        <ThreeDScrollTriggerRow
          baseVelocity={3}
          direction={-1}
          className="py-6"
        >
          <div className="flex items-center mx-5 justify-center w-20 h-20 md:w-28 md:h-28 rounded-2xl shadow-lg bg-[#68A063]/10 border border-[#68A063]/40">
            <span className="text-[#68A063] text-sm md:text-base font-bold">Node.js</span>
          </div>
          <div className="flex items-center mx-5 justify-center w-20 h-20 md:w-28 md:h-28 rounded-2xl shadow-lg bg-gray-900/80 border border-gray-800/70">
            <span className="text-gray-200  text-sm md:text-basefont-bold">Express</span>
          </div>
          <div className="flex items-center mx-5 justify-center w-20 h-20 md:w-28 md:h-28 rounded-2xl shadow-lg bg-[#47A248]/10 border border-[#47A248]/40">
            <span className="text-[#47A248] text-sm md:text-base font-bold">MongoDB</span>
          </div>
          <div className="flex items-center mx-5 justify-center w-20 h-20 md:w-28 md:h-28 rounded-2xl shadow-lg bg-[#47A248]/10 border border-[#47A248]/40">
            <span className="text-[#47A248] text-sm md:text-base font-bold">Mongoose</span>
          </div>
          <div className="flex items-center mx-5 justify-center w-20 h-20 md:w-28 md:h-28 rounded-2xl shadow-lg bg-[#0C344B]/30 border border-[#0C344B]/60">
            <span className="text-[#1b6a97] text-sm md:text-base font-bold">Prisma</span>
          </div>
          <div className="flex items-center mx-5 justify-center w-20 h-20 md:w-28 md:h-28 rounded-2xl shadow-lg bg-[#336791]/10 border border-[#336791]/40">
            <span className="text-[#336791] text-sm md:text-base font-bold">PostgreSQL</span>
          </div>
          <div className="flex items-center mx-5 justify-center w-20 h-20 md:w-28 md:h-28 rounded-2xl shadow-lg bg-[#EF4444]/10 border border-[#EF4444]/40">
            <span className="text-[#EF4444] text-sm md:text-base font-bold">JWT</span>
          </div>
        </ThreeDScrollTriggerRow>

        {/* Row 3 - Tools */}
        <ThreeDScrollTriggerRow baseVelocity={6} direction={1} className="py-2">
          <div className="flex items-center mx-5 justify-center w-20 h-20 md:w-28 md:h-28 rounded-2xl shadow-lg bg-[#181717]/70 border border-[#282626]">
            <span className="text-gray-200  text-sm md:text-basefont-bold">GitHub</span>
          </div>
          <div className="flex items-center mx-5 justify-center w-20 h-20 md:w-28 md:h-28 rounded-2xl shadow-lg bg-[#007ACC]/10 border border-[#007ACC]/40">
            <span className="text-[#007ACC] text-sm md:text-base font-bold">VS Code</span>
          </div>
          <div className="flex items-center mx-5 justify-center w-20 h-20 md:w-28 md:h-28 rounded-2xl shadow-lg bg-gray-900/80 border border-gray-800/70">
            <span className="text-gray-200  text-sm md:text-basefont-bold">Vercel</span>
          </div>
          <div className="flex items-center mx-5 justify-center w-20 h-20 md:w-28 md:h-28 rounded-2xl shadow-lg bg-[#FF6C37]/10 border border-[#FF6C37]/40">
            <span className="text-[#FF6C37] text-sm md:text-base font-bold">Postman</span>
          </div>
          <div className="flex items-center mx-5 justify-center w-20 h-20 md:w-28 md:h-28 rounded-2xl shadow-lg bg-[#E34F26]/10 border border-[#E34F26]/40">
            <span className="text-[#E34F26] text-sm md:text-base font-bold">Vercel</span>
          </div>
          <div className="flex items-center mx-5 justify-center w-20 h-20 md:w-28 md:h-28 rounded-2xl shadow-lg bg-[#1572B6]/10 border border-[#1572B6]/40">
            <span className="text-[#1572B6] text-sm md:text-base font-bold">Figma</span>
          </div>
        </ThreeDScrollTriggerRow>
      </ThreeDScrollTriggerContainer>
    </div>
  );
};

export default MarqueSkills;
