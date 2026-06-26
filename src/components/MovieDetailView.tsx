import React, { useEffect, useState } from 'react';
import { fetchMediaDetails } from '../utils/api';
import { MediaDetail } from '../utils/types';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { CastAndCrew } from './CastAndCrew';

interface MovieDetailViewProps {
  id: number;
}

const MovieDetailView: React.FC<MovieDetailViewProps> = ({ id }) => {
  const [movie, setMovie] = useState<MediaDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchMediaDetails('movie', id);
        setMovie(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className="text-center py-12 text-gray-400">Loading movie...</div>;
  if (error) return <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>;
  if (!movie) return <div className="text-center py-12 text-gray-400">Movie not found</div>;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          {movie.posterPath ? (
            <img src={movie.posterPath} alt={movie.title} className="w-full h-auto object-cover" />
          ) : (
            <div className="w-full h-96 bg-gray-700 flex items-center justify-center text-gray-400">No Image</div>
          )}
        </div>
        <div className="md:w-2/3 p-6">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          {movie.tagline && <p className="text-gray-400 italic mb-4">{movie.tagline}</p>}
          
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="bg-yellow-400 text-black font-bold px-3 py-1 rounded-full">
              ★ {movie.rating?.toFixed(1)}
            </span>
            <span className="text-gray-300">{movie.voteCount?.toLocaleString()} votes</span>
          </div>

          <div className="grid gap-3 md:grid-cols-2 mb-6 text-sm text-gray-300">
            <div>
              <p><span className="font-semibold text-white">Status:</span> {movie.status}</p>
              <p><span className="font-semibold text-white">Release date:</span> {movie.releaseDate}</p>
            </div>
            <div>
              <p><span className="font-semibold text-white">Runtime:</span> {movie.runtime ? `${movie.runtime} min` : 'N/A'}</p>
              <p><span className="font-semibold text-white">Budget:</span> {movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A'}</p>
              <p><span className="font-semibold text-white">Revenue:</span> {movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A'}</p>
            </div>
          </div>

          <p className="text-gray-300 mb-6">{movie.overview}</p>

          {movie.credits && <CastAndCrew media={movie} />}

          {movie.homepage && (
            <Button asChild>
              <a href={movie.homepage} target="_blank" rel="noopener noreferrer">Visit Homepage</a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailView;