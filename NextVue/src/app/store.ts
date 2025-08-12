import {configureStore} from '@reduxjs/toolkit'
import genreReducer from './features/genreSlice'
import filterReducer from './features/filterSlice'
import moviesReducer from './features/movieSlice'
import languageReducer from './features/languageSlice'

import actorReducer from './features/actorSlice'

export const store = configureStore({
    reducer: {
        genre: genreReducer,
        filter: filterReducer,
        movies: moviesReducer,
        language: languageReducer,
        actor: actorReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;