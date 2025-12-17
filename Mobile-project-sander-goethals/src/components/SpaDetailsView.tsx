import React, { FC, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions, Pressable, } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ImageCarousel from './ImageCarousel';
import RatingStars from './RatingStars';
import TitleMarkup from './TitleMarkup';
import SocialIconProps from './SocialsIcon';
import { DetailProps } from './types';
import { RatingDetailsView } from './RatingDetailsView';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const SpaDetailsView: FC<DetailProps> = ({
  data: item,
  isFavorite,
  onToggleFavorite,
  evenColor,
  oddColor,
  ratingDetails,
}: DetailProps) => {

  const [showRatings, setShowRatings] = useState(false);

  const slideAnim = useRef(
    new Animated.Value(SCREEN_HEIGHT)
  ).current;

    const openRatings = () => {
    setShowRatings(true);
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT / 2,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeRatings = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: false,
    }).start(() => setShowRatings(false));
  };

  return (
    <ScrollView style={{ backgroundColor: evenColor }}>

      {/* Naam */}
      <View style={styles.titleContainer}>
        <TitleMarkup style={styles.titleText}>
          {item.name}
        </TitleMarkup>
      </View>


      {/* Score (touchable) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={openRatings}
      >
        <View style={styles.scoreContainer}>
          <RatingStars score={Number(item.score)} size={40} />
          <TitleMarkup style={styles.scoreText}>
            {item.score}            
          </TitleMarkup>
            <Text style={styles.maxScore}>/10</Text>
        </View>
      </TouchableOpacity>

      {/* Afbeeldingen met prijs-overlay */}
      {item.images?.length > 0 && (
        <View style={styles.imageWrapper}>
          <ImageCarousel images={item.detailImages} height={250} />

          <View style={styles.priceOverlay}>
            <Text style={styles.priceText}>
              {item.price}
            </Text>
          </View>
        </View>
      )}


      {/* Aanbiedingstitel */}
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="spa"
          size={26}
          color="#F2B8C6"
        />
        <TitleMarkup style={styles.iconText}>
          {item.offerTitle}
        </TitleMarkup>
      </View>

      {/* Locatie */}
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="map-marker"
          size={26}
          color="red"
        />
        <TitleMarkup style={styles.iconText}>
          {item.address}
        </TitleMarkup>
      </View>

      {/* Prijs & categorie */}
      {/* <View style={styles.groupContainer}>
        <View style={[styles.detailsItem, { backgroundColor: oddColor }]}>
          <TitleMarkup style={styles.detailText}>
            {item.price}
          </TitleMarkup>
        </View>

        <View style={[styles.detailsItem, { backgroundColor: oddColor }]}>
          <TitleMarkup style={styles.detailText}>
            {item.category}
          </TitleMarkup>
        </View>
      </View> */}

      {/* Socials + favorite */}
      <View style={styles.socialRow}>
        {item.contact.site && (
          <SocialIconProps
            name="web"
            color="#555"
            url={item.contact.site}
          />
        )}

        {item.contact.socials.facebook && (
          <SocialIconProps
            name="facebook"
            color="#4267B2"
            url={item.contact.socials.facebook}
          />
        )}

        {item.contact.socials.instagram && (
          <SocialIconProps
            name="instagram"
            color="#E1306C"
            url={item.contact.socials.instagram}
          />
        )}

        <TouchableOpacity
          onPress={() => onToggleFavorite(item)}
        >
          <MaterialCommunityIcons
            style={[
              styles.favoriteButton,
              { backgroundColor: evenColor },
            ]}
            name={
              isFavorite
                ? 'heart-circle'
                : 'heart-circle-outline'
            }
            color={isFavorite ? '#E0245E' : '#D8A679'}
            size={64}
          />
        </TouchableOpacity>
      </View>

      {/* Beschrijving */}
      <View
        style={[
          styles.descriptionContainer,
          { backgroundColor: oddColor },
        ]}>

        <TitleMarkup style={styles.descriptionText}>
          {item.description}
        </TitleMarkup>
      </View>
      
      {showRatings && (
    <>
      {/* Overlay */}
      <Pressable
        style={styles.overlay}
        onPress={closeRatings}
      />
  
      {/* Sliding panel */}
      <Animated.View style={[ styles.ratingSheet, { top: slideAnim }, ]}>
        <View style={styles.sheetHandle} />
  
        <RatingDetailsView data={item} evenColor={evenColor} oddColor={oddColor}/>
      </Animated.View>
    </>
  )}
    </ScrollView>
    );
};


const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 6,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  maxScore: {
    fontSize: 18,
    marginBottom: 4,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  groupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  detailsItem: {
    width: '48%',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  detailText: {
    fontSize: 20,
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    gap: 20,
    marginTop: 12,
  },
  favoriteButton: {
    borderRadius: 999,
    elevation: 5,
  },
  descriptionContainer: {
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  descriptionText: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  ratingSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.5,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 12,

    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: -6 },
    elevation: 30,
  },

  sheetHandle: {
    width: 56,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    marginBottom: 14,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 24,
  },

  titleText: {
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.6,
    lineHeight: 40,
  },
imageWrapper: {
  position: 'relative',
  marginTop: 16,
},

priceOverlay: {
  position: 'absolute',
  bottom: 14,
  right: 16,
},

priceText: {
  fontSize: 28,
  fontWeight: '700',
  color: '#FFFFFF',
  letterSpacing: 0.5,
},

});
