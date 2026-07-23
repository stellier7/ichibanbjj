'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'Roberto Martínez',
    role: 'Estudiante hace 3 años',
    content:
      'Ichiban cambió mi vida. No solo mejoré físicamente, sino que gané confianza y disciplina. Los instructores son de clase mundial y el ambiente es increíble.',
    rating: 5,
  },
  {
    name: 'Sofia López',
    role: 'Estudiante hace 2 años',
    content:
      'Como mujer en un deporte de contacto, me sentí bienvenida desde el primer día. La comunidad aquí es como una familia y he crecido tanto como atleta.',
    rating: 5,
  },
  {
    name: 'Diego Hernández',
    role: 'Estudiante hace 1 año',
    content:
      'Empecé sin ninguna experiencia y ahora estoy compitiendo. El programa de entrenamiento es excelente y los resultados hablan por sí solos.',
    rating: 5,
  },
  {
    name: 'María Castillo',
    role: 'Estudiante hace 4 años',
    content:
      'Ichiban es más que un gimnasio. Es un lugar donde aprendes disciplina, respeto y a superarte cada día. Los instructores son verdaderos profesionales.',
    rating: 5,
  },
  {
    name: 'Luis Ramírez',
    role: 'Estudiante hace 6 meses',
    content:
      'Buscaba un lugar para aprender defensa personal y encontré mucho más. Las clases son desafiantes pero muy bien estructuradas para todos los niveles.',
    rating: 5,
  },
  {
    name: 'Carmen Flores',
    role: 'Estudiante hace 3 años',
    content:
      'La calidad de la instrucción es incomparable. He entrenado en otros lugares y Ichiban está en otro nivel. Vale cada centavo.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const visibleTestimonials = testimonials.slice(
    activeIndex * 3,
    activeIndex * 3 + 3
  );

  return (
    <section className="relative overflow-hidden bg-charcoal-light py-24 px-6 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <Quote className="absolute -top-20 -left-20 h-96 w-96 rotate-12 text-accent" />
        <Quote className="absolute -bottom-20 -right-20 h-96 w-96 -rotate-12 text-accent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center lg:mb-20">
          <h2
            ref={titleRef}
            className="reveal mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Lo Que Dicen <span className="text-gradient">Nuestros Estudiantes</span>
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 lg:mt-20">
          <TrustBadge number="4.9" label="Calificación Promedio" />
          <TrustBadge number="200+" label="Reseñas Verificadas" />
          <TrustBadge number="95%" label="Recomiendan" />
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: typeof testimonials[0];
  index: number;
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const cardRef = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={cardRef}
      className="reveal-scale group relative overflow-hidden rounded-premium-xl bg-charcoal p-8 shadow-premium transition-all duration-500 hover:scale-105 hover:shadow-premium-xl"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Quote icon */}
      <div className="mb-4 inline-flex rounded-premium bg-accent/10 p-3 transition-all duration-300 group-hover:bg-accent/20">
        <Quote className="h-6 w-6 text-accent" />
      </div>

      {/* Stars */}
      <div className="mb-4 flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            className="h-5 w-5 fill-accent text-accent transition-transform duration-300 group-hover:scale-110"
            style={{ transitionDelay: `${i * 50}ms` }}
          />
        ))}
      </div>

      {/* Content */}
      <p className="mb-6 text-gray-300 leading-relaxed">{testimonial.content}</p>

      {/* Author */}
      <div className="border-t border-gray-800 pt-4">
        <div className="font-semibold text-white">{testimonial.name}</div>
        <div className="text-sm text-gray-400">{testimonial.role}</div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 -z-10 rounded-premium-xl bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:from-accent/30 group-hover:via-accent/10 group-hover:to-accent/0 group-hover:opacity-100" />

      {/* Subtle border shimmer */}
      <div className="absolute inset-0 rounded-premium-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-premium-xl border border-accent/20" />
      </div>
    </div>
  );
}

interface TrustBadgeProps {
  number: string;
  label: string;
}

function TrustBadge({ number, label }: TrustBadgeProps) {
  const badgeRef = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={badgeRef}
      className="reveal-scale flex flex-col items-center gap-2"
      style={{ animationDelay: '0.2s' }}
    >
      <div className="text-4xl font-bold text-white md:text-5xl">{number}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}
