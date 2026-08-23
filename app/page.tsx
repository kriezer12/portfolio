import GridCanvas from '@/components/v3/GridCanvas';
import CoordinateReadout from '@/components/v3/CoordinateReadout';
import CustomCursor from '@/components/v3/CustomCursor';
import TopBar from '@/components/v3/TopBar';
import Hero from '@/components/v3/Hero';
import Marquee from '@/components/v3/Marquee';
import Manifesto from '@/components/v3/Manifesto';
import SectionHeader from '@/components/v3/SectionHeader';
import WorkList from '@/components/v3/WorkList';
import Capabilities from '@/components/v3/Capabilities';
import ExperienceList from '@/components/v3/ExperienceList';
import Contact from '@/components/v3/Contact';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Kenneth P. Osorio',
    url: 'https://kennethosorio.dev',
    jobTitle: 'AI / Software Engineer',
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
      {/* v3 root: scoped tokens + paper background/ink so v2 dark body styles do not leak.
          .v3-root only defines tokens in globals.css, so paper/ink are applied here directly.
          A role="main" div is used instead of <main> because the untouched v2 `main {}`
          global rule (max-width 896px + padding) would break the full-bleed v3 layout. */}
      <div
        className="v3-root"
        style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)' }}
      >
        <GridCanvas />
        <CoordinateReadout />
        <CustomCursor />
        <TopBar />
        <div id="top" role="main">
          <Hero />
          <Marquee />
          <Manifesto />
          <WorkList
            header={
              <SectionHeader idx="(03)" title="Selected Work" note="Four entries, curated" />
            }
          />
          <Marquee />
          <Capabilities
            header={
              <SectionHeader
                idx="(04)"
                title="Capabilities"
                note="Index of tools, no meters attached"
              />
            }
          />
          <ExperienceList
            header={
              <SectionHeader
                idx="(05)"
                title="Experience"
                note="In reverse chronological order"
              />
            }
          />
          <Contact
            header={
              <SectionHeader idx="(06)" title="Correspondence" note="Replies from Cavite, PH" />
            }
          />
        </div>
      </div>
    </>
  );
}
