import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from '../navigators/RootStackNavigator';
import FavoritesProvider from '../contexts/favoritesContext';
import { Provider } from 'react-redux';
import { persistor, store } from '../store';
import { PersistGate } from 'redux-persist/integration/react';

const queryClient = new QueryClient();

const Root = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <QueryClientProvider client={queryClient}>
              {/* <FavoritesProvider> */}
                <RootStackNavigator />
              {/* </FavoritesProvider> */}
            </QueryClientProvider>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  )
}   

export default Root