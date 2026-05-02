'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ProjectCard } from './ProjectCard';
import { ProjectLightbox } from './ProjectLightbox';
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
    name: 'DevDigest',
    description: 'An AI-powered GitHub digest tool that summarizes team activity and delivers daily briefings to Discord. Evolved from a simple n8n workflow to a robust cloud-native architecture using AWS Lambda, EC2, and Docker.',
    tags: ['AI', 'AWS', 'Docker', 'n8n', 'Next.js', 'Vercel'],
    link: 'https://v0-devdigest-web-app.vercel.app/',
    status: 'live',
    extendedDescription: 'DevDigest was built to solve the information overload in development teams. It uses GitHub webhooks and AI to parse commits and issues into concise summaries, improving team transparency without manual reporting.',
    media: ['/projects/gitdigest/001.png', '/projects/gitdigest/002.png', '/projects/gitdigest/003.png', '/projects/gitdigest/004.png', '/projects/gitdigest/005.png'],
  },
  {
    id: 2,
    name: 'GLAM-ID',
    description: 'A full-stack web application designed to power modern aesthetic clinics by enabling loyalty reward programs using NFC tags. It allows staff and customers to easily track visits, rewards, and membership status via NFC scans.',
    tags: ['React', 'Vite', 'Tailwind', 'TypeScript', 'Supabase', 'Docker', 'DevOps', 'NFC'],
    link: '#',
    status: 'completed',
    extendedDescription: 'GLAM-ID bridges the physical and digital space in aesthetic clinics. By leveraging NFC, it eliminates physical membership cards and integrates seamless loyalty tracking directly into the clinic\'s workflow.',
    media: [],
  },
  {
    id: 3,
    name: 'Municipal HR Management System',
    description: 'Municipal HR Management System is a prototype HR platform built as a web-dev project by a 5‑person team for Web Dev (2425 DIT 3-2), designed to simulate a real-world municipal HR environment for the Municipality of Concepción. The system models core HR workflows (hiring, onboarding, attendance, performance tracking, and reporting).',
    tags: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    link: 'https://municipal-hr-management-system.vercel.app/',
    status: 'completed',
    extendedDescription: 'This system provides a comprehensive HR solution including employee records, attendance monitoring, and performance management, specifically tailored for municipal government HR processes.',
    media: ['/projects/municipal-hrm/001.png', '/projects/municipal-hrm/002.png', '/projects/municipal-hrm/003.png', '/projects/municipal-hrm/004.png', '/projects/municipal-hrm/005.png', '/projects/municipal-hrm/006.png', '/projects/municipal-hrm/007.png', '/projects/municipal-hrm/008.png'],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpen = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h2>Projects</h2>
          <Link href="/projects" className={styles.viewAll}>View All &gt;</Link>
        </div>
      </div>

      <div className={styles.grid}>
        {projects.slice(0, 3).map((project) => (
          <ProjectCard key={project.id} project={project} onClick={handleOpen} />
        ))}
      </div>

      <ProjectLightbox project={selectedProject} onClose={handleClose} />
    </section>
  );
}
