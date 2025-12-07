import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import ImageCarousel from '../../components/ImageCarousel';
import RatingStars from '../../components/RatingStars';
import TitleMarkup from '../../components/TitleMarkup';

import { useWellnessList } from '../../hooks/useWellnessList';

const EVEN_COLOR = '#FFF7E6';
const ODD_COLOR = '#FDECC8';
const LOADER_COLOR = '#ADD8E6';

const WellnessListScreen = () => {
  const navigation = useNavigation();

  const { data: wellnessList, isLoading, isError, refetch, isRefetching } =
    useWellnessList();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={LOADER_COLOR} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <TitleMarkup>Failed to load wellness list. Please try again.</TitleMarkup>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={wellnessList}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 12 }}
        refreshing={isRefetching}
        onRefresh={refetch}
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

                {/* Rating */}
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

export default WellnessListScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
