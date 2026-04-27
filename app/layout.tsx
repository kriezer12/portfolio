import './globals.css';
import { Providers } from '@/components/Providers';
import Background3D from '@/components/Background3D';

export const metadata = {
  title: 'Kenneth Osorio - Software Engineer',
  description: 'Personal portfolio of Kenneth Osorio, specializing in AI, Software Engineering, DevOps, and Cloud.',
  icons: {
    icon: '/profile.jpg',
    apple: '/profile.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Background3D />
          {children}
        </Providers>
      </body>
    </html>
  );
}
