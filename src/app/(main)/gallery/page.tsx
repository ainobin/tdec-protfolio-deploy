'use client';

import React, { useState, useEffect } from 'react';
import { GalleryItem } from '@/types';
import GalleryFilters, { FilterType } from '@/components/gallery/GalleryFilters';
import GalleryGrid from '@/components/gallery/GalleryGrid';

const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const filterParam = activeFilter !== 'all' ? `?type=${activeFilter}` : '';
        const response = await fetch(`/api/gallery${filterParam}`);
        const data = await response.json();
        
        if (data.success) {
          setItems(data.data);
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
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-3xl font-bengali mb-4">গ্যালারি</p>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto wrap-break-word leading-relaxed">
            Explore our state-of-the-art facilities, advanced medical equipment, and the compassionate care environment we maintain.
          </p>
          <p className="text-base font-bengali text-blue-100 mt-2 wrap-break-word leading-relaxed">
            আমাদের অত্যাধুনিক সুবিধা, উন্নত চিকিৎসা সরঞ্জাম এবং যত্নশীল পরিবেশ ঘুরে দেখুন।
          </p>
        </div>
      </div>

      {/* Filters and Gallery Content */}
      <div className="container mx-auto px-4 py-12">
        <GalleryFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        
        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="aspect-square bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">⚠️</div>
            <div className="text-red-600 text-xl mb-4">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && items.length === 0 && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🖼️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Items Found</h2>
            <p className="text-gray-600">
              {activeFilter === 'all' 
                ? 'No gallery items available yet' 
                : `No ${activeFilter}s found in the gallery`}
            </p>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && items.length > 0 && (
          <GalleryGrid items={items} />
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
