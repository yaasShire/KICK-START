//
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import AccountScreen from './_main';
import EditProfileScreen from './editProfile';
import FavouriteScreen from './Favourites';
import ChangePassword from './changePassword';
import PrivacyAndPolicy from './privacyAndPolicy';
import Support from './support';
//
const Stack = createNativeStackNavigator();
//
const AccountStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Account" component={AccountScreen} />
            {/* <Stack.Screen name="Favourites" component={FavouriteScreen} /> */}
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="PrivacyAndPolicy" component={PrivacyAndPolicy} options={{ headerShown: true, title: "Privacy and Policy" }} />
            <Stack.Screen name="Support" component={Support} options={{ headerShown: true, title: "Support" }} />
        </Stack.Navigator>
    )
}
//
export default AccountStack;
//