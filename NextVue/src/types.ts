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
  original_title: string;
  // Add other properties as needed based on TMDB API response
}

export interface FetchMoviesParams {
  uiLanguage: string;        // e.g., 'bg' or 'en'
  originalLang?: string;      // e.g., 'ar' or 'all'
  genre?: string;            // e.g., '35' for comedy
  translatedOnly?: boolean;  // show only movies translated to UI language
  filterBy?: string;         // e.g., 'popularity.desc', 'vote_average.desc', etc.
  page?: number;
}
