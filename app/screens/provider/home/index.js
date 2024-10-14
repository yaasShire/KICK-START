//
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProviderHome from './main';
// Screens
//
const Stack = createNativeStackNavigator();
//
const ProviderHomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProviderHome" component={ProviderHome} />
        </Stack.Navigator>
    )
}
//
export default ProviderHomeStack;
//