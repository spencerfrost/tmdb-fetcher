import React, { useState } from 'react';
import { Lightbox } from './Lightbox';

interface ImageGalleryProps {
  images: { file_path: string }[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <div>
      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
        {images.map((img, index) => (
          <button
            key={img.file_path}
            type="button"
            onClick={() => setExpandedIndex(index)}
            className="group flex-shrink-0 overflow-hidden rounded-lg bg-slate-800 ring-1 ring-white/5 transition-all hover:ring-amber-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${img.file_path}`}
              alt={`Episode still ${index + 1}`}
              loading="lazy"
              className="h-36 w-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {expandedIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={expandedIndex}
          onClose={() => setExpandedIndex(null)}
          onIndexChange={setExpandedIndex}
        />
      )}
    </div>
  );
};