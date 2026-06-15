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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const visitData = localStorage.getItem("devSplashData");
                  const TEN_MINUTES = 10 * 60 * 1000;
                  let shouldShow = true;
                  if (visitData) {
                    const { timestamp } = JSON.parse(visitData);
                    if (new Date().getTime() - timestamp <= TEN_MINUTES) {
                      shouldShow = false;
                    }
                  }
                  if (shouldShow) {
                    document.documentElement.classList.add('splash-active');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .splash-active body {
                overflow: hidden !important;
                visibility: hidden !important;
              }
              /* Keep splash screen itself visible even if body is hidden */
              .splash-active #critical-splash-shield {
                visibility: visible !important;
                display: flex !important;
              }
            `,
          }}
        />
      </head>
      <body>
        <DevelopmentSplash />
        <ScrollProvider>
          {children}
        </ScrollProvider>
      </body>
    </html>
  );
}