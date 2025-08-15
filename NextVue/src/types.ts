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
  original_language: string; // Added this
  // Add other properties as needed based on TMDB API response
}