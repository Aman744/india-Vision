// Framer Motion variant for container element to stagger children animation
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerChildren || 0.1,
      delayChildren: custom.delayChildren || 0,
    }
  })
};

// Generic child animation variant (can be combined with fadeUp)
export const staggerChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};
