'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, X } from 'lucide-react';
import SectionHeader from './SectionHeader';
import styles from './Projects.module.css';

interface Project {
  id: number;
  name: string;
  description: string;
  tags: string[];
  link: string;
  status: string;
  extendedDescription?: string;
  media?: string[];
}

const projects: Project[] = [
  {
    id: 1,
    name: 'GitDigest',
    description:
      'An AI-powered GitHub digest tool that summarizes team activity and delivers daily briefings to Discord. Evolved from a simple n8n workflow to a robust cloud-native architecture using AWS Lambda, EC2, and Docker.',
    tags: ['AI', 'AWS', 'Docker', 'n8n', 'Next.js', 'Vercel'],
    link: 'https://v0-devdigest-web-app.vercel.app/',
    status: 'live',
    extendedDescription:
      'GitDigest was built to solve the information overload in development teams. It uses GitHub webhooks and AI to parse commits and issues into concise summaries, improving team transparency without manual reporting.',
    media: [
      '/projects/gitdigest/001.png',
      '/projects/gitdigest/002.png',
      '/projects/gitdigest/003.png',
      '/projects/gitdigest/004.png',
      '/projects/gitdigest/005.png',
    ],
  },
  {
    id: 2,
    name: 'GLAM-ID · NFC Loyalty',
    description:
      'A full-stack web application designed to power modern aesthetic clinics by enabling loyalty reward programs using NFC tags. Staff and customers track visits, rewards, and membership status via NFC scans.',
    tags: ['React', 'Vite', 'Tailwind', 'TypeScript', 'Supabase', 'Docker', 'NFC'],
    link: '#',
    status: 'completed',
    extendedDescription:
      'GLAM-ID bridges the physical and digital space in aesthetic clinics. By leveraging NFC, it eliminates physical membership cards and integrates seamless loyalty tracking directly into the clinic workflow.',
    media: [],
  },
  {
    id: 3,
    name: 'Municipal HRM System',
    description:
      'A prototype HR platform built by a five-person team to simulate a real-world municipal HR environment for the Municipality of Concepción — hiring, onboarding, attendance, performance tracking, and reporting.',
    tags: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    link: 'https://municipal-hr-management-system.vercel.app/',
    status: 'completed',
    extendedDescription:
      'The system provides employee records, attendance monitoring, and performance management tailored for municipal government HR processes.',
    media: [
      '/projects/municipal-hrm/001.png',
      '/projects/municipal-hrm/002.png',
      '/projects/municipal-hrm/003.png',
      '/projects/municipal-hrm/004.png',
      '/projects/municipal-hrm/005.png',
      '/projects/municipal-hrm/006.png',
      '/projects/municipal-hrm/007.png',
      '/projects/municipal-hrm/008.png',
    ],
  },
  {
    id: 4,
    name: 'Obsidian Blog',
    description:
      'A personal blog integrated into the portfolio, powered by an Obsidian vault and Next.js — markdown notes become published posts via a gray-matter content pipeline.',
    tags: ['Next.js', 'Markdown', 'Obsidian', 'gray-matter'],
    link: 'https://blog.kennethosorio.dev',
    status: 'live',
    extendedDescription:
      'Writing lives in Obsidian; the site reads the same vault at build time, so publishing is just saving a note. Covers agentic development, self-discipline, and build logs.',
    media: [],
  },
];

export default function Projects() {
  const [openId, setOpenId] = useState<number | null>(null);
  const openProject = projects.find((p) => p.id === openId) ?? null;
  const triggerRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    if (openId === null) return;
    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], img[tabindex]'
        );
        if (focusables.length === 0) return;
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
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openId, close]);

  const handleRowClick = (project: Project) => {
    triggerRefs.current[project.id] = document.activeElement as HTMLButtonElement;
    setOpenId(project.id);
  };

  const handleCloseButtonClick = () => {
    close();
    if (openProject) triggerRefs.current[openProject.id]?.focus();
  };

  return (
    <section className={styles.projects} id="projects">
      <SectionHeader index="03" title="Projects" />

      <div className={styles.index}>
        {projects.map((project, i) => (
          <button
            key={project.id}
            type="button"
            ref={(el) => {
              triggerRefs.current[project.id] = el;
            }}
            className={styles.row}
            onClick={() => handleRowClick(project)}
            aria-haspopup="dialog"
          >
            <span className={styles.rowIndex}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.rowName}>{project.name}</span>
            <span className={`${styles.rowStatus} ${project.status === 'live' ? styles.statusLive : ''}`}>
              {project.status === 'live' && <span className={styles.liveDot} aria-hidden="true" />}
              {project.status}
            </span>
            <ArrowUpRight size={18} className={styles.rowArrow} aria-hidden="true" />
          </button>
        ))}
      </div>

      {openProject && (
        <div
          className={styles.overlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              close();
              triggerRefs.current[openProject.id]?.focus();
            }
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={openProject.name}
            className={styles.modal}
          >
            <div className={styles.modalHead}>
              <span className={styles.modalKicker}>
                project/<span className={styles.modalKickerAccent}>{openProject.id}</span>
              </span>
              <h3 className={styles.modalTitle}>{openProject.name}</h3>
              <button
                ref={closeButtonRef}
                type="button"
                className={styles.closeButton}
                onClick={handleCloseButtonClick}
                aria-label="Close project details"
              >
                <X size={20} />
              </button>
            </div>

            <p className={styles.modalDescription}>{openProject.description}</p>
            {openProject.extendedDescription && (
              <p className={styles.modalExtended}>{openProject.extendedDescription}</p>
            )}

            <p className={styles.modalTags}>
              {openProject.tags.map((tag, i) => (
                <span key={tag}>
                  {i > 0 && <span className={styles.tagDot}> · </span>}
                  {tag}
                </span>
              ))}
            </p>

            {openProject.media && openProject.media.length > 0 && (
              <div className={styles.gallery} aria-label={`${openProject.name} screenshots`}>
                {openProject.media.map((src, i) => (
                  <div key={src} className={styles.galleryItem}>
                    <Image
                      src={src}
                      alt={`${openProject.name} screenshot ${i + 1}`}
                      fill
                      sizes="(max-width: 720px) 90vw, 560px"
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                    />
                  </div>
                ))}
              </div>
            )}

            {openProject.link !== '#' && (
              <a
                className={styles.visitLink}
                href={openProject.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                [visit_project] <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
