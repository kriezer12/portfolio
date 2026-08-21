import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';
import SectionHeader from './SectionHeader';
import styles from './Writing.module.css';

export default function Writing() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section className={styles.writing} id="writing">
      <SectionHeader index="04" title="Writing" />

      <div className={styles.index}>
        {posts.map((post, i) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.row}>
            <span className={styles.rowIndex}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.rowBody}>
              <span className={styles.rowTitle}>{post.title}</span>
              <span className={styles.rowMeta}>{post.tags.join(' · ')}</span>
            </span>
            <ArrowUpRight size={16} className={styles.rowArrow} aria-hidden="true" />
          </Link>
        ))}
      </div>

      <Link href="/blog" className={styles.viewAll}>
        [all_posts]
      </Link>
    </section>
  );
}
