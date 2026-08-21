'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import styles from './Footer.module.css';

function usePhilippinesClock(): string {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat('en-PH', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'Asia/Manila',
        }).format(new Date())
      );
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return time;
}

export default function Footer() {
  const time = usePhilippinesClock();

  const backToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.item}>
          © 2026 kenneth osorio
        </p>
        <p className={styles.item} aria-label={`Current time in the Philippines: ${time}`}>
          <span className={styles.clockLabel}>ph</span> {time || '--:--:--'}
        </p>
        <div className={styles.socials}>
          <a href="https://linkedin.com/in/kenneth-osorio-4b0a042b1" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialLink}>
            <FaLinkedin size={15} />
          </a>
          <a href="https://github.com/kriezer12" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.socialLink}>
            <FaGithub size={15} />
          </a>
          <a href="https://www.instagram.com/thirsty_samurai/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialLink}>
            <FaInstagram size={15} />
          </a>
        </div>
        <button type="button" className={styles.topButton} onClick={backToTop} aria-label="Back to top">
          top <ArrowUp size={13} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
