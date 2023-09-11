//
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import FutsalsScreen from './_main';
import FilteringScreen from './Filter';
import SearchingScreen from './Search';
import DetailsScreen from './Details';
import BookingDetailsScreen from './BookingDetails'
//
const Stack = createNativeStackNavigator();
//
const FutsalsStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Futsals" component={FutsalsScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Filtering" component={FilteringScreen} />
            <Stack.Screen name="Searching" component={SearchingScreen} />
            <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
        </Stack.Navigator>
    )
}
//
export default FutsalsStack;
//