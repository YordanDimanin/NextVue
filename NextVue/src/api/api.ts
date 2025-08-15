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
  translatedOnly?: boolean; // This will be handled outside discoverMovies
  sortBy?: string;
  page?: number;
  uiLanguage?: string;
}

export async function discoverMovies({
  castId,
  genreIds,
  originalLanguage,
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
  const data = res.data;

  return {
    results: data.results,
    totalPages: data.total_pages,
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

export async function filterTranslatedMovies(movies: Movie[], uiLanguage: string): Promise<Movie[]> {
  const translatedMovies: Movie[] = [];
  for (const movie of movies) {
    try {
      const translations: Translation[] = await fetchMovieTranslations(movie.id);
      const hasTranslation = translations.some((tr: Translation) => tr.iso_639_1 === uiLanguage);

      if (hasTranslation || movie.original_language === uiLanguage) {
        translatedMovies.push(movie);
      }
    } catch (error) {
      console.error(`Error fetching translations for movie ${movie.id}:`, error);
    }
  }
  return translatedMovies;
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