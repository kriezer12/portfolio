import styles from './Expertise.module.css';
import Link from 'next/link';

const skills = [
  {
    category: 'Frontend',
    items: ['Next.js', 'ReactJS', 'JavaScript', 'Vue.js', 'Tailwind CSS']
  },
  {
    category: 'Backend & Cloud',
    items: ['Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'AWS', 'Kubernetes']
  },
  {
    category: 'DevOps & Security',
    items: ['GitHub Actions', 'CloudFormation', 'n8n', 'AES/RSA', 'Git']
  }
];

export default function Expertise() {
  return (
    <section className={styles.expertise} id="expertise">
      <div className={styles.header}>
        <h2 className={styles.title}>Expertise</h2>
        <Link href="/tech-stack" className={styles.viewAll}>View All &gt;</Link>
      </div>
      
      <div className={styles.grid}>
        {skills.map((group) => (
          <div key={group.category} className={styles.column}>
            <span className={styles.categoryTitle}>{group.category}</span>
            <div className={styles.tags}>
              {group.items.map((item) => (
                <span key={item} className={styles.tag}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
