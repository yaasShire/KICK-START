//
import React from 'react';
import { COLORS } from '../../../../theme/globalStyle';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Icons
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//

import { Platform } from 'react-native';
import ProviderHomeStack from '../../home';
import ProviderVenueStack from '../../venues';
import ProviderOrderStack from '../../orders';
import ProviderMatchesStack from '../../matches';
import AccountStack from '../../Account';
import ProviderReportStack from '../../reports';
import { Octicons } from '@expo/vector-icons';

//
const Tab = createBottomTabNavigator();
//
const ProvierBottomTabs = () => {
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
                    height: Platform.OS === 'android' ? 70 : 90,
                    // backgroundColor: 'blue'
                },
            }}
        >
            <Tab.Screen name="HomeStack" component={ProviderHomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="ProviderOrderStack" component={ProviderOrderStack}
                options={{
                    tabBarLabel: 'Orders',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bookmarks" color={color} size={20} />
                    ),
                }}
            />
            <Tab.Screen name="ProviderVenueStack" component={ProviderVenueStack}
                options={{
                    tabBarLabel: 'Venues',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="stadium-variant" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="ProviderMatchesStack" component={ProviderMatchesStack}
                options={{
                    tabBarLabel: 'Matches',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="soccer-field" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="ProviderReportStack" component={ProviderReportStack}
                options={{
                    tabBarLabel: 'Report',
                    tabBarIcon: ({ color, size }) => (
                        <Octicons name="report" color={color} size={size} />
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
export default ProvierBottomTabs
//