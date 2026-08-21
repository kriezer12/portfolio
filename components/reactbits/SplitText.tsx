'use client';

/**
 * Behavioural port of ReactBits "SplitText" onto the motion stack (no GSAP).
 * See DESIGN.md — motion rules and reduced-motion behaviour.
 */
import { motion, useReducedMotion } from 'motion/react';

type SplitTextProps = {
  text: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
  className?: string;
  charClassName?: string;
  staggerMs?: number;
  durationS?: number;
  delayS?: number;
};

export default function SplitText({
  text,
  as = 'span',
  className,
  charClassName,
  staggerMs = 26,
  durationS = 0.55,
  delayS = 0,
}: SplitTextProps) {
  const reduceMotion = useReducedMotion();
  const Tag = as;

  if (reduceMotion) {
    return (
      <Tag className={className} aria-label={text}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          aria-hidden="true"
          className={charClassName}
          initial={{ opacity: 0, y: '0.85em' }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: durationS,
            delay: delayS + (i * staggerMs) / 1000,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: 'inline-block', willChange: 'transform, opacity' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Tag>
  );
}
