import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ImageCarousel from './ImageCarousel';
import RatingStars from './RatingStars';
import TitleMarkup from './TitleMarkup';
import { CardProps } from './types';
import { getCategoryColor } from '../theme/categoryHelpers';

export const SpaListCard: FC<CardProps> = ({
  data: item,
  index,
  isFavorite,
  onPress,
  category,
  children,
}: CardProps) => {
  const bgColor = getCategoryColor(
  category,
  index % 2 === 0 ? 'even' : 'odd'
);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(item)}>
      <View style={[styles.card, { backgroundColor: bgColor }]}>

        {/* Titel */}
        <TitleMarkup style={styles.title}>{item.name}</TitleMarkup>

        {/* Afbeeldingen + favorite */}
        <View style={styles.imageWrapper}>
          <ImageCarousel 
            images={item.detailImages.slice(0, 3)}
            rounded
            height={200}
          />

          {/* Rating floating */}
            <View style={styles.ratingFloating}>
              <RatingStars score={Number(item.score)} size={24} />
            </View>

          {isFavorite && (
            <View style={styles.favoriteFloating}>
              <MaterialCommunityIcons name="heart" color="#E0245E" size={34} />
            </View>
          )}

          <View style={styles.locationRow}>
            <MaterialCommunityIcons name="map-marker" size={22} color="red"/>
              <TitleMarkup style={styles.location}>
                {item.city}, {item.province}
              </TitleMarkup>
        </View>

          </View>
        {/* Beschrijving KORT */}
          <Text style={ styles.title} numberOfLines={2} ellipsizeMode="tail" >
            {item.description}
          </Text>

        {/* Slot voor uitbreidingen */}
        {children && <View>{children}</View>}

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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 18,
  },
  imageWrapper: {
  position: "relative",
  },
  favoriteFloating: {
  position: "absolute",
  top: 12,
  right: 12,
  backgroundColor: "transparent",
  padding: 0,
  borderRadius: 0,
  elevation: 0,
  shadowColor: "transparent",
},
 locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingFloating: {
  position: "absolute",
  top: 12,
  left: 6,
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 8,
  zIndex: 2,
},

 });
