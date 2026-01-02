import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import WellnessDetailsScreen from '../screens/wellness/WellnessDetailsScreen'
import PrivateSaunaDetailsScreen from '../screens/privateSauna/PrivateSaunaDetailsScreen'
import MassageAndBeautyDetailsScreen from '../screens/massageAndBeauty/MassageAndBeautyDetails'
import { RootStackParamList } from './navigation.types'
import DrawerNavigator from './DrawerNavigator'
import PublicSaunaDetailsScreen from '../screens/publicSauna/PublicSaunaDetailsScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import AddSpaScreen from '../screens/AddSpaScreen'
import SpaDetailsScreen from '../screens/SpaDetailsScreen'

const RootStack = createStackNavigator<RootStackParamList>()
const RootStackNavigator = () => {

  return (
 <RootStack.Navigator
      screenOptions={({ navigation }) => ({
        headerTransparent: true,
        headerTitle: '',
        headerTintColor: '#fff',

        headerLeft: () => (
          <TouchableOpacity
            style={styles.iconPosition}
            onPress={() => navigation.goBack()}
          >
            <View style={styles.iconBackground}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="#fff"
              />
            </View>
          </TouchableOpacity>
        ),

        headerRight: () => (
          <TouchableOpacity style={styles.iconPosition}
            onPress={() => {navigation.navigate('addSpa')
            }}>
            <View style={styles.iconBackground}>
              <MaterialCommunityIcons name="plus" size={28} color="white" />
            </View>
          </TouchableOpacity>
        ),
      })}
    >
      <RootStack.Screen name="menu" component={DrawerNavigator} options={{ headerShown: false }}/>
     
      <RootStack.Screen name="wellnessDetails" component={WellnessDetailsScreen}/>
      
      <RootStack.Screen name="privateSaunaDetails" component={PrivateSaunaDetailsScreen} />
      
      <RootStack.Screen name="massageAndBeautyDetails" component={MassageAndBeautyDetailsScreen} />
      
      <RootStack.Screen name="publicSaunaDetails" component={PublicSaunaDetailsScreen}/>

      <RootStack.Screen name="spaDetails" component={SpaDetailsScreen} />

      <RootStack.Screen name="addSpa" component={AddSpaScreen} options={{
                          headerStyle: { backgroundColor: 'rgba(0,0,0,0.3)' },
                          headerTintColor: '#FFFFFF',  }}
      />
      
    </RootStack.Navigator>
  )
}

export default RootStackNavigator

const styles = StyleSheet.create({
  iconBackground: {        
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPosition: {
    marginLeft: 10,
    marginTop: -25,
  },
})