import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import TitleMarkup from '../../components/TitleMarkup';
import ImageCarousel from '../../components/ImageCarousel';
import RatingStars from '../../components/RatingStars';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppSelector } from '../../hooks/reduxHooks';

import { useNavigation } from '@react-navigation/native';
import { usePublicSaunaList } from '../../hooks/usePublicSaunaList';


const EVEN_COLOR = '#FFF7E6';
const ODD_COLOR = '#FDECC8';
const LOADER_COLOR = '#ADD8E6';


const PublicSaunaListScreen = () => {
const navigation = useNavigation();
// const favorites = useAppSelector((store) => store.favorites);
    
const { data: publicSaunaList, isLoading, isError, refetch, isRefetching } =
usePublicSaunaList();  

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={LOADER_COLOR} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <TitleMarkup>Failed to load private sauna list. Please try again.</TitleMarkup>
      </View>
    );
  }
  
  return (
    <View style={styles.screen}>
      <FlatList
        data={publicSaunaList}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 12 }}
        refreshing={isRefetching}
        onRefresh={refetch}
        renderItem={({ item, index }) => {
          const bgColor = index % 2 === 0 ? EVEN_COLOR : ODD_COLOR;
             return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('publicSaunaDetails', { data: item })}
            >
              <View style={[styles.card, { backgroundColor: bgColor }]}>
                
                {/* Titel */}
                <TitleMarkup style={styles.title}>{item.name}</TitleMarkup>

                {/* Rating */}
                <RatingStars score={Number(item.score)} size={30} />
                
                {/* Locatie */}
                <Text style={styles.location}>{item.location}</Text>

                {/* afbeelding met favorite button */}  
                <View style={styles.imageWrapper}>
                
                  {/* afbeelding */}
                  <ImageCarousel images={item.detailImages.slice(0, 3)} height={200} />
                    {/* favorite icon
                    <View style={styles.favoriteFloating}>
                      {favorites.some(f => f.id === item.id) && (
                        <MaterialCommunityIcons name="heart" color="#E0245E" size={34} />
                      )}
                    </View>   */}
                </View>              
              </View>
            </TouchableOpacity>
          );
}}      />
    </View>
  );
}

export default PublicSaunaListScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
 });