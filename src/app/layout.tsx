import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ProvidersWrapper from "@/providers/ProvidersWrapper";
import { ThemeProvider } from "next-themes";
// import CustomCursor from "@/components/custom-cursor";
import ParticleBackground from "@/components/particle-background";
import MusicPlayerButton from "@/components/MusicPlayerButton";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <CustomCursor /> */}

          <div>
            <ProvidersWrapper>
              <ParticleBackground />
              {children}
            </ProvidersWrapper>
              {/* <MusicPlayerButton /> */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
