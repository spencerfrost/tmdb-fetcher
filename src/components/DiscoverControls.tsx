import React from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ToggleGroup } from './ui/ToggleGroup';

interface DiscoverControlsProps {
  mediaType: 'movie' | 'tv';
  setMediaType: (type: 'movie' | 'tv') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fetchByYear: boolean;
  setFetchByYear: (fetch: boolean) => void;
  year: number;
  setYear: (year: number) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  onSearch: () => void;
  loading: boolean;
}

export const DiscoverControls: React.FC<DiscoverControlsProps> = ({
  mediaType,
  setMediaType,
  searchQuery,
  setSearchQuery,
  fetchByYear,
  setFetchByYear,
  year,
  setYear,
  minRating,
  setMinRating,
  onSearch,
  loading,
}) => {
  return (
    <div className="sticky top-4 z-20 mb-8 rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-black/30 backdrop-blur-md">
      <div className="flex flex-col gap-4">
        {/* Top Row: Media Type & Search */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Type
            </Label>
            <ToggleGroup
              options={['Movies', 'TV Shows']}
              value={mediaType === 'movie' ? 'Movies' : 'TV Shows'}
              onChange={(value) => setMediaType(value === 'Movies' ? 'movie' : 'tv')}
            />
          </div>

          <div className="flex flex-grow flex-col gap-1.5">
            <Label htmlFor="search" className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Search
            </Label>
            <Input
              id="search"
              type="text"
              placeholder="Search by title, e.g. Batman..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-slate-700 bg-slate-800/80 text-slate-100 placeholder:text-slate-500 focus-visible:ring-amber-500/40 focus-visible:border-amber-500/60"
            />
          </div>

          <Button
            onClick={onSearch}
            disabled={loading}
            className="w-full bg-amber-500 text-slate-950 hover:bg-amber-400 disabled:opacity-50 md:w-auto"
          >
            {loading ? 'Searching…' : 'Search'}
          </Button>
        </div>

        <div className="h-px bg-slate-800" />

        {/* Bottom Row: Filters */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="fetch-by-year"
              checked={fetchByYear}
              onCheckedChange={(checked) => setFetchByYear(checked as boolean)}
              className="border-slate-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
            />
            <Label htmlFor="fetch-by-year" className="text-sm text-slate-300">
              Year
            </Label>
            <Input
              id="year"
              type="number"
              value={year}
              disabled={!fetchByYear}
              onChange={(e) => setYear(parseInt(e.target.value, 10))}
              className="w-20 border-slate-700 bg-slate-800/80 font-mono text-sm text-slate-100 disabled:opacity-40"
            />
          </div>

          <div className="flex items-center gap-3">
            <Label htmlFor="min-rating" className="whitespace-nowrap text-sm text-slate-300">
              Min rating{' '}
              <span className="font-mono text-amber-400">{minRating.toFixed(1)}</span>
            </Label>
            <Input
              id="min-rating"
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={minRating}
              disabled={!!searchQuery}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
              className="w-32 accent-amber-500 disabled:opacity-40"
            />
          </div>

          {searchQuery && (
            <p className="text-xs text-slate-500">
              Rating filter is disabled while searching by title
            </p>
          )}
        </div>
      </div>
    </div>
  );
};