'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PalettePost } from './CommandPalette';
import styles from './PaletteDialog.module.css';

interface PaletteItem {
  id: string;
  label: string;
  hint: string;
  keywords: string;
  run: () => void;
}

/** Subsequence fuzzy match: returns a score, or -1 when no match. */
function fuzzyScore(query: string, target: string): number {
  if (!query) return 0;
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  const direct = t.indexOf(q);
  if (direct === 0) return 1000;
  if (direct > 0) return 700 - direct;
  let qi = 0;
  let score = 300;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      score += 1;
      qi++;
    }
  }
  return qi === q.length ? score : -1;
}

export default function PaletteDialog({
  posts,
  open,
  onClose,
}: {
  posts: PalettePost[];
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const items = useMemo<PaletteItem[]>(() => {
    const go = (href: string) => () => {
      router.push(href);
      onClose();
    };
    const external = (url: string) => () => {
      window.open(url, '_blank', 'noopener,noreferrer');
      onClose();
    };
    return [
      { id: 'sec-about', label: 'Go to About', hint: 'section', keywords: 'about bio', run: go('/#about') },
      { id: 'sec-experience', label: 'Go to Experience', hint: 'section', keywords: 'experience work intern timeline', run: go('/#experience') },
      { id: 'sec-projects', label: 'Go to Projects', hint: 'section', keywords: 'projects work showcase gitdigest glam hrm', run: go('/#projects') },
      { id: 'sec-writing', label: 'Go to Writing', hint: 'section', keywords: 'writing blog posts articles', run: go('/#writing') },
      { id: 'sec-contact', label: 'Go to Contact', hint: 'section', keywords: 'contact email hire reach', run: go('/#contact') },
      ...posts.map((post) => ({
        id: `post-${post.slug}`,
        label: post.title,
        hint: 'post',
        keywords: `blog ${post.slug} post`,
        run: go(`/blog/${post.slug}`),
      })),
      {
        id: 'act-copy-email',
        label: 'Copy email address',
        hint: 'action',
        keywords: 'copy email clipboard mail',
        run: () => {
          navigator.clipboard
            .writeText('osoriokenneth91@gmail.com')
            .catch(() => window.location.href = 'mailto:osoriokenneth91@gmail.com');
          onClose();
        },
      },
      {
        id: 'act-download-cv',
        label: 'Download CV',
        hint: 'action',
        keywords: 'cv resume download curriculum vitae',
        run: () => {
          const a = document.createElement('a');
          a.href = '/cv/CV_Osorio,Kenneth.pdf';
          a.download = 'CV_Osorio_Kenneth.pdf';
          document.body.appendChild(a);
          a.click();
          a.remove();
          onClose();
        },
      },
      { id: 'act-github', label: 'Open GitHub', hint: 'link', keywords: 'github code repos kriezer12', run: external('https://github.com/kriezer12') },
      { id: 'act-linkedin', label: 'Open LinkedIn', hint: 'link', keywords: 'linkedin profile network', run: external('https://linkedin.com/in/kenneth-osorio-4b0a042b1') },
      { id: 'act-calendly', label: 'Schedule a call', hint: 'link', keywords: 'calendly call meeting schedule consultation', run: external('https://calendly.com/kennethosorio/consultation') },
    ];
  }, [posts, router, onClose]);

  const results = useMemo(() => {
    const scored = items
      .map((item) => ({ item, score: fuzzyScore(query, `${item.label} ${item.keywords}`) }))
      .filter((r) => r.score >= 0)
      .sort((a, b) => b.score - a.score);
    return scored.map((r) => r.item);
  }, [items, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  if (!open) return null;

  const execute = (item: PaletteItem) => item.run();

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const item = results[activeIndex];
      if (item) execute(item);
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.overlay} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label="Command palette" className={styles.dialog}>
        <input
          ref={inputRef}
          className={styles.input}
          placeholder="type a command or search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-results"
          aria-activedescendant={results[activeIndex] ? `palette-opt-${results[activeIndex].id}` : undefined}
        />
        <ul ref={listRef} id="palette-results" role="listbox" className={styles.results}>
          {results.map((item, i) => (
            <li
              key={item.id}
              id={`palette-opt-${item.id}`}
              role="option"
              aria-selected={i === activeIndex}
              className={`${styles.result} ${i === activeIndex ? styles.resultActive : ''}`}
              onPointerEnter={() => setActiveIndex(i)}
              onClick={() => execute(item)}
            >
              <span className={styles.resultLabel}>{item.label}</span>
              <span className={styles.resultHint}>{item.hint}</span>
            </li>
          ))}
          {results.length === 0 && <li className={styles.empty}>no matches</li>}
        </ul>
        <p className={styles.footer}>
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </p>
      </div>
    </div>
  );
}
