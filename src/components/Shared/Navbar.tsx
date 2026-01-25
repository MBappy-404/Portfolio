"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../theme-toggle";
import { usePathname } from "next/navigation";
import HamburgerMenuOverlay from "../AnimatedMenu";

const items = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathName = usePathname();

  const sections = [
    { name: "home", pathname: "/" },
    { name: "projects", pathname: "/projects" },
    { name: "blogs", pathname: "/blogs" },
    { name: "contact", pathname: "/contact" },
  ];

  // Handle scroll to toggle visibility
  useEffect(() => {
    const handleScroll = () => {
      // Show navbar only after scrolling 100px
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-6 inset-x-0 mx-auto z-[999] max-w-[90%] md:max-w-3xl"
        >
          {/* Aesthetic Glassmorphic Pill Container */}
          <div className="flex items-center justify-between px-6 py-3 rounded-full bg-background/70 backdrop-blur-md border border-border/50 shadow-lg shadow-black/5 supports-[backdrop-filter]:bg-background/60">

            {/* Logo */}
            <Link
              href="/"
              className="text-lg font-bold relative group flex items-center gap-1"
            >
              <span className="text-primary font-mono tracking-tighter">Bappy</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary mb-1 animate-pulse"></span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-secondary/50 rounded-full px-2 py-1 border border-border/30">
              {sections.map((section) => {
                const isActive = pathName === section.pathname;
                return (
                  <Link
                    key={section.pathname}
                    href={section.pathname}
                    className={cn(
                      "relative px-4 py-1.5 text-sm font-medium transition-colors rounded-full duration-300",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    {/* Background Pill Animation for Active State */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-primary rounded-full -z-10 shadow-sm"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 capitalize">{section.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {/* Mobile Menu Trigger */}
              <div className="md:hidden block">
                <HamburgerMenuOverlay items={items} />
              </div>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Navbar;