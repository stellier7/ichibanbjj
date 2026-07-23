'use client';

import { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ChevronDown } from 'lucide-react';

interface PremiumHeroProps {
  images?: Array<{ url: string; alt?: string }>;
}

export function PremiumHero({ images = [] }: PremiumHeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const subtitleRef = useScrollReveal<HTMLParagraphElement>();
  const ctaRef = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const parallaxOffset = scrollY * 0.5;
  const opacity = Math.max(0, 1 - scrollY / 600);

  const scrollToContent = () => {
    const heroHeight = heroRef.current?.offsetHeight || 0;
    window.scrollTo({
      top: heroHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-charcoal"
    >
      {/* Background Images with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          willChange: 'transform',
        }}
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: currentImageIndex === index ? 1 : 0,
              }}
            >
              <img
                src={image.url}
                alt={image.alt || 'BJJ Training'}
                className="h-full w-full object-cover"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-charcoal" />
            </div>
          ))
        ) : (
          // Fallback gradient background
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal-lighter">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(196,30,58,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(196,30,58,0.1),transparent_50%)]" />
          </div>
        )}
      </div>

      {/* Noise texture for grit */}
      <div className="absolute inset-0 z-10 opacity-[0.015] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />

      {/* Hero Content */}
      <div
        className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center"
        style={{ opacity }}
      >
        <h1
          ref={titleRef}
          className="reveal mb-6 text-6xl font-bold leading-[0.9] tracking-tight text-white md:text-7xl lg:text-8xl xl:text-9xl"
          style={{
            fontFamily: 'var(--font-display)',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
          }}
        >
          ICHIBAN
          <span className="block mt-2 text-gradient">JIU JITSU</span>
        </h1>

        <p
          ref={subtitleRef}
          className="reveal mb-12 max-w-2xl text-lg text-gray-200 md:text-xl lg:text-2xl"
          style={{
            animationDelay: '0.2s',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
          }}
        >
          Forja tu cuerpo, disciplina tu mente, domina el arte
        </p>

        <div
          ref={ctaRef}
          className="reveal flex flex-col gap-4 sm:flex-row"
          style={{ animationDelay: '0.4s' }}
        >
          <button
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative overflow-hidden rounded-premium-lg bg-accent px-8 py-4 text-lg font-semibold text-white shadow-premium-lg transition-all duration-300 hover:scale-105 hover:shadow-glow-strong"
          >
            <span className="relative z-10">Empieza Hoy</span>
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-accent-light to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>

          <button
            onClick={() => document.getElementById('classes')?.scrollIntoView({ behavior: 'smooth' })}
            className="group rounded-premium-lg border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/20 hover:shadow-premium-lg"
          >
            Ver Clases
          </button>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-12 animate-bounce cursor-pointer opacity-60 transition-opacity duration-300 hover:opacity-100"
          aria-label="Scroll to content"
        >
          <ChevronDown className="h-8 w-8 text-white" strokeWidth={2.5} />
        </button>
      </div>

      {/* Subtle gradient vignette */}
      <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
    </section>
  );
}
