import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import WellnessDetailsScreen from '../screens/wellness/WellnessDetailsScreen'
import PrivateSaunaDetailsScreen from '../screens/privateSauna/PrivateSaunaDetailsScreen'
import MassageAndBeautyDetailsScreen from '../screens/massageAndBeauty/MassageAndBeautyDetails'
import { RootStackParamList } from './types'
import DrawerNavigator from './DrawerNavigator'
import PublicSaunaDetailsScreen from '../screens/publicSauna/PublicSaunaDetailsScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import AddWellnessScreen from '../screens/admin/AddWellnessScreen'

const RootStack = createStackNavigator<RootStackParamList>()
const RootStackNavigator = () => {

  return (
 <RootStack.Navigator
      screenOptions={({ navigation }) => ({
        headerTransparent: true,
        headerTitle: '',
        headerTintColor: '#fff',
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 15 }}
            onPress={() => {navigation.navigate('addWellness')
            }}>
            <MaterialCommunityIcons name="plus" size={28} color="white" />
          </TouchableOpacity>
        ),
      })}
    >
      <RootStack.Screen name="menu" component={DrawerNavigator} options={{ headerShown: false }}/>
     
      <RootStack.Screen name="wellnessDetails" component={WellnessDetailsScreen}/>
      
      <RootStack.Screen name="privateSaunaDetails" component={PrivateSaunaDetailsScreen} />
      
      <RootStack.Screen name="massageAndBeautyDetails" component={MassageAndBeautyDetailsScreen} />
      
      <RootStack.Screen name="publicSaunaDetails" component={PublicSaunaDetailsScreen}/>

      <RootStack.Screen name="addWellness" component={AddWellnessScreen} />

    </RootStack.Navigator>
  )
}

export default RootStackNavigator