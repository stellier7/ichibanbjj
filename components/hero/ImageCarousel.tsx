'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { CarouselImage } from '@/types';

interface ImageCarouselProps {
  images: CarouselImage[];
}

const MOBILE_BREAKPOINT = 640;

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(3);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT
  );
  // Filter images by viewport: mobile = portrait only, desktop = all
  const filteredImages = useMemo(() => {
    if (isMobile) {
      const portrait = images.filter((img) => img.orientation === 'portrait');
      return portrait.length > 0 ? portrait : images;
    }
    return images;
  }, [images, isMobile]);

  // Update visible images and mobile state on resize
  useEffect(() => {
    const update = () => {
      if (typeof window === 'undefined') return;
      const width = window.innerWidth;
      setIsMobile(width < MOBILE_BREAKPOINT);
      if (width < 640) setVisibleImages(1);
      else if (width < 1024) setVisibleImages(2);
      else if (width < 1536) setVisibleImages(3);
      else setVisibleImages(5);
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Clamp currentIndex when filtered list changes (e.g. resize mobile <-> desktop)
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, Math.max(0, filteredImages.length - 1)));
  }, [filteredImages.length]);

  // Auto-rotate every 5 seconds (uses filtered list)
  useEffect(() => {
    if (filteredImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [filteredImages.length]);

  if (images.length === 0) {
    return (
      <div className="relative h-screen w-full bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-6xl font-bold mb-4">ICHIBAN</h1>
          <p className="text-xl">Add images to public/images/ichiban-daily/ to see the carousel</p>
        </div>
      </div>
    );
  }

  // Get images to display (current and surrounding) from filtered list
  const getDisplayImages = () => {
    const displayImages: Array<{ image: CarouselImage; displayIndex: number; position: 'left' | 'center' | 'right' }> = [];
    const len = filteredImages.length;

    for (let i = 0; i < visibleImages; i++) {
      const offset = i - Math.floor(visibleImages / 2);
      const imageIndex = (currentIndex + offset + len) % len;
      const position = i === Math.floor(visibleImages / 2) ? 'center' : i < Math.floor(visibleImages / 2) ? 'left' : 'right';

      if (filteredImages[imageIndex]) {
        displayImages.push({
          image: filteredImages[imageIndex],
          displayIndex: i,
          position,
        });
      }
    }

    return displayImages;
  };

  const displayImages = getDisplayImages();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Images Grid */}
      <div className="relative h-full w-full flex items-center justify-center">
        {displayImages.length > 0 ? (
          displayImages.map(({ image, displayIndex, position }) => {
            const isCenter = position === 'center';
            const scale = isCenter ? 1 : 0.7;
            const opacity = isCenter ? 1 : 0.5;
            const offset = displayIndex - Math.floor(visibleImages / 2);
            const zIndex = isCenter ? 10 : 5 - Math.abs(offset);

            return (
              <div
                key={`${image.id}-${displayIndex}-${currentIndex}`}
                className="absolute inset-0 transition-all duration-700 ease-in-out bg-gray-900"
                style={{
                  transform: `scale(${scale}) translateX(${offset * 20}%)`,
                  opacity,
                  zIndex,
                }}
              >
                <Image
                  src={image.url}
                  alt={`Ichiban ${image.filename || displayIndex + 1}`}
                  fill
                  className="object-cover object-center"
                  priority={isCenter}
                  loading={isCenter ? 'eager' : 'lazy'}
                  sizes="100vw"
                  onError={() => {
                    console.error('Image failed to load:', image.url);
                  }}
                />
              </div>
            );
          })
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <h1 className="text-6xl font-bold mb-4">ICHIBAN</h1>
              <p className="text-xl">Cargando imágenes...</p>
            </div>
          </div>
        )}
      </div>

      {/* Overlay with Branding */}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <div className="text-center text-white z-20 text-stroke-black">
          <h1 className="text-7xl md:text-9xl font-bold mb-4 tracking-wider">
            ICHIBAN
          </h1>
          <p className="text-xl md:text-2xl">Jiu Jitsu Academy</p>
          <p className="text-lg md:text-xl mt-2">Tegucigalpa, Honduras</p>
        </div>
      </div>
    </div>
  );
};
