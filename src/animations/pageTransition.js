// Framer Motion Page Transition Variants
export const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 15,
    scale: 0.99
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
      when: "beforeChildren"
    }
  },
  exit: {
    opacity: 0,
    y: -15,
    scale: 0.99,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};
