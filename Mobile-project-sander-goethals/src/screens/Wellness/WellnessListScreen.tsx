import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {SpaListCard} from '../../components/SpaListCard';
import TitleMarkup from '../../components/TitleMarkup';
import { useWellnessList } from '../../hooks/useWellnessList';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getCategoryColor } from '../../theme/categoryHelpers';


const SpaListScreen = () => {
  const navigation = useNavigation();
   const favorites = useAppSelector(store => store.favorites);

  const {
    data: spaList, isLoading, isError, refetch, isRefetching, } = useWellnessList();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={getCategoryColor('wellness', 'loader')} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <TitleMarkup>
          Wellneslijst kon niet geladen worden.
        </TitleMarkup>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={spaList}
        keyExtractor={(item: SpaBase) => item.id}
        contentContainerStyle={{ 
          padding: 12,  
          // backgroundColor: '#000000',
        }}
        refreshing={isRefetching}
        onRefresh={refetch}
        renderItem={({ item, index }) => (
          <SpaListCard
            data={item}
            index={index}
            category='wellness'
            isFavorite={favorites.some(f => f.id === item.id)}
            onPress={(spa) =>
              navigation.navigate('wellnessDetails', { data: spa })
            }
          >
            {/* <Text style={styles.offerTitle}>
              {item.offerTitle}
            </Text>

            <Text style={styles.offerDuration}>
              {item.offerDuration}
            </Text>

            <Text style={styles.price}>
              {item.price}
            </Text> */}
          </SpaListCard>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SpaListScreen;