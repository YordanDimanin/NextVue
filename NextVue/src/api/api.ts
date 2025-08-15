import axios from 'axios';
import type { Movie, FetchMoviesParams } from '../types';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE = 'https://api.themoviedb.org/3';

export const fetchMovies = async ({
  genre,
  filter,
  uiLanguage,
  actorIds = [],
  page = 1,
  movieLanguage,
  translatedOnly = false,
}: FetchMoviesParams): Promise<{ movies: Movie[]; totalPages: number; totalResults: number }> => {

  // 1️⃣ Fetch movies by original language and other filters
  const params: any = {
    api_key: TMDB_API_KEY,
    language: uiLanguage, // The UI language to return translated fields
    sort_by: filter || 'popularity.desc',
    page,
    with_original_language: movieLanguage, // Original language filter
    with_genres: genre || undefined,
    with_cast: actorIds.length > 0 ? actorIds.join(',') : undefined,
  };

  const response = await axios.get(`${TMDB_BASE}/discover/movie`, { params });
  let movies: Movie[] = response.data.results;
  const totalPages = response.data.total_pages;
  const totalResults = response.data.total_results;

  // 2️⃣ Filter movies that are translated to UI language
  if (translatedOnly) {
    const langCode = uiLanguage.split('-')[0].toLowerCase(); // e.g., 'en', 'bg'

    const translatedMovies: Movie[] = [];

    for (const movie of movies) {
      try {
        const transRes = await axios.get(`${TMDB_BASE}/movie/${movie.id}/translations`, {
          params: { api_key: TMDB_API_KEY },
        });

        const hasTranslation = transRes.data.translations.some(
          (t: any) => t.iso_639_1.toLowerCase() === langCode
        );

        if (hasTranslation) translatedMovies.push(movie);
      } catch (err) {
        console.error(`Failed to fetch translations for movie ${movie.id}`, err);
      }
    }

    movies = translatedMovies;
  }

  return { movies, totalPages, totalResults };
};

export const fetchMovieDetailsWithCast = async (movieId: number, language: string = "en-US") => {
  const tmdbLang = language.split('-')[0]; // Normalize to 2-letter code
  const movieDetailsRes = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      params: {
        api_key: TMDB_API_KEY,
        language: tmdbLang, // Use normalized language
      },
    }
  );

  const movieCreditsRes = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    {
      params: {
        api_key: TMDB_API_KEY,
        language: tmdbLang, // Use normalized language
      },
    }
  );

  return {
    details: movieDetailsRes.data,
    cast: movieCreditsRes.data.cast,
  };
};