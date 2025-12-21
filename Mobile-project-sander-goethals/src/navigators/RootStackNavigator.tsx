import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import WellnessDetailsScreen from '../screens/wellness/WellnessDetailsScreen'
import WellnessListScreen from '../screens/wellness/WellnessListScreen'
import PrivateSaunaListScreen from '../screens/privateSauna/PrivateSaunaListScreen'
import PrivateSaunaDetailsScreen from '../screens/privateSauna/PrivateSaunaDetailsScreen'
import MassageAndBeautyListScreen from '../screens/massageAndBeauty/MassageAndBeautyList'
import MassageAndBeautyDetailsScreen from '../screens/massageAndBeauty/MassageAndBeautyDetails'
import { RootStackParamList } from './types'
import DrawerNavigator from './DrawerNavigator'
import PublicSaunaListScreen from '../screens/publicSauna/PublicSaunaListScreen'
import PublicSaunaDetailsScreen from '../screens/publicSauna/PublicSaunaDetailsScreen'
import { opacity } from 'react-native-reanimated/lib/typescript/Colors'

const RootStack = createStackNavigator<RootStackParamList>()

const ACTIVE_BACKGROUND_COLOR = '#FDECC8';

const RootStackNavigator = () => {

  return (
    <RootStack.Navigator 
    screenOptions={{headerTransparent: true, headerTitle: '', headerTintColor: '#fff', }}
    >
      <RootStack.Screen name="menu" component={DrawerNavigator} options={{ headerShown: false }}/>
     
      <RootStack.Screen name="wellnessDetails" component={WellnessDetailsScreen} />
      
      <RootStack.Screen name="privateSaunaDetails" component={PrivateSaunaDetailsScreen} />
      
      <RootStack.Screen name="massageAndBeautyDetails" component={MassageAndBeautyDetailsScreen} />
      
      <RootStack.Screen name="publicSaunaDetails" component={PublicSaunaDetailsScreen}/>

    </RootStack.Navigator>
  )
}

export default RootStackNavigator