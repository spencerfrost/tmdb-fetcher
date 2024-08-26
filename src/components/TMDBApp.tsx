import React, { useEffect, useState } from 'react';

import { fetchTMDBData, POSTER_BASE_URL } from '../utils/api';
import { Item } from '../utils/types';
import ItemCard from './ItemCard';

import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ToggleGroup } from './ui/ToggleGroup';

export const TMDBApp: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');
  const [fetchByYear, setFetchByYear] = useState<boolean>(false);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    fetchData();
  }, [year, mediaType, fetchByYear]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTMDBData(mediaType, fetchByYear ? year : undefined);
      
      const processedData: Item[] = data.results
        .filter((item: any) => {
          const releaseDate = new Date(item.release_date || item.first_air_date);
          return !fetchByYear || releaseDate.getFullYear() === year;
        })
        .map((item: any) => ({
          id: item.id,
          title: item.title || item.name,
          rating: item.vote_average,
          releaseDate: item.release_date || item.first_air_date,
          posterPath: item.poster_path ? `${POSTER_BASE_URL}${item.poster_path}` : null,
          mediaType
        }));

      const sortedData = processedData.sort((a, b) => b.rating - a.rating);
      
      setItems(sortedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">TMDB Movie/TV Show Fetcher</h1>
      <div className="mb-6">
        <div className="flex flex-wrap items-center space-x-4 mb-4">
          <ToggleGroup
            options={['Movies', 'TV Shows']}
            value={mediaType === 'movie' ? 'Movies' : 'TV Shows'}
            onChange={(value) => setMediaType(value === 'Movies' ? 'movie' : 'tv')}
          />
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="year">Year:</Label>
            <Input
              id="year"
              type="number"
              value={year}
              onChange={(e) => handleYearChange(parseInt(e.target.value))}
              className="w-20"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="fetch-by-year"
              checked={fetchByYear}
              onCheckedChange={() => setFetchByYear(!fetchByYear)}
            />
            <Label htmlFor="fetch-by-year">Fetch by Year</Label>
          </div>
          
          <Button onClick={fetchData} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Data'}
          </Button>
        </div>
        
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <ItemCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};