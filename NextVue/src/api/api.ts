import axios from "axios";
import type { Movie, Params } from '../types';

export const fetchMovies = async (
  genreId: string,
  sortBy: string,
  language: string = "en-US",
  actorIds: number[] = [],
  page: number = 1
) => {
  const today = new Date().toISOString().split("T")[0];

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

  let filteredResults: Movie[] = res.data.results.filter(
    (movie: Movie) =>
      movie.title &&
      movie.overview &&
      movie.title.trim() !== "" &&
      movie.overview.trim() !== ""
  );

  if (actorIds.length > 0) {
    const moviesWithAllActors: Movie[] = [];
    for (const movie of filteredResults) {
      const { cast } = await fetchMovieDetailsWithCast(movie.id);
      const castIds = cast.map((actor: any) => actor.id);
      const hasAllActors = actorIds.every((actorId) =>
        castIds.includes(actorId)
      );
      if (hasAllActors) {
        moviesWithAllActors.push(movie);
      }
    }
    filteredResults = moviesWithAllActors;
  }

  return {
    movies: filteredResults,
    totalPages: res.data.total_pages,
  };
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
