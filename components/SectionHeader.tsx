import styles from './SectionHeader.module.css';

export default function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <div className={styles.header}>
      <span className={styles.index} aria-hidden="true">
        {index}
      </span>
      <h2 className={styles.title}>{title}</h2>
      <span className={styles.rule} aria-hidden="true" />
    </div>
  );
}
