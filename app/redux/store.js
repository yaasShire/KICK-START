import { configureStore } from '@reduxjs/toolkit'
import venueSlice from './venue'
import homeSlice from './homeSlice'
import authSlice from './auth'
export const store = configureStore({
    reducer: {
        venueSlice,
        homeSlice,
        authSlice
    }
})