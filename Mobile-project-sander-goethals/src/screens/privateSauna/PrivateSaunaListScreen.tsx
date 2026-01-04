import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {SpaListCard} from '../../components/domain/spa/SpaListCard';
import TextMarkup from '../../components/ui/TextMarkup';
import { useAppSelector } from '../../hooks/reduxHooks';
// import { usePrivateSaunaList } from '../../hooks/usePrivateSaunaList';
import { getCategoryColor } from '../../theme/categoryHelpers';
import { usePrivateSaunasFromFirebase } from '../../hooks/firebase/usePrivateSaunasFromFirebase';

const PrivateSaunaListScreen = () => {
  const navigation = useNavigation();
   const favorites = useAppSelector(store => store.favorites);

  const {
    data: spaList, isLoading, isError, refetch, isRefetching, } = usePrivateSaunasFromFirebase();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={getCategoryColor('privateSauna', 'third')} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <TextMarkup>
          Private sauna lijst kon niet geladen worden.
        </TextMarkup>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={spaList}
        keyExtractor={(item: SpaBase) => item.id}
        contentContainerStyle={{ padding: 12 }}
        refreshing={isRefetching}
        onRefresh={refetch}
        renderItem={({ item, index }) => (
          <SpaListCard
            data={item}
            index={index}
            category='privateSauna'
            isFavorite={favorites.some(f => f.id === item.id)}
            onPress={(spa) =>
              navigation.navigate('privateSaunaDetails', { data: spa })
            }
          >
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

export default PrivateSaunaListScreen;