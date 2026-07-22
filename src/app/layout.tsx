import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tweeter ",
  description: "Tweeter Clone Website ",
};

import { TooltipProvider } from "@/components/ui/tooltip"
import FloatingNavDemo from "@/components/floating-navbar-demo";
import { CommandPalette } from "@/components/search/CommandPalette";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="dark"> 
      <body>
        <TooltipProvider>
          <FloatingNavDemo />
          <CommandPalette />
          {children}
        </TooltipProvider>
      </body>
    </html>
  )
}
