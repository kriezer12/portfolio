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
    title: 'Visual Graphic Design NC III',
    issuer: 'TESDA',
    date: '2026 - 2031',
    description: 'National certification covering design principles, layout, digital illustration, and photo editing.',
    image: '/certifications/VGDNCIII.jpg',
  },
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
  {
    title: 'CCNA - Cisco Certified Network Associate',
    issuer: 'Cisco',
    date: 'in progress',
    description: 'Currently studying: networking fundamentals, IP connectivity and services, security fundamentals, and automation.',
    image: '',
  },
];

export default function CertificationsPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.page}>
          <div className={styles.pageHead}>
            <span className={styles.pageIndex}>06</span>
            <h1 className={styles.title}>Certifications</h1>
            <Link href="/" className={styles.backLink}>
              [<Back />back_home]
            </Link>
          </div>
          <CertificationsList certifications={allCertifications} />
        </section>
      </main>
      <Footer />
    </>
  );
}

function Back() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" style={{ display: 'inline', verticalAlign: '-1px' }}>
      <path d="M19 12H5m0 0l6 6m-6-6l6-6" />
    </svg>
  );
}
