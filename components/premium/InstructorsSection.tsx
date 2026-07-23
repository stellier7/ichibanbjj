'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Award, Medal, Trophy } from 'lucide-react';

const instructors = [
  {
    name: 'Carlos Mendoza',
    title: 'Profesor Principal de BJJ',
    belt: 'Faixa Preta',
    credentials: ['Campeón Nacional 2022', 'Faixa Preta 3er Grado', '15 años de experiencia'],
    image: '/images/instructor-1.jpg',
    specialty: 'Jiu Jitsu Brasileño',
  },
  {
    name: 'Ana Rodríguez',
    title: 'Instructora de Muay Thai',
    belt: 'Khan 10',
    credentials: ['Ex-Campeona Internacional', 'Entrenadora Certificada', '10 años de experiencia'],
    image: '/images/instructor-2.jpg',
    specialty: 'Muay Thai',
  },
  {
    name: 'Miguel Santos',
    title: 'Profesor de BJJ',
    belt: 'Faixa Marrom',
    credentials: ['Medallista Panamericano', 'Especialista en No-Gi', '8 años de experiencia'],
    image: '/images/instructor-3.jpg',
    specialty: 'Jiu Jitsu No-Gi',
  },
];

export function InstructorsSection() {
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const subtitleRef = useScrollReveal<HTMLParagraphElement>();

  return (
    <section className="relative overflow-hidden bg-charcoal py-24 px-6 lg:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center lg:mb-20">
          <h2
            ref={titleRef}
            className="reveal mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Nuestros <span className="text-gradient">Instructores</span>
          </h2>
          <p
            ref={subtitleRef}
            className="reveal mx-auto max-w-2xl text-lg text-gray-300 md:text-xl"
            style={{ animationDelay: '0.1s' }}
          >
            Aprende de los mejores. Nuestro equipo de instructores trae años de experiencia
            competitiva y pasión por enseñar.
          </p>
        </div>

        {/* Instructors grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {instructors.map((instructor, index) => (
            <InstructorCard key={instructor.name} instructor={instructor} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface InstructorCardProps {
  instructor: typeof instructors[0];
  index: number;
}

function InstructorCard({ instructor, index }: InstructorCardProps) {
  const cardRef = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={cardRef}
      className="reveal-scale group relative overflow-hidden rounded-premium-xl bg-charcoal-light shadow-premium transition-all duration-500 hover:scale-105 hover:shadow-premium-xl"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-charcoal-lighter">
        {/* Placeholder gradient if no image */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-lighter via-charcoal-light to-charcoal">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(196,30,58,0.15),transparent_70%)]" />
          
          {/* Placeholder icon */}
          <div className="flex h-full items-center justify-center">
            <Award className="h-24 w-24 text-gray-700" />
          </div>
        </div>

        {/* Uncomment when images are available */}
        {/* <img
          src={instructor.image}
          alt={instructor.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        /> */}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-light via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

        {/* Belt badge */}
        <div className="absolute top-4 right-4 rounded-premium bg-charcoal-light/90 px-3 py-2 backdrop-blur-sm">
          <div className="text-xs font-semibold text-accent">{instructor.belt}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="mb-1 text-2xl font-bold text-white">{instructor.name}</h3>
          <p className="text-sm text-gray-400">{instructor.title}</p>
        </div>

        {/* Specialty tag */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-premium bg-accent/10 px-3 py-1">
          <Trophy className="h-4 w-4 text-accent" />
          <span className="text-xs font-semibold text-accent">{instructor.specialty}</span>
        </div>

        {/* Credentials */}
        <div className="space-y-2">
          {instructor.credentials.map((credential, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 text-sm text-gray-300 transition-colors duration-200 group-hover:text-white"
            >
              <Medal className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
              <span>{credential}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hover border effect */}
      <div className="absolute inset-0 -z-10 rounded-premium-xl bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:from-accent/40 group-hover:via-accent/20 group-hover:to-accent/0 group-hover:opacity-100" />

      {/* Accent line at bottom */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-accent-light to-accent transition-all duration-500 group-hover:w-full" />
    </div>
  );
}
