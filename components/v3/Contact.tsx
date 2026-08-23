'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { bookingUrl, links, profile } from '@/content/v3';
import { FINE_POINTER_MEDIA, gsap, useReducedMotion } from '@/lib/gsap';
import { useManilaClock } from '@/hooks/useManilaClock';
import styles from './Contact.module.css';

interface ContactProps {
  header?: ReactNode;
}

export default function Contact({ header }: ContactProps) {
  const rootRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLHeadingElement>(null);
  const orbRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const time = useManilaClock();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduceMotion) return;

    const ctx = gsap.context(() => {
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          yPercent: 22,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom bottom', scrub: 0.5 },
        });
      }
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          scale: 0.86,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
      gsap.from(`.${styles.contactSide} > *`, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: `.${styles.contactSide}`, start: 'top 85%', once: true },
      });
    }, root);

    const cleanups: Array<() => void> = [];
    if (window.matchMedia(FINE_POINTER_MEDIA).matches) {
      const magnetics = Array.from(root.querySelectorAll<HTMLElement>('[data-magnetic]'));
      magnetics.forEach((el) => {
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          gsap.to(el, {
            x: (e.clientX - (r.left + r.width / 2)) * 0.28,
            y: (e.clientY - (r.top + r.height / 2)) * 0.28,
            duration: 0.4,
            ease: 'power2.out',
          });
        };
        const leave = () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
        };
        el.addEventListener('mousemove', move);
        el.addEventListener('mouseleave', leave);
        cleanups.push(() => {
          el.removeEventListener('mousemove', move);
          el.removeEventListener('mouseleave', leave);
        });
      });
    }

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [reduceMotion]);

  return (
    <section id="contact" className={`${styles.section} ${styles.contact}`} ref={rootRef}>
      {header}
      <div className={styles.contactGrid}>
        <h2 className={styles.contactCta} ref={ctaRef}>
          <span className={styles.maskLine}>
            <span>Let&rsquo;s</span>
          </span>
          <span className={styles.maskLine}>
            <span className={styles.line2}>
              <span className={styles.ctaOrb} ref={orbRef} aria-hidden="true" />
              Talk
            </span>
          </span>
        </h2>
        <div className={styles.contactSide}>
          <div className={styles.btnRow}>
            <a
              className={`${styles.btn} ${styles.btnSolid}`}
              href={`mailto:${profile.email}`}
              data-magnetic
              data-hover
            >
              <span>Email me ↗</span>
            </a>
            <a
              className={styles.btn}
              href={bookingUrl}
              target="_blank"
              rel="noopener"
              data-magnetic
              data-hover
            >
              <span>Book a call</span>
            </a>
          </div>
          <a className={styles.bigMail} href={`mailto:${profile.email}`} data-hover>
            {profile.email}
          </a>
          <div className={styles.linkCols}>
            {links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener" data-hover>
                <span>{link.label}</span>
                <span>↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer className={`${styles.footer} ${styles.mono}`}>
        <span>&copy; 2026 Kenneth P. Osorio</span>
        <span>Set in Clash Display &amp; Satoshi</span>
        <span>
          Manila — <span>{time}</span> PHT
        </span>
      </footer>
    </section>
  );
}
