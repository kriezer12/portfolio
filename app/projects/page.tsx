import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './Projects.module.css';

const allProjects = [
  {
    id: 1,
    name: 'DevDigest',
    description: 'An AI-powered GitHub digest tool that summarizes team activity and delivers daily briefings to Discord. Evolved from a simple n8n workflow to a robust cloud-native architecture using AWS Lambda, EC2, and Docker.',
    tags: ['AI', 'AWS', 'Docker', 'n8n', 'Next.js', 'Vercel'],
    link: 'https://v0-devdigest-web-app.vercel.app/',
    status: 'live',
  },
  {
    id: 2,
    name: 'GLAM-ID',
    description: 'A full-stack web application designed to power modern aesthetic clinics by enabling loyalty reward programs using NFC tags. It allows staff and customers to easily track visits, rewards, and membership status via NFC scans.',
    tags: ['Identity Management', 'NFC', 'Web API', 'Frontend'],
    link: '#',
    status: 'completed',
  },
  {
    id: 3,
    name: 'Municipal HR Management System',
    description: 'Municipal HR Management System is a prototype HR platform built as a capstone/web-dev project by a 5‑person team for Web Dev (2425 DIT 3-2), designed to simulate a real-world municipal HR environment for the Municipality of Concepción. The system models core HR workflows (hiring, onboarding, attendance, performance tracking, and reporting).',
    tags: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    link: 'https://municipal-hr-management-system.vercel.app/',
    status: 'completed',
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.headerTop}>
              <h1 className={styles.title}>Projects</h1>
              <div style={{ flex: 1 }}></div>
              <Link href="/" className={styles.backLink}>&lt; Back to Home</Link>
            </div>
          </div>

          <div className={styles.grid}>
            {allProjects.map((project) => (
              <article key={project.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{project.name}</h3>
                  <span className={`${styles.badge} ${styles[project.status]}`}>
                    {project.status}
                  </span>
                </div>

                <p className={styles.description}>{project.description}</p>

                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>

                <a href={project.link} className={styles.link} target="_blank" rel="noopener noreferrer">
                  View project
                  <span className={styles.arrow}> →</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
