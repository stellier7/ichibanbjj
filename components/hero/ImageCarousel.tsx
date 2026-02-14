'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CarouselImage } from '@/types';

interface ImageCarouselProps {
  images: CarouselImage[];
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleImages, setVisibleImages] = useState(3);

  // Calculate visible images based on screen size
  useEffect(() => {
    const updateVisibleImages = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width < 640) {
          setVisibleImages(1);
        } else if (width < 1024) {
          setVisibleImages(2);
        } else if (width < 1536) {
          setVisibleImages(3);
        } else {
          setVisibleImages(5);
        }
      }
    };

    updateVisibleImages();
    window.addEventListener('resize', updateVisibleImages);
    return () => window.removeEventListener('resize', updateVisibleImages);
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const previousImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToImage = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

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

  // Get images to display (current and surrounding)
  const getDisplayImages = () => {
    const displayImages: Array<{ image: CarouselImage; displayIndex: number; position: 'left' | 'center' | 'right' }> = [];
    
    for (let i = 0; i < visibleImages; i++) {
      const offset = i - Math.floor(visibleImages / 2);
      const imageIndex = (currentIndex + offset + images.length) % images.length;
      const position = i === Math.floor(visibleImages / 2) ? 'center' : i < Math.floor(visibleImages / 2) ? 'left' : 'right';
      
      // Ensure we have a valid image
      if (images[imageIndex]) {
        displayImages.push({
          image: images[imageIndex],
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
                className="absolute inset-0 transition-all duration-700 ease-in-out"
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
                  className="object-cover"
                  priority={isCenter}
                  loading={isCenter ? 'eager' : 'lazy'}
                  sizes="100vw"
                  onError={(e) => {
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
        <div className="text-center text-white z-20">
          <h1 className="text-7xl md:text-9xl font-bold mb-4 tracking-wider">
            ICHIBAN
          </h1>
          <p className="text-xl md:text-2xl">Jiu Jitsu Academy</p>
          <p className="text-lg md:text-xl mt-2">Tegucigalpa, Honduras</p>
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="lg"
            onClick={previousImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white border-0"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white border-0"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </>
      )}

      {/* Auto-play Toggle */}
      {images.length > 1 && (
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-4 right-4 z-30 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md text-sm transition-colors"
          aria-label={isAutoPlaying ? 'Pause carousel' : 'Play carousel'}
        >
          {isAutoPlaying ? 'Pause' : 'Play'}
        </button>
      )}
    </div>
  );
};
