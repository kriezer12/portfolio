'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { capabilities, studying } from '@/content/v3';
import { gsap, useReducedMotion } from '@/lib/gsap';
import styles from './Capabilities.module.css';

interface CapabilitiesProps {
  header?: ReactNode;
}

export default function Capabilities({ header }: CapabilitiesProps) {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.capItems} li`, {
        x: -22,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.045,
        scrollTrigger: { trigger: root, start: 'top 70%', once: true },
      });
    }, root);

    return () => ctx.revert();
  }, [reduceMotion]);

  const spanClasses = [styles.g1, styles.g2, styles.g3];

  return (
    <section id="capabilities" className={styles.section} ref={rootRef}>
      {header}
      <div className={styles.capGrid}>
        {capabilities.map((group, i) => (
          <div key={group.label} className={`${styles.capGroup} ${spanClasses[i] ?? ''}`}>
            <span className={`${styles.capLabel} ${styles.mono}`}>{group.label}</span>
            <ul className={styles.capItems}>
              {group.items.map((item) => (
                <li key={item.code}>
                  <span className={styles.n}>{item.code}</span>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className={styles.capFoot}>
          <span className={`${styles.mono} ${styles.studyingLabel}`}>{studying.label}</span>
          <p>{studying.text}</p>
        </div>
      </div>
    </section>
  );
}
