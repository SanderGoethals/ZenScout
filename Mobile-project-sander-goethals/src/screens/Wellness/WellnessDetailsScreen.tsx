import { StyleSheet, Text, View, ScrollView, Linking, TouchableOpacity} from 'react-native'
import React from 'react'
import { RootStackNavProps } from '../../navigators/types';
import { useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ImageCarousel from '../../components/ImageCarousel';
import RatingStars from '../../components/RatingStars';
import TitleMarkup from '../../components/TitleMarkup';
import SocialIconProps from '../../components/SocialsIcon';
import { useFavorites } from '../../hooks/useFavorites';


const WellnessDetailsScreen = () => {
  const { favorites, addFavorites } = useFavorites();
  
  const {
    params: { data },
  } = useRoute<RootStackNavProps<"wellnessDetails">['route']>();

  return (
    <View>
      <ScrollView>

      {/* Naam */}
      <TitleMarkup>{data.name}</TitleMarkup>

      {/* Score */}
      <View style={styles.scoreContainer}>
        <RatingStars score={Number(data.score)} size={40} ></RatingStars>
        <TitleMarkup style={{fontSize: 24}}>{data.score}/10</TitleMarkup>
      </View>

      {/* Image Carousel */}
        {data.images?.length > 0 && (
          <ImageCarousel images={data.images} height={250} />
        )}

      {/* Aanbiedingstitel */}
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="spa" size={26} color="#F2B8C6" />
        <TitleMarkup style={{fontSize: 20}}>{data.offerTitle}</TitleMarkup>
      </View>

      {/* Locatie */}
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="map-marker" size={26} color="red" />
        <TitleMarkup style={{fontSize: 20}}>{data.address}</TitleMarkup>
      </View>

      {/* Prijs en Categorie */}
      <View style={styles.groupContainer}>
        <View style={[styles.detailsItem]}>
          <TitleMarkup style={{fontSize: 20}}>{data.price}</TitleMarkup>
        </View>

        <View style={[styles.detailsItem]}>
          <TitleMarkup style={{fontSize: 20}}>{data.category}</TitleMarkup>
        </View>
      </View>
        
      {/* Socials */}
      <View style={styles.socialRow}> 
        {data.contact.site && (
          <SocialIconProps name="web" color="#555" url={data.contact.site} />
        )}

        {data.contact.socials.facebook && (
          <SocialIconProps name="facebook" color="#4267B2" url={data.contact.socials.facebook} />
        )}

        {data.contact.socials.instagram && (
          <SocialIconProps name="instagram" color="#E1306C" url={data.contact.socials.instagram} />
        )}

        {/* Like Button */}
        <TouchableOpacity onPress={() => { addFavorites(data) }}>
          <MaterialCommunityIcons style={styles.favoriteButton}
            name={favorites.some(f => f.id === data.id)
              ? "heart-circle"             // gevuld icoon
              : "heart-circle-outline"}    // niet gevuld icoon
            color={favorites.some(f => f.id === data.id)
              ? "#E0245E"                  // actief: rood
              : "#D8A679"}
            size={64}
          />
        </TouchableOpacity>
      </View>

      {/* Beschrijving */}
      <View style={styles.descriptionContainer}>
        <TitleMarkup style={styles.descriptionText}>{data.description}</TitleMarkup>
      </View>

      </ScrollView>
    </View>    
  )
}

export default WellnessDetailsScreen

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    // marginBottom: -8,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    // gap: 8,
    // marginVertical: 4,
  },  
  groupContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 50,
    gap: 20,
    marginTop: 12,
  },
  detailsItem: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDECC8",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  shadow: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  descriptionContainer: {
    backgroundColor: "#FFF7E6",
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#FDECC8",
    borderRadius: 999,
  },
})