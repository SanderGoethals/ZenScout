import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerParamList } from './navigation.types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppSelector } from '../hooks/reduxHooks';

import ProfileScreen from '../screens/dashboard/ProfileScreen';
import AboutScreen from '../screens/dashboard/AboutScreen';
import SettingsScreen from '../screens/dashboard/SettingsScreen';
import FavoritesScreen from '../screens/dashboard/FavoritesScreen';

import WellnessListScreen from '../screens/wellness/WellnessListScreen';
import PrivateSaunaListScreen from '../screens/privateSauna/PrivateSaunaListScreen';
import MassageAndBeautyListScreen from '../screens/massageAndBeauty/MassageAndBeautyList';
import PublicSaunaListScreen from '../screens/publicSauna/PublicSaunaListScreen';
import HomeScreen from '../screens/HomeScreen';

import { getCategoryColor } from '../theme/categoryHelpers';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
    const favorites = useAppSelector(state => state.favorites.length);

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: getCategoryColor('main', 'third'),
        drawerActiveTintColor: '#FF0000',
        drawerLabelStyle: {fontSize: 20},
        drawerStyle: { width: "70%", backgroundColor: getCategoryColor('main', 'first')},
      }}
    >
        <Drawer.Screen name="home" component={HomeScreen} options={{ title: "Home",  
        headerStyle: { backgroundColor: getCategoryColor('main', 'first') },
            drawerIcon: ({color, size}) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
            )
        }} />
        <Drawer.Screen name="wellness" component={WellnessListScreen} options={{ title: "Wellness", 
        headerStyle: { backgroundColor: '#C8DAD3' },
            drawerIcon: ({color, size}) => (
                <MaterialCommunityIcons name="spa" color={color} size={size} />
            )
        }} />
        <Drawer.Screen name="beautyAndMassage" component={MassageAndBeautyListScreen} options={{ title: "Massage & Beauty", 
        headerStyle: { backgroundColor: '#D7B2AE' },
            drawerIcon: ({color, size}) => (
                <MaterialCommunityIcons name="leaf" color={color} size={size} />
            )
        }} />
        <Drawer.Screen name="privateSauna" component={PrivateSaunaListScreen} options={{ title: "Privé Sauna", 
        headerStyle: { backgroundColor: '#7FA9C9' },
            drawerIcon: ({color, size}) => (
                <MaterialCommunityIcons name="hot-tub" color={color} size={size} />
            )
        }} />
        <Drawer.Screen name="publicSauna" component={PublicSaunaListScreen} options={{ title: "Publieke Sauna", 
        headerStyle: { backgroundColor: '#9B86B8' },
            drawerIcon: ({color, size}) => (
                <MaterialCommunityIcons name="account-group" color={color} size={size} />
            )
        }} />            
        <Drawer.Screen name="profile" component={ProfileScreen} options={{ title: "Profiel" ,
            drawerIcon: ({color, size}) => (
                <MaterialCommunityIcons name="account-circle" color={color} size={size} />
            )
        }} />
        <Drawer.Screen name="favorites" component={FavoritesScreen} options={{  title: `Favorieten (${favorites})`,
        headerStyle: { backgroundColor: getCategoryColor('main', 'third') },
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
    </Drawer.Navigator>
  )
}

export default DrawerNavigator