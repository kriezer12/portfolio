import { memo } from 'react';
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

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export const ProjectCard = memo(({ project, onClick }: ProjectCardProps) => (
  <article className={styles.card} onClick={() => onClick(project)} role="button">
    {project.media && project.media.length > 0 && (
      <img src={project.media[0]} alt={project.name} className={styles.cardImage} />
    )}
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
  </article>
));

ProjectCard.displayName = 'ProjectCard';
