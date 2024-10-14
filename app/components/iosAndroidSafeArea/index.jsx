import { View, Text, Platform, SafeAreaView } from 'react-native'
import React from 'react'
import { SafeAreaView as SafeAreaViewAndroidView } from 'react-native-safe-area-context';


const IosAndroidSafeArea = () => {
    return (
        <>
            {
                Platform.OS == 'android' ?
                    <SafeAreaViewAndroidView />
                    : <SafeAreaView />
            }
        </>
    )
}

export default IosAndroidSafeArea