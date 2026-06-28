import { Router, Request, Response } from 'express';
import { tmdbFetch, TMDBError } from '../tmdb';

const router = Router();

// GET /api/discover/:mediaType?searchQuery=&year=&minRating=&sortBy=
router.get('/:mediaType', async (req: Request, res: Response) => {
  const { mediaType } = req.params;

  if (mediaType !== 'movie' && mediaType !== 'tv') {
    return res.status(400).json({ error: 'mediaType must be "movie" or "tv"' });
  }

  const { searchQuery, year, minRating, sortBy } = req.query;

  try {
    let data;

    if (searchQuery) {
      const yearKey = mediaType === 'movie' ? 'primary_release_year' : 'first_air_date_year';
      data = await tmdbFetch(`/search/${mediaType}`, {
        language: 'en-US',
        query: searchQuery as string,
        page: 1,
        include_adult: 'false',
        [yearKey]: year as string | undefined,
      });
    } else {
      data = await tmdbFetch(`/discover/${mediaType}`, {
        language: 'en-US',
        sort_by: (sortBy as string) || 'popularity.desc',
        include_adult: 'false',
        include_video: 'false',
        page: 1,
        with_original_language: 'en',
        primary_release_year: mediaType === 'movie' ? (year as string | undefined) : undefined,
        first_air_date_year: mediaType === 'tv' ? (year as string | undefined) : undefined,
        'vote_average.gte': minRating as string | undefined,
      });
    }

    res.json(data);
  } catch (err) {
    const status = err instanceof TMDBError ? err.status : 500;
    res.status(status).json({ error: 'Failed to fetch discover data' });
  }
});

export default router;
