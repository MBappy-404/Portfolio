"use client";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

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
      <style jsx>{`
        @property --border-angle {
          syntax: "<angle>";
          inherits: true;
          initial-value: 0deg;
        }

        /* * Keyframes for the border animation.
         * We animate the --border-angle custom property from 0deg to 360deg.
         * This changing angle is used in the conic-gradient background of the card,
         * creating the effect of a rotating highlight.
        */
        @keyframes border-spin {
          100% {
            --border-angle: 360deg;
          }
        }

        /* * The .animate-border class applies the animation.
         * The animation 'border-spin' runs for 6 seconds, is linear, and repeats infinitely.
        */
        .animate-border {
            animation: border-spin 6s linear infinite;
        }
      `}</style>
      <section id="contact" className="py-32 relative bg-muted/10">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            style={{ y: springY3 }}
            className="absolute top-[30%] right-1/4 w-96 h-96 bg-[#6c2bd9]/10 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: springY2 }}
            className="absolute bottom-[10%] left-[15%] w-96 h-96 bg-[#c957d1]/13 rounded-full blur-3xl"
          />
        </div>

        <div className=" mx-auto px-3 relative z-10">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-2xl font-bold">
                Ready to bring your ideas to life?
              </h3>

              <p className="text-muted-[#0a0a0d]">
                Want to connect or ask something? Drop me a line!
              </p>

              <div className="space-y-6 mt-4">
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-full bg-[#6c2bd9]/10 flex items-center justify-center mt-1">
                    <Mail className="size-5 text-[#6c2bd9]" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <Link
                      href="mailto:muhammadbappy989@gmail.com"
                      target="_blank"
                      className="text-muted-[#0a0a0d] hover:text-[#6c2bd9] transition-colors"
                    >
                      muhammadbappy989@gmail.com
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
                      href="https://www.linkedin.com/in/saroar-jahan-bappy"
                      target="_blank"
                      className="text-muted-[#0a0a0d] hover:text-[#6c2bd9] transition-colors"
                    >
                      linkedin.com/in/saroar-jahan-bappy
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
                      href="https://github.com/MBappy-404"
                      target="_blank"
                      className="text-muted-[#0a0a0d] hover:text-[#6c2bd9] transition-colors"
                    >
                      github.com/MBappy-404
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
              <div className="p-5 md:p-8  border-gray-200 dark:[background:linear-gradient(45deg,#080b11,theme(colors.gray.900),#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.gray.600/.20)_80%,theme(colors.indigo.500)_86%,theme(colors.indigo.300)_90%,theme(colors.indigo.500)_94%,theme(colors.slate.600/.48))_border-box] rounded-2xl border dark:border-transparent animate-border">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm  font-medium">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 bg-background/50 border mt-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6c2bd9]/50 focus:border-[#6c2bd9]/50 transition-colors"
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
                        className="w-full px-4 py-3 bg-background/50 mt-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6c2bd9]/50 focus:border-[#6c2bd9]/50 transition-colors"
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
                      className="w-full px-4 py-3 bg-background/50 mt-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6c2bd9]/50 focus:border-[#6c2bd9]/50 transition-colors"
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
                      className="w-full px-4 py-3 bg-background/50 mt-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6c2bd9]/50 focus:border-[#6c2bd9]/50 transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="group relative cursor-pointer w-full overflow-hidden rounded-lg bg-[#6c2bd9] px-6 py-3 text-white font-medium"
                  >
                    <span className="relative cursor-pointer z-10 flex items-center justify-center gap-2">
                      Send Message{" "}
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                    <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Contact;
