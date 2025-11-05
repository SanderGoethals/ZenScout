import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import App from '../../App'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from '@react-navigation/native';

const queryClient = new QueryClient();

const Root = () => {
  return (
    <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <App />
          </NavigationContainer>
        </QueryClientProvider>
    </SafeAreaProvider>
  )
}   

export default Root