import axios from "axios";
import type { Params } from '../types';

export const fetchMovies = async (
  genreId: string,
  sortBy: string,
  displayLanguage: string = "en-US",
  actorIds: number[] = [],
  page: number = 1,
  originalLanguage?: string // New optional parameter
) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, '0');
  const formattedToday = `${year}-${month}-${day}`;

  const params: Params = {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    with_genres: genreId,
    sort_by: sortBy,
    language: displayLanguage, // Use displayLanguage here
    page,
    'primary_release_date.lte': formattedToday, // Only movies released on or before today
  };

  if (actorIds.length > 0) {
    params.with_people = actorIds.join(",");
  }

  if (originalLanguage) {
    params.with_original_language = originalLanguage;
  }

  if (actorIds.length > 0) {
    params.with_people = actorIds.join(",");
  }

  console.log('TMDB API Request - params:', params);
  console.log('TMDB API Request - displayLanguage:', displayLanguage);
  console.log('TMDB API Request - originalLanguage:', originalLanguage);

  const res = await axios.get("https://api.themoviedb.org/3/discover/movie", {
    params,
  });

  console.log('TMDB API Response - total_results:', res.data.total_results);
  return {
    movies: res.data.results,
    totalPages: res.data.total_pages,
    totalResults: res.data.total_results,
  };
};

export const fetchMovieDetailsWithCast = async (movieId: number, language: string = "en-US") => {
  const movieDetailsRes = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: language,
      },
    }
  );

  const movieCreditsRes = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: language, // Add language to credits request as well
      },
    }
  );

  return {
    details: movieDetailsRes.data,
    cast: movieCreditsRes.data.cast,
  };
};
