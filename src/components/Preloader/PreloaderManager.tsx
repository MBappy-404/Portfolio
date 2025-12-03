"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import GsapPreloader from "./GsapPreloader";

export default function PreloaderManager({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  // Minimum preloader display time to show full animation cycle
  const MIN_DURATION = 3500; // milliseconds

  useEffect(() => {
    // On initial mount, show preloader for full animation cycle
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, MIN_DURATION);

    return () => clearTimeout(hideTimer);
  }, []);

  // Show preloader briefly on route changes (client-side navigation)
  useEffect(() => {
    // Skip on first render (pathname is already set)
    const timer = setTimeout(() => {
      if (pathname) {
        // Show preloader for a shorter time on route change
        setVisible(true);
        const hideTimer = setTimeout(() => {
          setVisible(false);
        }, 1200); // Faster for nav
        return () => clearTimeout(hideTimer);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <GsapPreloader visible={visible} />
      <div style={{ display: visible ? "none" : "block" }}>{children}</div>
    </>
  );
}
