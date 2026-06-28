// The single chokepoint for talking to TMDB. The API key never leaves
// this file, and never reaches the client in any response body.

const TMDB_BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';

export class TMDBError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'TMDBError';
  }
}

/**
 * Fetch from TMDB, injecting the API key server-side.
 * `path` should start with `/`, e.g. `/movie/123` or `/discover/tv`.
 * `searchParams` are query params EXCLUDING api_key (added automatically).
 */
export async function tmdbFetch(
  path: string,
  searchParams: Record<string, string | number | undefined> = {}
): Promise<any> {
  const url = new URL(`${TMDB_BASE_URL}${path}`);
  url.searchParams.set('api_key', process.env.TMDB_API_KEY as string);

  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new TMDBError(`TMDB request failed: ${response.statusText}`, response.status);
  }

  return response.json();
}
