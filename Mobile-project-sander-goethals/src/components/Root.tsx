import React, { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from '../navigators/RootStackNavigator';
import { Provider, ReactReduxContext } from 'react-redux';
import { persistor, store } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator } from 'react-native';
import AuthStackNavigator from '../navigators/AuthStackNavigator';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../config/firebase';
import * as SplashScreen from 'expo-splash-screen';

const queryClient = new QueryClient();
const LOADER_COLOR = '#ADD8E6';

SplashScreen.preventAutoHideAsync();

const Root = () => {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [isAppReady, setIsAppReady] = useState(true);

  useEffect(() => {
      setIsAppReady(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedInUser(user);
      setIsAppReady(false);
    })

    return unsubscribe;

  }, []);

  useEffect(() => {
    if (!isAppReady) {
      SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (isAppReady) {
    return null;
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