import axios from 'axios';
import type { Movie } from '../types';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function searchActor(name: string) {
  const res = await axios.get(`${BASE_URL}/search/person?api_key=${API_KEY}&query=${encodeURIComponent(name)}`);
  return res.data.results; // array of actors
}

interface DiscoverMoviesOptions {
  castId?: number;
  genreIds?: number[];
  originalLanguage?: string; // "all" = ignore
  translatedOnly?: boolean;
  sortBy?: string;
  page?: number; // Added page parameter
  uiLanguage?: string;
}

export async function discoverMovies({
  castId,
  genreIds,
  originalLanguage,
  translatedOnly,
  sortBy = 'popularity.desc',
  page = 1, // Default page to 1
  uiLanguage = 'en-US',
}: DiscoverMoviesOptions) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    sort_by: sortBy,
    page: page.toString(), // Ensure page is a string
    'release_date.lte': new Date().toISOString().split('T')[0], // only released
    language: uiLanguage,
  });

  if (castId) params.append('with_cast', castId.toString());
  if (genreIds?.length) params.append('with_genres', genreIds.join(','));
  // Only append original_language if it's not "all"
  if (originalLanguage && originalLanguage !== 'all') {
    params.append('with_original_language', originalLanguage);
  }

  const res = await axios.get(`${BASE_URL}/discover/movie?${params.toString()}`);
  const data = res.data;

  let results = data.results;

  // Only include translated movies if required and originalLanguage is not "all"
  if (translatedOnly && originalLanguage && originalLanguage !== 'all') {
    results = results.filter((movie: Movie) => movie.original_language !== originalLanguage);
  }

  return {
    results,
    totalPages: data.total_pages,
  };
}

export const fetchMovieDetailsWithCast = async (movieId: number, language: string = "en-US") => {
  const tmdbLang = language.split('-')[0];
  const movieDetailsRes = await axios.get(
    `${BASE_URL}/movie/${movieId}`,
    {
      params: {
        api_key: API_KEY,
        language: tmdbLang,
      },
    }
  );

  const movieCreditsRes = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits`,
    {
      params: {
        api_key: API_KEY,
        language: tmdbLang,
      },
    }
  );

  return {
    details: movieDetailsRes.data,
    cast: movieCreditsRes.data.cast,
  };
};