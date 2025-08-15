export interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  // Add other properties as needed based on TMDB API response
}

export interface FetchMoviesParams {
  genre?: string;
  filter?: string;
  uiLanguage: string; // Selected UI language
  actorIds?: number[];
  page?: number;
  movieLanguage?: string; // Original language filter, e.g., 'ar'
  translatedOnly?: boolean; // Whether to filter only translated movies
}
