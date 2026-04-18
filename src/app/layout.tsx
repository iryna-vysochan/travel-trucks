import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import './globals.css';
import { Header } from '@/components/Header/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'TravelTrucks — Camper Rentals',
    template: '%s | TravelTrucks',
  },
  description:
    'Find and book your perfect camper for any adventure across Ukraine and Europe.',
  metadataBase: new URL('https://travel-trucks-xi-jet.vercel.app'),
  openGraph: {
    siteName: 'TravelTrucks',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanStackProvider>
          <Header />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
