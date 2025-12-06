import { StyleSheet, Text, View, FlatList, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import ImageCarousel from '../../components/ImageCarousel';
import RatingStars from '../../components/RatingStars';
import TitleMarkup from '../../components/TitleMarkup';

const EVEN_COLOR = '#FFF7E6';
const ODD_COLOR = '#FDECC8';
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
    <View style={styles.screen}>
      <FlatList
        data={wellnessList}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 12 }}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item, index }) => {
          const bgColor = index % 2 === 0 ? EVEN_COLOR : ODD_COLOR;

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('wellnessDetails', { data: item })}
            >
              <View style={[styles.card, { backgroundColor: bgColor }]}>
                
                {/* Titel */}
                <TitleMarkup style={styles.title}>{item.name}</TitleMarkup>

                {/* Score */}
                <RatingStars score={Number(item.score)} size={30} />

                {/* Locatie */}
                <Text style={styles.location}>{item.location}</Text>

                {/* Carousel */}
                <ImageCarousel images={item.images.slice(0, 3)} height={250} />

              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default WellnessListScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  card: {
    flexDirection: 'column',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  location: {
    fontSize: 18,
  },
});