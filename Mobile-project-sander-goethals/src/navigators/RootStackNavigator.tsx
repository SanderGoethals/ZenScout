import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import App from '../../App'
import WellnessDetailsScreen from '../screens/wellness/WellnessDetailsScreen'
import { RootStackParamList } from './types'
import WellnessListScreen from '../screens/wellness/WellnessListScreen'
import DrawerNavigator from './DrawerNavigator'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RootStack = createStackNavigator<RootStackParamList>()

const RootStackNavigator = () => {

  return (
    <RootStack.Navigator>
      <RootStack.Screen name="wellnessList" component={WellnessListScreen} options={{title: "Available wellness"}}/>
      <RootStack.Screen name="wellnessDetails" component={WellnessDetailsScreen} options={{title: "Book a Wellness"}} />
      <RootStack.Screen name="menu" component={DrawerNavigator} options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  )
}

export default RootStackNavigator