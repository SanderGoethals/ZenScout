import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerParamList } from './types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ProfileScreen from '../screens/dashboard/profileScreen';
import AboutScreen from '../screens/dashboard/aboutScreen';
import SettingsScreen from '../screens/dashboard/settingsScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
        <Drawer.Screen name="profile" component={ProfileScreen} options={{
            drawerIcon: ({color, size}) => (
                <MaterialCommunityIcons name="account-circle" color={color} size={size} />
            )
        }} />
        <Drawer.Screen name="about" component={AboutScreen} options={{
            drawerIcon: ({color, size}) => (
                <MaterialCommunityIcons name="information" color={color} size={size} />
            )
        }} />
        <Drawer.Screen name="settings" component={SettingsScreen} options={{
            drawerIcon: ({color, size}) => (
                <MaterialCommunityIcons name="cog" color={color} size={size} />
            )
        }} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator