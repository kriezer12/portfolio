'use client';
import { useState } from 'react';
import Image from 'next/image';
import { MapPin, GraduationCap, Calendar, FileText, Download, X, BookOpen } from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
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
            <div className={styles.socials}>
              <a href="https://linkedin.com/in/kenneth-osorio-4b0a042b1" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
              <a href="https://github.com/kriezer12" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                <FaGithub size={20} />
              </a>
              <a href="https://www.instagram.com/thirsty_samurai/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
            </div>
            <div className={styles.actionButtons}>
              <a href="https://calendly.com/kennethosorio/consultation" target="_blank" rel="noopener noreferrer" className={styles.actionLink}>
                <Calendar size={14} /> Schedule Call
              </a>
              <button onClick={() => setShowCV(true)} className={styles.actionLink} style={{background:'none', border:'none', cursor:'pointer', padding:0, fontFamily: 'inherit', fontSize: 'inherit', fontWeight: '600'}}>
                <FileText size={14} /> View CV
              </button>
              <a href="https://blog.kennethosorio.dev" className={styles.actionLink}>
                <BookOpen size={14} /> Check my Blog
              </a>
            </div>
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
