import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.copyright}>
            <p>© 2026 Kenneth Osorio. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
