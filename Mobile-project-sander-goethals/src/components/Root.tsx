import React, { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from '../navigators/RootStackNavigator';
import { Provider } from 'react-redux';
import { persistor, store } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator } from 'react-native';
import AuthStackNavigator from '../navigators/AuthStackNavigator';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const queryClient = new QueryClient();
const LOADER_COLOR = '#ADD8E6'

SplashScreen.preventAutoHideAsync()

const Root = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const [authChecked, setAuthChecked] = useState(false)

  const [fontsLoaded] = useFonts({
    'Playfair-BlackItalic': require('../../assets/fonts/PlayfairDisplay-BlackItalic.ttf'),
    'Playfair-BoldItalic': require('../../assets/fonts/PlayfairDisplay-BoldItalic.ttf'),
    'Playfair-ExtraBold': require('../../assets/fonts/PlayfairDisplay-ExtraBold.ttf'),
    'Playfair-SemiBold': require('../../assets/fonts/PlayfairDisplay-SemiBold.ttf'),
    'Playfair-SemiBoldItalic': require('../../assets/fonts/PlayfairDisplay-SemiBoldItalic.ttf'),
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setLoggedInUser(user)
      setAuthChecked(true)
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    if (fontsLoaded && authChecked) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, authChecked])

  if (!fontsLoaded || !authChecked) {
    return null
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate 
         persistor={persistor}
         loading={
            <ActivityIndicator 
            size="large" 
            color={LOADER_COLOR} />}>
          <NavigationContainer>
            <QueryClientProvider client={queryClient}>
              {loggedInUser !== null ? <RootStackNavigator /> : <AuthStackNavigator />}
            </QueryClientProvider>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  )
}   

export default Root