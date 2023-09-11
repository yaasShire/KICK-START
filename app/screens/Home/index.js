//
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import HomeScreen from './main';
import NotificationScreen from './notifications';
//
const Stack = createNativeStackNavigator();
//
const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Notifications" component={NotificationScreen} />
        </Stack.Navigator>
    )
}
//
export default HomeStack;
//