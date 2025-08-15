import axios from 'axios';
import type { Movie, FetchMoviesParams } from '../types';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE = 'https://api.themoviedb.org/3';

export const fetchFilteredMovies = async ({
  uiLanguage,
  originalLang,
  genre,
  translatedOnly = false,
  filterBy = 'popularity.desc',
  page = 1
}: FetchMoviesParams): Promise<{ movies: Movie[]; totalPages: number; totalResults: number }> => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  // Construct query params
  const params: any = {
    api_key: TMDB_API_KEY,
    language: uiLanguage,       // for translated titles
    sort_by: filterBy,
    page,
    'release_date.lte': today,  // exclude upcoming movies
  };

  if (originalLang && originalLang !== 'all') {
    params.with_original_language = originalLang;
  }

  if (genre) {
    params.with_genres = genre;
  }

  // For highest rated filter, ensure a minimum number of votes
  if (filterBy === 'vote_average.desc') {
    params['vote_count.gte'] = 10;
  }

  const response = await axios.get(`${TMDB_BASE}/discover/movie`, { params });
  const data = response.data;

  let movies: Movie[] = data.results;

  // Filter client-side for translated-only movies
  if (translatedOnly) {
    movies = movies.filter(m => m.title !== m.original_title);
  }

  return {
    movies: movies,
    totalPages: data.total_pages,
    totalResults: data.total_results
  };
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