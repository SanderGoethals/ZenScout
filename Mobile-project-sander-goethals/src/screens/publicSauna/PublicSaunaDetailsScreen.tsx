import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootStackNavProps } from '../../navigators/types';
import { useRoute } from '@react-navigation/native';
import ImageCarousel from '../../components/ImageCarousel';

const PublicSaunaDetails = () => {
    const {
      params: { data },
    } = useRoute<RootStackNavProps<"publicSaunaDetails">['route']>();

  return (
    <View>
      <Text>PublicSaunaDetails Screen - {data.name}</Text>
      <ImageCarousel images={data.images} />
      
    </View>
  )
}

export default PublicSaunaDetails

const styles = StyleSheet.create({})