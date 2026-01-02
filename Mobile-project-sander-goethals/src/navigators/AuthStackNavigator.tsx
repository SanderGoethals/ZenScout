import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/dashboard/LoginScreen'
import RegisterScreen from '../screens/dashboard/RegisterScreen'
import { AuthStackParamsList } from './navigation.types'

const AuthStack = createStackNavigator<AuthStackParamsList>()

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="login" component={LoginScreen} />
      <AuthStack.Screen name="register" component={RegisterScreen} />
    </AuthStack.Navigator>
  )
}

export default AuthStackNavigator

const styles = StyleSheet.create({})