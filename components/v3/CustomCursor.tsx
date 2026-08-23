'use client';

import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

const HOVER_SELECTOR = 'a, button, [data-hover]';
const RING_LERP = 0.16;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!finePointer.matches || reducedMotion.matches || !dot || !ring) return;

    document.body.classList.add('has-cursor');

    let px = -100;
    let py = -100;
    let rx = -100;
    let ry = -100;
    let seen = false;
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      px = event.clientX;
      py = event.clientY;
      if (!seen) {
        rx = px;
        ry = py;
        seen = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    };

    const onOver = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest(HOVER_SELECTOR)) {
        ring.classList.add(styles.isActive);
      }
    };

    const onOut = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest(HOVER_SELECTOR)) {
        ring.classList.remove(styles.isActive);
      }
    };

    const loop = () => {
      rx += (px - rx) * RING_LERP;
      ry += (py - ry) * RING_LERP;
      dot.style.transform = `translate(${px - 3}px, ${py - 3}px)`;
      const half = ring.offsetWidth / 2;
      ring.style.transform = `translate(${rx - half}px, ${ry - half}px)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.body.classList.remove('has-cursor');
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.cursorDot} aria-hidden="true" />
      <div ref={ringRef} className={styles.cursorRing} aria-hidden="true" />
    </>
  );
}
