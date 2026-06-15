"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function DevelopmentSplash() {
  // Start as true so it's part of the initial HTML/Server-side render
  const [isVisible, setIsVisible] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const checkVisit = () => {
      const visitData = localStorage.getItem("devSplashData");
      const TEN_MINUTES = 10 * 60 * 1000;
      let shouldShow = false;

      if (visitData) {
        try {
          const { timestamp } = JSON.parse(visitData);
          const now = new Date().getTime();
          if (now - timestamp > TEN_MINUTES) {
            shouldShow = true;
          }
        } catch (e) {
          shouldShow = true;
        }
      } else {
        shouldShow = true;
      }

      if (!shouldShow) {
        setIsVisible(false);
      }
      setIsInitialized(true);
    };

    checkVisit();
  }, []);

  // Handle Scroll Lock
  useEffect(() => {
    // Only lock scroll if it's actually visible AND we've finished checking localStorage
    if (isVisible && isInitialized) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible, isInitialized]);

  const handleEnter = () => {
    const visitData = {
      timestamp: new Date().getTime(),
    };
    localStorage.setItem("devSplashData", JSON.stringify(visitData));
    setIsVisible(false);
    // Remove the class so the site becomes visible and scrollable
    document.documentElement.classList.remove("splash-active");
  };

  // If we've checked and it shouldn't be visible, don't render anything
  if (!isVisible && isInitialized) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="critical-splash-shield"
          initial={false}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#111827] text-white p-4 text-center"
        >
          {/* Only show content once we've confirmed it's a first visit to avoid flashing text for repeat users */}
          {isInitialized && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-6"
            >
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                Still in development
              </h1>
              <p className="text-gray-400 max-w-md text-sm md:text-base">
                I'm currently crafting this experience. Some sections might be incomplete, <strong>adjust screen size for better experience</strong>,but feel free to explore the progress.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnter}
                className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors shadow-lg shadow-blue-900/20"
              >
                Enter Portfolio
              </motion.button>
            </motion.div>
          )}

          <div className="absolute bottom-10 text-[10px] uppercase tracking-[0.2em] text-gray-600">
            © 2026 Sachin Prasad
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
