import axios from 'axios';

export const fetchMovies = async (genreId: string, sortBy: string): Promise<any[]> => {
  const allMovies: any[] = [];

  const today = new Date().toISOString().split("T")[0];

  for (let page = 1; page <= 5; page++) {
    const res = await axios.get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        with_genres: genreId,
        sort_by: sortBy,
        "release_date.lte": today,
        page,
      },
    });

    allMovies.push(...res.data.results);
  }

  console.log(allMovies)

  return allMovies.slice(0, 150); // just in case
};
