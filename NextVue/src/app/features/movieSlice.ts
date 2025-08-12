import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "../../types";

interface MovieState {
  list: Movie[];
  currentPage: number;
  totalPages: number;
  currentMovieIndex: number;
}

const initialState: MovieState = {
  list: [],
  currentPage: 0,
  totalPages: 0,
  currentMovieIndex: 0,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<{ movies: Movie[]; totalPages: number; page: number }>) => {
      state.list = action.payload.movies;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.page;
      state.currentMovieIndex = 0; // Reset index when new page is loaded
    },
    nextMovie: (state) => {
      state.currentMovieIndex += 1;
    },
    resetMovieIndex: (state) => {
      state.currentMovieIndex = 0;
    },
  },
});

export const { setMovies, nextMovie, resetMovieIndex } = moviesSlice.actions;
export default moviesSlice.reducer;