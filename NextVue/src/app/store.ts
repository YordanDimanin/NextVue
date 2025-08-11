import {configureStore} from '@reduxjs/toolkit'
import genreReducer from './features/genreSlice'
import filterReducer from './features/filterSlice'
import moviesReducer from './features/movieSlice'
import languageReducer from './features/languageSlice'

export const store = configureStore({
    reducer: {
        genre: genreReducer,
        filter: filterReducer,
        movies: moviesReducer,
        language: languageReducer
    },
})