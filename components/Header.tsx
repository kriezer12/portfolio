'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { index: '01', label: 'about', href: '/#about' },
  { index: '02', label: 'experience', href: '/#experience' },
  { index: '03', label: 'projects', href: '/#projects' },
  { index: '04', label: 'writing', href: '/#writing' },
  { index: '05', label: 'certifications', href: '/certifications' },
  { index: '06', label: 'contact', href: '/#contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
      if (e.key === 'Tab') {
        const focusables = overlayRef.current?.querySelectorAll<HTMLElement>('a, button');
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, closeMenu]);

  const openPalette = () => window.dispatchEvent(new CustomEvent('v2:open-palette'));

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" className={styles.wordmark} aria-label="Kenneth Osorio — home">
          KO<span className={styles.wordmarkAccent}>.</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link key={item.index} href={item.href} className={styles.navLink}>
              <span className={styles.navIndex}>{item.index}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.controls}>
          <button type="button" className={styles.paletteHint} onClick={openPalette} aria-label="Open quick search">
            <span className={styles.paletteKey}>CTRL</span>
            <span className={styles.paletteKey}>K</span>
            <Search size={15} className={styles.paletteIcon} aria-hidden="true" />
            <span className={styles.paletteHintText}>navigate</span>
          </button>
          <button
            ref={triggerRef}
            type="button"
            className={styles.menuToggle}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => (isMenuOpen ? closeMenu() : setIsMenuOpen(true))}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`${styles.overlay} ${isMenuOpen ? styles.overlayOpen : ''}`}
      >
        <nav className={styles.overlayNav} aria-label="Mobile">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.index}
              href={item.href}
              className={styles.overlayLink}
              style={{ transitionDelay: isMenuOpen ? `${80 + i * 40}ms` : '0ms' }}
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={closeMenu}
            >
              <span className={styles.overlayIndex}>{item.index}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <p className={styles.overlayMeta}>kenneth osorio — cavite, ph</p>
      </div>
    </header>
  );
}
