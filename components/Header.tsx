'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.teardrop}>
        <div className={styles.content}>
          <div className={styles.topRow}>
            <div className={styles.logoSpacer} />
            <div className={styles.logo}>
              <span className={styles.logoText}>KO.dev</span>
            </div>
            <div className={styles.controls}>
              <ThemeToggle />
              <button className={styles.menuToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
            <Link href="/" onClick={() => setIsMenuOpen(false)}>about</Link>
            <Link href="/#expertise" onClick={() => setIsMenuOpen(false)}>stack</Link>
            <Link href="/#experience" onClick={() => setIsMenuOpen(false)}>experience</Link>
            <Link href="/#projects" onClick={() => setIsMenuOpen(false)}>projects</Link>
            <Link href="/#certifications" onClick={() => setIsMenuOpen(false)}>certifications</Link>
            <Link href="/#contact" onClick={() => setIsMenuOpen(false)}>contact</Link>
            <div className={styles.desktopToggle}>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
