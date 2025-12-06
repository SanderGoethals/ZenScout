import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerParamList } from './types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ProfileScreen from '../screens/dashboard/ProfileScreen';
import AboutScreen from '../screens/dashboard/AboutScreen';
import SettingsScreen from '../screens/dashboard/SettingsScreen';
import WellnessListScreen from '../screens/wellness/WellnessListScreen';
import FavoritesScreen from '../screens/dashboard/FavoritesScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

const ACTIVE_BACKGROUND_COLOR = '#FDECC8';
const BASE_BACKGROUND_COLOR = '#FFF7E6';

const DrawerNavigator = () => {

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: ACTIVE_BACKGROUND_COLOR,
        drawerActiveTintColor: '#FF0000',
        drawerLabelStyle: {fontSize: 19},
        drawerStyle: { width: "70%", backgroundColor: BASE_BACKGROUND_COLOR},
      }}
    >
        {/* <Drawer.Screen name="Home" component={WellnessListScreen} />  */}
        <Drawer.Group screenOptions={{
            headerStyle: { backgroundColor: ACTIVE_BACKGROUND_COLOR }
        }}>
            <Drawer.Screen name="home" component={WellnessListScreen} options={{ title: "Home",   
                drawerIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                )
            }} />
            <Drawer.Screen name="profile" component={ProfileScreen} options={{ title: "Profile" ,
                drawerIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="account-circle" color={color} size={size} />
                )
            }} />
            <Drawer.Screen name="favorites" component={FavoritesScreen} options={{ title: "Favorites" ,
                drawerIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="heart" color={color} size={size} />
                )
            }} />
            <Drawer.Screen name="settings" component={SettingsScreen} options={{ title: "Settings" ,
                drawerIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="cog" color={color} size={size} />
                )
            }} />
            <Drawer.Screen name="about" component={AboutScreen} options={{ title: "About" ,
                drawerIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="information" color={color} size={size} />
                )
            }} />
        </Drawer.Group>
    </Drawer.Navigator>
  )
}

export default DrawerNavigator