export interface Item {
  id: number;
  title: string;
  rating: number;
  releaseDate: string;
  posterPath: string | null;
  mediaType: 'movie' | 'tv';
}
