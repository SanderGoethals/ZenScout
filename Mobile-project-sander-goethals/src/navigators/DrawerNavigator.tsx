import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerParamList } from './types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppSelector } from '../hooks/reduxHooks';

import ProfileScreen from '../screens/dashboard/ProfileScreen';
import AboutScreen from '../screens/dashboard/AboutScreen';
import SettingsScreen from '../screens/dashboard/SettingsScreen';
import FavoritesScreen from '../screens/dashboard/FavoritesScreen';

import WellnessListScreen from '../screens/wellness/WellnessListScreen';
import PrivateSaunaListScreen from '../screens/privateSauna/PrivateSaunaListScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

const ACTIVE_BACKGROUND_COLOR = '#EEDDBA';
const BASE_BACKGROUND_COLOR = '#FFF7E6';

const DrawerNavigator = () => {
    const favorites = useAppSelector(state => state.favorites);
    const totalFavorites = favorites.length;

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: ACTIVE_BACKGROUND_COLOR,
        drawerActiveTintColor: '#FF0000',
        drawerLabelStyle: {fontSize: 19},
        drawerStyle: { width: "70%", backgroundColor: BASE_BACKGROUND_COLOR},
      }}
    >
        <Drawer.Group screenOptions={{
            headerStyle: { backgroundColor: ACTIVE_BACKGROUND_COLOR }
        }}>
            {/* <Drawer.Screen name="Home" component={WellnessListScreen} />  */}

            <Drawer.Screen name="home" component={WellnessListScreen} options={{ title: "Home",   
                drawerIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                )
            }} />
            <Drawer.Screen name="wellness" component={WellnessListScreen} options={{ title: "Wellness",    
                drawerIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="spa" color={color} size={size} />
                )
            }} />
            <Drawer.Screen name="privateSauna" component={PrivateSaunaListScreen} options={{ title: "Private Sauna", 
                drawerIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="hot-tub" color={color} size={size} />
                )
            }} />
            <Drawer.Screen name="profile" component={ProfileScreen} options={{ title: "Profiel" ,
                drawerIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="account-circle" color={color} size={size} />
                )
            }} />
            <Drawer.Screen name="favorites" component={FavoritesScreen} options={{  title: `Favorieten (${totalFavorites})`,
                drawerIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="heart" color={color} size={size} />
                )
            }} />
            <Drawer.Screen name="settings" component={SettingsScreen} options={{ title: "Instellingen" ,
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