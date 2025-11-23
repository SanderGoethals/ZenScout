import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { RootStackNavProps } from '../../navigators/types';
import { useRoute } from '@react-navigation/native';

import { ImageCarousel } from '../../components/ImageCarousel';
import RatingStars from '../../components/RatingStars';

const WellnessDetailsScreen = () => {

  const {
    params: { data },
  } = useRoute<RootStackNavProps<"wellnessDetails">['route']>();

  return (
    <View>
      <Text>{data.name}</Text>
      <RatingStars score={Number(data.score)} size={28} />
      {data.images?.length > 0 && (
        <ImageCarousel images={data.images} height={250} />
      )}  
      <Text>{data.description}</Text>
      <Text>Price: {data.price} EUR</Text>
    </View>
  )
}

export default WellnessDetailsScreen

const styles = StyleSheet.create({})