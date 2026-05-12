'use client';

import React from 'react';
import { GalleryItem } from '@/types';
import GalleryItemComponent from './GalleryItem';

interface GalleryGridProps {
  items: GalleryItem[];
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No items found in this category.</p>
        <p className="text-gray-400 font-bengali mt-2">এই বিভাগে কোন আইটেম পাওয়া যায়নি।</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {items.map((item, index) => (
        <GalleryItemComponent key={(item as any)._id || item.id || index} item={item} />
      ))}
    </div>
  );
};

export default GalleryGrid;
