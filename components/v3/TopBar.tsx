'use client';

import { useEffect, useState } from 'react';
import { profile } from '@/content/v3';
import styles from './TopBar.module.css';

const NAV_ITEMS = [
  { label: 'About', href: '#manifesto' },
  { label: 'Work', href: '#work' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function TopBar() {
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-PH', {
      timeZone: 'Asia/Manila',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <header className={styles.topbar}>
      <a className={styles.brand} href="#top" data-hover>
        K.O.<sup>V3</sup>
      </a>
      <nav aria-label="Primary">
        <ul className={styles.navLinks}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a className={styles.navLink} href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.navMeta}>
        <div className={styles.clock}>
          <span>{time}</span> MNL
        </div>
        <div className={styles.status}>{profile.status}</div>
      </div>
    </header>
  );
}
