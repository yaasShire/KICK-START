//
import React from 'react';
import { COLORS } from '../../theme/globalStyle';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Icons
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//
import HomeStack from '../../screens/Home';
import FutsalsStack from '../../screens/Futsals';
import BookedFutsalsStack from '../../screens/BookedFutsals';
import AccountStack from '../../screens/Account';
import { Platform } from 'react-native';
import MainProvider from '../../screens/provider/login';
import ProviderLogin from '../../screens/provider/login';
import ProviderStack from '../../screens/provider';
import { AntDesign } from '@expo/vector-icons';
//
const Tab = createBottomTabNavigator();
//
const BottomTabNavigations = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeStack"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary_color,
                tabBarInactiveTintColor: COLORS.secondary_color,
                tabBarStyle: {
                    borderTopColor: 'rgba(0, 0, 0, .2)',
                    paddingTop: Platform.OS === 'android' ? 15 : 10,
                    paddingBottom: Platform.OS === 'android' ? 15 : 30,
                    height: Platform.OS === 'android' ? 80 : 90,
                    // backgroundColor: 'blue'
                },
            }}
        >
            <Tab.Screen name="HomeStack" component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="FutsalsStack" component={FutsalsStack}
                options={{
                    tabBarLabel: 'Venues',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="stadium-variant" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="ProviderStack" component={ProviderStack}
                options={{
                    tabBarLabel: 'Provider',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="plussquare" color={color} size={20} />
                    ),
                }}
            />
            <Tab.Screen name="BookedFutsalsStack" component={BookedFutsalsStack}
                options={{
                    tabBarLabel: 'Booked',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bookmarks" color={color} size={20} />
                    ),
                }}
            />
            <Tab.Screen name="AccountStack" component={AccountStack}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>

    )
}
//
export default BottomTabNavigations
//