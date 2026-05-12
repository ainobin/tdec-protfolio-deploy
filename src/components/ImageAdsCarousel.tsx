"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";


const ImageAdsCarousel = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/carousel');
        const data = await response.json();
        
        if (data.success && data.data && data.data.length > 0) {
          // Extract image URLs from the API response
          const imageUrls = data.data.map((item: { imageUrl: string }) => item.imageUrl);
          setImages(imageUrls);
        }

      } catch (err) {
        console.error('Error fetching carousel images:', err);
        // Fall back to default images on error
        setError('Failed to load carousel images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    if (images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      }, 4000);
    }
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [images.length]);

  // Loading state
  if (loading) {
    return (
      <div className="w-full flex justify-center mt-8">
        <div className="relative w-full max-w-full h-32 sm:h-48 md:h-96 bg-gray-100 rounded-xl animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400">Loading carousel...</span>
          </div>
        </div>
      </div>
    );
  }

  // Empty state - shouldn't normally show due to fallback to defaults
  if (images.length === 0) {
    return null;
  }

  // Error state - shouldn't normally show due to fallback to defaults
  if (error && images.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex justify-center">
      <div
        className="relative w-full max-w-full
                   h-32 sm:h-48 md:h-96
                   bg-white rounded-xl shadow-md 
                   border border-gray-200
                   overflow-hidden group"
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
      >
        <div className="flex items-center justify-center h-full relative">

          {images.map((image, index) => {
            const position =
              index === currentIndex
                ? "center"
                : index ===
                  (currentIndex - 1 + images.length) % images.length
                ? "left"
                : index ===
                  (currentIndex + 1) % images.length
                ? "right"
                : "hidden";

            return (
              <div
                key={index}
                className={`absolute transition-all duration-700 ease-in-out
                  ${
                    position === "center"
                      ? "z-30 scale-100 opacity-100 blur-0"
                      : position === "left"
                      ? "z-20 -translate-x-1/2 scale-90 opacity-60 blur-sm"
                      : position === "right"
                      ? "z-20 translate-x-1/2 scale-90 opacity-60 blur-sm"
                      : "opacity-0 scale-75"
                  }
                `}
              >
                <div className="relative w-[90vw] h-32 sm:h-96 md:h-80 rounded-sm overflow-hidden shadow-xl">
                  <Image
                    src={image}
                    alt={`Advertisement ${index + 1}`}
                    fill
                    className="object-top"
                    priority={index === 0}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Left Arrow */}
        {images.length > 1 && (
          <button
            onClick={goToPrevious}
            className="absolute left-5 top-1/2 -translate-y-1/2 z-40
                       w-10 h-10 bg-white/80 hover:bg-white
                       rounded-full shadow-md cursor-pointer"
          >
            &#10094;
          </button>
        )}

        {/* Right Arrow */}
        {images.length > 1 && (
          <button
            onClick={goToNext}
            className="absolute right-5 top-1/2 -translate-y-1/2 z-40
                       w-10 h-10 bg-white/80 hover:bg-white
                       rounded-full shadow-md cursor-pointer"
          >
            &#10095;
          </button>
        )}

        {/* Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  index === currentIndex
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageAdsCarousel;
