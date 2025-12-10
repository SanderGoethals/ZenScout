import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { RootStackNavProps } from '../../navigators/types';
import ImageCarousel from '../../components/ImageCarousel';

const MassageAndBeautyDetails = () => {
      const {
        params: { data },
      } = useRoute<RootStackNavProps<"massageAndBeautyDetails">['route']>();

  return (
    <View>
        <Text>MassageAndBeautyDetails {data.name}</Text>
        <ImageCarousel images={data.detailImages} />
    </View>
  )
}

export default MassageAndBeautyDetails

const styles = StyleSheet.create({})