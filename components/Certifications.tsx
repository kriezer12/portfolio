'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Certifications.module.css';

const certifications = [
  {
    title: 'Computer System Servicing NC II',
    issuer: 'TESDA',
    date: '2024 - 2029',
    description: 'National certification for hardware repair, server management, network setup, and computer systems maintenance.',
    image: '/certifications/CSSNCII.jpg',
  },
  {
    title: 'Docker Essentials: A Developer Introduction',
    issuer: 'IBM',
    date: '2026',
    description: 'Introduction to Docker concepts, containers, and images for developers.',
    image: '/certifications/docker-essentials.jpg',
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

export default function Certifications() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const openImage = (path: string) => {
    setSelectedImage(encodeURI(path));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section className={styles.certifications} id="certifications">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <h2 className={styles.title}>Certifications</h2>
            <Link href="/certifications" className={styles.viewAll}>View All &gt;</Link>
          </div>
          <p className={styles.subtitle}>Formal recognition of my technical skills and achievements.</p>
        </div>

        <div className={styles.list} onMouseMove={handleMouseMove}>
          {certifications.slice(0, 3).map((cert, index) => (
            <div 
              key={index} 
              className={styles.card}
              onClick={() => cert.image && openImage(cert.image)}
              onMouseEnter={() => setHoveredImage(cert.image)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <div className={styles.content}>
                <h3 className={styles.certTitle}>{cert.title}</h3>
                <div className={styles.meta}>
                  <span className={styles.issuer}>{cert.issuer}</span>
                  <span className={styles.dot}>•</span>
                  <span className={styles.date}>{cert.date}</span>
                </div>
                <p className={styles.description}>{cert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {hoveredImage && (
        <div 
          className={styles.hoverPreview} 
          style={{ left: `${mousePos.x + 20}px`, top: `${mousePos.y + 20}px` }}
        >
          <Image src={hoveredImage} alt="Preview" width={200} height={250} style={{objectFit: 'contain'}} />
        </div>
      )}

      {selectedImage && (
        <div className={styles.modalOverlay} onClick={() => setSelectedImage(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setSelectedImage(null)}>&times;</button>
            <div style={{ position: 'relative', width: '100%', height: '80vh' }}>
              <Image 
                src={selectedImage} 
                alt="Certification Document" 
                fill 
                className={styles.pdfViewer}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
