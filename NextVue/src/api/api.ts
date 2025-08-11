import axios from 'axios';

export const fetchMovies = async (genreId: string, sortBy: string) => {
  const today = new Date().toISOString().split('T')[0];
  let allResults: any[] = [];

  for (let page = 1; page <= 10; page++) {
    const res = await axios.get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        with_genres: genreId,
        sort_by: sortBy,
        'release_date.lte': today,
        page,
      },
    });

    allResults = [...allResults, ...res.data.results];
  }

  return allResults;
};
