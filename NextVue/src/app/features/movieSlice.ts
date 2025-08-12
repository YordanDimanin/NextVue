import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "../../types";

interface MovieState {
  list: Movie[];
  currentPage: number;
  totalPages: number;
  currentMovieIndex: number;
  seenMovieIds: string[]; // Added to track seen movies
  totalResults: number; // New property
}

const initialState: MovieState = {
  list: [],
  currentPage: 0,
  totalPages: 0,
  currentMovieIndex: 0,
  seenMovieIds: [], // Initialize seenMovieIds
  totalResults: 0, // Initialize totalResults
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<{ movies: Movie[]; totalPages: number; page: number; totalResults: number }>) => {
      const { movies, totalPages, page, totalResults } = action.payload;

      // If it's the first page, replace the list and reset seen movies
      if (page === 1) {
        state.list = movies; // No need to shuffle here, shuffle in nextMovie if needed
        state.seenMovieIds = [];
      } else {
        // If it's a subsequent page, append new movies to the existing list
        // Filter out any movies that are already in the list to avoid duplicates
        const newMovies = movies.filter(
          (movie) => !state.list.some((existingMovie) => existingMovie.id === movie.id)
        );
        state.list = [...state.list, ...newMovies];
      }

      state.totalPages = totalPages;
      state.currentPage = page;
      state.totalResults = totalResults;

      // Reset currentMovieIndex only if it's the first page or if the current index is out of bounds
      if (page === 1 || state.currentMovieIndex >= state.list.length) {
        state.currentMovieIndex = 0;
      }
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