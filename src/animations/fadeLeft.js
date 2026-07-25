import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Framer Motion variant (animates entry from the right, moving left)
export const fadeLeftVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: (custom = {}) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom.duration || 0.6,
      delay: custom.delay || 0,
      ease: [0.16, 1, 0.3, 1],
    }
  })
};

// GSAP helper
export const gsapFadeLeft = (element, trigger, delay = 0, duration = 0.8) => {
  if (!element || !trigger) return null;
  return gsap.fromTo(
    element,
    { opacity: 0, x: 40 },
    {
      opacity: 1,
      x: 0,
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
