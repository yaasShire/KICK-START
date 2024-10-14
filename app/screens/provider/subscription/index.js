import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainSubscription from './main'

const SubscriptionStack = () => {
    const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator>
        <Stack.Screen name='MainSubscription' component={MainSubscription} />
      <Text>SubscriptionStack</Text>
    </Stack.Navigator>
  )
}

export default SubscriptionStack