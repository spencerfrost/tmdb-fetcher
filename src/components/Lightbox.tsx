import React, { useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface LightboxProps {
  images: { file_path: string }[];
  currentIndex: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onIndexChange,
}) => {
  const showPrev = useCallback(() => {
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  const showNext = useCallback(() => {
    onIndexChange((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, showPrev, showNext]);

  // Lock background scroll while the lightbox is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 p-2 text-white/80 transition-colors hover:text-amber-400"
      >
        <X size={28} />
      </button>

      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            showPrev();
          }}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white/80 transition-colors hover:text-amber-400 sm:left-4"
        >
          <ChevronLeft size={36} />
        </button>
      )}

      <img
        src={`https://image.tmdb.org/t/p/original${images[currentIndex].file_path}`}
        alt={`Episode still ${currentIndex + 1}`}
        className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            showNext();
          }}
          aria-label="Next image"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/80 transition-colors hover:text-amber-400 sm:right-4"
        >
          <ChevronRight size={36} />
        </button>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-sm text-white/70">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};