"use client";

import { motion } from "framer-motion";

export default function HeroCharacter() {
  return (
    <motion.div
      animate={{
        y: [0, -12, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    >
      Hero Character
    </motion.div>
  );
}