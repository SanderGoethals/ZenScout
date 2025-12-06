import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from '../navigators/RootStackNavigator';
import FavoritesProvider from '../contexts/favoritesContext';

const queryClient = new QueryClient();

const Root = () => {
  return (
    <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
            <FavoritesProvider>
              <NavigationContainer>
                  <RootStackNavigator />
              </NavigationContainer>
            </FavoritesProvider>
        </QueryClientProvider>
    </SafeAreaProvider>
  )
}   

export default Root