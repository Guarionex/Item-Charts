import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import {thunk} from "redux-thunk"

export const store = configureStore({
    reducer: {
        products: productReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
