export const API_KEY = process.env.REACT_APP_API_KEY;
export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const POSTER_BASE_URL = process.env.REACT_APP_POSTER_BASE_URL;

export const fetchTMDBData = async (
  mediaType: "movie" | "tv",
  year?: number
): Promise<any> => {
  if (!API_KEY || !BASE_URL) {
    throw new Error("API key or Base URL not defined");
  }

  const yearParam = year
    ? `&${mediaType === "movie" ? "primary_release_year" : "first_air_date_year"}=${year}`: "";
  const url = `${BASE_URL}/discover/${mediaType}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1${yearParam}&with_original_language=en`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
};
