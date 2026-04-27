import styles from './Experience.module.css';

const experiences = [
  {
    company: 'FG Aesthetic Centre',
    role: 'Full Stack Engineer Intern',
    period: 'Mar 2026 — May 2026',
    description: 'Lead a five-person team to engineer a full-stack NFC loyalty platform for the salon industry, resolving deployment inconsistencies and slow delivery cycles by implementing Dockerized CI/CD pipelines and a structured Scrum cadence, which successfully accelerated feature rollouts and reduced support escalations through a stabilized, role-based production environment.',
    tags: ['Software Infrastructure', 'Project Management', 'DevOps', 'Scrum', 'Agile Leadership', 'Mentoring', 'Onboarding'],
  },
  {
    company: 'Condor POS Solutions RP Inc.',
    role: 'Information Technology Intern',
    period: 'Jul 2025 — Aug 2025',
    description: 'Assisted in the deployment and configuration of Point-of-Sale (POS) systems. Performed routine IT support, maintenance, and hardware repair. Conducted SQL data manipulation to support system functionality.',
    tags: ['POS Systems', 'IT Support', 'SQL', 'Hardware Repair'],
  },
  {
    company: 'Google Developer Student Clubs - PUP',
    role: 'Curriculum Analyst (Cloud Solutions)',
    period: 'Dec 2024 — Aug 2025',
    description: 'Researched and curated cloud computing topics (GCP fundamentals, cloud security, serverless). Co-facilitated monthly "Cloud Study Jams" for 50+ participants and structured learning paths via Google Cloud Skills Boost.',
    tags: ['GCP', 'Cloud Security', 'Curriculum Design', 'Public Speaking'],
  },
  {
    company: 'Polytechnic University of the Philippines',
    role: 'Diploma in Information Technology',
    period: 'Oct 2023 — Present',
    description: 'Focusing on advanced IT concepts, software development, and systems analysis. Consistently maintaining academic excellence as a President\'s Lister.',
    tags: ['Academic', 'Software Engineering', 'Systems Analysis'],
  },
];

export default function Experience() {
  return (
    <section className={styles.experience} id="experience">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Professional Journey</h2>
          <p className={styles.subtitle}>A timeline of my professional experience, internships, and education.</p>
        </div>

        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.dot} />
              <div className={styles.content}>
                <div className={styles.top}>
                  <h3 className={styles.role}>{exp.role}</h3>
                  <span className={styles.period}>{exp.period}</span>
                </div>
                <h4 className={styles.company}>{exp.company}</h4>
                <p className={styles.description}>{exp.description}</p>
                <div className={styles.tags}>
                  {exp.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
