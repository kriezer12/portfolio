'use client';

import { profile } from '@/content/v3';
import { useManilaClock } from '@/hooks/useManilaClock';
import styles from './TopBar.module.css';

const NAV_ITEMS = [
  { label: 'About', href: '#manifesto' },
  { label: 'Work', href: '#work' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function TopBar() {
  const time = useManilaClock();

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
