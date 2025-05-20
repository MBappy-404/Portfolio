import { Github, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="py-8 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <Link href="/" className="text-xl font-bold">
                <span className="text-[#0a0a0d]">Dev</span>
                <span className="text-[#6c2bd9]">Portfolio</span>
              </Link>
              <p className="text-sm text-muted-[#0a0a0d]">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>

            <div className="flex gap-6">
              <Link
                href="#"
                className="text-muted-[#0a0a0d] hover:text-[#6c2bd9] transition-colors"
              >
                <Github size={20} />
              </Link>
              <Link
                href="#"
                className="text-muted-[#0a0a0d] hover:text-[#6c2bd9] transition-colors"
              >
                <FaLinkedin size={20} />
              </Link>
              <Link
                href="mailto:contact@example.com"
                className="text-muted-[#0a0a0d] hover:text-[#6c2bd9] transition-colors"
              >
                <Mail size={20} />
              </Link>
            </div>

            <div className="flex gap-6 text-sm">
              <Link
                href="#"
                className="text-muted-[#0a0a0d] hover:text-[#6c2bd9] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-muted-[#0a0a0d] hover:text-[#6c2bd9] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
