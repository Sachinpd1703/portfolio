import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollProvider from "@/components/providers/ScrollProvider";
import DevelopmentSplash from "@/components/ui/DevelopmentSplash";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sachin Prasad",
  description: "Sachin's Portfolio",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DevelopmentSplash />
        <ScrollProvider>
          {children}
        </ScrollProvider>
      </body>
    </html>
  );
}