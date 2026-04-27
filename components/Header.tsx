import Link from 'next/link';
import styles from './Header.module.css';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.teardrop}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <span className={styles.logoText}>KO.dev</span>
          </div>
          <nav className={styles.nav}>
            <Link href="/" prefetch={true}>about</Link>
            <Link href="/#expertise" prefetch={true}>stack</Link>
            <Link href="/#experience" prefetch={true}>experience</Link>
            <Link href="/#projects" prefetch={true}>projects</Link>
            <Link href="/#certifications" prefetch={true}>certifications</Link>
            <Link href="/#contact" prefetch={true}>contact</Link>
          </nav>
          <div className={styles.toggleWrapper}>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
