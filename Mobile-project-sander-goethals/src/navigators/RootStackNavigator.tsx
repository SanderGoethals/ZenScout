import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import App from '../../App'
import WellnessDetailsScreen from '../screens/Wellness/WellnessDetailsScreen'
import { RootStackParamList } from './types'
import WellnessListScreen from '../screens/Wellness/WellnessListScreen'

const RootStack = createStackNavigator<RootStackParamList>()

const RootStackNavigator = () => {

  return (
    <RootStack.Navigator>
      <RootStack.Screen name="wellnessList" component={WellnessListScreen} options={{title: "Available wellness"}}/>
      <RootStack.Screen name="wellnessDetails" component={WellnessDetailsScreen} options={{title: "Book a Wellness"}} />
    </RootStack.Navigator>
  )
}

export default RootStackNavigator