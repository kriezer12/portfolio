import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import Background3D from '@/components/Background3D';
import ChatBot from '@/components/ChatBot';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kennethosorio.dev'),
  title: {
    default: 'Kenneth Osorio - Software Engineer',
    template: '%s | Kenneth Osorio',
  },
  description: 'Fullstack Developer & DevOps building scalable AI solutions and cloud infrastructure. Explore Kenneth Osorio\'s portfolio for projects in Next.js, AWS, and Automation.',
  keywords: ['Kenneth Osorio', 'Software Engineer', 'Fullstack Developer', 'DevOps', 'AI', 'Cloud', 'Next.js', 'React', 'AWS', 'Philippines'],
  authors: [{ name: 'Kenneth Osorio' }],
  creator: 'Kenneth Osorio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kennethosorio.dev',
    siteName: 'Kenneth Osorio Portfolio',
    title: 'Kenneth Osorio - Software Engineer',
    description: 'Fullstack Developer & DevOps building scalable AI solutions and cloud infrastructure. Projects in Next.js, AWS, and Automation.',
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
    title: 'Kenneth Osorio - Software Engineer',
    description: 'Fullstack Developer & DevOps building scalable AI solutions and cloud infrastructure.',
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
    <html lang="en" suppressHydrationWarning className={jetbrainsMono.variable}>
      <body className="antialiased min-h-screen flex flex-col">
        <Providers>
          <Background3D />
          {children}
          <ChatBot />
        </Providers>
      </body>
    </html>
  );
}
