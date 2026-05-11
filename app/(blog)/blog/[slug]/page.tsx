import { getPostBySlug, getAllPosts, formatDate } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Footer from '@/components/Footer';
import ShareButtons from './ShareButtons';
import styles from './Post.module.css';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Kenneth Osorio`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Kenneth Osorio'],
      url: `https://blog.kennethosorio.dev/${post.slug}`,
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <article className={`${styles.container} flex-grow`}>
        <Link href="/blog" className={styles.backLink}>
          &lt; All posts
        </Link>
        <header className={styles.header}>
          <div className={styles.date}>{formatDate(post.date)}</div>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>#{tag}</span>
            ))}
          </div>
        </header>
        <div className={styles.content}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
        <ShareButtons 
          url={`https://blog.kennethosorio.dev/${post.slug}`} 
        />
        <div style={{ marginTop: '1rem' }}>
          <Link href="/blog" className={styles.backLink}>
            &lt; All posts
          </Link>
        </div>
      </article>
      <Footer />
    </>
  );
}
