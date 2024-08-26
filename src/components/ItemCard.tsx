import { Item } from '@/utils/types';
import React from 'react';
import { Card, CardContent } from './ui/card';

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const tmdbUrl = `https://www.themoviedb.org/${item.mediaType}/${item.id}`;
  const overseerrUrl = `https://jellyseerr.mrspinn.ca/${item.mediaType}/${item.id}`;

  return (
    <Card className="overflow-hidden bg-gray-800">
      <div className="flex h-full">
        <div className="w-1/3 min-w-[100px]">
          {item.posterPath ? (
            <img src={item.posterPath} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400">No Image</div>
          )}
        </div>
        <CardContent className="w-2/3 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-dark">{item.title}</h3>
            <p className="text-sm text-gray-400 mb-2">Release Date: {item.releaseDate}</p>
            <div className="flex space-x-4 mb-2">
              <a
                href={tmdbUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="View on TMDB"
              >
                <img
                  src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
                  alt="TMDB"
                  className="w-6 h-6"
                />
              </a>
              <a
                href={overseerrUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="View on Overseerr"
              >
                <img
                  src="https://overseerr.dev/_next/image?url=%2Fos_logo_filled.svg&w=48&q=75"
                  alt="Overseerr"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>
          <div className="bg-yellow-400 text-black font-bold rounded-full w-12 h-12 flex items-center justify-center self-end">
            {item.rating.toFixed(1)}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default ItemCard;