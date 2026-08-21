'use client';

/**
 * Behavioural port of ReactBits "Particles" onto a lightweight 2D canvas.
 * No WebGL, no dependencies. See DESIGN.md — motion and reduced-motion rules.
 */
import { useEffect, useRef } from 'react';
import styles from './ParticlesBackground.module.css';

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmall = window.matchMedia('(max-width: 768px)').matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;

    interface Dot {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      green: boolean;
    }

    let dots: Dot[] = [];
    const mouse = { x: -9999, y: -9999 };

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = isSmall ? 34 : 72;
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.6,
        green: Math.random() < 0.28,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.green ? 'rgba(136, 215, 170, 0.34)' : 'rgba(191, 201, 192, 0.16)';
        ctx.fill();
      }
    };

    const step = () => {
      if (!running) return;
      for (const d of dots) {
        // gentle drift toward pointer for parallax
        const dx = mouse.x - d.x;
        const dy = mouse.y - d.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 160 && dist > 0.001) {
          d.x += (dx / dist) * 0.12;
          d.y += (dy / dist) * 0.12;
        }
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -8) d.x = width + 8;
        if (d.x > width + 8) d.x = -8;
        if (d.y < -8) d.y = height + 8;
        if (d.y > height + 8) d.y = -8;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    const onPointer = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => {
      setup();
      draw();
    };
    const onVisibility = () => {
      running = document.visibilityState === 'visible';
      if (running && !reduceMotion) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(step);
      }
    };

    setup();

    if (reduceMotion) {
      draw(); // single static frame
    } else {
      raf = requestAnimationFrame(step);
      window.addEventListener('pointermove', onPointer, { passive: true });
      window.addEventListener('pointerleave', onLeave);
    }

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
