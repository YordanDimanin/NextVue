import {configureStore} from '@reduxjs/toolkit'
import genreReducer from './features/genreSlice'
import filterReducer from './features/filterSlice'

export const store = configureStore({
    reducer: {
        genre: genreReducer,
        filter: filterReducer,
    },
})