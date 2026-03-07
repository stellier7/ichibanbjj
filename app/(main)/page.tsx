'use client';

import { useEffect, useState } from 'react';
import { ImageCarousel } from '@/components/hero/ImageCarousel';
import { CarouselImage } from '@/types';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

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
    <div className="-mt-16">
      {/* Hero Section - Full viewport, starts at top */}
      <section className="relative">
        {loading ? (
          <div className="h-screen w-full bg-gray-900 flex items-center justify-center">
            <div className="text-white text-center">
              <h1 className="text-6xl font-bold mb-4">ICHIBAN</h1>
              <p className="text-xl">Cargando...</p>
            </div>
          </div>
        ) : (
          <ImageCarousel images={images} />
        )}
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Sobre Ichiban</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Ichiban Jiu Jitsu es una academia de artes marciales de clase mundial ubicada en Tegucigalpa, Honduras.
            Ofrecemos entrenamiento profesional en Jiu Jitsu brasileño y Muay Thai, con instructores experimentados
            y un ambiente de apoyo para estudiantes de todos los niveles.
          </p>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Nuestra misión es desarrollar no solo habilidades físicas, sino también disciplina, respeto y confianza
            en cada estudiante. Únete a nuestra comunidad y descubre el poder del Jiu Jitsu.
          </p>
          <Link href="/about">
            <Button size="lg">Conoce Más</Button>
          </Link>
        </div>
      </section>

      {/* Class Schedule Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">Horarios de Clases</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Jiu Jitsu Classes */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-gray-900">
              <div className="flex items-center mb-6">
                <div className="bg-black text-white p-3 rounded-full mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Jiu Jitsu</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-600 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold">Lunes, Miércoles, Viernes</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-600 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Mañana:</p>
                    <p className="text-gray-700">7:00 AM - 9:00 AM</p>
                    <p className="font-semibold mt-3 mb-1">Noche:</p>
                    <p className="text-gray-700">6:00 PM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Muay Thai Classes */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-gray-900">
              <div className="flex items-center mb-6">
                <div className="bg-black text-white p-3 rounded-full mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Muay Thai</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-600 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold">Martes, Jueves</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-600 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Noche:</p>
                    <p className="text-gray-700">6:30 PM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/classes">
              <Button size="lg">Reservar Clase</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center text-gray-900">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ubicación</h2>
          <div className="flex items-center justify-center mb-8">
            <MapPin className="h-8 w-8 text-gray-600 mr-3" />
            <p className="text-xl text-gray-700">Tegucigalpa, Honduras</p>
          </div>
          <p className="text-lg text-gray-700 mb-8">
            Visítanos en nuestra academia en el corazón de Tegucigalpa. Estamos aquí para ayudarte
            en tu viaje de artes marciales.
          </p>
          <div className="bg-gray-100 p-8 rounded-lg text-gray-900">
            <h3 className="text-xl font-semibold mb-4">Información de Contacto</h3>
            <p className="text-gray-700 mb-2">Email: info@ichiban.com</p>
            <p className="text-gray-700">Teléfono: +504 XXXX-XXXX</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Listo para Empezar?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Tu primera clase es gratis. Reserva ahora y comienza tu viaje en el Jiu Jitsu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/classes">
              <Button variant="secondary" size="lg">Reservar Clase Gratis</Button>
            </Link>
            <Link href="/store">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                Ver Tienda
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
