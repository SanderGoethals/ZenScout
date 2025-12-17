import React from 'react';
import { FlatList, View, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageCarousel from './ImageCarousel';
import TitleMarkup from './TitleMarkup';
import RatingStars from './RatingStars';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch } from '../hooks/reduxHooks';
import { toggle } from '../store/favorites/slice';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

const EVEN_COLOR = '#C8DAD3';
const ODD_COLOR = '#A3C1AD';

type Props = {
  favorites: any[];
};

const FavoritesCarousel = ({ favorites }: Props) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  return (
    <FlatList
      data={favorites}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH + 16}
      decelerationRate="fast"
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      renderItem={({ item, index }) => {
        const bgColor = index % 2 === 0 ? EVEN_COLOR : ODD_COLOR;

        return (
          <TouchableOpacity
            // activeOpacity={0.85}
            onPress={() => navigation.navigate('wellnessDetails', { data: item })}
            style={{ marginRight: 16 }}
          >
            <View style={[styles.card, { backgroundColor: bgColor }]}>

              <View style={styles.titleRow}>
                <TitleMarkup style={styles.title}>{item.name}</TitleMarkup>
                <TitleMarkup style={styles.category}>{item.category}</TitleMarkup>
              </View>

              <View style={styles.imageWrapper}>
                <Image source={{uri: item.images[0].src}} style={{ width: '100%', height: 180, borderRadius: 10 }} />

                <View style={styles.ratingFloating}>
                  <RatingStars score={Number(item.score)} size={22} />
                </View>

                <TouchableOpacity
                  onPress={() => dispatch(toggle(item))}
                  style={styles.favoriteFloating}
                >
                  <MaterialCommunityIcons name="heart" color="#E0245E" size={32} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default FavoritesCarousel;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    padding: 12,
    borderRadius: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    flexShrink: 1,
  },
  imageWrapper: {
    position: 'relative',
  },
  favoriteFloating: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  ratingFloating: {
    position: 'absolute',
    top: 10,
    left: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 2,
  },
    titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: -8
  },
  category: {
    fontSize: 14,
    color: '#5F6F73',
    marginLeft: 8,
  },
});
