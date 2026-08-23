'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { experience } from '@/content/v3';
import { gsap } from '@/lib/gsap';
import styles from './ExperienceList.module.css';

interface ExperienceListProps {
  header?: ReactNode;
}

export default function ExperienceList({ header }: ExperienceListProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.xpRow}`, {
        yPercent: 30,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: `.${styles.xpList}`, start: 'top 82%', once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className={styles.section} ref={rootRef}>
      {header}
      <div className={styles.xpList}>
        {experience.map((entry) => (
          <div key={`${entry.year}-${entry.role}`} className={styles.xpRow}>
            <span className={`${styles.xpYear} ${styles.mono}`}>{entry.year}</span>
            <h3 className={styles.xpRole}>{entry.role}</h3>
            <span className={styles.xpOrg}>{entry.org}</span>
            <span className={`${styles.xpTag} ${styles.mono}`}>{entry.tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
