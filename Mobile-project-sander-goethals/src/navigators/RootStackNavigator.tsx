import { TouchableOpacity } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import WellnessDetailsScreen from '../screens/wellness/WellnessDetailsScreen'
import { RootStackParamList } from './types'
import WellnessListScreen from '../screens/wellness/WellnessListScreen'
import DrawerNavigator from './DrawerNavigator'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RootStack = createStackNavigator<RootStackParamList>()

const RootStackNavigator = () => {

  return (
        <RootStack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleAlign: "center",

        headerLeft: () => (
          <TouchableOpacity
            style={{ paddingHorizontal: 12 }}
            onPress={() => navigation.navigate("menu")}
          >
            <MaterialCommunityIcons name="menu" size={28} color="black" />
          </TouchableOpacity>
        ),
      })}
    >
      <RootStack.Screen name="wellnessList" component={WellnessListScreen} options={{title: "Available wellness"}}/>
      <RootStack.Screen name="wellnessDetails" component={WellnessDetailsScreen} options={{title: "Book a Wellness"}} />
      <RootStack.Screen name="menu" component={DrawerNavigator} options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  )
}

export default RootStackNavigator