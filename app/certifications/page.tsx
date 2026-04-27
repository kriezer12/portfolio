'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Certifications.module.css';

const allCertifications = [
  {
    title: 'Computer System Servicing NC II',
    issuer: 'TESDA',
    date: '2023',
    description: 'National certification for hardware repair, network setup, and computer systems maintenance.',
    image: '/certifications/CSSNCII.jpg',
  },
  {
    title: 'Docker Essentials: A Developer Introduction',
    issuer: 'IBM',
    date: '2026',
    description: 'Introduction to Docker concepts, containers, and images for developers.',
    image: '/certifications/IBM CO0101EN Certificate _ Cognitive Class.jpg',
  },
  {
    title: 'Introduction to Modern AI',
    issuer: 'Cisco',
    date: '2026',
    description: 'Foundational concepts of artificial intelligence and machine learning.',
    image: '/certifications/IntrotoModernAIUpdate20260322-32-4508dv.jpg',
  },
  {
    title: 'Create Digital Content, Communicate and Collaborate Online',
    issuer: 'Cisco',
    date: '2026',
    description: 'Best practices for creating digital content and online collaboration.',
    image: '/certifications/CreateDigitalContentUpdate20260321-31-m3s3e.jpg',
  },
];

export default function CertificationsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImage = (path: string) => {
    setSelectedImage(encodeURI(path));
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.title}>Certifications</h1>
            <Link href="/" className={styles.backLink}>&lt; Back to Home</Link>
          </div>
        </div>
        <div className={styles.grid}>
          {allCertifications.map((cert, index) => (
            <div 
              key={index} 
              className={styles.card}
              onClick={() => cert.image && openImage(cert.image)}
            >
              <h3 className={styles.certTitle}>{cert.title}</h3>
              <p className={styles.issuer}>{cert.issuer}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className={styles.modalOverlay} onClick={() => setSelectedImage(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setSelectedImage(null)}>&times;</button>
            <img src={selectedImage} alt="Certification" className={styles.pdfViewer} />
          </div>
        </div>
      )}
    </section>
  );
}
