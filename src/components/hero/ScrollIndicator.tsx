"use client";
import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      animate={{
        y: [0, 10, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
      }}
      className="absolute bottom-8 left-1/2 z-40 -translate-x-1/2"
    >
      <div className="flex h-14 w-8 justify-center rounded-full border border-white/30">
        <motion.div
          animate={{
            y: [0, 18, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="mt-2 h-3 w-3 rounded-full bg-white"
        />
      </div>
    </motion.div>
  );
}