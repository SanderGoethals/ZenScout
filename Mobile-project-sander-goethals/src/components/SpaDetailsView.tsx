import React, { FC, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions, Pressable, } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ImageCarousel from './ImageCarousel';
import RatingStars from './RatingStars';
import TitleMarkup from './TitleMarkup';
import SocialIconProps from './SocialsIcon';
import { DetailProps } from './types';
import { RatingDetailsView } from './RatingDetailsView';
import { StatusBar } from 'expo-status-bar';
import { useHeaderHeight } from '@react-navigation/elements';
import FacilitiesView from './FacilitiesView';
import FacilitiesCollapsible from './FacilitiesCollapsable';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const SpaDetailsView: FC<DetailProps> = ({
  data: item,
  isFavorite,
  onToggleFavorite,
  evenColor,
  oddColor,
}: DetailProps) => {

  const [showRatings, setShowRatings] = useState(false);
  const headerHeight = useHeaderHeight();


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

  const descriptionParts = item.fullDescription
  ? item.fullDescription.split(/\n\s*\n/)
  : [];

  return (
    <>
      <StatusBar style="light" translucent />
        <ScrollView
              style={{ backgroundColor: evenColor }}
              contentContainerStyle={{
                paddingTop: headerHeight,
              }}
              showsVerticalScrollIndicator={false}
            >

          {/* Afbeeldingen */}
          {item.images?.length > 0 && (
            <View style={{ marginTop: -headerHeight }}>
              <ImageCarousel images={item.detailImages} height={320} />


              <View style={styles.priceOverlay}>
                <Text style={styles.priceText}>
                  {item.price}
                </Text>
              </View>
            </View>
          )}

          {/* Titel + score */}
          <View style={styles.infoCard}>
          <TitleMarkup style={styles.titleText}>
            {item.name}
          </TitleMarkup>

          <TouchableOpacity onPress={openRatings} activeOpacity={0.8}>
            <View style={styles.scoreContainer}>
              <RatingStars score={Number(item.score)} size={32} />
              <Text style={styles.scoreText}>{item.score}</Text>
              <Text style={styles.maxScore}>/10</Text>
            </View>
          </TouchableOpacity>
        </View>
          
        {/* Faciliteiten */}
        <FacilitiesCollapsible facilities={item.facilities} collapsedHeight={160} bgColor={oddColor} />

          {/* Kleine beschrijving */}
          <View
            style={[
              styles.descriptionContainer,
              { backgroundColor: oddColor },
            ]}>

            <TitleMarkup style={styles.descriptionText} numberOfLines={2} ellipsizeMode="tail" >
              {item.description}
            </TitleMarkup>

          </View>


          {/* Volledige beschrijving */}
          <View style={[styles.fullDescriptionContainer, { backgroundColor: oddColor }]}>            
            {/* Aanbieding */}
            <View style={styles.offerContainer}>
              <MaterialCommunityIcons
                name="spa"
                size={32}
                color="#E89AAE"
              />
              <TitleMarkup style={{fontSize: 26, fontWeight: 'bold', color: '#374151', marginLeft: 0,}}>
                {item.offerTitle}
              </TitleMarkup>
                      <MaterialCommunityIcons
                name="spa"
                size={32}
                color="#E89AAE"
              />
          </View>
            {descriptionParts.map((part: string, index: number) => (
              <TitleMarkup
              key={index}
              style={[
                index === 0
                    ? styles.fullDescriptionIntro
                    : styles.fullDescriptionParagraph,
              ]}
              >
                {part.trim()}
              </TitleMarkup>
            ))}
          </View>      

          {/* Locatie */}
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="map-marker"
              size={30}
              color="red"
            />
            <TitleMarkup style={{ fontSize: 20 }}>
              {item.address}
            </TitleMarkup>
          </View>    

          {/* Socials + favorite */}
          {item.contact && (
            <View style={styles.socialRow}>
              {item.contact.site ? (
                <SocialIconProps
                name="web"
                color="#555"
                url={item.contact.site}
                bgColor={oddColor}
                />
              ) : null}

              {item.contact.socials?.facebook ? (
                <SocialIconProps
                name="facebook"
                  color="#4267B2"
                  url={item.contact.socials.facebook}
                  bgColor={oddColor}
                />
              ) : null}

              {item.contact.socials?.instagram ? (
                <SocialIconProps
                name="instagram"
                color="#E1306C"
                url={item.contact.socials.instagram}
                bgColor={oddColor}
                />
              ) : null}

              <TouchableOpacity
                onPress={() => onToggleFavorite(item)}
              >
                <MaterialCommunityIcons
                  style={[
                    styles.favoriteButton,
                    { backgroundColor: oddColor },
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
          )}

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
</>
    );
};

const styles = StyleSheet.create({
  infoCard: {
    marginTop: -15,
    marginHorizontal: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
  },
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
  offerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    gap: 20,
    paddingTop: 10,
    paddingBottom: 25,
  },
  favoriteButton: {
    borderRadius: 999,
    elevation: 5,
  },
  descriptionContainer: {
    marginTop: 20,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
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
  titleText: {
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.6,
    lineHeight: 40,
  },
  priceOverlay: {
    position: 'absolute',
    bottom: 14,
    right: 16,
  },
  priceText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  fullDescriptionContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  fullDescriptionIntro: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
    letterSpacing: 0.4,
},
  fullDescriptionParagraph: {
    fontSize: 17,
    lineHeight: 26,
    letterSpacing: 0.3,
    color: '#374151',
  },
});
