'use client';
import { useState } from 'react';
import Image from 'next/image';
import { MapPin, GraduationCap, Calendar, FolderGit2, FileText, Download, X } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  const [showCV, setShowCV] = useState(false);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <div className={styles.profileFrame}>
            <Image 
              src="/profile.jpg" 
              alt="Kenneth P. Osorio" 
              fill
              priority
              className={styles.profileImage}
            />
          </div>
        </div>
        
        <div className={styles.content}>
          <h1 className={styles.name}>Kenneth P. Osorio</h1>
          <h2 className={styles.role}>AI / Software Engineering / DevOps / Cloud</h2>
          
          <div className={styles.meta}>
            <div className={styles.metaItemInline}>
              <MapPin size={14} className={styles.icon} />
              <span>Cavite, Philippines</span>
            </div>
            <div className={styles.metaItemInline}>
              <GraduationCap size={14} className={styles.icon} />
              <span>Polytechnic University of the Philippines</span>
            </div>
          </div>
          
          <div className={styles.actions}>
            <a href="https://calendly.com/kennethosorio/consultation" target="_blank" rel="noopener noreferrer" className={styles.actionLink}>
              <Calendar size={14} /> Schedule Call
            </a>
            <a href="#projects" className={styles.actionLink}>
              <FolderGit2 size={14} /> View my Projects
            </a>
            <button onClick={() => setShowCV(true)} className={styles.actionLink} style={{background:'none', border:'none', cursor:'pointer', padding:0, font: 'inherit'}}>
              <FileText size={14} /> View CV
            </button>
          </div>
        </div>
      </div>
      <div className={styles.dividerContainer}>
        <hr className={styles.divider} />
      </div>

      {showCV && (
        <div className={styles.modalOverlay} onClick={() => setShowCV(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setShowCV(false)}><X size={24} /></button>
            <div className={styles.modalActions}>
                <a href="/cv/CV_Osorio,Kenneth.pdf" download className={styles.downloadButton}>
                    <Download size={20} />
                </a>
            </div>
            <div className={styles.cvViewerContainer} style={{ overflowY: 'auto', maxHeight: '80vh' }}>
                <div style={{ position: 'relative', width: '100%', height: '1100px', marginBottom: '10px' }}>
                  <Image 
                    src="/cv/CV_Osorio,Kenneth_page-0001.jpg" 
                    alt="Kenneth Osorio Curriculum Vitae Page 1" 
                    fill 
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div style={{ position: 'relative', width: '100%', height: '1100px' }}>
                  <Image 
                    src="/cv/CV_Osorio,Kenneth_page-0002.jpg" 
                    alt="Kenneth Osorio Curriculum Vitae Page 2" 
                    fill 
                    style={{ objectFit: 'contain' }}
                  />
                </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
