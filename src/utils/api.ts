import type { TMDBDiscoverResponse, MediaDetail } from './types';

export const API_KEY = process.env.REACT_APP_API_KEY;
export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const POSTER_BASE_URL = process.env.REACT_APP_POSTER_BASE_URL;

export const fetchMediaDetails = async (
  mediaType: "movie" | "tv",
  id: number
): Promise<MediaDetail> => {
  if (!API_KEY || !BASE_URL || !POSTER_BASE_URL) {
    throw new Error('Missing required environment variables');
  }

  const url = `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,videos`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch item details");
  const data = await response.json();

  return {
    id: data.id,
    title: data.title || data.name || '',
    name: data.name || data.title || '',
    originalTitle: data.original_title || data.original_name || '',
    originalLanguage: data.original_language || '',
    tagline: data.tagline || '',
    overview: data.overview || '',
    rating: data.vote_average || 0,
    voteCount: data.vote_count || 0,
    releaseDate: data.release_date || data.first_air_date || '',
    firstAirDate: data.first_air_date || '',
    posterPath: data.poster_path ? `${POSTER_BASE_URL}${data.poster_path}` : null,
    backdropPath: data.backdrop_path ? `${POSTER_BASE_URL}${data.backdrop_path}` : null,
    mediaType,
    runtime: data.runtime || null,
    episodeRunTime: Array.isArray(data.episode_run_time) && data.episode_run_time.length > 0 ? data.episode_run_time[0] : null,
    numberOfEpisodes: data.number_of_episodes || null,
    numberOfSeasons: data.number_of_seasons || null,
    seasons: Array.isArray(data.seasons)
      ? data.seasons.map((season: any) => ({
        id: season.id,
        name: season.name || '',
        season_number: season.season_number,
        episode_count: season.episode_count || 0,
        air_date: season.air_date || '',
        poster_path: season.poster_path ? `${POSTER_BASE_URL}${season.poster_path}` : null,
        overview: season.overview || '',
      }))
      : [],
    genres: data.genres || [],
    homepage: data.homepage || '',
    status: data.status || '',
    budget: data.budget || null,
    revenue: data.revenue || null,
    productionCompanies: Array.isArray(data.production_companies)
      ? data.production_companies.map((company: any) => ({
        id: company.id,
        logoPath: company.logo_path ? `${POSTER_BASE_URL}${company.logo_path}` : null,
        name: company.name || '',
        originCountry: company.origin_country || '',
      }))
      : [],
    productionCountries: Array.isArray(data.production_countries)
      ? data.production_countries.map((country: any) => ({
        iso_3166_1: country.iso_3166_1 || '',
        name: country.name || '',
      }))
      : [],
    spokenLanguages: Array.isArray(data.spoken_languages)
      ? data.spoken_languages.map((language: any) => ({
        englishName: language.english_name || '',
        iso639_1: language.iso_639_1 || '',
        name: language.name || '',
      }))
      : [],
    credits: data.credits ? {
      cast: data.credits.cast.map((c: any) => ({
        id: c.id,
        name: c.name,
        character: c.character,
        profile_path: c.profile_path ? `${POSTER_BASE_URL}${c.profile_path}` : null,
      })),
      crew: data.credits.crew.map((c: any) => ({
        id: c.id,
        name: c.name,
        job: c.job,
        department: c.department,
      })),
    } : undefined,
  };
};

export const fetchTMDBData = async (
  mediaType: "movie" | "tv",
  year?: number
): Promise<TMDBDiscoverResponse> => {
  const missingVars = [
    !API_KEY ? 'REACT_APP_API_KEY' : null,
    !BASE_URL ? 'REACT_APP_BASE_URL' : null,
    !POSTER_BASE_URL ? 'REACT_APP_POSTER_BASE_URL' : null,
  ].filter(Boolean) as string[];

  if (missingVars.length > 0) {
    throw new Error(`Missing env var(s): ${missingVars.join(', ')}`);
  }

  const yearParam = year
    ? `&${mediaType === "movie" ? "primary_release_year" : "first_air_date_year"}=${year}` : "";
  const url = `${BASE_URL}/discover/${mediaType}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1${yearParam}&with_original_language=en`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch data");
  const data = await response.json();
  return data as TMDBDiscoverResponse;
};

export const fetchSeasonDetails = async (seriesId: number, seasonNumber: number) => {
  if (!API_KEY || !BASE_URL) {
    throw new Error('Missing required environment variables');
  }

  const url = `${BASE_URL}/tv/${seriesId}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch season details');
  }

  return response.json();
};

export const fetchEpisodeDetails = async (
  seriesId: number,
  seasonNumber: number,
  episodeNumber: number
) => {
  if (!API_KEY || !BASE_URL) throw new Error('Missing environment variables');

  const url = `${BASE_URL}/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${API_KEY}&language=en-US`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch episode details');

  return response.json();
};

export const fetchPersonDetails = async (personId: number) => {
  if (!API_KEY || !BASE_URL) {
    throw new Error('Missing environment variables');
  }

  const url = `${BASE_URL}/person/${personId}?api_key=${API_KEY}&language=en-US`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch person details');
  }

  return response.json();
};