import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootStackNavProps } from '../../navigators/types';
import { useRoute } from '@react-navigation/native';


const PrivateSaunaDetailsScreen = () => {
    const {
      params: { data },
    } = useRoute<RootStackNavProps<"saunaDetails">['route']>();
  return (
    <View>
        <Text>PrivateSaunaDetailsScreen {data.name}</Text>
    </View>
  )
}

export default PrivateSaunaDetailsScreen

const styles = StyleSheet.create({})