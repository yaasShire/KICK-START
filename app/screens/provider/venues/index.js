//
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainVenue from './main';
import VenueDetail from './venueDetail';
// Screens
//
const Stack = createNativeStackNavigator();
//
const ProviderVenueStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainVenue" component={MainVenue} />
            <Stack.Screen name="VenueDetail" component={VenueDetail} />
        </Stack.Navigator>
    )
}
//
export default ProviderVenueStack;
//