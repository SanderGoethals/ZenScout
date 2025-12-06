import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useFavorites } from '../../hooks/useFavorites'
import ImageCarousel from '../../components/ImageCarousel'
import TitleMarkup from '../../components/TitleMarkup'
import { useNavigation } from '@react-navigation/native';


const FavoritesScreen = () => {
    const { favorites }= useFavorites()
    const navigation = useNavigation();
    
  return (
    <View>
        <FlatList
         data={favorites}
         keyExtractor={(item) => item.id.toString()}
         renderItem={({ item }) => 
           <TouchableOpacity onPress={() => {
             navigation.navigate('wellnessDetails', { data: item }); }} >
             <TitleMarkup>{item.name}</TitleMarkup>
             <ImageCarousel images={item.images.slice(0, 3)} height={250} />
           </TouchableOpacity>
          // <Text>{item.name}</Text>
         }/>
    </View>
  )
}

export default FavoritesScreen