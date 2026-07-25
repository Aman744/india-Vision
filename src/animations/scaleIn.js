import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Framer Motion variant
export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (custom = {}) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom.duration || 0.5,
      delay: custom.delay || 0,
      ease: [0.16, 1, 0.3, 1],
    }
  })
};

// GSAP helper
export const gsapScaleIn = (element, trigger, delay = 0, duration = 0.8) => {
  if (!element || !trigger) return null;
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.9 },
    {
      opacity: 1,
      scale: 1,
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
