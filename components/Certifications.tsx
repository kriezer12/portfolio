import styles from './Certifications.module.css';

const certifications = [
  {
    title: 'Computer System Servicing NC II',
    issuer: 'TESDA',
    date: '2023',
    description: 'National certification for hardware repair, network setup, and computer systems maintenance.',
  },
  {
    title: 'Consistent President\'s Lister',
    issuer: 'Polytechnic University of the Philippines',
    date: '2023 — Present',
    description: 'Maintained top academic standing every semester since freshman year.',
  },
];

export default function Certifications() {
  return (
    <section className={styles.certifications} id="certifications">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Certifications & Awards</h2>
          <p className={styles.subtitle}>Formal recognition of my technical skills and achievements.</p>
        </div>

        <div className={styles.list}>
          {certifications.map((cert, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.content}>
                <h3 className={styles.certTitle}>{cert.title}</h3>
                <div className={styles.meta}>
                  <span className={styles.issuer}>{cert.issuer}</span>
                  <span className={styles.dot}>•</span>
                  <span className={styles.date}>{cert.date}</span>
                </div>
                <p className={styles.description}>{cert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
