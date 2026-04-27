import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.title}>The Journey</h2>
        <div className={styles.bio}>
          <p>
            I am a Fullstack Developer Intern and IT student at PUP Manila, driven by the challenge of connecting robust backend systems with intuitive frontend interfaces.
          </p>
          <p>
            My focus is currently on the DevOps space—bridging the gap between development and operations through automation and cloud infrastructure. I'm also deepening my network knowledge by studying for the CCNA certification.
          </p>
          <p>
            Whether it's deploying cloud solutions or architecting HR systems, I aim for efficiency, scalability, and clean execution.
          </p>
        </div>
      </div>
    </section>
  );
}
