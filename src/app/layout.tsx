import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../contexts/ThemeContext';
import { PageLoaderWrapper } from '../components/PageLoaderWrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Achike Chude | Frontend-Heavy Fullstack Developer',
  description:
    'Portfolio of Achike Chude - Frontend-Heavy Fullstack Developer specializing in Next.js, React Native, Node.js, Electron, and TypeScript.',
  keywords: [
    'Achike Chude',
    'Fullstack Developer',
    'Next.js',
    'React Native',
    'TypeScript',
    'Portfolio',
  ],
  authors: [{ name: 'Achike Chude' }],
  openGraph: {
    title: 'Achike Chude | Frontend-Heavy Fullstack Developer',
    description:
      'Building modern web & cross-platform experiences with Next.js, React Native, Node.js, Electron, and TypeScript.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider>
          <PageLoaderWrapper>{children}</PageLoaderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

