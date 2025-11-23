import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import ImageCarousel from '../../components/ImageCarousel';
import RatingStars from '../../components/RatingStars';
import TitleMarkup from '../../components/TitleMarkup';


const WELLNESS_API_URL = 'http://10.0.2.2:4000/wellness.json';

const WellnessListScreen = () => {

  const [wellnessList, setWellnessList] = useState<Wellness[]>([])
  const [refreshing, setRefreshing] = useState(false);

  const fetchWellnessList = async () => {
    try {
          const response = await fetch(WELLNESS_API_URL);
          const data = await response.json();
          setWellnessList(data as Wellness[]);
    } catch (error) {
          console.error('Error fetching wellness list:', error);
    }
  }
  useEffect(() => {
    fetchWellnessList();
  }, []);

  const onRefresh = async () => {
         setRefreshing(true);
         await fetchWellnessList();
         setRefreshing(false);
     }

  const navigation = useNavigation();

  return (
      <View style={styles.container}>
       <FlatList
         data={wellnessList}
         keyExtractor={(item) => item.id.toString()}
         renderItem={({ item }) => (
           <TouchableOpacity onPress={() => {
             navigation.navigate('wellnessDetails', { data: item }); }} >
             <TitleMarkup>{item.name}</TitleMarkup>
             <RatingStars score={Number(item.score)} />
             <Text style={{ fontSize: 18 }}>{item.location}</Text>
             <ImageCarousel images={item.images.slice(0, 3)} height={250} />
           </TouchableOpacity>
         )}
         refreshing={refreshing}
         onRefresh={onRefresh}
         />
    </View>
  )
}

export default WellnessListScreen

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: "hidden",
    width: "100%",
    backgroundColor: "#FFF7E6"
  },
})