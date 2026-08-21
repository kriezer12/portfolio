'use client';
import { FileText, Calendar } from 'lucide-react';
import SplitText from '@/components/reactbits/SplitText';
import RotatingText from '@/components/reactbits/RotatingText';
import styles from './Hero.module.css';

const MARQUEE_ITEMS = [
  'fullstack',
  'devops',
  'cloud',
  'ai',
  'automation',
  'networking',
  'open source',
];

export default function Hero() {
  return (
    <>
      <section className={styles.hero} aria-label="Introduction">
        <p className={styles.kicker}>~/kenneth-osorio — portfolio_v2</p>

        <h1 className={styles.name}>
          <SplitText
            text="KENNETH"
            as="span"
            className={`${styles.nameLine} ${styles.nameFilled}`}
          />
          <SplitText
            text="OSORIO"
            as="span"
            className={`${styles.nameLine} ${styles.nameOutline}`}
            delayS={0.24}
          />
          <span className={`${styles.nameDot} ${styles.dotReveal}`}>.</span>
        </h1>

        <div className={styles.roleLine}>
          <span className={styles.prompt} aria-hidden="true">
            &gt;
          </span>
          <RotatingText
            className={styles.roleWord}
            words={['AI / SWE', 'DEVOPS', 'CLOUD']}
          />
          <span className={styles.cursor} aria-hidden="true" />
        </div>

        <p className={styles.meta}>cavite, ph — 14.48°N 120.98°E — open to work</p>

        <div className={styles.actions}>
          <a className={styles.action} href="/cv/CV_Osorio,Kenneth.pdf" download>
            <FileText size={14} aria-hidden="true" /> [download_cv]
          </a>
          <a
            className={styles.action}
            href="https://calendly.com/kennethosorio/consultation"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Calendar size={14} aria-hidden="true" /> [schedule_call]
          </a>
        </div>

        <a href="#about" className={styles.scrollCue}>
          scroll <span aria-hidden="true">↓</span>
        </a>
      </section>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[0, 1].map((copy) => (
            <div className={styles.marqueeGroup} key={copy}>
              {MARQUEE_ITEMS.map((item) => (
                <span className={styles.marqueeItem} key={`${copy}-${item}`}>
                  {item}
                  <span className={styles.marqueeDot}>·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
