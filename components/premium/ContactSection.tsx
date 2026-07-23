'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, MessageCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Ubicación',
    details: ['Tegucigalpa, Honduras', 'Colonia Palmira, Calle Principal'],
  },
  {
    icon: Phone,
    title: 'Teléfono',
    details: ['+504 9999-9999'],
    link: 'tel:+50499999999',
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@ichiban-bjj.com'],
    link: 'mailto:info@ichiban-bjj.com',
  },
  {
    icon: Clock,
    title: 'Horario',
    details: ['Lunes - Viernes: 6:00 AM - 10:00 PM', 'Sábados: 8:00 AM - 2:00 PM'],
  },
];

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#', color: 'from-purple-600 to-pink-600' },
  { icon: Facebook, label: 'Facebook', href: '#', color: 'from-blue-600 to-blue-700' },
  { icon: MessageCircle, label: 'WhatsApp', href: '#', color: 'from-green-600 to-green-700' },
];

export function ContactSection() {
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const subtitleRef = useScrollReveal<HTMLParagraphElement>();

  return (
    <section id="contact" className="relative overflow-hidden bg-charcoal-light py-24 px-6 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center lg:mb-20">
          <h2
            ref={titleRef}
            className="reveal mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Visítanos <span className="text-gradient">Hoy</span>
          </h2>
          <p
            ref={subtitleRef}
            className="reveal mx-auto max-w-2xl text-lg text-gray-300 md:text-xl"
            style={{ animationDelay: '0.1s' }}
          >
            Estamos listos para darte la bienvenida. Ven a conocer nuestras instalaciones
            y comienza tu transformación.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Contact info cards */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <ContactCard key={info.title} info={info} index={index} />
            ))}

            {/* Social links */}
            <div className="reveal-scale pt-6" style={{ animationDelay: '0.4s' }}>
              <h3 className="mb-4 text-xl font-bold text-white">Síguenos</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <SocialButton key={social.label} social={social} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Map or CTA */}
          <div className="reveal-scale lg:reveal-right space-y-6" style={{ animationDelay: '0.2s' }}>
            {/* Map placeholder */}
            <div className="group relative overflow-hidden rounded-premium-xl bg-charcoal shadow-premium aspect-[4/3] transition-all duration-500 hover:shadow-premium-xl">
              {/* Placeholder map */}
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal-lighter to-charcoal">
                <div className="flex h-full items-center justify-center">
                  <MapPin className="h-24 w-24 text-accent transition-transform duration-500 group-hover:scale-110" />
                </div>
              </div>

              {/* Overlay with address */}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent p-8">
                <div>
                  <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
                    Nuestra Ubicación
                  </div>
                  <div className="text-xl font-bold text-white">
                    Tegucigalpa, Honduras
                  </div>
                  <div className="text-gray-300">
                    Colonia Palmira, Calle Principal
                  </div>
                </div>
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 -z-10 rounded-premium-xl bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:from-accent/40 group-hover:via-accent/20 group-hover:to-accent/0 group-hover:opacity-100" />
            </div>

            {/* Call to action card */}
            <div className="rounded-premium-xl bg-gradient-to-br from-accent to-accent-dark p-8 shadow-premium-lg">
              <h3 className="mb-4 text-2xl font-bold text-white">
                ¿Listo para empezar?
              </h3>
              <p className="mb-6 text-white/90">
                Contáctanos hoy mismo y programa tu clase de prueba gratuita.
                Nuestro equipo está listo para responder todas tus preguntas.
              </p>
              <button className="group w-full rounded-premium-lg bg-white px-6 py-4 font-semibold text-accent shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <span className="flex items-center justify-center gap-2">
                  Enviar Mensaje
                  <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ContactCardProps {
  info: typeof contactInfo[0];
  index: number;
}

function ContactCard({ info, index }: ContactCardProps) {
  const cardRef = useScrollReveal<HTMLDivElement>();
  const Icon = info.icon;
  const isLink = !!info.link;

  const content = (
    <>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 rounded-premium bg-accent/10 p-3 transition-all duration-300 group-hover:bg-accent/20 group-hover:shadow-glow">
          <Icon className="h-6 w-6 text-accent transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-bold text-white">{info.title}</h3>
          <div className="space-y-1">
            {info.details.map((detail, idx) => (
              <p
                key={idx}
                className="text-gray-300 transition-colors duration-200 group-hover:text-white"
              >
                {detail}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const className =
    'reveal-scale group relative overflow-hidden rounded-premium-xl bg-charcoal p-6 shadow-premium transition-all duration-300 hover:scale-105 hover:shadow-premium-lg';

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {isLink ? (
        <a href={info.link} className="block">
          {content}
        </a>
      ) : (
        content
      )}

      {/* Hover border glow */}
      <div className="absolute inset-0 -z-10 rounded-premium-xl bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:from-accent/30 group-hover:via-accent/10 group-hover:to-accent/0 group-hover:opacity-100" />
    </div>
  );
}

interface SocialButtonProps {
  social: typeof socialLinks[0];
}

function SocialButton({ social }: SocialButtonProps) {
  const Icon = social.icon;

  return (
    <a
      href={social.href}
      aria-label={social.label}
      className={`group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-premium-lg bg-charcoal shadow-premium transition-all duration-300 hover:scale-110 hover:shadow-premium-lg`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />
      <Icon className="relative z-10 h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
    </a>
  );
}
