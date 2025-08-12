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

export interface Params {
  api_key: string;
  with_genres: string;
  sort_by: string;
  "release_date.lte": string;
  language: string;
  page: number;
  with_people?: string; // Optional, as it's only added if actorIds.length > 0
}