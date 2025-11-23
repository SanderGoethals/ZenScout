import { StyleSheet, Text, View, ScrollView, Linking, TouchableOpacity} from 'react-native'
import React from 'react'
import { RootStackNavProps } from '../../navigators/types';
import { useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ImageCarousel from '../../components/ImageCarousel';
import RatingStars from '../../components/RatingStars';
import TitleMarkup from '../../components/TitleMarkup';
import SocialIconProps from '../../components/SocialsIcon';

const WellnessDetailsScreen = () => {

  const {
    params: { data },
  } = useRoute<RootStackNavProps<"wellnessDetails">['route']>();

  return (
    <View>
      <ScrollView>
      <TitleMarkup>{data.name}</TitleMarkup>
      <View style={styles.scoreContainer}>
        <RatingStars score={Number(data.score)} size={40} ></RatingStars>
        <TitleMarkup style={{fontSize: 20}}>{data.score}/10</TitleMarkup>
      </View>

      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="spa" size={24} color="#F2B8C6" />
        <TitleMarkup style={{fontSize: 20, flexShrink: 1}}>{data.offerTitle}</TitleMarkup>
       </View>

      {data.images?.length > 0 && (
        <ImageCarousel images={data.images} height={250} />
      )}  

      <View style={styles.iconContainer}>
      <MaterialCommunityIcons name="map-marker" size={30} color="red" />
      <TitleMarkup style={{fontSize: 20}}>{data.address}</TitleMarkup>
      </View>



      <View style={styles.groupContainer}>
        <View style={styles.detailsItem}>
        <TitleMarkup style={{fontSize: 20}}>{data.price}</TitleMarkup>
        </View>

        <View style={styles.detailsItem}>
        <TitleMarkup style={{fontSize: 20}}>{data.category}</TitleMarkup>
        </View>
      </View>
        
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

      </View>

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
    marginVertical: 10,
    gap: 6,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 4,
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
  paddingHorizontal: 80,
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

    // Shadow / elevation
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  descriptionContainer: {
  backgroundColor: "#FFF7E6",       // zacht crème spa-achtergrond
  padding: 16,
  borderRadius: 12,
  marginTop: 16,

  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 6,
  elevation: 2,
},

descriptionText: {
  fontSize: 18,
  lineHeight: 24,  
  letterSpacing: 0.3,
},
})