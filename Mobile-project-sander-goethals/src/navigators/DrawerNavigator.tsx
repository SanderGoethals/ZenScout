import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerParamList } from './types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ProfileScreen from '../screens/dashboard/ProfileScreen';
import AboutScreen from '../screens/dashboard/AboutScreen';
import SettingsScreen from '../screens/dashboard/SettingsScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {

    // TODO: Zorgen dat drawer niet direct naar de Profile screen gaat
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: '#FDECC8',
        drawerActiveTintColor: '#FF0000',
        drawerLabelStyle: {fontSize: 19},
        drawerStyle: { width: "70%", backgroundColor: '#FFF7E6'},
      }}
    >
        <Drawer.Screen name="profile" component={ProfileScreen} options={{
            drawerIcon: ({color, size}) => (
                <MaterialCommunityIcons name="account-circle" color={color} size={size} />
            )
        }} />
        <Drawer.Screen name="settings" component={SettingsScreen} options={{
            drawerIcon: ({color, size}) => (
                <MaterialCommunityIcons name="cog" color={color} size={size} />
            )
        }} />
        <Drawer.Screen name="about" component={AboutScreen} options={{
            drawerIcon: ({color, size}) => (
                <MaterialCommunityIcons name="information" color={color} size={size} />
            )
        }} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator