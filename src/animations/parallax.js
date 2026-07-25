import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// GSAP parallax effect on scroll
export const initParallax = (element, speed = 0.5) => {
  if (!element) return null;
  
  return gsap.to(element, {
    yPercent: 20 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
};
