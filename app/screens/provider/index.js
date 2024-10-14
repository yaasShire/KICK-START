//
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import ProviderLogin from './login';
import MainProvider from './main';
import SubscriptionStack from './subscription';
import MainSubscription from './subscription/main';
import RequestApproval from './subscription/requestApproval';
//
const Stack = createNativeStackNavigator();
//
const ProviderStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProviderLogin" component={ProviderLogin} />
            <Stack.Screen name="MainProvider" component={MainProvider} />
            <Stack.Screen name="MainSubscription" component={MainSubscription} options={{ presentation: "fullScreenModal", }} />
            <Stack.Screen name="RequestApproval" component={RequestApproval} options={{ presentation: "fullScreenModal", }} />
        </Stack.Navigator>
    )
}
//
export default ProviderStack;
//