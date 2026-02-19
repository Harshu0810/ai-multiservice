// app/page.tsx
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { Listings } from '@/components/landing/listings';
import { Sell } from '@/components/landing/sell';
import { FAQ } from '@/components/landing/faq';

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <Features />
      <Listings />
      <Sell />
      <FAQ />
    </main>
  );
}