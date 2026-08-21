'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, X } from 'lucide-react';
import styles from './Certifications.module.css';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
}

export default function CertificationsList({ certifications }: { certifications: Certification[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const selected = selectedIndex !== null ? certifications[selectedIndex] : null;

  const close = useCallback(() => {
    const current = selectedIndex;
    setSelectedIndex(null);
    if (current !== null) {
      requestAnimationFrame(() => triggerRefs.current[current]?.focus());
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;
    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, close]);

  return (
    <div className={styles.list}>
      {certifications.map((cert, index) => (
        <button
          key={index}
          type="button"
          ref={(el) => {
            triggerRefs.current[index] = el;
          }}
          className={`${styles.row} ${!cert.image ? styles.rowStatic : ''}`}
          onClick={() => cert.image && setSelectedIndex(index)}
          disabled={!cert.image}
          aria-label={cert.image ? `View certificate for ${cert.title}` : undefined}
        >
          <span className={styles.rowIndex}>{String(index + 1).padStart(2, '0')}</span>
          <span className={styles.rowBody}>
            <span className={styles.certTitle}>{cert.title}</span>
            <span className={styles.meta}>
              {cert.issuer} · {cert.date}
            </span>
            <span className={styles.description}>{cert.description}</span>
          </span>
          {cert.image ? (
            <ArrowUpRight size={16} className={styles.rowArrow} aria-hidden="true" />
          ) : (
            <span className={styles.progress}>◐ studying</span>
          )}
        </button>
      ))}

      {selected && (
        <div
          className={styles.overlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div role="dialog" aria-modal="true" aria-label={selected.title} className={styles.modal}>
            <div className={styles.modalHead}>
              <h2 className={styles.modalTitle}>{selected.title}</h2>
              <button
                ref={closeButtonRef}
                type="button"
                className={styles.closeButton}
                onClick={close}
                aria-label="Close certificate view"
              >
                <X size={20} />
              </button>
            </div>
            <p className={styles.modalMeta}>
              {selected.issuer} · {selected.date}
            </p>
            <div className={styles.certificateFrame}>
              <Image
                src={encodeURI(selected.image)}
                alt={`${selected.title} certificate`}
                fill
                sizes="(max-width: 720px) 90vw, 640px"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
