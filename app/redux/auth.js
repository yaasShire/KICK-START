import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    signUp: {
        region: {},
        city: {},
        gender: {},
        dob: "2004-01-19"
    }
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        addRegion: (state, action) => {
            state.signUp.region = action.payload
        },
        addCity: (state, action) => {
            state.signUp.city = action.payload
        },
        addGender: (state, action) => {
            state.signUp.gender = action.payload
        },
        addDOB: (state, action) => {
            state.signUp.dob = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { addRegion, addCity, addGender, addDOB } = authSlice.actions

export default authSlice.reducer