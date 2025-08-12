import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "../../types";

interface MovieState {
  list: Movie[];
  currentPage: number;
  totalPages: number;
  currentMovieIndex: number;
  seenMovieIds: string[]; // Added to track seen movies
}

const initialState: MovieState = {
  list: [],
  currentPage: 0,
  totalPages: 0,
  currentMovieIndex: 0,
  seenMovieIds: [], // Initialize seenMovieIds
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<{ movies: Movie[]; totalPages: number; page: number }>) => {
      // Shuffle the incoming movies
      const shuffledMovies = [...action.payload.movies];
      for (let i = shuffledMovies.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledMovies[i], shuffledMovies[j]] = [shuffledMovies[j], shuffledMovies[i]];
      }
      state.list = shuffledMovies;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.page;
      state.currentMovieIndex = 0; // Reset index when new page is loaded
      state.seenMovieIds = []; // Reset seen movies
    },
    nextMovie: (state) => {
      // Add the current movie to seenMovieIds before moving to the next
      if (state.currentMovieIndex < state.list.length) {
        state.seenMovieIds.push(String(state.list[state.currentMovieIndex].id));
      }

      // Find the next unseen movie
      let nextIndex = state.currentMovieIndex + 1;
      while (nextIndex < state.list.length && state.seenMovieIds.includes(String(state.list[nextIndex].id))) {
        nextIndex++;
      }
      state.currentMovieIndex = nextIndex;
    },
    resetMovieIndex: (state) => {
      state.currentMovieIndex = 0;
    },
  },
});

export const { setMovies, nextMovie, resetMovieIndex } = moviesSlice.actions;
export default moviesSlice.reducer;