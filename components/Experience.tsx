import SectionHeader from './SectionHeader';
import styles from './Experience.module.css';

const experiences = [
  {
    company: 'FG Aesthetic Centre',
    role: 'Full Stack Engineer Intern',
    period: 'Mar 2026 — May 2026',
    year: '2026',
    description:
      'Led a five-person team engineering a full-stack NFC loyalty platform for the salon industry — Dockerized CI/CD pipelines and structured Scrum cadence accelerated feature rollouts and reduced support escalations.',
    tags: ['DevOps', 'Scrum', 'Agile Leadership', 'Mentoring'],
  },
  {
    company: 'Condor POS Solutions RP Inc.',
    role: 'Information Technology Intern',
    period: 'Jul 2025 — Aug 2025',
    year: '2025',
    description:
      'Deployed and configured Point-of-Sale systems, performed IT support and hardware repair, and ran SQL data manipulation to support system functionality.',
    tags: ['POS Systems', 'IT Support', 'SQL'],
  },
  {
    company: 'Google Developer Student Clubs - PUP',
    role: 'Curriculum Analyst (Cloud Solutions)',
    period: 'Dec 2024 — Aug 2025',
    year: '2024',
    description:
      'Researched cloud computing topics (GCP fundamentals, security, serverless); co-facilitated monthly Cloud Study Jams for 50+ participants via Google Cloud Skills Boost.',
    tags: ['GCP', 'Cloud Security', 'Curriculum Design'],
  },
  {
    company: 'Polytechnic University of the Philippines',
    role: 'Diploma in Information Technology',
    period: 'Oct 2023 — Present',
    year: '2023',
    description:
      'Advanced IT concepts, software development, and systems analysis. Consistent President\'s Lister for academic excellence.',
    tags: ['Academic', 'Systems Analysis'],
  },
];

export default function Experience() {
  return (
    <section className={styles.experience} id="experience">
      <SectionHeader index="02" title="Experience" />

      <div className={styles.ledger}>
        {experiences.map((exp) => (
          <article key={`${exp.company}-${exp.period}`} className={styles.row} tabIndex={0}>
            <span className={styles.year} aria-hidden="true">
              {exp.year}
            </span>
            <div className={styles.main}>
              <div className={styles.head}>
                <h3 className={styles.role}>{exp.role}</h3>
                <span className={styles.org}>{exp.company}</span>
                <span className={styles.period}>{exp.period}</span>
              </div>
              <p className={styles.description}>{exp.description}</p>
              <p className={styles.tags}>
                {exp.tags.map((tag, i) => (
                  <span key={tag}>
                    {i > 0 && <span className={styles.tagDot}> · </span>}
                    {tag}
                  </span>
                ))}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
