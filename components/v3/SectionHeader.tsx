'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  idx: string;
  title: string;
  note?: string;
}

export default function SectionHeader({ idx, title, note }: SectionHeaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(
      () => {
        gsap.from(`.${styles.secTitle}`, {
          yPercent: 115,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 85%',
            once: true,
          },
        });

        gsap.from(`.${styles.secIdx}`, {
          opacity: 0,
          x: -14,
          duration: 0.7,
          delay: 0.15,
          scrollTrigger: {
            trigger: root,
            start: 'top 85%',
            once: true,
          },
        });
      },
      root,
    );

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className={styles.secHead} ref={rootRef}>
      <span className={styles.secIdx}>{idx}</span>
      <h2 className={styles.secTitleMask}>
        <span className={styles.secTitle}>{title}</span>
      </h2>
      {note ? <span className={styles.secNote}>{note}</span> : null}
    </div>
  );
}
