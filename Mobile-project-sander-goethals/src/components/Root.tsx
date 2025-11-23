import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import App from '../../App'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from '../navigators/RootStackNavigator';

const queryClient = new QueryClient();

const Root = () => {
  return (
    <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <RootStackNavigator />
          </NavigationContainer>
        </QueryClientProvider>
    </SafeAreaProvider>
  )
}   

export default Root