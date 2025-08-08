import {configureStore} from '@reduxjs/toolkit'
import genreReducer from './features/genreSlice'

export const store = configureStore({
    reducer: {
        genre: genreReducer,
    },
})