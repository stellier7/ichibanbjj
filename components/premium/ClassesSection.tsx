'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Calendar, Clock, Dumbbell, Users, ChevronRight } from 'lucide-react';

const classes = [
  {
    name: 'Jiu Jitsu Brasileño',
    subtitle: 'Gi & No-Gi',
    description: 'Domina el arte suave con técnicas de sumisión, control y defensa personal.',
    schedule: [
      { days: 'Lunes, Miércoles, Viernes', times: ['7:00 AM - 9:00 AM', '6:00 PM - 8:00 PM'] },
    ],
    level: 'Todos los niveles',
    intensity: 'Media-Alta',
    icon: Users,
    color: 'from-accent-dark to-accent',
  },
  {
    name: 'Muay Thai',
    subtitle: 'Arte de los 8 miembros',
    description: 'Desarrolla golpes devastadores, resistencia y confianza con el arte marcial tailandés.',
    schedule: [
      { days: 'Martes, Jueves', times: ['6:30 PM - 8:00 PM'] },
    ],
    level: 'Todos los niveles',
    intensity: 'Alta',
    icon: Dumbbell,
    color: 'from-orange-600 to-red-600',
  },
  {
    name: 'Clase Fundamental',
    subtitle: 'Bases sólidas',
    description: 'Perfecto para principiantes. Aprende los fundamentos del Jiu Jitsu paso a paso.',
    schedule: [
      { days: 'Sábados', times: ['10:00 AM - 12:00 PM'] },
    ],
    level: 'Principiante',
    intensity: 'Baja-Media',
    icon: Users,
    color: 'from-blue-600 to-cyan-600',
  },
  {
    name: 'Competición',
    subtitle: 'Entrena como campeón',
    description: 'Para atletas que buscan competir. Técnicas avanzadas y sparring intenso.',
    schedule: [
      { days: 'Lunes, Miércoles', times: ['8:30 PM - 10:00 PM'] },
    ],
    level: 'Avanzado',
    intensity: 'Muy Alta',
    icon: Dumbbell,
    color: 'from-purple-600 to-pink-600',
  },
];

export function ClassesSection() {
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const subtitleRef = useScrollReveal<HTMLParagraphElement>();

  return (
    <section id="classes" className="relative bg-charcoal-light py-24 px-6 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center lg:mb-20">
          <h2
            ref={titleRef}
            className="reveal mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Nuestras <span className="text-gradient">Clases</span>
          </h2>
          <p
            ref={subtitleRef}
            className="reveal mx-auto max-w-2xl text-lg text-gray-300 md:text-xl"
            style={{ animationDelay: '0.1s' }}
          >
            Encuentra la clase perfecta para tu nivel y objetivos. Cada sesión está
            diseñada para llevarte al siguiente nivel.
          </p>
        </div>

        {/* Classes grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {classes.map((classItem, index) => (
            <ClassCard key={classItem.name} classItem={classItem} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="reveal" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-3 rounded-premium-lg bg-accent px-8 py-4 text-lg font-semibold text-white shadow-premium-lg transition-all duration-300 hover:scale-105 hover:shadow-glow-strong"
            >
              <span>Reserva tu Primera Clase Gratis</span>
              <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ClassCardProps {
  classItem: typeof classes[0];
  index: number;
}

function ClassCard({ classItem, index }: ClassCardProps) {
  const cardRef = useScrollReveal<HTMLDivElement>();
  const Icon = classItem.icon;

  return (
    <div
      ref={cardRef}
      className="reveal-scale group relative overflow-hidden rounded-premium-xl bg-charcoal shadow-premium transition-all duration-500 hover:scale-[1.02] hover:shadow-premium-xl"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Gradient header */}
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${classItem.color} px-8 py-8 transition-all duration-500 group-hover:py-10`}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
        </div>

        <div className="relative flex items-start justify-between">
          <div>
            <div className="mb-4 inline-flex rounded-premium bg-white/20 p-3 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
              <Icon className="h-7 w-7 text-white" />
            </div>
            <h3 className="mb-1 text-3xl font-bold text-white">{classItem.name}</h3>
            <p className="text-lg text-white/80">{classItem.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <p className="mb-6 text-gray-300 leading-relaxed">{classItem.description}</p>

        {/* Details grid */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-premium bg-charcoal-light p-4">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Nivel
            </div>
            <div className="text-sm font-medium text-white">{classItem.level}</div>
          </div>
          <div className="rounded-premium bg-charcoal-light p-4">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Intensidad
            </div>
            <div className="text-sm font-medium text-white">{classItem.intensity}</div>
          </div>
        </div>

        {/* Schedule */}
        <div className="space-y-4 border-t border-gray-800 pt-6">
          {classItem.schedule.map((slot, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="h-4 w-4" />
                <span className="text-sm font-medium">{slot.days}</span>
              </div>
              {slot.times.map((time, timeIdx) => (
                <div
                  key={timeIdx}
                  className="ml-6 flex items-center gap-2 text-gray-300 transition-colors duration-200 group-hover:text-white"
                >
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{time}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Hover border glow */}
      <div className="absolute inset-0 -z-10 rounded-premium-xl bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:from-accent/30 group-hover:via-accent/10 group-hover:to-accent/0 group-hover:opacity-100" />
    </div>
  );
}
