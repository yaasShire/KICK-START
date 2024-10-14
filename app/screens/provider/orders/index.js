//
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrdersMain from './main';
// Screens
//
const Stack = createNativeStackNavigator();
//
const ProviderOrderStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OrdersMain" component={OrdersMain} />
        </Stack.Navigator>
    )
}
//
export default ProviderOrderStack;
//