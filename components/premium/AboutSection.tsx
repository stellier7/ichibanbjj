'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Shield, Target, Users, Zap } from 'lucide-react';

const philosophyPoints = [
  {
    icon: Shield,
    title: 'Disciplina',
    description: 'Forjamos carácter a través de la práctica consistente y el respeto mutuo.',
  },
  {
    icon: Target,
    title: 'Excelencia',
    description: 'Cada sesión es una oportunidad para superar tus límites y alcanzar nuevas alturas.',
  },
  {
    icon: Users,
    title: 'Comunidad',
    description: 'Crecemos juntos como una familia, apoyándonos en cada paso del camino.',
  },
  {
    icon: Zap,
    title: 'Evolución',
    description: 'El Jiu Jitsu es un viaje sin fin. Nunca dejas de aprender, nunca dejas de mejorar.',
  },
];

export function AboutSection() {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const descriptionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-charcoal py-24 px-6 lg:py-32">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center lg:mb-24">
          <h2
            ref={titleRef}
            className="reveal mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Nuestra <span className="text-gradient">Filosofía</span>
          </h2>
          <div
            ref={descriptionRef}
            className="reveal mx-auto max-w-3xl"
            style={{ animationDelay: '0.1s' }}
          >
            <p className="text-lg leading-relaxed text-gray-300 md:text-xl">
              Ichiban Jiu Jitsu es más que una academia. Es un lugar donde la tradición
              encuentra la innovación, donde cada estudiante descubre su potencial, y donde
              el respeto y la excelencia son la base de todo lo que hacemos.
            </p>
          </div>
        </div>

        {/* Philosophy grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {philosophyPoints.map((point, index) => (
            <PhilosophyCard
              key={point.title}
              icon={point.icon}
              title={point.title}
              description={point.description}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* About content */}
        <div className="mt-24 lg:mt-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Main story */}
            <div ref={sectionRef} className="reveal-left space-y-6">
              <h3 className="text-3xl font-bold text-white md:text-4xl">
                Una Academia de Clase Mundial
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Desde nuestros inicios en Tegucigalpa, Honduras, Ichiban Jiu Jitsu se ha
                  dedicado a ofrecer entrenamiento de primer nivel en Jiu Jitsu brasileño
                  y Muay Thai.
                </p>
                <p className="text-lg leading-relaxed">
                  Nuestros instructores son profesionales experimentados que han competido
                  a nivel internacional y están comprometidos con tu crecimiento, tanto
                  dentro como fuera del tatami.
                </p>
                <p className="text-lg leading-relaxed">
                  No importa si eres principiante o avanzado, aquí encontrarás un ambiente
                  de apoyo donde podrás desarrollar tus habilidades a tu propio ritmo.
                </p>
              </div>
            </div>

            {/* Right: Stats/highlights */}
            <div
              ref={sectionRef}
              className="reveal-right grid grid-cols-2 gap-6"
              style={{ animationDelay: '0.2s' }}
            >
              <StatCard number="10+" label="Años de experiencia" />
              <StatCard number="200+" label="Estudiantes activos" />
              <StatCard number="15+" label="Campeones formados" />
              <StatCard number="100%" label="Dedicación" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface PhilosophyCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

function PhilosophyCard({ icon: Icon, title, description, delay }: PhilosophyCardProps) {
  const cardRef = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={cardRef}
      className="reveal-scale group relative overflow-hidden rounded-premium-lg bg-charcoal-light p-8 shadow-premium transition-all duration-300 hover:scale-105 hover:shadow-premium-lg"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-premium-lg bg-gradient-to-br from-accent/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-4 inline-flex rounded-premium bg-accent/10 p-3 shadow-inner-glow transition-all duration-300 group-hover:bg-accent/20 group-hover:shadow-glow">
          <Icon className="h-8 w-8 text-accent transition-transform duration-300 group-hover:scale-110" />
        </div>

        <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-400">{description}</p>
      </div>

      {/* Hover glow effect */}
      <div className="absolute -inset-px rounded-premium-lg bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 opacity-0 blur-sm transition-opacity duration-300 group-hover:from-accent/30 group-hover:via-accent/10 group-hover:to-accent/0 group-hover:opacity-100" />
    </div>
  );
}

interface StatCardProps {
  number: string;
  label: string;
}

function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-premium-lg bg-gradient-to-br from-charcoal-light to-charcoal-lighter p-6 shadow-premium transition-all duration-300 hover:shadow-premium-lg">
      {/* Accent border on hover */}
      <div className="absolute inset-0 rounded-premium-lg bg-gradient-to-br from-accent/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-2 text-4xl font-bold text-white md:text-5xl">{number}</div>
        <div className="text-sm font-medium text-gray-400">{label}</div>
      </div>
    </div>
  );
}
