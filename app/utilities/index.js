import { Platform } from "react-native";
import { COLORS } from "../theme/globalStyle";

//
const getStatusThemeBasedOnRoute = (routeObj, screenName) => {
    return {
        barStyle: routeObj.name === screenName ? "light-content" : "dark-content",
        backgroundColor: routeObj.name === screenName ? COLORS.primary_color : COLORS.bg_primary
    }
};

// 
export const textShortner = (text, maximumSize = 16) => {
    return text?.length > maximumSize ? text?.slice(0, maximumSize) + '...' : text
}
// 


// Function to calculate distance between two coordinates using Haversine formula
export const calculateDistance = (userLatitude, userLongitude, venueLatitude, venueLongitude) => {
    const earthRadius = 6371; // Radius of the Earth in kilometers
    const userLatInRadians = toRadians(userLatitude);
    const venueLatInRadians = toRadians(venueLatitude);
    const deltaLatInRadians = toRadians(venueLatitude - userLatitude);
    const deltaLonInRadians = toRadians(venueLongitude - userLongitude);

    const a = Math.sin(deltaLatInRadians / 2) * Math.sin(deltaLatInRadians / 2) +
        Math.cos(userLatInRadians) * Math.cos(venueLatInRadians) *
        Math.sin(deltaLonInRadians / 2) * Math.sin(deltaLonInRadians / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c; // Distance in kilometers
    return distance;
};

// Function to convert degrees to radians
const toRadians = (degrees) => {
    return degrees * Math.PI / 180;
};

export const hideBottomTabs = (getParent = () => { }) => {
    getParent().setOptions({ tabBarStyle: { display: 'none' } })
    return () => {
        getParent().setOptions({
            tabBarStyle: {
                display: 'flex',
                borderTopColor: 'rgba(0, 0, 0, .2)',
                paddingTop: Platform.OS === 'android' ? 15 : 10,
                paddingBottom: Platform.OS === 'android' ? 15 : 30,
                height: Platform.OS === 'android' ? 70 : 90,
            }
        })
    }
}


export const customStepperStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013'
}

export function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let amPm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours is 0, set it to 12

    // Add leading zero to minutes if needed
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes} ${amPm}`;
}
const extractFacilityIds = (venueFacilities) => {
    const facilityIdS = venueFacilities?.map(facility => facility?.id)
    return facilityIdS
}
export const generageVenueRegistrationData = (venueBasicData = {}, venueAddressData = {}, venueFacilities = {}, venueRegions, venueCity, venueCoordinate = {}) => {
    return {
        name: venueBasicData?.name,
        address: venueAddressData?.address,
        email: venueBasicData?.email,
        phoneNumber: venueBasicData?.phoneNumber,
        city: venueCity[0]?.name,
        description: venueBasicData?.description,
        facilityIdS: extractFacilityIds(venueFacilities),
        numberOfHoursOpen: Number(venueBasicData?.numberOfHoursOpen),
        latitude: venueCoordinate?.latitude,
        longitude: venueCoordinate?.longitude,
        openTime: formatTime(new Date(JSON.parse(venueBasicData?.openTime))),
        closeTime: formatTime(new Date(JSON.parse(venueBasicData?.closeTime))),
        regionId: venueRegions[0]?.regionId
    }
}

export const venueRegistrationFormDataGenerator = (values = {}, venueImages = []) => {
    // "images[]": venueImages
    const data = new FormData();

    const images = venueImages?.forEach((image, index) => {
        data.append(`images`, image)
    })


    const keys = Object.keys(values)
    keys.map(key => {
        data.append(key, values[key])
    })
    return data;
}