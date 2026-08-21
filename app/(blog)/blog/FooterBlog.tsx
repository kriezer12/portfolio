import styles from './FooterBlog.module.css';

export default function FooterBlog() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.copyright}>
            <p>© 2026 Kenneth Osorio</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
