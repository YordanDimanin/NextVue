import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
}

interface ActorState {
  searchResults: Actor[];
  loading: boolean;
  error: string | null;
}

const initialState: ActorState = {
  searchResults: [],
  loading: false,
  error: null,
};

// Define the async thunk for searching actors
export const searchActorsByName = createAsyncThunk(
  'actor/searchActorsByName',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/person?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${query}`
      );
      return response.data.results;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const actorSlice = createSlice({
  name: 'actor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchActorsByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchActorsByName.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchActorsByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default actorSlice.reducer;
