import React, { useEffect, useState } from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//
import BottomTabNavigations from './BottomTabs';
import AuthStack from '../screens/Auth';
import OnboardingScreen from './onboarding';
//
const Stack = createNativeStackNavigator();
//
const Root = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [hasSeenOnboarding, setHasSeenOnboarding] = useState(null); // New state for onboarding status

    useEffect(() => {
        enableScreens(false);
    }, []);

    // Check if user is logged in and if onboarding has been seen
    useEffect(() => {
        const checkStatus = async () => {
            try {
                const loggedInValue = await AsyncStorage.getItem('isLoggedIn');
                const onboardingValue = await AsyncStorage.getItem('hasSeenOnboarding');
                setIsLoggedIn(loggedInValue === 'true');
                setHasSeenOnboarding(onboardingValue === 'true');
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoggedIn(false);  // Default value if fetching fails
                setHasSeenOnboarding(false); // Default value for onboarding
            }
        };
        checkStatus();
    }, []);

    // Show loading indicator while checking AsyncStorage
    if (isLoggedIn === null || hasSeenOnboarding === null) {
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Function to update onboarding status
    const completeOnboarding = async () => {
        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
        setHasSeenOnboarding(true);
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!hasSeenOnboarding && (
                    // Show onboarding screen only if user has not seen it
                    <Stack.Screen
                        name="Onboarding"
                        options={{ headerShown: false }}
                    >
                        {props => <OnboardingScreen {...props} onComplete={completeOnboarding} />}
                    </Stack.Screen>
                )
                }
                <Stack.Screen name="BottomTabNavigations" component={BottomTabNavigations} />
                <Stack.Screen name="AuthStack" component={AuthStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
//
export default Root;
