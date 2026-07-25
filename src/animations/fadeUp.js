import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin if in browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Framer Motion variant
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration || 0.6,
      delay: custom.delay || 0,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    }
  })
};

// GSAP ScrollTrigger animation helper
export const gsapFadeUp = (element, trigger, delay = 0, duration = 0.8) => {
  if (!element || !trigger) return null;
  return gsap.fromTo(
    element,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: duration,
      delay: delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: trigger,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    }
  );
};
