import styles from './Footer.module.css';
import ThemeToggle from './ThemeToggle';

export default function Footer() {
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
