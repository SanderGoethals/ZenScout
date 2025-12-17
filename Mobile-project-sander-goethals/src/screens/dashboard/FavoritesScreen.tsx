import { FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import React from 'react';
import ImageCarousel from '../../components/ImageCarousel';
import TitleMarkup from '../../components/TitleMarkup';
import { useNavigation } from '@react-navigation/native';
import RatingStars from '../../components/RatingStars';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { toggle } from '../../store/favorites/slice';

const EVEN_COLOR = '#C8DAD3';
const ODD_COLOR = '#A3C1AD';

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const favorites = useAppSelector((store) => store.favorites);
  const dispatch = useAppDispatch();

  return favorites.length === 0 ? (
    <View style={[styles.screen, { alignItems: 'center' }]}>
      <TitleMarkup style={{ fontSize: 24 }}>
        Er staan nog geen favorieten klaar. Ontdek de mooiste wellnessplekken en bewaar jouw aanraders!
      </TitleMarkup>
    </View>
  ) : (
    <View style={styles.screen}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item, index }) => {
          const bgColor = index % 2 === 0 ? EVEN_COLOR : ODD_COLOR;

          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('wellnessDetails', { data: item })
              }
              activeOpacity={0.8}
            >
              <View style={[styles.card, { backgroundColor: bgColor }]}>

                <View style={styles.headerRow}>
                  <TitleMarkup style={styles.title} numberOfLines={2} ellipsizeMode='tail'>
                    {item.name}
                  </TitleMarkup>

                  <TitleMarkup style={styles.category}>
                    {item.category}
                  </TitleMarkup>
                </View>

                <View style={styles.imageWrapper}>
                  <ImageCarousel
                    images={item.images.slice(0, 3)}
                    height={200}
                  />

                  <View style={styles.ratingFloating}>
                    <RatingStars
                      score={Number(item.score)}
                      size={24}
                    />
                  </View>

                  <TouchableOpacity
                    onPress={() => dispatch(toggle(item))}
                    style={styles.favoriteFloating}
                  >
                    <MaterialCommunityIcons
                      name="heart"
                      color="#E0245E"
                      size={35}
                    />
                  </TouchableOpacity>
                </View>

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

  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: -8,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
  },

  category: {
    fontSize: 14,
    color: '#6B7C80',
  },

  imageWrapper: {
    position: 'relative',
  },

  favoriteFloating: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'transparent',
    padding: 0,
    borderRadius: 0,
    elevation: 0,
    shadowColor: 'transparent',
  },

  ratingFloating: {
    position: 'absolute',
    top: 12,
    left: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 2,
  },
});
