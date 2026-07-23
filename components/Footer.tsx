import Link from 'next/link';
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal border-t border-white/5">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 
              className="text-3xl font-bold mb-4 text-white tracking-[0.2em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              ICHIBAN
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Jiu Jitsu Academy en Tegucigalpa, Honduras. Entrenamiento profesional de Jiu Jitsu y Muay Thai.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              <a
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-premium bg-charcoal-light transition-all duration-300 hover:scale-110 hover:bg-accent hover:shadow-glow"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-premium bg-charcoal-light transition-all duration-300 hover:scale-110 hover:bg-accent hover:shadow-glow"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-premium bg-charcoal-light transition-all duration-300 hover:scale-110 hover:bg-accent hover:shadow-glow"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-white" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white text-lg">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-accent transition-colors duration-300">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/store" className="text-gray-400 hover:text-accent transition-colors duration-300">
                  Tienda
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-gray-400 hover:text-accent transition-colors duration-300">
                  Aprende
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-gray-400 hover:text-accent transition-colors duration-300">
                  Clases
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white text-lg">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="h-5 w-5 flex-shrink-0 text-accent mt-0.5" />
                <span>Tegucigalpa, Honduras</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0 text-accent" />
                <a href="tel:+50499999999" className="text-gray-400 hover:text-accent transition-colors duration-300">
                  +504 9999-9999
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0 text-accent" />
                <a href="mailto:info@ichiban-bjj.com" className="text-gray-400 hover:text-accent transition-colors duration-300">
                  info@ichiban-bjj.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4 text-white text-lg">Horario</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between">
                <span>Lun - Vie:</span>
                <span className="text-white">6AM - 10PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sábados:</span>
                <span className="text-white">8AM - 2PM</span>
              </li>
              <li className="flex justify-between">
                <span>Domingos:</span>
                <span className="text-white">Cerrado</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Ichiban Jiu Jitsu. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-accent transition-colors duration-300">
              Privacidad
            </Link>
            <Link href="#" className="hover:text-accent transition-colors duration-300">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
