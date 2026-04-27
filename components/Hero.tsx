import Image from 'next/image';
import { MapPin, GraduationCap } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <div className={styles.profileFrame}>
            <Image 
              src="/profile.jpg" 
              alt="Kenneth P. Osorio" 
              fill
              priority
              className={styles.profileImage}
            />
          </div>
        </div>
        
        <div className={styles.content}>
          <h1 className={styles.name}>Kenneth P. Osorio</h1>
          <h2 className={styles.role}>AI / Software Engineering / DevOps / Cloud</h2>
          
          <div className={styles.meta}>
            <div className={styles.metaItemInline}>
              <MapPin size={14} className={styles.icon} />
              <span>Cavite, Philippines</span>
            </div>
            <div className={styles.metaItemInline}>
              <GraduationCap size={14} className={styles.icon} />
              <span>Polytechnic University of the Philippines</span>
            </div>
          </div>

          <p className={styles.description}>
            Bridging the gap between development and operations. Currently focused on Fullstack development, Cloud Infrastructure, and automating workflows.
          </p>
          
          <div className={styles.actions}>
            <a href="#contact" className={styles.primaryCta}>
              Let's Talk
            </a>
            <a href="#projects" className={styles.secondaryCta}>Selected Projects</a>
          </div>
        </div>
      </div>
    </section>
  );
}
