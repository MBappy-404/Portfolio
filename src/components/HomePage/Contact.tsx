"use client";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { GlassmorphicCard } from "../glassmorphic-card";
const Contact = () => {
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
  return (
    <div>
      <section id="contact" className="py-32 relative bg-muted/10">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            style={{ y: springY3 }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#6c2bd9]/10 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: springY2 }}
            className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#c957d1]/10 rounded-full blur-3xl"
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
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Let's Work Together
            </h2>
            <div className="w-16 h-1 bg-[#6c2bd9]/50 rounded-full mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-8"
            >
              <h3 className="text-2xl font-bold">
                Ready to bring your ideas to life?
              </h3>

              <p className="text-muted-[#0a0a0d]">
                I'm currently available for freelance work and exciting new
                opportunities. Whether you have a project in mind or just want
                to connect, I'd love to hear from you.
              </p>

              <div className="space-y-6 mt-4">
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-full bg-[#6c2bd9]/10 flex items-center justify-center mt-1">
                    <Mail className="size-5 text-[#6c2bd9]" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <Link
                      href="mailto:contact@example.com"
                      className="text-muted-[#0a0a0d] hover:text-[#6c2bd9] transition-colors"
                    >
                      contact@example.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-full bg-[#6c2bd9]/10 flex items-center justify-center mt-1">
                    <Linkedin className="size-5 text-[#6c2bd9]" />
                  </div>
                  <div>
                    <h4 className="font-medium">LinkedIn</h4>
                    <Link
                      href="#"
                      className="text-muted-[#0a0a0d] hover:text-[#6c2bd9] transition-colors"
                    >
                      linkedin.com/in/yourprofile
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-full bg-[#6c2bd9]/10 flex items-center justify-center mt-1">
                    <Github className="size-5 text-[#6c2bd9]" />
                  </div>
                  <div>
                    <h4 className="font-medium">GitHub</h4>
                    <Link
                      href="#"
                      className="text-muted-[#0a0a0d] hover:text-[#6c2bd9] transition-colors"
                    >
                      github.com/yourusername
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <GlassmorphicCard className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6c2bd9]/50 focus:border-[#6c2bd9]/50 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6c2bd9]/50 focus:border-[#6c2bd9]/50 transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6c2bd9]/50 focus:border-[#6c2bd9]/50 transition-colors"
                      placeholder="Project inquiry"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6c2bd9]/50 focus:border-[#6c2bd9]/50 transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="group relative w-full overflow-hidden rounded-lg bg-[#6c2bd9] px-6 py-3 text-white font-medium"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Send Message{" "}
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                    <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                </form>
              </GlassmorphicCard>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
