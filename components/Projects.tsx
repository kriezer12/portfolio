import Link from 'next/link';
import styles from './Projects.module.css';

const projects = [
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
    description: 'Spearheaded a 5-person team to develop an end-to-end HR management solution for local municipalities. Adopted as a capstone project reference and aligned with Sustainable Development Goals.',
    tags: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    link: '#',
    status: 'completed',
  },
];

export default function Projects() {
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
    </section>
  );
}
