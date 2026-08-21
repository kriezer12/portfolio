'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const PaletteDialog = dynamic(() => import('./PaletteDialog'), { ssr: false });

export interface PalettePost {
  title: string;
  slug: string;
}

export default function CommandPalette({ posts }: { posts: PalettePost[] }) {
  const [everOpened, setEverOpened] = useState(false);
  const [open, setOpen] = useState(false);

  const openPalette = useCallback(() => {
    setEverOpened(true);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openPalette();
      }
    };
    const onCustom = () => openPalette();
    document.addEventListener('keydown', onKey);
    window.addEventListener('v2:open-palette', onCustom);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('v2:open-palette', onCustom);
    };
  }, [openPalette]);

  if (!everOpened) return null;

  return <PaletteDialog posts={posts} open={open} onClose={() => setOpen(false)} />;
}
