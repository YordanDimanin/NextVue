import axios from "axios";
import type { Movie, Params } from '../types';

export const fetchMovies = async (
  genreId: string,
  sortBy: string,
  language: string = "en-US",
  actorIds: number[] = []
) => {
  const today = new Date().toISOString().split("T")[0];
  let allResults: Movie[] = [];

  for (let page = 1; page <= 10; page++) {
    const params: Params = {
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      with_genres: genreId,
      sort_by: sortBy,
      "release_date.lte": today,
      language,
      page,
    };

    if (actorIds.length > 0) {
      params.with_people = actorIds.join(",");
    }

    const res = await axios.get("https://api.themoviedb.org/3/discover/movie", {
      params,
    });

    allResults = [...allResults, ...res.data.results];
  }

  // Filter out movies missing title or overview in selected language
  const filteredResults = allResults.filter(
    (movie: Movie) =>
      movie.title &&
      movie.overview &&
      movie.title.trim() !== "" &&
      movie.overview.trim() !== ""
  );

  return filteredResults;
};

export const fetchMovieDetailsWithCast = async (movieId: number) => {
  const movieDetailsRes = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
      },
    }
  );

  const movieCreditsRes = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
      },
    }
  );

  return {
    details: movieDetailsRes.data,
    cast: movieCreditsRes.data.cast,
  };
};
