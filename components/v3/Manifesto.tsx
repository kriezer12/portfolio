'use client';

import { Fragment, useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import SectionHeader from './SectionHeader';
import styles from './Manifesto.module.css';

interface Segment {
  text: string;
  hl?: boolean;
}

const STATEMENT: Segment[] = [
  { text: 'I build bridges between' },
  { text: 'robust backends', hl: true },
  { text: 'and' },
  { text: 'intuitive frontends', hl: true },
  { text: '— then automate everything in between.' },
];

const COLOPHON_LABEL = 'Colophon — About the author';

const COLOPHON_PARAGRAPHS: string[] = [
  'Fullstack developer intern and IT student at PUP Manila, working with Next.js, React, Node.js, Python, and PostgreSQL. Focused on the DevOps space — CI/CD pipelines, cloud infrastructure, and clean execution.',
  'He helped lead a team to engineer a full-stack NFC loyalty platform for the salon industry, accelerating feature rollouts while reducing support escalations. Currently deepening network fundamentals through CCNA study.',
];

const COLOPHON_FOOT = 'Consistent President’s Lister, PUP';

const WORDS: { word: string; hl: boolean }[] = STATEMENT.flatMap((segment) =>
  segment.text
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => ({ word, hl: segment.hl ?? false })),
);

const FULL_TEXT = STATEMENT.map((segment) => segment.text).join(' ');

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
          <span className={styles.sideLabel}>{COLOPHON_LABEL}</span>
          {COLOPHON_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
          <span className={styles.sideFoot}>{COLOPHON_FOOT}</span>
        </aside>
      </div>
    </section>
  );
}
