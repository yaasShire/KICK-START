//
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import BookedFutsalsScreen from './_main';
import CancelBookingScreen from './CancelBooking';
//
const Stack = createNativeStackNavigator();
//
const BookedFutsalsStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Booked Futsals" component={BookedFutsalsScreen} />
            <Stack.Screen name="CancelBooking" component={CancelBookingScreen} />
        </Stack.Navigator>
    )
}
//
export default BookedFutsalsStack;
//