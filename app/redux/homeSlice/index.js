import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bookingData: {
        courtId: "",
        timeSlotId: "",
        matchDate: "",
        totalPrice: 0,
        bookingType: "ONE_TIME",
        recurrenceDay: "",
        recurrenceEndDate: "",
        calculatedBookingPrice: 0,
        recurrenceDays: [],
        matchDateStart: new Date().toISOString()
    }
}

export const homeSlice = createSlice({
    name: 'homeSlice',
    initialState,
    reducers: {
        addBookingCourtId: (state, action) => {
            state.bookingData.courtId = action.payload
        },
        addBookingTimeSlotId: (state, action) => {
            state.bookingData.timeSlotId = action.payload
        },
        addMatchDate: (state, action) => {
            state.bookingData.matchDate = action.payload
        },
        addBookingTotalPrice: (state, action) => {
            state.bookingData.totalPrice = action.payload
        },
        addBookingType: (state, action) => {
            state.bookingData.bookingType = action.payload
        },
        addBookingRecurrenceDay: (state, action) => {
            state.bookingData.recurrenceDay = action.payload
        },
        addBookingRecurrenceEndDate: (state, action) => {
            state.bookingData.recurrenceEndDate = action.payload
        },
        addCalculatedBookingPrice: (state, action) => {
            state.bookingData.calculatedBookingPrice = action.payload
        },
        addRecurrenceDays: (state, action) => {
            state.bookingData.recurrenceDays.push(action.payload)
        },
        removeRecurrenceDays: (state, action) => {
            state.bookingData.recurrenceDays = action.payload
        },
        addMatchDateStart: (state, action) => {
            state.bookingData.matchDateStart = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { addBookingCourtId, addMatchDate, addRecurrenceDays, removeRecurrenceDays, addMatchDateStart, addCalculatedBookingPrice, addBookingTimeSlotId, addBookingRecurrenceEndDate, addBookingTotalPrice, addBookingType, addBookingRecurrenceDay } = homeSlice.actions

export default homeSlice.reducer