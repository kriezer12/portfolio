'use client';
import { useState, MouseEvent } from 'react';
import Image from 'next/image';
import styles from './Certifications.module.css';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
}

export default function CertificationsList({ certifications }: { certifications: Certification[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const openImage = (path: string) => {
    setSelectedImage(encodeURI(path));
  };

  const handleMouseMove = (e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <div className={styles.grid}>
        {certifications.map((cert, index) => (
          <div 
            key={index} 
            className={styles.card}
            onClick={() => cert.image && openImage(cert.image)}
            onMouseEnter={() => {
              if (cert.image) {
                setHoveredImage(encodeURI(cert.image));
              }
            }}
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

      {hoveredImage && (
        <div 
          className={styles.hoverPreview} 
          style={{ 
            left: `${mousePos.x + 20}px`, 
            top: `${mousePos.y + 20}px`,
          }}
        >
          <Image 
            src={hoveredImage} 
            alt="Preview" 
            width={200} 
            height={250} 
            style={{ objectFit: 'contain' }} 
          />
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
    </div>
  );
}
