'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Calendar, Check, Copy } from 'lucide-react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import SectionHeader from './SectionHeader';
import styles from './Contact.module.css';

const EMAIL = 'osoriokenneth91@gmail.com';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }, []);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return (
    <section className={styles.contact} id="contact">
      <SectionHeader index="05" title="Contact" />

      <p className={styles.cta}>
        <span className={styles.ctaPrompt} aria-hidden="true">
          &gt;
        </span>{' '}
        let&apos;s build something
        <span className={styles.ctaCursor} aria-hidden="true" />
      </p>

      <p className={styles.intro}>
        Open to internships, collaborations, and commissions. The fastest routes:
      </p>

      <div className={styles.actions}>
        <button type="button" className={styles.action} onClick={copyEmail}>
          {copied ? (
            <>
              <Check size={14} aria-hidden="true" /> [email_copied]
            </>
          ) : (
            <>
              <Copy size={14} aria-hidden="true" /> [copy_email]
            </>
          )}
        </button>
        <a
          className={styles.action}
          href={`mailto:${EMAIL}`}
        >
          [open_mailto]
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

      <div className={styles.socials}>
        <a href="https://linkedin.com/in/kenneth-osorio-4b0a042b1" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="LinkedIn">
          <FaLinkedin size={18} />
        </a>
        <a href="https://github.com/kriezer12" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="GitHub">
          <FaGithub size={18} />
        </a>
        <a href="https://www.instagram.com/thirsty_samurai/" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="Instagram">
          <FaInstagram size={18} />
        </a>
      </div>
    </section>
  );
}
