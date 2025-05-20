import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ProvidersWrapper from "@/providers/ProvidersWrapper";
import { ThemeProvider } from "next-themes";
import CustomCursor from "@/components/custom-cursor";
import ParticleBackground from "@/components/particle-background";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Bappy",
  description:
    "Discover a wide selection of movies at CineVerse. Browse through new releases, popular films, and find your next favorite movie with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <CustomCursor />
        <ParticleBackground />
        <div>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ProvidersWrapper>{children}</ProvidersWrapper>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
