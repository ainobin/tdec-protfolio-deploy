'use client';

import React from 'react';

export type FilterType = 'all' | 'image' | 'video';

interface GalleryFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const GalleryFilters: React.FC<GalleryFiltersProps> = ({ activeFilter, onFilterChange }) => {
  const filters: { label: string; labelBn: string; value: FilterType }[] = [
    { label: 'All', labelBn: 'সকল', value: 'all' },
    { label: 'Images', labelBn: 'ছবি', value: 'image' },
    { label: 'Videos', labelBn: 'ভিডিও', value: 'video' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-6 py-3 cursor-pointer rounded-lg font-medium transition-all ${
            activeFilter === filter.value
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
          }`}
          aria-pressed={activeFilter === filter.value}
        >
          <span className="mr-2">{filter.label}</span>
          <span className="font-bengali">({filter.labelBn})</span>
        </button>
      ))}
    </div>
  );
};

export default GalleryFilters;
