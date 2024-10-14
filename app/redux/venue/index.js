import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    venueRegistration: {
        basicVenueData: {},
        venueAddress: {},
        venueMap: {},
        venueImages: [],
        facilities: [],
        regions: [],
        city: [],
        coordinate: {
            latitude: "", // Initial latitude (e.g., Mogadishu)
            longitude: ""
        }
    },
    courtRegistration: {
        basicCourtData: {},
        dimensitions: {}
    },
    timeSlotUpdateData: {},
    report: {
        venues: []
    }
}

export const venueSlice = createSlice({
    name: 'venueSlice',
    initialState,
    reducers: {
        addBasicVenueData: (state, action) => {
            state.venueRegistration.basicVenueData = action.payload
        },
        addVenueAddress: (state, action) => {
            state.venueRegistration.venueAddress = action.payload
        },
        addVenueMap: (state, action) => {
            state.venueRegistration.venueMap = action.payload
        },
        addVenueImages: (state, action) => {
            state.venueRegistration.venueImages.push(...action.payload)
            // state.venueRegistration.venueImages = action.payload
        },
        removeVenueImage: (state, action) => {
            state.venueRegistration.venueImages = action.payload
            // state.venueRegistration.venueImages = action.payload
        },
        addFacility: (state, action) => {
            state.venueRegistration.facilities.push(action.payload)
        },
        removeFacility: (state, action) => {
            state.venueRegistration.facilities = action.payload
        },
        addRegion: (state, action) => {
            state.venueRegistration.regions.push(action.payload)
        },
        removeRegion: (state, action) => {
            state.venueRegistration.regions = action.payload
        },
        addCity: (state, action) => {
            state.venueRegistration.city.push(action.payload)
        },
        removeCity: (state, action) => {
            state.venueRegistration.city = action.payload
        },
        addVenue: (state, action) => {
            state.report.venues.push(action.payload)
        },
        removeVenue: (state, action) => {
            state.report.venues = action.payload
        },
        addBasicCourtData: (state, action) => {
            state.courtRegistration.basicCourtData = action.payload
        },
        addCourtDimensions: (state, action) => {
            state.courtRegistration.dimensitions = action.payload
        },
        addTimeSlotUpdateData: (state, action) => {
            state.timeSlotUpdateData = action.payload
        },
        addCoordinate: (state, action) => {
            state.venueRegistration.coordinate = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { addBasicVenueData, addRegion, addCity, addCoordinate, removeCity, addVenue, removeVenue, removeRegion, addVenueAddress, addVenueMap, addVenueImages, removeVenueImage, removeFacility, addFacility, addBasicCourtData, addCourtDimensions, addTimeSlotUpdateData } = venueSlice.actions

export default venueSlice.reducer