import { Router, Request, Response } from 'express';
import { tmdbFetch, TMDBError } from '../tmdb';

const router = Router();

// GET /api/person/:id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const data = await tmdbFetch(`/person/${id}`, {
      language: 'en-US',
      append_to_response: 'combined_credits',
    });
    res.json(data);
  } catch (err) {
    const status = err instanceof TMDBError ? err.status : 500;
    res.status(status).json({ error: 'Failed to fetch person details' });
  }
});

export default router;
