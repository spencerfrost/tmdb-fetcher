import { Router, Request, Response } from 'express';
import { tmdbFetch, TMDBError } from '../tmdb';

const router = Router();

// GET /api/media/:mediaType/:id
router.get('/:mediaType/:id', async (req: Request, res: Response) => {
  const { mediaType, id } = req.params;

  if (mediaType !== 'movie' && mediaType !== 'tv') {
    return res.status(400).json({ error: 'mediaType must be "movie" or "tv"' });
  }

  try {
    const data = await tmdbFetch(`/${mediaType}/${id}`, {
      language: 'en-US',
      append_to_response: 'credits,videos',
    });
    res.json(data);
  } catch (err) {
    const status = err instanceof TMDBError ? err.status : 500;
    res.status(status).json({ error: 'Failed to fetch media details' });
  }
});

export default router;
