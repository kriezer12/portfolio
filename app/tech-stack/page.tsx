import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './TechStack.module.css';

const allSkills = [
  {
    category: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'PHP', 'C', 'C++', 'SQL']
  },
  {
    category: 'Frontend',
    items: ['Next.js', 'ReactJS', 'Vue.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'Vite']
  },
  {
    category: 'Backend',
    items: ['Node.js', 'FastAPI', 'Flask', 'REST API', 'n8n', 'OAuth', 'JWT']
  },
  {
    category: 'Database & Cloud',
    items: ['PostgreSQL', 'MySQL', 'AWS Lambda', 'AWS CloudFormation', 'GCP', 'Azure', 'S3', 'RDS']
  },
  {
    category: 'DevOps & Security',
    items: ['Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Git', 'AES', 'RSA', 'SHA']
  },
  {
    category: 'Tools',
    items: ['VS Code', 'IntelliJ', 'PyCharm', 'Discord', 'Teams', 'Trello', 'Jira']
  }
];

export default function TechStackPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.headerTop}>
              <h1 className={styles.title}>Technology Stack</h1>
              <div style={{ flex: 1 }}></div>
              <Link href="/" className={styles.backLink}>&lt; Back to Home</Link>
            </div>
            <p className={styles.subtitle}>Comprehensive list of technologies, frameworks, and tools I use to build digital solutions.</p>
          </div>
          
          <div className={styles.grid}>
            {allSkills.map((group) => (
              <div key={group.category} className={styles.column}>
                <span className={styles.categoryTitle}>{group.category}</span>
                <div className={styles.list}>
                  {group.items.map((item) => (
                    <span key={item} className={styles.item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
