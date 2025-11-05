import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import App from '../../App'
import WellnessDetailsScreen from '../screens/WellnessDetailsScreen'

const RootStackNavigator = () => {
  
const RootStack = createStackNavigator();

  return (
    <RootStack.Navigator>
      <RootStack.Screen name="home" component={App} />
      <RootStack.Screen name="wellnessDetails" component={WellnessDetailsScreen} />
    </RootStack.Navigator>
  )
}

export default RootStackNavigator