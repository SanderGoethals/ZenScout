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
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
            <FavoritesProvider>
              <RootStackNavigator />
            </FavoritesProvider>
        </QueryClientProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}   

export default Root