import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  title: string;
  date: string;
  slug: string;
  tags: string[];
  description: string;
  published: boolean;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        title: data.title || 'Untitled',
        date: data.date || '',
        tags: data.tags || [],
        description: data.description || '',
        published: data.published ?? false,
      } as BlogPost;
    })
    .filter((post) => post.published);

  // Sort posts by date descending
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      title: data.title || 'Untitled',
      date: data.date || '',
      tags: data.tags || [],
      description: data.description || '',
      published: data.published ?? false,
    } as BlogPost;
  } catch (error) {
    return null;
  }
}
