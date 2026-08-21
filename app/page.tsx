import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Writing from '@/components/Writing';
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
      'https://linkedin.com/in/kenneth-osorio-4b0a042b1/',
      'https://github.com/kriezer12',
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
      <main className="flex-grow">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
