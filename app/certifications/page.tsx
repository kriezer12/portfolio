import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CertificationsList from './CertificationsList';
import styles from './Certifications.module.css';

export const metadata: Metadata = {
  title: 'Certifications',
  description: 'A list of my formal certifications and technical achievements, including credentials from TESDA, IBM, and Cisco in AI, Docker, and computer systems.',
};

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

export default function CertificationsPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.page}>
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.headerTop}>
                <h1 className={styles.title}>Certifications</h1>
                <div style={{ flex: 1 }}></div>
                <Link href="/" className={styles.backLink}>&lt; Back to Home</Link>
              </div>
            </div>
            <CertificationsList certifications={allCertifications} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
