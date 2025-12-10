import React, { FC } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ImageCarousel from './ImageCarousel';
import RatingStars from './RatingStars';
import TitleMarkup from './TitleMarkup';
import SocialIconProps from './SocialsIcon';
import { DetailProps } from './types';


const SpaDetailsView: FC<DetailProps> = ({
  data,
  isFavorite,
  onToggleFavorite,
  evenColor,
  oddColor,
}: DetailProps) => {
  return (
    <ScrollView style={{ backgroundColor: evenColor }}>

      {/* Naam */}
      <TitleMarkup>{data.name}</TitleMarkup>

      {/* Score */}
      <View style={styles.scoreContainer}>
        <RatingStars score={Number(data.score)} size={40} />
        <TitleMarkup style={styles.scoreText}>
          {data.score}/10
        </TitleMarkup>
      </View>

      {/* Afbeeldingen */}
      {data.images?.length > 0 && (
        <ImageCarousel images={data.detailImages} height={250} />
      )}

      {/* Aanbiedingstitel */}
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="spa"
          size={26}
          color="#F2B8C6"
        />
        <TitleMarkup style={styles.iconText}>
          {data.offerTitle}
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
          {data.address}
        </TitleMarkup>
      </View>

      {/* Prijs & categorie */}
      <View style={styles.groupContainer}>
        <View style={[styles.detailsItem, { backgroundColor: oddColor }]}>
          <TitleMarkup style={styles.detailText}>
            {data.price}
          </TitleMarkup>
        </View>

        <View style={[styles.detailsItem, { backgroundColor: oddColor }]}>
          <TitleMarkup style={styles.detailText}>
            {data.category}
          </TitleMarkup>
        </View>
      </View>

      {/* Socials + favorite */}
      <View style={styles.socialRow}>
        {data.contact.site && (
          <SocialIconProps
            name="web"
            color="#555"
            url={data.contact.site}
          />
        )}

        {data.contact.socials.facebook && (
          <SocialIconProps
            name="facebook"
            color="#4267B2"
            url={data.contact.socials.facebook}
          />
        )}

        {data.contact.socials.instagram && (
          <SocialIconProps
            name="instagram"
            color="#E1306C"
            url={data.contact.socials.instagram}
          />
        )}

        <TouchableOpacity
          onPress={() => onToggleFavorite(data)}
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
        ]}
      >
        <TitleMarkup style={styles.descriptionText}>
          {data.description}
        </TitleMarkup>
      </View>

    </ScrollView>
  );
};

export default SpaDetailsView;

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
});