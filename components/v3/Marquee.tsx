'use client';

import { marqueeWords } from '@/content/v3';
import styles from './Marquee.module.css';

export default function Marquee() {
  const half = [...marqueeWords, ...marqueeWords];
  const chunks = [...half, ...half];

  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {chunks.map((word, index) => (
          <span key={`${word}-${index}`} className={styles.chunk}>
            {word}
            <i>&mdash;</i>
          </span>
        ))}
      </div>
    </div>
  );
}
