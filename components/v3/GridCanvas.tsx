'use client';

/**
 * 1:1 haoqi.design blueprint grid (spec SS3).
 * Zero animation-library dependencies: plain rAF + lerp math,
 * works without GSAP loaded.
 *
 * One canvas, fixed inset-0 behind all content (z-index -1).
 * Vertical hairlines only at rails 0/4/8/12 of a 12-column model
 * aligned to --gutter; horizontal rules at exactly 1/3 and 2/3
 * viewport height; 15px crosshairs at rails {0,12} x rules {1/3,2/3}.
 * Nearest crosshair within the proximity radius lerps to 1.9x scale,
 * 90deg rotation and vermilion; springs back on exit.
 */
import { useEffect, useRef } from 'react';
import styles from './GridCanvas.module.css';

const GRID = {
  columns: 12,
  rails: [0, 4, 8, 12],
  ruleFractions: [1 / 3, 2 / 3],
  crossRails: [0, 12],
  crossRuleFractions: [1 / 3, 2 / 3],
  crossSizePx: 15,
  lineWidthPx: 1,
  lineColor: 'rgba(20, 20, 19, 0.08)',
  crossRest: { r: 20, g: 20, b: 19, a: 0.3 },
  crossActive: { r: 255, g: 77, b: 0, a: 1 },
  activeScale: 1.9,
  activeRotationDeg: 90,
  proximityPx: 160,
  springTauMs: 90,
} as const;

interface Crosshair {
  x: number;
  y: number;
  t: number;
}

interface GridGeometry {
  railsX: number[];
  rulesY: number[];
}

export default function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    let lastTime = 0;
    const mouse = { x: -9999, y: -9999 };
    let crosses: Crosshair[] = [];
    let geometry: GridGeometry = { railsX: [], rulesY: [] };

    // --gutter resolves to clamp(20px, 4vw, 64px): measure it instead of parsing.
    const probe = document.createElement('span');
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    probe.style.pointerEvents = 'none';

    const resolveGutter = () => {
      probe.style.left = 'var(--gutter)';
      const host = canvas.parentElement ?? document.body;
      host.appendChild(probe);
      const px = Number.parseFloat(window.getComputedStyle(probe).left);
      probe.remove();
      if (Number.isFinite(px)) return px;
      return Math.min(64, Math.max(20, width * 0.04));
    };

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gutter = resolveGutter();
      const columnWidth = (width - gutter * 2) / GRID.columns;
      const railX = (rail: number) => gutter + columnWidth * rail;

      crosses = [];
      for (const rail of GRID.crossRails) {
        for (const fraction of GRID.crossRuleFractions) {
          crosses.push({ x: railX(rail), y: height * fraction, t: 0 });
        }
      }

      geometry = {
        railsX: GRID.rails.map(railX),
        rulesY: GRID.ruleFractions.map((fraction) => height * fraction),
      };
    };

    const drawCrosshair = (cross: Crosshair) => {
      const scale = 1 + (GRID.activeScale - 1) * cross.t;
      const rotation = (GRID.activeRotationDeg * cross.t * Math.PI) / 180;
      const r = Math.round(GRID.crossRest.r + (GRID.crossActive.r - GRID.crossRest.r) * cross.t);
      const g = Math.round(GRID.crossRest.g + (GRID.crossActive.g - GRID.crossRest.g) * cross.t);
      const b = Math.round(GRID.crossRest.b + (GRID.crossActive.b - GRID.crossRest.b) * cross.t);
      const a = GRID.crossRest.a + (GRID.crossActive.a - GRID.crossRest.a) * cross.t;

      ctx.save();
      ctx.translate(cross.x, cross.y);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      // keep strokes at exactly 1px while the mark scales up
      ctx.lineWidth = GRID.lineWidthPx / scale;
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
      const half = GRID.crossSizePx / 2;
      ctx.beginPath();
      ctx.moveTo(-half, 0);
      ctx.lineTo(half, 0);
      ctx.moveTo(0, -half);
      ctx.lineTo(0, half);
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.lineWidth = GRID.lineWidthPx;
      ctx.strokeStyle = GRID.lineColor;
      ctx.beginPath();
      for (const x of geometry.railsX) {
        const crispX = Math.round(x) + 0.5;
        ctx.moveTo(crispX, 0);
        ctx.lineTo(crispX, height);
      }
      for (const y of geometry.rulesY) {
        const crispY = Math.round(y) + 0.5;
        ctx.moveTo(0, crispY);
        ctx.lineTo(width, crispY);
      }
      ctx.stroke();

      for (const cross of crosses) drawCrosshair(cross);
    };

    const step = (now: number) => {
      if (!running) return;
      const dt = lastTime === 0 ? GRID.springTauMs : Math.min(now - lastTime, 100);
      lastTime = now;
      const k = 1 - Math.exp(-dt / GRID.springTauMs);

      const proximitySq = GRID.proximityPx * GRID.proximityPx;
      let nearestIndex = -1;
      let nearestDistSq = proximitySq;
      for (let i = 0; i < crosses.length; i++) {
        const dx = crosses[i].x - mouse.x;
        const dy = crosses[i].y - mouse.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < nearestDistSq) {
          nearestDistSq = distSq;
          nearestIndex = i;
        }
      }

      for (let i = 0; i < crosses.length; i++) {
        const target = i === nearestIndex ? 1 : 0;
        const cross = crosses[i];
        cross.t += (target - cross.t) * k;
        if (Math.abs(target - cross.t) < 0.001) cross.t = target;
      }

      draw();
      raf = requestAnimationFrame(step);
    };

    const startLoop = () => {
      if (running || reduceMotion) return;
      running = true;
      lastTime = 0;
      raf = requestAnimationFrame(step);
    };

    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointerMove = (event: PointerEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    const onPointerOut = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => {
      setup();
      draw();
    };
    const onVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    setup();

    if (!reduceMotion && finePointer) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.documentElement.addEventListener('mouseleave', onPointerOut);
      window.addEventListener('blur', onPointerOut);
      startLoop();
    } else {
      // reduced motion or coarse pointer: static grid, no loop, no reactivity
      draw();
    }

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      stopLoop();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('mouseleave', onPointerOut);
      window.removeEventListener('blur', onPointerOut);
      probe.remove();
    };
  }, []);

  return (
    <div className={styles.root} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
