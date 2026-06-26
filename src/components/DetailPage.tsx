import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import MovieDetailView from './MovieDetailView';
import TvDetailView from './TvDetailView';

const DetailPage: React.FC = () => {
  const { mediaType, id } = useParams<{ mediaType: string; id: string }>();
  const navigate = useNavigate();

  if (!id || (mediaType !== 'movie' && mediaType !== 'tv')) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 flex items-center justify-center">
        <p className="text-xl text-gray-400">Invalid URL parameters.</p>
      </div>
    );
  }

  const numericId = parseInt(id, 10);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          Back
        </Button>
        
        {mediaType === 'movie' ? (
          <MovieDetailView id={numericId} />
        ) : (
          <TvDetailView id={numericId} />
        )}
      </div>
    </div>
  );
};

export default DetailPage;