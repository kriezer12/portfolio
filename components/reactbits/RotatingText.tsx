'use client';

/**
 * Behavioural port of ReactBits "RotatingText" onto the motion stack (no GSAP).
 * Cycles through words with a vertical slide; renders statically under reduced motion.
 */
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

type RotatingTextProps = {
  words: string[];
  intervalMs?: number;
  className?: string;
};

export default function RotatingText({ words, intervalMs = 2400, className }: RotatingTextProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const timer = setInterval(() => setIndex((v) => (v + 1) % words.length), intervalMs);
    return () => clearInterval(timer);
  }, [words.length, intervalMs]);

  return (
    <span className={className} style={{ display: 'inline-block' }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={reduceMotion ? false : { opacity: 0, y: '60%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: '-60%' }}
          transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
