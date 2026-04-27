import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyright}>
          <p>© 2026 · Built with intention · Kenneth Osorio</p>
        </div>
      </div>
    </footer>
  );
}
