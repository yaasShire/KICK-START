//
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Reports from './mainReport';
// Screens
//
const Stack = createNativeStackNavigator();
//
const ProviderReportStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Reports" component={Reports} />
        </Stack.Navigator>
    )
}
//
export default ProviderReportStack;
//