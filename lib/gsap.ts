import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export const FINE_POINTER_MEDIA = '(hover: hover) and (pointer: fine)';

let lenisInstance: Lenis | null = null;

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  const finePointer = window.matchMedia(FINE_POINTER_MEDIA);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (finePointer.matches && !reducedMotion.matches && !lenisInstance) {
    const lenis = new Lenis({ autoRaf: false });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    lenisInstance = lenis;
  }
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };

    query.addEventListener('change', handleChange);
    return () => {
      query.removeEventListener('change', handleChange);
    };
  }, []);

  return reduced;
}

export { gsap, ScrollTrigger };
