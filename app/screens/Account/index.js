//
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import AccountScreen from './_main';
import EditProfileScreen from './editProfile';
import FavouriteScreen from './Favourites';
//
const Stack = createNativeStackNavigator();
//
const AccountStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="Favourites" component={FavouriteScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
    )
}
//
export default AccountStack;
//