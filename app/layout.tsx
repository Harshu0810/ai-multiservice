// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Spotly – Your All-in-One Digital Marketplace',
    template: '%s | Spotly',
  },
  description:
    'Spotly unifies e-commerce, property rentals, venue booking, cloud kitchens, and home services in one platform.',
  keywords: ['marketplace', 'property rental', 'venue booking', 'e-commerce', 'home services'],
  authors: [{ name: 'Spotly Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://spotly.vercel.app',
    title: 'Spotly – Your All-in-One Digital Marketplace',
    description: 'Find properties, book venues, shop, and more — all in one place.',
    siteName: 'Spotly',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Navbar />
        <div className="min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}