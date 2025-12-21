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
    // screenOptions={
    //   { headerStyle: {   backgroundColor: 'rgba(253, 236, 200, 0)' }
    //   }
    // }
    >
      <RootStack.Screen name="menu" component={DrawerNavigator} options={{ headerShown: false }}/>


      
      <RootStack.Screen name="wellnessList" component={WellnessListScreen}   options={{title: "Beschikbkare Wellenssen"}}/>
      <RootStack.Screen
                    name="wellnessDetails"
                    component={WellnessDetailsScreen}
                    options={{
                      headerTransparent: true,
                      headerTitle: '',
                      headerTintColor: '#fff', // witte back button
                    }}
                  />

      
      <RootStack.Screen name="privateSaunaList" component={PrivateSaunaListScreen} options={{title: "Beschikbare privé sauna's"}}/>
      <RootStack.Screen name="privateSaunaDetails" component={PrivateSaunaDetailsScreen} options={{title: "Boek een privé sauna"}} />
      
      <RootStack.Screen name="massageAndBeautyList" component={MassageAndBeautyListScreen} options={{title: "Beschikbare massage & beauty"}}/>
      <RootStack.Screen name="massageAndBeautyDetails" component={MassageAndBeautyDetailsScreen} options={{title: "Boek een massage & beauty"}} />
      
      <RootStack.Screen name="publicSaunaList" component={PublicSaunaListScreen} options={{title: "Beschikbare publieke sauna's"}}/>
      <RootStack.Screen name="publicSaunaDetails" component={PublicSaunaDetailsScreen} options={{title: "Boek een publieke sauna"}} />

    </RootStack.Navigator>
  )
}

export default RootStackNavigator