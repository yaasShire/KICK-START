//
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MatchesMain from './main';
// Screens
//
const Stack = createNativeStackNavigator();
//
const ProviderMatchesStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MatchesMain" component={MatchesMain} />
        </Stack.Navigator>
    )
}
//
export default ProviderMatchesStack;
//