'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { GalleryItem } from '@/types';
import GalleryGrid from './gallery/GalleryGrid';

interface GalleryProps {
  limit?: number;
  initialData?: GalleryItem[];
}

const Gallery: React.FC<GalleryProps> = ({ limit = 8, initialData }) => {
  const [items, setItems] = useState<GalleryItem[]>(
    initialData ? initialData.slice(0, limit) : [],
  );
  const [loading, setLoading] = useState(initialData === undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData !== undefined) {
      setItems(limit ? initialData.slice(0, limit) : initialData);
      return;
    }

    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/gallery', { cache: 'no-store' });
        const data = await response.json();
        
        if (data.success) {
          const galleryItems = limit ? data.data.slice(0, limit) : data.data;
          setItems(galleryItems);
        } else {
          setError(data.error || 'Failed to fetch gallery');
        }
      } catch (err) {
        setError('Failed to load gallery');
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [initialData, limit]);

  return (
    <section id="gallery" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our <span className="text-blue-600">Gallery</span>
          </h2>
          <p className="text-2xl font-bengali text-gray-600 mb-2">আমাদের গ্যালারি</p>
          <p className="text-gray-600 max-w-2xl mx-auto wrap-break-word leading-relaxed">
            See our modern facilities, advanced equipment, and the caring environment we provide for our patients.
          </p>
          <p className="text-gray-500 font-bengali mt-2 wrap-break-word leading-relaxed">
            এক নজরে আমাদের আধুনিক সুবিধা, উন্নত সরঞ্জাম এবং রোগীবান্ধব পরিবেশ দেখুন।
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="aspect-square bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="text-red-600 text-lg mb-4">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && items.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🖼️</div>
            <p className="text-xl text-gray-600">No gallery items available</p>
            <p className="text-gray-500">Please check back later</p>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && items.length > 0 && (
          <GalleryGrid items={items} />
        )}

        {/* Explore More Button */}
        {!loading && !error && items.length > 0 && limit && (
          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-medium text-lg"
            >
              <span className="font-bengali">আরও দেখুন</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
