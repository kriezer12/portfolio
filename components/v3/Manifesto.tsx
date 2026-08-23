'use client';

import { Fragment, useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import SectionHeader from './SectionHeader';
import { colophon, manifestoStatement } from '@/content/v3';
import styles from './Manifesto.module.css';

const WORDS: { word: string; hl: boolean }[] = manifestoStatement.flatMap((segment) =>
  segment.text
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => ({ word, hl: segment.hl ?? false })),
);

const FULL_TEXT = manifestoStatement.map((segment) => segment.text).join(' ');

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(
      () => {
        gsap.fromTo(
          '[data-word]',
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              end: 'center 45%',
              scrub: 0.4,
            },
          },
        );
      },
      section,
    );

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="manifesto" className={styles.section} ref={sectionRef}>
      <SectionHeader idx="(02)" title="The Short Version" note="Manifesto / About" />
      <div className={styles.manifestoGrid}>
        <p className={styles.statement} aria-label={FULL_TEXT}>
          <span aria-hidden="true">
            {WORDS.map(({ word, hl }, i) => (
              <Fragment key={`${word}-${i}`}>
                <span data-word className={hl ? `${styles.word} ${styles.hl}` : styles.word}>
                  {word}
                </span>{' '}
              </Fragment>
            ))}
          </span>
        </p>
        <aside className={styles.manifestoSide}>
          <span className={styles.sideLabel}>{colophon.label}</span>
          {colophon.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
          <span className={styles.sideFoot}>{colophon.foot}</span>
        </aside>
      </div>
    </section>
  );
}
