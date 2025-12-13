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
      <TitleMarkup>{item.name}</TitleMarkup>

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


      {/* Afbeeldingen */}
      {item.images?.length > 0 && (
        <ImageCarousel images={item.detailImages} height={250} />
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
      <View style={styles.groupContainer}>
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
      </View>

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
      <Animated.View
        style={[
          styles.ratingSheet,
          { top: slideAnim },
        ]}
      >
        <View style={styles.sheetHandle} />
  
        <RatingDetailsView
          data={item}
          evenColor={evenColor}
          oddColor={oddColor}
        />
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
  },
  scoreText: {
    fontSize: 24,
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
  favoriteButton: {
    borderRadius: 999,
    elevation: 5,
  },
  overlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.35)',
},

ratingSheet: {
  position: 'absolute',
  left: 0,
  right: 0,
  height: SCREEN_HEIGHT / 2,
  backgroundColor: '#FFF',
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  padding: 16,
  elevation: 20,
},

sheetHandle: {
  width: 48,
  height: 5,
  borderRadius: 3,
  backgroundColor: '#D1D5DB',
  alignSelf: 'center',
  marginBottom: 12,
},
  maxScore: {
    fontSize: 18,
    marginLeft: 2,
    color: '#6B7280',
  },
});