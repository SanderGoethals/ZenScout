import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

const WELLNESS_API_URL = 'http://10.0.2.2:4000/wellness.json';

const WellnessListScreen = () => {

  const [wellnessList, setWellnessList] = useState<Wellness[]>([])
  const [refreshing, setRefreshing] = useState(false);

  const fetchWellnessList = async () => {
    try {
          const response = await fetch(WELLNESS_API_URL);
          const data = await response.json();
          setWellnessList(data as Wellness[]);
    } catch (error) {
          console.error('Error fetching wellness list:', error);
    }
  }
  useEffect(() => {
    fetchWellnessList();
  }, []);

  const onRefresh = async () => {
         setRefreshing(true);
         await fetchWellnessList();
         setRefreshing(false);
     }

  return (
    <View>
       <FlatList
         data={wellnessList}
         keyExtractor={(item) => item.id.toString()}
         renderItem={({ item }) => (
           <View>
             <Text>{item.name}</Text>
           </View>
         )}
         refreshing={refreshing}
         onRefresh={onRefresh}
       />
    </View>
  )
}

export default WellnessListScreen

const styles = StyleSheet.create({})