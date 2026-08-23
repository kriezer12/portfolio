export interface Profile {
  name: string;
  role: string;
  blurb: string;
  location: string;
  email: string;
  status: string;
}

export interface WorkEntry {
  index: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
}

export interface CapabilityItem {
  code: string;
  name: string;
}

export interface CapabilityGroup {
  label: string;
  items: CapabilityItem[];
}

export interface Studying {
  label: string;
  text: string;
}

export interface ExperienceEntry {
  year: string;
  role: string;
  org: string;
  tag: string;
}

export interface LinkEntry {
  label: string;
  href: string;
}

export interface ManifestoSegment {
  text: string;
  hl?: boolean;
}

export interface Colophon {
  label: string;
  paragraphs: string[];
  foot: string;
}

export const profile: Profile = {
  name: 'Kenneth Osorio',
  role: 'AI / Software Engineer — DevOps & Cloud.',
  blurb:
    'Bridging robust backend systems with intuitive frontends, and automating whatever sits between them.',
  location: 'Cavite, Philippines',
  email: 'osoriokenneth91@gmail.com',
  status: 'Open to work',
};

export const work: WorkEntry[] = [
  {
    index: '01',
    title: 'NFC Loyalty Platform',
    description:
      'A full-stack, Dockerized loyalty platform engineered for the salon industry — tap-to-earn built end to end, from hardware handshakes to dashboard.',
    tags: ['Docker', 'Fullstack', 'NFC', 'Led team'],
    href: '#',
  },
  {
    index: '02',
    title: 'GitDigest',
    description:
      'Turning repository activity into readable digests. A web app experiment in making commit noise legible.',
    tags: ['Next.js', 'Vercel', 'Web App'],
    href: 'https://v0-devdigest-web-app.vercel.app/',
  },
  {
    index: '03',
    title: 'Municipal HRM',
    description:
      'A human-resource management system for municipal government — records, workflows, and civic-scale data handled with care.',
    tags: ['HR System', 'Civic Tech', 'Fullstack'],
    href: 'https://municipal-hr-management-system.vercel.app/',
  },
  {
    index: '04',
    title: 'Obsidian Blog',
    description:
      'A personal publishing pipeline: notes written in Obsidian, rendered live through Next.js at blog.kennethosorio.dev.',
    tags: ['Obsidian', 'Next.js', 'Writing'],
    href: 'https://blog.kennethosorio.dev',
  },
];

export const capabilities: CapabilityGroup[] = [
  {
    label: 'Frontend',
    items: [
      { code: 'F—01', name: 'Next.js' },
      { code: 'F—02', name: 'ReactJS' },
      { code: 'F—03', name: 'JavaScript' },
      { code: 'F—04', name: 'Vue.js' },
      { code: 'F—05', name: 'Tailwind CSS' },
    ],
  },
  {
    label: 'Backend',
    items: [
      { code: 'B—01', name: 'Python' },
      { code: 'B—02', name: 'FastAPI' },
      { code: 'B—03', name: 'Node.js' },
      { code: 'B—04', name: 'PostgreSQL' },
    ],
  },
  {
    label: 'DevOps & Cloud',
    items: [
      { code: 'D—01', name: 'AWS / GCP' },
      { code: 'D—02', name: 'GitHub Actions' },
      { code: 'D—03', name: 'CloudFormation' },
      { code: 'D—04', name: 'n8n' },
      { code: 'D—05', name: 'Git' },
      { code: 'D—06', name: 'Docker' },
    ],
  },
];

export const studying: Studying = {
  label: 'Currently studying',
  text: 'Cisco Certified Network Associate (CCNA) — deepening the network layer beneath every deployment. Certifications on file: TESDA Computer System Servicing NC II, TESDA Visual Graphic Design NC III, IBM Docker Essentials, Cisco Introduction to Modern AI.',
};

export const experience: ExperienceEntry[] = [
  {
    year: '2026',
    role: 'Full Stack Engineer Intern',
    org: 'FG Aesthetic Centre',
    tag: 'Internship',
  },
  {
    year: '2025',
    role: 'Information Technology Intern',
    org: 'Condor POS Solutions RP Inc.',
    tag: 'Internship',
  },
  {
    year: '2024',
    role: 'Curriculum Analyst — Cloud Solutions',
    org: 'Google Developer Student Clubs — PUP',
    tag: 'Leadership',
  },
  {
    year: 'Ongoing',
    role: 'Diploma in Information Technology',
    org: 'Polytechnic University of the Philippines — Manila',
    tag: 'President’s Lister',
  },
];

export const links: LinkEntry[] = [
  {
    label: 'GitHub — kriezer12',
    href: 'https://github.com/kriezer12',
  },
  {
    label: 'LinkedIn — kenneth-osorio',
    href: 'https://linkedin.com/in/kenneth-osorio-4b0a042b1',
  },
  {
    label: 'Instagram — thirsty_samurai',
    href: 'https://www.instagram.com/thirsty_samurai/',
  },
];

export const marqueeWords: string[] = [
  'Fullstack Development',
  'DevOps & Cloud',
  'AI Engineering',
  'CI/CD Automation',
  'Clean Execution',
];

export const heroKickerSuffix = 'Est. folio, third edition';

export const manifestoStatement: ManifestoSegment[] = [
  { text: 'I build bridges between' },
  { text: 'robust backends', hl: true },
  { text: 'and' },
  { text: 'intuitive frontends', hl: true },
  { text: '— then automate everything in between.' },
];

export const colophon: Colophon = {
  label: 'Colophon — About the author',
  paragraphs: [
    'Fullstack developer intern and IT student at PUP Manila, working with Next.js, React, Node.js, Python, and PostgreSQL. Focused on the DevOps space — CI/CD pipelines, cloud infrastructure, and clean execution.',
    'He helped lead a team to engineer a full-stack NFC loyalty platform for the salon industry, accelerating feature rollouts while reducing support escalations. Currently deepening network fundamentals through CCNA study.',
  ],
  foot: 'Consistent President’s Lister, PUP',
};

export const bookingUrl = 'https://calendly.com/kennethosorio/consultation';
