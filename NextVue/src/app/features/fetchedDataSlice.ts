import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// It's good practice to define types for your state and actions.
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  [key: string]: any;
}

interface FetchedDataState {
  allMovies: Movie[];
  currentMovie: Movie | null;
}

const initialState: FetchedDataState = {
  allMovies: [],
  currentMovie: null,
};

const fetchedDataSlice = createSlice({
    name: "fetchedData",
    initialState,
    reducers: {
        setFetchedData: (state, action: PayloadAction<Movie[]>) => {
            state.allMovies = action.payload;
            // When new data is fetched, also set an initial random movie
            if (action.payload.length > 0) {
                const randomIndex = Math.floor(Math.random() * action.payload.length);
                state.currentMovie = action.payload[randomIndex];
            }
        },
        setNewRandomMovie: (state) => {
            if (state.allMovies.length > 0) {
                const randomIndex = Math.floor(Math.random() * state.allMovies.length);
                state.currentMovie = state.allMovies[randomIndex];
            }
        },
    },
});

export const { setFetchedData, setNewRandomMovie } = fetchedDataSlice.actions;
export default fetchedDataSlice.reducer;