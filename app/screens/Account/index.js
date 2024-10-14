//
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import AccountScreen from './_main';
import EditProfileScreen from './editProfile';
import FavouriteScreen from './Favourites';
import ChangePassword from './changePassword';
import Support from './support';
import PrivacyAndPolicy from './privacyAndPolicy';
//
const Stack = createNativeStackNavigator();
//
const AccountStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="Favourites" component={FavouriteScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="Support" component={Support} options={{ headerShown: true }} />
            <Stack.Screen name="Privacy And Policy" component={PrivacyAndPolicy} options={{ headerShown: true, }} />
        </Stack.Navigator>
    )
}
//
export default AccountStack;
//