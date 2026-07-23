'use client';

import { useEffect, useState } from 'react';
import { PremiumHero } from '@/components/premium/PremiumHero';
import { AboutSection } from '@/components/premium/AboutSection';
import { ClassesSection } from '@/components/premium/ClassesSection';
import { InstructorsSection } from '@/components/premium/InstructorsSection';
import { TestimonialsSection } from '@/components/premium/TestimonialsSection';
import { PricingSection } from '@/components/premium/PricingSection';
import { ContactSection } from '@/components/premium/ContactSection';
import { CarouselImage } from '@/types';

export default function HomePage() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/images')
      .then((res) => res.json())
      .then((data) => {
        setImages(data.images || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching images:', err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="-mt-16">
      <PremiumHero images={images} />
      <AboutSection />
      <ClassesSection />
      <InstructorsSection />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection />
    </main>
  );
}
