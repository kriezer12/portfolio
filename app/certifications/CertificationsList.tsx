'use client';
import { useState } from 'react';
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

  const openImage = (path: string) => {
    setSelectedImage(encodeURI(path));
  };

  return (
    <>
      <div className={styles.grid}>
        {certifications.map((cert, index) => (
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
    </>
  );
}
