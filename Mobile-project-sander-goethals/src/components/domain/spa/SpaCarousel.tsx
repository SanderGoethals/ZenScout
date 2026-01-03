import React, { FC } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import TextMarkup from '../../ui/TextMarkup';
import RatingStars from '../../ui/RatingStars';
import { getCategoryColor } from '../../../theme/categoryHelpers';
import { SpaCarouselProps } from './spa.types';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

const SpaCarousel: FC<SpaCarouselProps> = ({
  data,
  getItemColor,
  onActionPress,
  actionIcon,
  actionColor = '#E0245E',
}) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH + 16}
      decelerationRate="fast"
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      renderItem={({ item, index }) => {
        const bgColor = getItemColor
          ? getItemColor(index)
          : '#FFFFFF';

        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('spaDetails', { data: item })
            }
            style={{ marginRight: 16 }}
            activeOpacity={0.85}
          >
            <View style={[styles.card, { backgroundColor: bgColor }]}>
              <View style={styles.headerRow}>
                <TextMarkup style={styles.title} numberOfLines={2}>
                  {item.name}
                </TextMarkup>

                <TextMarkup style={styles.category}>
                  {item.category}
                </TextMarkup>
              </View>

              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: item.images[0].src }}
                  style={styles.image}
                />

                <View style={styles.ratingFloating}>
                  <RatingStars score={Number(item.score)} size={22} />
                </View>

                {onActionPress && actionIcon && (
                  <TouchableOpacity
                    onPress={() => onActionPress(item)}
                    style={styles.favoriteFloating}
                  >
                    <MaterialCommunityIcons
                      name={actionIcon as any}
                      color={actionColor}
                      size={36}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default SpaCarousel;


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
    overflow: 'visible',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },

  category: {
    fontSize: 13,
    color: '#6B7C80',
  },

  imageWrapper: {
    position: 'relative',
    marginBottom: 16,
  },

  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  favoriteFloating: {
    position: 'absolute',
    bottom: -24,
    right: -16,  
    borderRadius: 18,
    padding: 6,
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
});