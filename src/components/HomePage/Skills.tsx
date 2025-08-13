"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { GlassmorphicCard } from "../glassmorphic-card";
import { SkillSphere } from "../skill-sphere";
import NexusOrb from "../orbbitingCircleAnimation";

const Skills = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 25 });
  const springY3 = useSpring(y3, { stiffness: 100, damping: 20 });

  // Frontend (React, Next.js, TypeScript, CSS, etc.)
  const frontendIcons = [
    { id: 1, component: <span className="text-base text-center">React</span> },
    {
      id: 2,
      component: <span className="text-base text-center">Next.js</span>,
    },
    { id: 3, component: <span className="text-base text-center">TS</span> },
    { id: 4, component: <span className="text-base text-center">Redux</span> },
    {
      id: 5,
      component: <span className="text-base text-center">Framer Motion</span>,
    },
    {
      id: 6,
      component: <span className="text-base text-center">Tailwind</span>,
    },
  ];

  const frontendCenter = (
    <span className="text-[#6c2bd9] text-2xl font-bold">FE</span>
  );

  // Backend (MongoDB, Express, Node.js, APIs, etc.)
  const backendIcons = [
    {
      id: 1,
      component: <span className="text-base text-center">Node.js</span>,
    },
    {
      id: 2,
      component: <span className="text-base text-center">Express</span>,
    },
    {
      id: 3,
      component: <span className="text-base text-center">MongoDB</span>,
    },
    { id: 4, component: <span className="text-base text-center">Mongoose</span> },
    {
      id: 5,
      component: <span className="text-base text-center">SQL</span>,
    },
    { id: 6, component: <span className="text-base text-center">JWT</span> },
  ];

  const backendCenter = (
    <span className="text-[#6c2bd9] text-2xl font-bold">BE</span>
  );
  // Tools (MongoDB, Express, Node.js, APIs, etc.)
  const toolsIcons = [
    {
      id: 1,
      component: <span className="text-base text-center">Figma</span>,
    },
    {
      id: 2,
      component: <span className="text-base text-center">Vercel</span>,
    },
    {
      id: 3,
      component: <span className="text-base text-center">Netlify</span>,
    },
    { id: 4, component: <span className="text-base text-center">Github</span> },
    {
      id: 5,
      component: <span className="text-base text-center">Render</span>,
    },
    { id: 6, component: <span className="text-base text-center">Vs Code</span> },
  ];

  const toolsCenter = (
    <span className="text-[#6c2bd9] text-2xl font-bold">TOOLS</span>
  );



  return (
    <div>
      <section id="skills" className="py-32 relative bg-muted/10">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            style={{ y: springY3 }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6c2bd9]/10 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: springY2 }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#c957d1]/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-2 items-center text-center mb-16"
          >
            <span className="text-[#6c2bd9] text-sm font-medium uppercase tracking-wider">
              My Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Technical Proficiency
            </h2>
            <div className="w-16 h-1 bg-[#6c2bd9]/50 rounded-full mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            {/* <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="col-span-1"
            >
              <GlassmorphicCard className="h-full p-8">
                <div className="flex flex-col h-full">
                  <div className="size-16 rounded-2xl bg-[#6c2bd9]/10 flex items-center justify-center mb-6">
                    <span className="text-[#6c2bd9] text-2xl font-bold">
                      FE
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-4">
                    Frontend Development
                  </h3>

                  <p className="text-muted-[#0a0a0d] mb-8">
                    Creating responsive, accessible, and performant user
                    interfaces with modern frameworks and libraries.
                  </p>

                  <div className="space-y-6 mt-auto">
                    {[
                      { name: "React & Next.js", level: 95 },
                      { name: "TypeScript", level: 90 },
                      { name: "Tailwind CSS", level: 95 },
                      { name: "Framer Motion", level: 85 },
                      { name: "Redux", level: 80 },
                    ].map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-[#6c2bd9]">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-[#6c2bd9]/80 to-[#6c2bd9] rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div> */}

            {/* <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="col-span-1"
            >
              <GlassmorphicCard className="h-full p-8">
                <div className="flex flex-col h-full">
                  <div className="size-16 rounded-2xl bg-[#c957d1]/10 flex items-center justify-center mb-6">
                    <span className="text-[#c957d1]-[#0a0a0d] text-2xl font-bold">
                      BE
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-4">
                    Backend Development
                  </h3>

                  <p className="text-muted-[#0a0a0d] mb-8">
                    Building robust, scalable, and secure server-side
                    applications and APIs with modern technologies.
                  </p>

                  <div className="space-y-6 mt-auto">
                    {[
                      { name: "Node.js", level: 90 },
                      { name: "Express & Nest.js", level: 85 },
                      { name: "PostgreSQL", level: 80 },
                      { name: "MongoDB", level: 85 },
                      { name: "Prisma", level: 75 },
                    ].map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-[#c957d1]-[#0a0a0d]">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-[#c957d1]/80 to-[#c957d1] rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div> */}

            <motion.div className="col-span-1">
              <GlassmorphicCard className="h-full p-8 flex items-center justify-center">
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <h3 className="text-xl font-bold mb-8 text-center">
                    Frontend Development
                  </h3>
                  <NexusOrb icons={frontendIcons} centerIcon={frontendCenter} />
                </div>
              </GlassmorphicCard>
            </motion.div>
            <motion.div className="col-span-1">
              <GlassmorphicCard className="h-full p-8 flex items-center justify-center">
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <h3 className="text-xl font-bold mb-8 text-center">
                    Backend Development
                  </h3>
                  <NexusOrb icons={backendIcons} centerIcon={backendCenter} />
                </div>
              </GlassmorphicCard>
            </motion.div>
            <motion.div className="col-span-1">
              <GlassmorphicCard className="h-full p-8 flex items-center justify-center">
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <h3 className="text-xl font-bold mb-8 text-center">
                   Tools
                  </h3>
                  <NexusOrb icons={toolsIcons} centerIcon={toolsCenter} />
                </div>
              </GlassmorphicCard>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;
