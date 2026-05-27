export const characterMotionConfig = {
  stage: {
    animate: {
      y: [0, -9, 0],
      rotate: [-0.45, 0.45, -0.45],
    },
    transition: {
      duration: 6.8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  head: {
    animate: {
      y: [0, -3, 0],
      scale: [1, 1.006, 1],
    },
    transition: {
      duration: 5.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  hoodie: {
    animate: {
      scaleY: [1, 1.012, 1],
    },
    transition: {
      duration: 5.8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  stringLeft: {
    animate: {
      rotate: [-1.2, 1.2, -1.2],
      x: [0, -1.5, 0],
    },
    transition: {
      duration: 4.9,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  stringRight: {
    animate: {
      rotate: [1, -1.4, 1],
      x: [0, 1.4, 0],
    },
    transition: {
      duration: 5.3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  hair: {
    animate: {
      y: [0, -2.5, 0],
      rotate: [-0.25, 0.35, -0.25],
    },
    transition: {
      duration: 6.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const reducedCharacterMotion = {
  animate: {},
  transition: { duration: 0 },
};

export const eyeSpring = {
  stiffness: 500,
  damping: 18,
  mass: 0.28,
} as const;
