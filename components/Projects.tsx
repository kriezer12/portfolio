import styles from './Projects.module.css';

const projects = [
  {
    id: 1,
    name: 'GLAM-ID',
    description: 'Developed and maintained identity verification modules for government digital services, streamlining citizen access to public records.',
    tags: ['Identity Management', 'Security', 'Web API', 'Frontend'],
    link: '#',
    status: 'completed',
  },
  {
    id: 2,
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
        <h2>Projects</h2>
        <span className={styles.count}>[{projects.length}]</span>
      </div>

      <div className={styles.grid}>
        {projects.map((project) => (
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

            <a href={project.link} className={styles.link}>
              View project
              <span className={styles.arrow}> →</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
