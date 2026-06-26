import React from 'react';
import { MediaDetail } from '../utils/types';

export const CastAndCrew: React.FC<{ media: MediaDetail }> = ({ media }) => {
  const director = media.credits?.crew.find((c) => c.job === 'Director');

  return (
    <div className="mt-8 border-t border-gray-700 pt-6">
      {director && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white">Director</h3>
          <p className="text-gray-300">{director.name}</p>
        </div>
      )}

      {media.credits?.cast && (
        <>
          <h3 className="text-lg font-semibold text-white mb-4">Top Cast</h3>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {media.credits.cast.slice(0, 10).map((person) => (
              <div key={person.id} className="flex-shrink-0 w-32">
                <div className="w-32 h-48 bg-gray-700 rounded-lg overflow-hidden mb-2">
                  {person.profile_path ? (
                    <img src={person.profile_path} alt={person.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex medias-center justify-center text-xs text-gray-500">No Image</div>
                  )}
                </div>
                <p className="text-sm font-bold truncate">{person.name}</p>
                <p className="text-xs text-gray-400 truncate">{person.character}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};