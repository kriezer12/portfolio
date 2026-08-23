import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kennethosorio.dev'),
  title: {
    default: 'Kenneth Osorio - AI / Software Engineer, DevOps & Cloud',
    template: '%s | Kenneth Osorio',
  },
  description:
    'Kenneth P. Osorio — AI / Software Engineer based in Cavite, Philippines. Fullstack systems, DevOps automation, cloud infrastructure.',
  keywords: ['Kenneth Osorio', 'Software Engineer', 'Fullstack Developer', 'DevOps', 'AI', 'Cloud', 'Next.js', 'React', 'AWS', 'Philippines'],
  authors: [{ name: 'Kenneth Osorio' }],
  creator: 'Kenneth Osorio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kennethosorio.dev',
    siteName: 'Kenneth Osorio Portfolio',
    title: 'Kenneth Osorio - AI / Software Engineer, DevOps & Cloud',
    description:
      'Kenneth P. Osorio — AI / Software Engineer based in Cavite, Philippines. Fullstack systems, DevOps automation, cloud infrastructure.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kenneth Osorio Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kenneth Osorio - AI / Software Engineer, DevOps & Cloud',
    description:
      'Kenneth P. Osorio — AI / Software Engineer based in Cavite, Philippines. Fullstack systems, DevOps automation, cloud infrastructure.',
    images: ['/og-image.png'],
    creator: '@thirsty_samurai',
  },
  icons: {
    icon: '/profile.jpg',
    apple: '/profile.jpg',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=satoshi@400,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
