'use client';

/**
 * v3 live mouse coordinate readout (spec SS3): fixed bottom-center,
 * zero-padded "NNNN X NNNN Y" viewport coords, rAF-throttled mousemove.
 * Hidden below 1024px and under prefers-reduced-motion (CSS + JS).
 * Decorative - aria-hidden.
 */
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/lib/gsap';
import styles from './CoordinateReadout.module.css';

const formatCoord = (value: number) =>
  String(Math.max(0, Math.min(9999, Math.round(value)))).padStart(4, '0');

export default function CoordinateReadout() {
  const textRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    if (reduceMotion) return;

    let raf = 0;
    let pending = false;
    let nextX = 0;
    let nextY = 0;

    const flush = () => {
      pending = false;
      el.textContent = `${formatCoord(nextX)} X ${formatCoord(nextY)} Y`;
    };

    const onMouseMove = (event: MouseEvent) => {
      nextX = event.clientX;
      nextY = event.clientY;
      if (!pending) {
        pending = true;
        raf = requestAnimationFrame(flush);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [reduceMotion]);

  return (
    <div className={styles.readout} aria-hidden="true">
      <span ref={textRef}>0000 X 0000 Y</span>
    </div>
  );
}
