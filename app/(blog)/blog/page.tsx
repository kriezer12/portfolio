import { getAllPosts, formatDate, calculateReadTime } from '@/lib/blog';
import Link from 'next/link';
import Footer from '@/components/Footer';
import styles from './Blog.module.css';

export const metadata = {
  title: 'Blog | Kenneth Osorio',
  description: 'Technical thoughts, guides, and experiments by Kenneth Osorio.',
};

export default function BlogListing() {
  const posts = getAllPosts();

  return (
    <>
      <main className={`${styles.container} flex-grow`}>
        <h1 className={styles.title}>Ken&apos;s Blog</h1>
        <p className={styles.caption}>
          A collection of my thoughts on technology, DevOps, cloud engineering, 
          and my various hobbies and interests.
        </p>
        <div className={styles.postList}>
          {posts.map((post) => {
            const readTime = calculateReadTime(post.content);
            return (
              <Link key={post.slug} href={`/${post.slug}`} className={styles.postCard}>
                <div className={styles.postDate}>{formatDate(post.date)}</div>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postDescription}>{post.description}</p>
                <div className={styles.postTags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>#{tag}</span>
                  ))}
                </div>
                <div className={styles.readMore}>
                  <span className={styles.readMoreText}>Read More</span> · {readTime} min read
                </div>
              </Link>
            );
          })}
          {posts.length === 0 && (
            <p className={styles.postDescription}>No posts found. Write something in Obsidian!</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
