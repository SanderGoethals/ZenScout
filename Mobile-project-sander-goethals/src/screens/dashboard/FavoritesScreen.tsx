import { FlatList, TouchableOpacity, View, StyleSheet } from 'react-native'
import React from 'react'
import { useFavorites } from '../../hooks/useFavorites'
import ImageCarousel from '../../components/ImageCarousel'
import TitleMarkup from '../../components/TitleMarkup'
import { useNavigation } from '@react-navigation/native';
import RatingStars from '../../components/RatingStars'

const EVEN_COLOR = '#FFF7E6';
const ODD_COLOR = '#FDECC8';

const FavoritesScreen = () => {
  const { favorites } = useFavorites();
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item, index }) => {
          const bgColor = index % 2 === 0 ? EVEN_COLOR : ODD_COLOR;

          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('wellnessDetails', { data: item })}
              activeOpacity={0.8}
            >
              <View style={[styles.card, { backgroundColor: bgColor }]}>
                
                {/* titel */}
                <TitleMarkup style={styles.title}>{item.name}</TitleMarkup>
                
                {/* rating */}
                <RatingStars score={Number(item.score)} size={30} />
                
                {/* carousel */}
                <ImageCarousel images={item.images.slice(0, 3)} height={200} />

              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default FavoritesScreen;

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
    fontWeight: '600',
  },
});
