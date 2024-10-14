//
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import OTPscreen from './_main';
import CreatePassword from './CreatePassword';
import VerifyForgetPassworOTP from './verifyForgetPasswordOTP';
//
const Stack = createNativeStackNavigator();
//
const OTPstack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OTP" component={OTPscreen} />
            <Stack.Screen name="verifyForgetPasswordOTP" component={VerifyForgetPassworOTP} />
            <Stack.Screen name="CreatePassword" component={CreatePassword} />
        </Stack.Navigator>
    )
}
export default OTPstack;
//