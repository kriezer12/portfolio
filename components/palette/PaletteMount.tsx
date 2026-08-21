import CommandPalette from './CommandPalette';
import { getAllPosts } from '@/lib/blog';

export default function PaletteMount() {
  const posts = getAllPosts().map((p) => ({ title: p.title, slug: p.slug }));
  return <CommandPalette posts={posts} />;
}
