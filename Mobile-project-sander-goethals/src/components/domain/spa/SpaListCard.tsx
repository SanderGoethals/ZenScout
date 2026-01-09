import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ImageCarousel from '../../ui/ImageCarousel';
import RatingStars from '../../ui/RatingStars';
import TextMarkup from '../../ui/TextMarkup';
import { CardProps } from './spa.types';
import { getCategoryColor } from '../../../theme/categoryHelpers';

export const SpaListCard: FC<CardProps> = ({
  data: item,
  index,
  isFavorite,
  onPress,
  category,
}: CardProps) => {
  const bgColor = getCategoryColor(
  category,
  index % 2 === 0 ? 'first' : 'second'
);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(item)}>
      <View style={[styles.card, { backgroundColor: bgColor }]}>

        {/* Titel */}
        <TextMarkup variant='boldItalic' style={{fontSize: 20, letterSpacing: 0.3}}>{item.name}</TextMarkup>

        {/* Afbeeldingen + favorite */}
        <View style={styles.imageWrapper}>
          <ImageCarousel 
            images={(item.detailImages ?? []).slice(0, 3)}
            rounded
            height={200}
          />

          {/* Rating floating */}
            <View style={styles.ratingFloating}>
              <RatingStars score={Number(item.score)} size={24} />
            </View>

          {/* Favorite floating */}
          {isFavorite && (
            <View style={styles.favoriteFloating}>
              <MaterialCommunityIcons name="heart" color="#E0245E" size={34} />
            </View>
          )}

          {/* Price floating */}
          <View style={styles.priceOverlay}>
            <TextMarkup style={styles.priceText} >{item.price}</TextMarkup>
          </View>

          <View style={styles.locationRow}>
            <MaterialCommunityIcons name="map-marker" size={22} color="red"/>
              <TextMarkup style={{ fontSize: 18, letterSpacing: 0.3 }}>
                {item.city}, {item.province}
              </TextMarkup>
          </View>
        </View>

        {/* Beschrijving KORT */}
          <TextMarkup style={{ fontSize: 16, letterSpacing: 0.3 }} numberOfLines={2} ellipsizeMode="tail" >
            {item.description}
          </TextMarkup>

      </View>
    </TouchableOpacity>
  );
};

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
  imageWrapper: {
    position: "relative",
  },
  favoriteFloating: {
    position: "absolute",
    bottom: 6,
    right: 0,
    backgroundColor: "transparent",
    padding: 0,
    borderRadius: 0,
    elevation: 10,
    shadowColor: "transparent",
    zIndex: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingFloating: {
    position: "absolute",
    top: 6,
    left: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 2,
  },

  priceOverlay: {
    position: 'absolute',
    right: 6,
    top: 8,
    backgroundColor: '#2E7D32',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 6,
  },  
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
 });
