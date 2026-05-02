import { useEffect, useRef, memo, useState } from 'react';
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

interface ProjectLightboxProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectLightbox = memo(({ project, onClose }: ProjectLightboxProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (project) {
      dialogRef.current?.showModal();
      setCurrentIndex(0);
    } else {
      dialogRef.current?.close();
    }
  }, [project]);

  useEffect(() => {
    if (!project?.media || project.media.length <= 1) return;
    const interval = setInterval(() => {
      const img = document.querySelector(`.${styles.lightboxImage}`);
      img?.classList.add(styles.fadeOut);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % (project.media?.length || 1));
        img?.classList.remove(styles.fadeOut);
      }, 500); // Wait half of the 1s transition time
    }, 4000);
    return () => clearInterval(interval);
  }, [project]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  if (!project) return null;

  return (
    <dialog ref={dialogRef} className={styles.lightbox} onClose={onClose} onClick={handleBackdropClick}>
      <header className={styles.lightboxHeader}>
        <h2 className={styles.lightboxTitle}>{project.name}</h2>
        <button onClick={onClose} className={styles.closeBtn}>×</button>
      </header>
      
      {project.media && project.media.length > 0 && (
        <img 
          src={project.media[currentIndex]} 
          alt={`${project.name} - slide ${currentIndex + 1}`} 
          className={styles.lightboxImage} 
        />
      )}

      <footer className={styles.lightboxFooter}>
        <p>{project.extendedDescription || project.description}</p>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
          Visit Website →
        </a>
      </footer>
    </dialog>
  );
});

ProjectLightbox.displayName = 'ProjectLightbox';
