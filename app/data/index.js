//
export const nearByFutsalsData = [
    { id: 1, futsalName: "Village Futsal", address: "Mogadishu/Hodan", price: "$15", distance: "1km", campacity: "5 vs 5", imageUrl: require('../../assets/images/Futsals/futsal1.jpeg') },
    { id: 2, futsalName: "City Cafe Futsal", address: "Mogadishu/Hodan", price: "$20", distance: "2km", campacity: "6 vs 6", imageUrl: require('../../assets/images/Futsals/futsal2.jpeg') },
    { id: 3, futsalName: "SYL Futsal", address: "Mogadishu/Hodan", price: "$12", distance: "3km", campacity: "4 vs 4", imageUrl: require('../../assets/images/Futsals/futsal3.jpeg') },
    { id: 4, futsalName: "Sahafi Futsal", address: "Mogadishu/Hodan", price: "$8", distance: "1km", campacity: "3 vs 3", imageUrl: require('../../assets/images/Futsals/futsal4.jpeg') },
]
//
export const bookedFutsalsData = [
    { id: 1, futsalName: "Village Futsal", address: "Mogadishu/Hodan", price: "$15", distance: "1km", campacity: "5 vs 5", courtName: "Court One", imageUrl: require('../../assets/images/Futsals/futsal1.jpeg') },
    { id: 2, futsalName: "City Cafe Futsal", address: "Mogadishu/Hodan", price: "$20", distance: "2km", campacity: "6 vs 6", courtName: "Court One", imageUrl: require('../../assets/images/Futsals/futsal2.jpeg') },
    { id: 3, futsalName: "SYL Futsal", address: "Mogadishu/Hodan", price: "$12", distance: "3km", campacity: "4 vs 4", courtName: "Court One", imageUrl: require('../../assets/images/Futsals/futsal3.jpeg') },
    { id: 4, futsalName: "Sahafi Futsal", address: "Mogadishu/Hodan", price: "$8", distance: "1km", campacity: "3 vs 3", courtName: "Court One", imageUrl: require('../../assets/images/Futsals/futsal4.jpeg') },
]
//
export const notifigations = [
    {
        id: 1,
        title: 'Marshyangdi Fustal',
        description: 'has accept your booking request. See you there!',
        dateAndTime: '2 mins ago'
    },
    {
        id: 2,
        title: 'Hurry up!!',
        description: 'You can get 20% off on your bookings this weekend. Just 2 days left!',
        dateAndTime: '2 mins ago'
    },
    {
        id: 3,
        title: 'Hawa Futsal',
        description: 'You can get 20% off on your bookings this weekend. Just 2 days left!',
        dateAndTime: '2 mins ago'
    },
]
//
export const amenities = [
    { id: 1, amenityName: "Free wifi", imageUrl: require('../../assets/images/amenties/wifi.png') },
    { id: 2, amenityName: "Shower", imageUrl: require('../../assets/images/amenties/shower.png') },
    { id: 3, amenityName: "Changing Room", imageUrl: require('../../assets/images/amenties/changingRoom.png') },
    { id: 4, amenityName: "Cafeteria", imageUrl: require('../../assets/images/amenties/cafeteria.png') },
    { id: 5, amenityName: "Parking", imageUrl: require('../../assets/images/amenties/parking.png') },
    { id: 6, amenityName: "Seating", imageUrl: require('../../assets/images/amenties/seating.png') },
    { id: 7, amenityName: "PlayStation", imageUrl: require('../../assets/images/amenties/ps.png') },
    { id: 8, amenityName: "Sports Shop", imageUrl: require('../../assets/images/amenties/sportShop.png') },
    { id: 9, amenityName: "GYM", imageUrl: require('../../assets/images/amenties/gym.png') },
]

export const daysOfTheWeek = [
    { id: '1', day: 'Saturday' },
    { id: '2', day: 'Sunday' },
    { id: '3', day: 'Monday' },
    { id: '4', day: 'Tuesday' },
    { id: '5', day: 'Wednesday' },
    { id: '6', day: 'Thursday' },
    { id: '7', day: 'Friday' },
]

export const TimeSlot = [
    { id: 1, time: "6:00 AM - 7:00 AM", status: "unAvailable", price: 8 },
    { id: 2, time: "7:00 AM - 8:00 AM", status: "available", price: 6 },
    { id: 3, time: "4:00 PM - 5:00 PM", status: "available", price: 10 },
    { id: 4, time: "5:00 PM - 6:00 PM", status: "unAvailable", price: 15 },
    { id: 5, time: "7:00 PM - 8:00 PM", status: "available", price: 20 },
    { id: 6, time: "8:00 PM - 9:00 PM", status: "available", price: 20 },
    { id: 7, time: "9:00 PM - 10:00 PM", status: "unAvailable", price: 15 },
    { id: 8, time: "10:00 PM - 11:00 PM", status: "available", price: 12 },
    { id: 9, time: "11:00 PM - 12:00 PM", status: "available", price: 10 },
]

export const groundCampacity = [
    { id: 1, capacity: "3" },
    { id: 2, capacity: "4" },
    { id: 3, capacity: "5" },
    { id: 4, capacity: "6" },
    { id: 5, capacity: "7" },
    { id: 6, capacity: "8" },
    { id: 7, capacity: "9" },
    { id: 8, capacity: "10" },
    { id: 9, capacity: "11" },
]