'use client';

import { useEffect, useRef } from 'react';
import { FINE_POINTER_MEDIA, useReducedMotion } from '@/lib/gsap';

interface DotFieldProps {
  className?: string;
}

interface Dot {
  ox: number;
  oy: number;
  x: number;
  y: number;
}

export default function DotField({ className }: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const finePointer = window.matchMedia(FINE_POINTER_MEDIA).matches;
    if (reduceMotion || !finePointer) return;

    const maybeCtx = canvasEl.getContext('2d');
    if (!maybeCtx) return;
    const ctx: CanvasRenderingContext2D = maybeCtx;
    const canvas: HTMLCanvasElement = canvasEl;

    // Events live on the section hosting the canvas (content overlays it).
    const host = canvas.parentElement ?? canvas;

    let raf = 0;
    let W = 0;
    let H = 0;
    let dots: Dot[] = [];
    const mouse = { x: -9999, y: -9999 };
    const GAP = 28;
    const RADIUS = 150;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = GAP / 2; y < H; y += GAP) {
        for (let x = GAP / 2; x < W; x += GAP) {
          dots.push({ ox: x, oy: y, x, y });
        }
      }
    }

    function onMouseMove(e: MouseEvent) {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    }

    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let tx = d.ox;
        let ty = d.oy;
        let near = 0;
        if (dist < RADIUS && dist > 0.001) {
          const f = (RADIUS - dist) / RADIUS;
          tx = d.ox + (dx / dist) * f * 42;
          ty = d.oy + (dy / dist) * f * 42;
          near = f;
        }
        d.x += (tx - d.x) * 0.14;
        d.y += (ty - d.y) * 0.14;
        ctx.fillStyle = `rgba(20,20,19,${(0.16 + near * 0.6).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1 + near * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    window.addEventListener('resize', resize);
    host.addEventListener('mousemove', onMouseMove);
    host.addEventListener('mouseleave', onMouseLeave);

    resize();
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      host.removeEventListener('mousemove', onMouseMove);
      host.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
