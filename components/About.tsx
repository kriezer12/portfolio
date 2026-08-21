import SectionHeader from './SectionHeader';
import styles from './About.module.css';

const skillGroups = [
  {
    category: 'languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'PHP', 'C', 'C++', 'SQL'],
  },
  {
    category: 'frontend',
    items: ['Next.js', 'ReactJS', 'Vue.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'Vite'],
  },
  {
    category: 'backend',
    items: ['Node.js', 'FastAPI', 'Flask', 'REST API', 'n8n', 'OAuth', 'JWT'],
  },
  {
    category: 'database & cloud',
    items: ['PostgreSQL', 'MySQL', 'AWS Lambda', 'CloudFormation', 'GCP', 'Azure', 'S3', 'RDS'],
  },
  {
    category: 'devops & security',
    items: ['Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Git', 'AES', 'RSA', 'SHA'],
  },
  {
    category: 'tools',
    items: ['VS Code', 'IntelliJ', 'PyCharm', 'Discord', 'Teams', 'Trello', 'Jira'],
  },
];

function meter(items: string[]): { filled: number; total: number } {
  const filled = Math.max(3, Math.min(10, Math.round(items.length / 8 * 10)));
  return { filled, total: 10 };
}

export default function About() {
  return (
    <section className={styles.about} id="about">
      <SectionHeader index="01" title="About" />

      <div className={styles.grid}>
        <div className={styles.bio}>
          <p>
            I am a Fullstack Developer Intern and IT student at PUP Manila, driven by the
            challenge of connecting robust backend systems with intuitive frontend interfaces.
          </p>
          <p>
            My focus is currently on the DevOps space — bridging the gap between development and
            operations through automation and cloud infrastructure. I&apos;m also deepening my
            network knowledge by studying for the CCNA certification.
          </p>
          <p>
            Whether it&apos;s deploying cloud solutions or architecting HR systems, I aim for
            efficiency, scalability, and clean execution.
          </p>
        </div>

        <div className={styles.stackIndex} aria-label="Technology stack index">
          {skillGroups.map((group) => {
            const { filled, total } = meter(group.items);
            return (
              <div key={group.category} className={styles.group}>
                <div className={styles.groupRow}>
                  <span className={styles.groupName}>
                    <span className={styles.groupPrompt}>&gt;</span> {group.category}
                  </span>
                  <span className={styles.meter} aria-hidden="true">
                    <span className={styles.meterFilled}>{'█'.repeat(filled)}</span>
                    {'░'.repeat(total - filled)}
                  </span>
                </div>
                <p className={styles.items}>{group.items.join(' · ')}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
