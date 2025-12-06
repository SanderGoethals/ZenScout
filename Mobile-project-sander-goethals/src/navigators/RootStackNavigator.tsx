import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import WellnessDetailsScreen from '../screens/wellness/WellnessDetailsScreen'
import { RootStackParamList } from './types'
import WellnessListScreen from '../screens/wellness/WellnessListScreen'
import DrawerNavigator from './DrawerNavigator'

const RootStack = createStackNavigator<RootStackParamList>()

const ACTIVE_BACKGROUND_COLOR = '#FDECC8';

const RootStackNavigator = () => {

  return (
    <RootStack.Navigator 
    screenOptions={
      { headerStyle: { backgroundColor: ACTIVE_BACKGROUND_COLOR}
      }
    }
    >
      <RootStack.Screen name="menu" component={DrawerNavigator} options={{ headerShown: false }}/>
      <RootStack.Screen name="wellnessList" component={WellnessListScreen} options={{title: "Available wellness"}}/>
      <RootStack.Screen name="wellnessDetails" component={WellnessDetailsScreen} options={{title: "Book a Wellness"}} />
    </RootStack.Navigator>
  )
}

export default RootStackNavigator