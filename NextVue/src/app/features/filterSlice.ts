import { createSlice } from "@reduxjs/toolkit";

interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
}

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        filter: "popularity.desc",
        actors: [] as Actor[], // Initialize actors array
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        addActor: (state, action) => {
            state.actors.push(action.payload);
        },
        removeActor: (state, action) => {
            state.actors = state.actors.filter(actor => actor.id !== action.payload);
        },
    },
});

export const { setFilter, addActor, removeActor } = filterSlice.actions;
export default filterSlice.reducer;