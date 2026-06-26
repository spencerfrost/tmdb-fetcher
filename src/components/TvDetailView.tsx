import React, { useEffect, useState } from 'react';
import { fetchMediaDetails, fetchSeasonDetails } from '../utils/api'; // Make sure to import fetchSeasonDetails
import { MediaDetail, TvSeason, TvEpisode } from '../utils/types';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { CastAndCrew } from './CastAndCrew';

interface TvDetailViewProps {
  id: number;
}

const TvDetailView: React.FC<TvDetailViewProps> = ({ id }) => {
  const [show, setShow] = useState<MediaDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // New state for handling seasons and episodes
  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState<number | null>(null);
  const [episodes, setEpisodes] = useState<TvEpisode[]>([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState<boolean>(false);

  // Fetch the main TV show details
  useEffect(() => {
    const fetchTvShow = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchMediaDetails('tv', id);
        setShow(data);

        // Automatically select season 1 (or the first available season) if it exists
        if (data.seasons && data.seasons.length > 0) {
          const firstSeason = data.seasons.find((s: TvSeason) => s.season_number > 0) || data.seasons[0];
          setSelectedSeasonNumber(firstSeason.season_number);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTvShow();
  }, [id]);

  // Fetch episodes whenever the selected season changes
  useEffect(() => {
    const fetchEpisodes = async () => {
      if (selectedSeasonNumber === null) return;

      setLoadingEpisodes(true);
      try {
        const seasonData = await fetchSeasonDetails(id, selectedSeasonNumber);
        // The season details endpoint returns the episodes in the 'episodes' array
        setEpisodes(seasonData.episodes || []);
      } catch (err) {
        console.error("Failed to load episodes", err);
        // You might want to handle this error in the UI differently
      } finally {
        setLoadingEpisodes(false);
      }
    };

    fetchEpisodes();
  }, [id, selectedSeasonNumber]);

  if (loading) return <div className="text-center py-12 text-gray-400">Loading TV show...</div>;
  if (error) return <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>;
  if (!show) return <div className="text-center py-12 text-gray-400">TV Show not found</div>;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      {/* Top Show Info - Same as before */}
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          {show.posterPath ? (
            <img src={show.posterPath} alt={show.name} className="w-full h-auto object-cover" />
          ) : (
            <div className="w-full h-96 bg-gray-700 flex items-center justify-center text-gray-400">No Image</div>
          )}
        </div>
        <div className="md:w-2/3 p-6">
          <h1 className="text-3xl font-bold mb-2">{show.name}</h1>
          {show.tagline && <p className="text-gray-400 italic mb-4">{show.tagline}</p>}

          <div className="grid gap-3 md:grid-cols-2 mb-6 text-sm text-gray-300">
            <div>
              <p><span className="font-semibold text-white">Status:</span> {show.status}</p>
              <p><span className="font-semibold text-white">First Aired:</span> {show.releaseDate}</p>
            </div>
            <div>
              <p><span className="font-semibold text-white">Seasons:</span> {show.numberOfSeasons ?? 'N/A'}</p>
              <p><span className="font-semibold text-white">Episodes:</span> {show.numberOfEpisodes ?? 'N/A'}</p>
            </div>
          </div>

          <p className="text-gray-300 mb-6">{show.overview}</p>
          {show.credits && <CastAndCrew media={show} />}
        </div>
      </div>

      {/* Seasons & Episodes UI */}
      {show.seasons && show.seasons.length > 0 && (
        <div className="border-t border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Sidebar: Season List */}
            <div className="lg:w-1/4">
              <h2 className="text-xl font-bold mb-4 text-white">Seasons</h2>
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2">
                {show.seasons.map((season) => (
                  <Button
                    key={season.id}
                    variant={selectedSeasonNumber === season.season_number ? "default" : "outline"}
                    className="justify-start whitespace-nowrap"
                    onClick={() => setSelectedSeasonNumber(season.season_number)}
                  >
                    {season.name} ({season.episode_count})
                  </Button>
                ))}
              </div>
            </div>

            {/* Main Content: Episode List */}
            <div className="lg:w-3/4">
              <h2 className="text-xl font-bold mb-4 text-white">
                Episodes
              </h2>

              {loadingEpisodes ? (
                <div className="text-center py-8 text-gray-400">Loading episodes...</div>
              ) : episodes.length > 0 ? (
                <div className="space-y-4">
                  {episodes.map((episode) => (
                    <div key={episode.id} className="bg-gray-900 rounded-lg p-4 flex flex-col md:flex-row gap-4 border border-gray-700">
                      {/* Episode Image */}
                      <div className="md:w-1/4 flex-shrink-0">
                        {episode.still_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                            alt={episode.name}
                            className="w-full h-auto rounded-md object-cover"
                          />
                        ) : (
                          <div className="w-full aspect-video bg-gray-800 rounded-md flex items-center justify-center text-xs text-gray-500">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Episode Details */}
                      <div className="md:w-3/4">
                        <div className="flex justify-between items-start mb-2">
                          <a
                            href={`/tv/${id}/season/${episode.season_number}/episode/${episode.episode_number}`}
                            className="font-bold text-lg text-white hover:text-blue-400 transition-colors"
                          >
                            {episode.episode_number}. {episode.name}
                          </a>
                          <span className="text-sm bg-gray-800 px-2 py-1 rounded text-gray-300 whitespace-nowrap">
                            ★ {episode.vote_average?.toFixed(1) || 'N/A'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">
                          {episode.air_date ? new Date(episode.air_date).toLocaleDateString() : 'TBD'} • {episode.runtime || '?'} min
                        </p>
                        <p className="text-sm text-gray-300 line-clamp-3">
                          {episode.overview || 'No overview available for this episode.'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">No episodes found for this season.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TvDetailView;