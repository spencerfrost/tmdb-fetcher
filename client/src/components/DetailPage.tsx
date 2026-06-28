import React from 'react';
import { useParams } from 'react-router-dom';
import MovieDetailView from './MovieDetailView';
import TvDetailView from './TvDetailView';
import { DetailContainer } from './DetailContainer';

const DetailPage: React.FC = () => {
    const { mediaType, id } = useParams<{ mediaType: string; id: string }>();

    if (!id || (mediaType !== 'movie' && mediaType !== 'tv')) {
        return (
            <div className="min-h-screen bg-gray-900 text-white p-4 flex items-center justify-center">
                <p className="text-xl text-gray-400">Invalid URL parameters.</p>
            </div>
        );
    }

    const numericId = parseInt(id, 10);

    return (
        <DetailContainer>
            {mediaType === 'movie' ? (
                <MovieDetailView id={numericId} />
            ) : (
                <TvDetailView id={numericId} />
            )}
        </DetailContainer>
    );
};

export default DetailPage;