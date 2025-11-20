import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '../contexts/ThemeContext';
import { PageLoaderWrapper } from '../components/PageLoaderWrapper';

const inter = localFont({
  src: [
    {
      path: '../assets/fonts/Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Inter-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Inter-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
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
  icons: {
    icon: '/images/favicon.ico',
  },
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

