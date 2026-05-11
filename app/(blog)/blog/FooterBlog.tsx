import styles from './FooterBlog.module.css';
import ThemeToggle from '../../../components/ThemeToggle';

export default function FooterBlog() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.copyright}>
            <p>© 2026 Kenneth Osorio</p>
          </div>
          <div className={styles.toggleWrapper}>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
