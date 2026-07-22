import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import FloatingNavDemo from "@/components/floating-navbar-demo";
import { CommandPalette } from "@/components/search/CommandPalette";
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
  title: "DevCircle - Developer Community Platform",
  description: "A real-time community, publishing, profile, and discussion platform for developers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TooltipProvider>
          <FloatingNavDemo />
          <CommandPalette />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
