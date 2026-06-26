import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEpisodeDetails } from '../utils/api'; 
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { EpisodeDetail } from '../utils/types';

const EpisodeDetailView: React.FC = () => {
  const { seriesId, seasonNumber, episodeNumber } = useParams();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState<EpisodeDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEpisode = async () => {
      setLoading(true);
      try {
        const data = await fetchEpisodeDetails(Number(seriesId), Number(seasonNumber), Number(episodeNumber));
        setEpisode(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load episode');
      } finally {
        setLoading(false);
      }
    };
    loadEpisode();
  }, [seriesId, seasonNumber, episodeNumber]);

  // Ensure loading and error states also have the dark background
  if (loading) return <div className="min-h-screen bg-gray-900 text-center py-12 text-gray-400">Loading episode...</div>;
  if (error) return <div className="min-h-screen bg-gray-900 p-4"><Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert></div>;
  if (!episode) return null;

  return (
    // Added the missing min-h-screen dark theme wrapper here
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col">
      <div className="max-w-4xl mx-auto w-full">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">Back</Button>

        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row">
            {/* Still Image */}
            <div className="md:w-1/3">
              {episode.still_path ? (
                <img 
                  src={`https://image.tmdb.org/t/p/w500${episode.still_path}`} 
                  alt={episode.name} 
                  className="w-full h-full object-cover min-h-[250px]"
                />
              ) : (
                <div className="w-full h-full min-h-[250px] bg-gray-700 flex items-center justify-center text-gray-500">No Image</div>
              )}
            </div>

            {/* Content */}
            <div className="md:w-2/3 p-6 flex flex-col justify-center">
              <h1 className="text-3xl font-bold mb-1">{episode.name}</h1>
              <p className="text-gray-400 text-sm mb-4">
                Season {episode.season_number} • Episode {episode.episode_number} • {episode.air_date}
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-yellow-400 text-black font-bold px-3 py-1 rounded-md text-sm">
                  ★ {episode.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-300">{episode.runtime} min</span>
              </div>

              <p className="text-gray-300 mb-8 leading-relaxed">{episode.overview}</p>

              {/* Crew Summary */}
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mt-auto">
                <div>
                  <p className="font-bold text-white mb-1">Director</p>
                  <p>{episode.crew?.find(c => c.job === 'Director')?.name || 'N/A'}</p>
                </div>
                <div>
                  <p className="font-bold text-white mb-1">Writer</p>
                  <p>{episode.crew?.find(c => c.department === 'Writing')?.name || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetailView;