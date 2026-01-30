"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../theme-toggle";
import { usePathname } from "next/navigation";
import HamburgerMenuOverlay from "../AnimatedMenu";
import { Sparkles } from "lucide-react";

const items = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathName = usePathname();

  const sections = [
    { name: "home", pathname: "/" },
    { name: "projects", pathname: "/projects" },
    { name: "blogs", pathname: "/blogs" },
    { name: "contact", pathname: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(true);
        setScrolled(true);
      } else {
        setIsVisible(false);
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -100, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed top-6 inset-x-0 mx-auto z-[999]  max-w-[95%] md:max-w-4xl"
        >
          {/* Main Glass Container */}
          <div className={cn(
            "relative flex items-center justify-between px-2 py-2 md:px-3 md:py-2.5 rounded-full transition-all duration-500",
            // Glass Effect
            "bg-white/10 dark:bg-black/40 backdrop-blur-xl saturate-150 supports-[backdrop-filter]:bg-white/5",
            // Borders & Glow
            "border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]",
            "ring-1 ring-black/5 dark:ring-white/5"
          )}>

            {/* Logo Section */}
            <div className="pl-4 pr-6">
              <Link
                href="/"
                className="flex items-center gap-2 group"
              >
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 text-white shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300 group-hover:scale-110">
                  <Sparkles size={16} className="animate-pulse" />
                </div>
                <span className="text-lg font-bold tracking-tight text-gray-800 dark:text-white font-orbitron group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-blue-500 transition-all">
                  Bappy
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 p-1 bg-white/50 dark:bg-black/20 rounded-full border border-white/20 dark:border-white/5">
              {sections.map((section) => {
                const isActive = pathName === section.pathname;

                return (
                  <Link
                    key={section.pathname}
                    href={section.pathname}
                    className={cn(
                      "relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 z-20",
                      isActive
                        ? "text-white dark:text-black"
                        : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-black dark:bg-white rounded-full -z-10 shadow-md"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="capitalize relative z-10 mix-blend-normal">
                      {section.name}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 pl-4 pr-2">
              <div className="hover:bg-gray-200/50 dark:hover:bg-white/10 p-2 rounded-full transition-colors duration-300">
                <ThemeToggle />
              </div>

              {/* Mobile Menu Trigger */}
              <div className="md:hidden block">
                <HamburgerMenuOverlay items={items} />
              </div>
            </div>

            {/* Bottom Glow Line for "Aura" effect */}
            <div className="absolute -bottom-[1px] left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-50 blur-sm" />
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Navbar;