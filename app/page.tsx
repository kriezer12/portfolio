import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Expertise from '@/components/Expertise';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Kenneth P. Osorio',
    url: 'https://kennethosorio.dev',
    jobTitle: 'Software Engineer',
    alumniOf: 'Polytechnic University of the Philippines',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cavite',
      addressCountry: 'Philippines'
    },
    sameAs: [
      'https://linkedin.com/in/kenneth-osorio/', // Update with actual URL
      'https://github.com/kriezer12',      // Update with actual URL
    ],
    knowsAbout: ['AI', 'Software Engineering', 'DevOps', 'Cloud', 'Next.js', 'React', 'Python', 'AWS']
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
