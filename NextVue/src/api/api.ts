import axios from "axios";

export const fetchMovies = async (
  genreId: string,
  sortBy: string,
  language: string = "en-US",
  actorIds: number[] = []
) => {
  const today = new Date().toISOString().split("T")[0];
  let allResults: any[] = [];

  for (let page = 1; page <= 10; page++) {
    const params: any = {
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
    (movie) =>
      movie.title &&
      movie.overview &&
      movie.title.trim() !== "" &&
      movie.overview.trim() !== ""
  );

  return filteredResults;
};
