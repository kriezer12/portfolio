'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { work } from '@/content/v3';
import { gsap } from '@/lib/gsap';
import styles from './WorkList.module.css';

interface WorkListProps {
  header?: ReactNode;
}

export default function WorkList({ header }: WorkListProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.workRow}`, {
        yPercent: 18,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: { trigger: `.${styles.workList}`, start: 'top 82%', once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className={styles.section} ref={rootRef}>
      {header}
      <div className={styles.workList}>
        {work.map((entry) => (
          <a
            key={entry.index}
            className={styles.workRow}
            href={entry.href}
            {...(entry.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
            data-hover
          >
            <span className={`${styles.workIdx} ${styles.mono}`}>{entry.index}</span>
            <div className={styles.workMain}>
              <h3 className={styles.workTitle}>{entry.title}</h3>
              <p className={styles.workDesc}>{entry.description}</p>
            </div>
            <ul className={styles.workTags}>
              {entry.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <span className={styles.workArrow} aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
