import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from '../navigators/RootStackNavigator';
import FavoritesProvider from '../contexts/favoritesContext';
import { Provider } from 'react-redux';
import { store } from '../store';

const queryClient = new QueryClient();

const Root = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <FavoritesProvider>
              <RootStackNavigator />
            </FavoritesProvider>
          </QueryClientProvider>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  )
}   

export default Root