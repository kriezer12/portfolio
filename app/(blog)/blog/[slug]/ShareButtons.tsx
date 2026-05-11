'use client';

import { useState } from 'react';
import { FaLinkedin } from 'react-icons/fa';
import { Link as LinkIcon, Check } from 'lucide-react';
import styles from './Post.module.css';

interface ShareButtonsProps {
  url: string;
}

export default function ShareButtons({ url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.shareSection}>
      <button onClick={shareToLinkedIn} className={styles.shareBtn}>
        <FaLinkedin size={16} /> Share on LinkedIn
      </button>
      <button onClick={copyToClipboard} className={styles.shareBtn}>
        {copied ? <Check size={16} /> : <LinkIcon size={16} />} {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  );
}
