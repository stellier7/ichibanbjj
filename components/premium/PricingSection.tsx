'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Check, Zap, Crown, Star } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Básico',
    description: 'Perfecto para empezar tu viaje',
    price: '1,200',
    period: 'mes',
    features: [
      '8 clases por mes',
      'Acceso a clases fundamentales',
      'Préstamo de Gi (primera semana)',
      'Comunidad de apoyo',
      'Registro de progreso',
    ],
    icon: Star,
    highlighted: false,
    cta: 'Comenzar',
  },
  {
    name: 'Élite',
    description: 'Máximo compromiso, máximos resultados',
    price: '2,200',
    period: 'mes',
    features: [
      'Clases ilimitadas',
      'Todas las disciplinas (BJJ + Muay Thai)',
      'Acceso a clases de competición',
      'Descuento 20% en tienda',
      'Seminarios exclusivos',
      'Plan nutricional personalizado',
      'Registro detallado de progreso',
    ],
    icon: Crown,
    highlighted: true,
    cta: 'Más Popular',
    badge: 'Recomendado',
  },
  {
    name: 'Ilimitado',
    description: 'Entrena sin límites',
    price: '1,800',
    period: 'mes',
    features: [
      'Clases ilimitadas',
      'Todas las disciplinas',
      'Acceso 7 días a la semana',
      'Descuento 10% en tienda',
      'Invitaciones a seminarios',
    ],
    icon: Zap,
    highlighted: false,
    cta: 'Seleccionar',
  },
];

export function PricingSection() {
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const subtitleRef = useScrollReveal<HTMLParagraphElement>();

  return (
    <section id="pricing" className="relative overflow-hidden bg-charcoal py-24 px-6 lg:py-32">
      {/* Dramatic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(196,30,58,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(196,30,58,0.08),transparent_50%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center lg:mb-20">
          <h2
            ref={titleRef}
            className="reveal mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Planes y <span className="text-gradient">Precios</span>
          </h2>
          <p
            ref={subtitleRef}
            className="reveal mx-auto max-w-2xl text-lg text-gray-300 md:text-xl"
            style={{ animationDelay: '0.1s' }}
          >
            Elige el plan que mejor se adapte a tus objetivos. Tu primera clase es siempre gratis.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <div className="reveal mx-auto max-w-3xl rounded-premium-xl bg-charcoal-light p-8 shadow-premium">
            <h3 className="mb-4 text-2xl font-bold text-white">
              Primera Clase Gratis
            </h3>
            <p className="mb-6 text-gray-300">
              Ven a conocer nuestras instalaciones, instructores y comunidad sin compromiso.
              Experimenta la diferencia de entrenar en Ichiban.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="group inline-flex items-center gap-2 rounded-premium-lg bg-accent px-6 py-3 font-semibold text-white shadow-premium transition-all duration-300 hover:scale-105 hover:shadow-glow-strong">
                <span>Reservar Clase Gratis</span>
              </button>
              <button className="inline-flex items-center gap-2 rounded-premium-lg border-2 border-gray-700 bg-transparent px-6 py-3 font-semibold text-white transition-all duration-300 hover:border-gray-600 hover:bg-charcoal-lighter">
                <span>Contactar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface PricingCardProps {
  plan: typeof pricingPlans[0];
  index: number;
}

function PricingCard({ plan, index }: PricingCardProps) {
  const cardRef = useScrollReveal<HTMLDivElement>();
  const Icon = plan.icon;

  return (
    <div
      ref={cardRef}
      className={`reveal-scale group relative overflow-hidden rounded-premium-xl transition-all duration-500 ${
        plan.highlighted
          ? 'scale-105 bg-gradient-to-br from-charcoal-light to-charcoal shadow-premium-xl lg:scale-110'
          : 'bg-charcoal-light shadow-premium'
      } hover:scale-110 hover:shadow-premium-xl`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Badge for highlighted plan */}
      {plan.badge && (
        <div className="absolute -right-12 top-8 rotate-45 bg-accent px-12 py-1 text-xs font-bold text-white shadow-lg">
          {plan.badge}
        </div>
      )}

      {/* 3D depth layers */}
      <div className="absolute inset-0 -z-10 translate-y-2 rounded-premium-xl bg-charcoal-lighter blur-sm transition-transform duration-500 group-hover:translate-y-3" />
      <div className="absolute inset-0 -z-20 translate-y-4 rounded-premium-xl bg-charcoal blur-md transition-transform duration-500 group-hover:translate-y-6" />

      <div className="relative p-8">
        {/* Icon */}
        <div
          className={`mb-6 inline-flex rounded-premium-lg p-4 transition-all duration-300 ${
            plan.highlighted
              ? 'bg-accent/20 shadow-glow group-hover:bg-accent/30'
              : 'bg-charcoal group-hover:bg-charcoal-lighter'
          }`}
        >
          <Icon
            className={`h-8 w-8 transition-all duration-300 group-hover:scale-110 ${
              plan.highlighted ? 'text-accent' : 'text-white'
            }`}
          />
        </div>

        {/* Plan name and description */}
        <h3 className="mb-2 text-3xl font-bold text-white">{plan.name}</h3>
        <p className="mb-6 text-sm text-gray-400">{plan.description}</p>

        {/* Price */}
        <div className="mb-8 border-b border-gray-800 pb-8">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-white">L{plan.price}</span>
            <span className="text-lg text-gray-400">/ {plan.period}</span>
          </div>
        </div>

        {/* Features */}
        <ul className="mb-8 space-y-4">
          {plan.features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-gray-300 transition-colors duration-200 group-hover:text-white"
            >
              <div
                className={`mt-0.5 flex-shrink-0 rounded-full p-1 ${
                  plan.highlighted ? 'bg-accent/20' : 'bg-charcoal'
                }`}
              >
                <Check
                  className={`h-4 w-4 ${
                    plan.highlighted ? 'text-accent' : 'text-white'
                  }`}
                />
              </div>
              <span className="text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          className={`w-full rounded-premium-lg py-4 font-semibold transition-all duration-300 ${
            plan.highlighted
              ? 'bg-accent text-white shadow-glow hover:scale-105 hover:shadow-glow-strong'
              : 'border-2 border-gray-700 bg-transparent text-white hover:border-accent hover:bg-accent/10'
          }`}
        >
          {plan.cta}
        </button>
      </div>

      {/* Animated border glow on hover */}
      {plan.highlighted && (
        <div className="absolute inset-0 -z-10 rounded-premium-xl bg-gradient-to-br from-accent/50 via-accent/20 to-accent/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      )}
    </div>
  );
}
