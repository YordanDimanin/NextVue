import axios from 'axios';
import type { Movie } from '../types';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function searchActor(name: string) {
  const res = await axios.get(`${BASE_URL}/search/person?api_key=${API_KEY}&query=${encodeURIComponent(name)}`);
  return res.data.results;
}

interface DiscoverMoviesOptions {
  castId?: number;
  genreIds?: number[];
  originalLanguage?: string; // "all" = ignore
  translatedOnly?: boolean;
  sortBy?: string;
  page?: number;
  uiLanguage?: string;
}

export async function discoverMovies({
  castId,
  genreIds,
  originalLanguage,
  translatedOnly = false,
  sortBy = 'popularity.desc',
  page = 1,
  uiLanguage = 'en-US',
}: DiscoverMoviesOptions) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    sort_by: sortBy,
    page: page.toString(),
    'release_date.lte': new Date().toISOString().split('T')[0],
    language: uiLanguage,
  });

  if (castId) params.append('with_cast', castId.toString());
  if (genreIds?.length) params.append('with_genres', genreIds.join(','));
  if (originalLanguage && originalLanguage !== 'all') {
    params.append('with_original_language', originalLanguage);
  }

  const res = await axios.get(`${BASE_URL}/discover/movie?${params.toString()}`);
  let movies: Movie[] = res.data.results;

  // Apply translated-only filter if needed
  if (translatedOnly) {
    movies = await filterTranslatedMovies(movies, uiLanguage);
  }

  return {
    results: movies,
    totalPages: res.data.total_pages,
  };
}

interface Translation {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  english_name: string;
  data: {
    title: string;
    overview: string;
    homepage: string;
  };
}

export async function fetchMovieTranslations(movieId: number) {
  const res = await axios.get(`${BASE_URL}/movie/${movieId}/translations?api_key=${API_KEY}`);
  return res.data.translations;
}

/**
 * Filters movies that are either:
 * 1) Already in the UI language
 * 2) Have a translation in the UI language
 */
export async function filterTranslatedMovies(movies: Movie[], uiLanguage: string): Promise<Movie[]> {
  const translatedMovies: Movie[] = [];

  const moviePromises = movies.map(async (movie) => {
    // Already in UI language -> keep it
    if (movie.original_language === uiLanguage.split('-')[0]) {
      return movie;
    }

    try {
      const translations: Translation[] = await fetchMovieTranslations(movie.id);
      const hasTranslation = translations.some(tr => tr.iso_639_1 === uiLanguage.split('-')[0]);
      if (hasTranslation) return movie;
    } catch (error) {
      console.error(`Error fetching translations for movie ${movie.id}:`, error);
    }
    return null;
  });

  const results = await Promise.all(moviePromises);
  return results.filter(Boolean) as Movie[];
}

export const fetchMovieDetailsWithCast = async (movieId: number, language: string = "en-US") => {
  const tmdbLang = language.split('-')[0];
  const movieDetailsRes = await axios.get(
    `${BASE_URL}/movie/${movieId}`,
    { params: { api_key: API_KEY, language: tmdbLang } }
  );

  const movieCreditsRes = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits`,
    { params: { api_key: API_KEY, language: tmdbLang } }
  );

  return {
    details: movieDetailsRes.data,
    cast: movieCreditsRes.data.cast,
  };
};